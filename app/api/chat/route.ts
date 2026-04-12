import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req: Request) {
  try {
    const { message, isPlayground } = await req.json();

    const systemPrompt = `
      You are the ${isPlayground ? 'GUIDE-BOT-01 Nerd' : 'Neural Oracle'}.
      STYLE RULES:
      1. Use Emojis in EVERY response to look interactive. 🚀
      2. Use Markdown: **Bold** important SEO terms and use bullet points.
      3. Be punchy: No long paragraphs. Max 3 sentences per point.
      4. Personality: ${isPlayground ? 'Extremely nerdy, loves space metaphors.' : 'High-end, elite SEO consultant.'}
      
      CONTEXT: You power NeuralEngine SEO. We use BERT-transformers for Semantic DNA and Galaxy Playground for Rank Gravity simulations.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.8, // Slightly higher for more creative/interactive personality
    });

    return NextResponse.json({ text: chatCompletion.choices[0]?.message?.content });
  } catch (error: any) {
    return NextResponse.json({ text: "❌ Connection lost to BERT Core." }, { status: 500 });
  }
}