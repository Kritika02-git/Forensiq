import {AuthRequest} from "../middleware/auth.middleware";
import prisma from "../lib/prisma";
import {getDebateSystemPrompt} from "../lib/debatePrompt";
import anthropic from "../lib/claude";
import { Response } from 'express'
import genAI from "../lib/claude";

export const startDebate = async(req: AuthRequest, res: Response) => {
    try {
        const {topic, userSide} = req.body;
        const aiSide = userSide == 'for' ? 'against' : 'for'

        const session = await prisma.debateSession.create({
            data: {
                topic,
                userSide,
                skillLevel: 'BEGINNER',
                messages: [],
                userId: req.userId!
            }
        })
        res.json({sessionId: session.id, aiSide})
    } catch (error) {
        res.status(500).json({error: 'Something went wrong'})
    }
}

export const sendArgument = async(req: AuthRequest, res: Response) => {
    console.log('sendArgument called', req.body)
    try {
        const {sessionId, argument} = req.body;

        const session = await prisma.debateSession.findUnique({
            where: {id: sessionId},
        })

        if(!session) {
            res.status(404).json({error: 'Session not found'})
            return
        }

        if(session.userId !== req.userId) {
            res.status(403).json({error: 'Unauthorized'})
            return
        }

        const messages = session.messages as Array<{role:string, content: string}>

        const updatedMessages = [
            ...messages,
            {role: 'user', content: argument}
        ]

        const aiSide = session.userSide === 'for' ? 'against' : 'for'
        const systemPrompt = getDebateSystemPrompt(session.topic, aiSide, session.userSide)
        // const response = await anthropic.messages.create({
        //     model: 'claude-sonnet-4-20250514',
        //     max_tokens:1000,
        //     system: systemPrompt,
        //     messages: updatedMessages.map(m => ({
        //         role: m.role as 'user' | 'assistant',
        //         content: m.content
        //     }))
        // })

        const model = genAI.getGenerativeModel({model: 'gemini-2.5-flash', systemInstruction:{
            parts:[{text: systemPrompt}]
            }})

        const chat = model.startChat({
            history:updatedMessages.slice(0,-1).map(m=>({
                role: m.role === 'assistant' ? 'model': 'user',
                parts:[{text:m.content}]
            }))
        })

        const result = await chat.sendMessage(argument)
        const fullResponse = result.response.text()
        const parts = fullResponse.split('SKILL_ASSESSMENT:')
        const debateReply = parts[0].trim()
        const skillLevel = parts[1]?.trim() || session.skillLevel

        const finalMessages = [
            ...updatedMessages,
            {role: 'assistant', content: debateReply}
        ]

        await prisma.debateSession.update({
            where: {id: sessionId},
            data: {
                messages: finalMessages,
                skillLevel
            }
        })
        res.json({reply:debateReply, skillLevel})
    }
    catch(error: any) {
        console.log('CAUGHT ERROR TYPE:', typeof error)
        console.log('CAUGHT ERROR:', error?.message)
        console.log('CAUGHT ERROR STACK:', error?.stack)
        res.status(500).json({ error: error?.message || 'Something went wrong' })
    }
}