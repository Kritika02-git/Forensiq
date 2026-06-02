// import {Anthropic} from "@anthropic-ai/sdk";
//
// const anthropic = new Anthropic({
//     apiKey: process.env.ANTHROPIC_API_KEY,
// })
//
// export default anthropic


import {GoogleGenerativeAI} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default genAI;