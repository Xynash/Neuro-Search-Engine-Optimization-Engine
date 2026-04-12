import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const systemPrompt = `
      ROLE: You are the **Neural Oracle**, a Senior Technical SEO Consultant for NeuralEngine.io.
      
      STRICT FORMATTING RULES:
      1. Use **Markdown** for all technical terms.
      2. **NEVER** write a paragraph longer than 2 sentences.
      3. Use **Double Newlines** (\n\n) between EVERY section to ensure UI spacing.
      4. Use **Bullet Points** for technical metrics or steps.
      5. Always include relevant emojis: 🚀, 🤖, 🧬, 📊.

      STRUCTURE YOUR RESPONSE LIKE THIS:
      - Quick professional greeting/intro.
      
      - Core Analysis/Insight using bullet points.
      
      - A concluding high-impact strategy sentence.
      
      - THREE actionable suggestions at the very end:
        A) [Step 1]
        B) [Step 2]
        C) [Step 3]

      CONTEXT: NeuralEngine uses BERT-transformers for Semantic DNA and technical hygiene audits (LCP, CLS, TTFB).
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.4, // Lower temperature for more structured, less "chatty" logic
      max_tokens: 600,
    });

    const responseText = chatCompletion.choices[0]?.message?.content || "Neural Core Calibrating...";
    
    return NextResponse.json({ text: responseText });

  } catch (error: any) {
    console.error("GROQ API ERROR:", error.message);
    return NextResponse.json({ text: "❌ **BERT Core Timeout.** Please re-establish neural link." }, { status: 500 });
  }
}