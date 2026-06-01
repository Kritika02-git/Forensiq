// @ts-ignore

import express from "express";
import prisma from "../lib/prisma";
// @ts-ignore
import bcrypt from "bcrypt";
// @ts-ignore
import jwt from 'jsonwebtoken'

export const register = async(req: Request, res: Response) => {
    try {
        // @ts-ignore
        const {email, password, username} = req.body;
        const existing = await prisma.user.findUnique({where: {email}});
        if (existing) {
            // @ts-ignore
            res.status(400).json({error: 'Email already in use'});
            return;
        }

        const existingUsername = await prisma.user.findUnique({where: {username}});
        if (existingUsername) {
            // @ts-ignore
            res.status(400).json({error: 'Username already taken'});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {email, password: hashedPassword, username},
        })

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET!,
            {expiresIn: process.env.JWT_EXPIRES_IN || '7d'},)

        // @ts-ignore
        res.status(201).json({token, user: {id: user.id, email: user.email, username: user.username}})
    } catch (error) {
        // @ts-ignore
        res.status(500).json({error: 'Something went wrong'});
    }
}

export const login = async(req: Request, res: Response) => {
   try {
       // @ts-ignore
       const {email, password} = req.body;
       const existing = await prisma.user.findUnique({where: {email}});
       if(!existing) {
           // @ts-ignore
           res.status(404).json({error: 'User not found'});
           return
       }
           const match = await bcrypt.compare(password, existing.password);
           if (!match) {
               // @ts-ignore
               res.status(401).json({error: 'Invalid Credentials'});
               return
           }
               const token = jwt.sign(
                   {userId: existing.id},
                   process.env.JWT_SECRET!,
                   {expiresIn: process.env.JWT_EXPIRES_IN || '7d'},)

               // @ts-ignore
       res.status(200).json({
                   token,
                   user: {id: existing.id, email: existing.email, username: existing.username}
               })
           }
    catch
        (error)
        {
            // @ts-ignore
            res.status(500).json({error: 'Something went wrong'});
        }
    }

