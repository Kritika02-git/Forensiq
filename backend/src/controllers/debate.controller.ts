import {AuthRequest} from "../middleware/auth.middleware";
import prisma from "../lib/prisma";
import {getDebateSystemPrompt} from "../lib/debatePrompt";
import anthropic from "../lib/claude";

export const startDebate = async(req: AuthRequest, res: Response) => {
    // @ts-ignore
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
        // @ts-ignore
        res.json({sessionId: session.id, aiSide})
    } catch (error) {
        // @ts-ignore
        res.status(500).json({error: 'Something went wrong'})
    }
}

export const sendArgument = async(req: AuthRequest, res: Response) => {
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
        const systemPrompt = getDebateSystemPrompt(session.topic, aiSide, session.userId)
        const response = await anthropic.messages.create({
            model: 'claude-opus-4-8',
            max_tokens:1000,
            systemPrompt: systemPrompt,
            messages: updatedMessages.map(m => ({
                role: m.role as 'user' | 'assistant',
                content: m.content
            }))
        })
        const fullResponse = response.content[0].type =='text' ? response.content[0].text : ''
        const parts = fullResponse.split('SKILL ASSESSMENT:')
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
    catch(error) {
        res.status(500).json({error: 'Something went wrong'})
    }
}