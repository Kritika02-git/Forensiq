export const getAnalysisPrompt = (topic:string, userSide: string, messages: Array<{role:string, content:string}>) => {
    const conversation = messages.map(m => `${m.role === 'user'? 'USER': 'AI'} : ${m.content}`).join('\n\n')

    return `Analyze this debate and return a JSON object only - no markdown, no explanation, just raw JSON.

Topic: "${topic}"
User argued: ${userSide}

Conversation: 
${conversation}

Return exactly this structure:
{
    "score" : <number 1-10>,
    "skillLevel" : "<BEGINNER|INTERMEDIATE|ADVANCED>",
    "strongestArgument" : "<brief description of why this argument was effective>",
    "weakestArgument": "<brief description of why this argument was ineffective>",
    "fallacies":["<fallacy name: example from debate>"],
    "blindSpots": ["<missed angle>"],
    "improvementTips": ["<specific actionable tip>"]
    }`
}