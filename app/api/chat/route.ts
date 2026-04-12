import Groq from "groq-sdk";
import { NextResponse } from "next/server";

// Check if we are using the env or hardcoded key
const API_KEY = process.env.GROQ_API_KEY || "PASTE_YOUR_KEY_HERE_ONLY_IF_ENV_FAILS";

const groq = new Groq({
  apiKey: API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, isPlayground } = await req.json();

    const systemPrompt = isPlayground 
      ? "You are 'GUIDE-BOT-01', a nerdy SEO architect. Help the user."
      : "You are the 'Neural Oracle', a professional SEO assistant.";

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      // Let's use a very reliable model name
      model: "mixtral-8x7b-32768", 
      temperature: 0.6,
    });

    return NextResponse.json({ text: chatCompletion.choices[0]?.message?.content });

  } catch (error: any) {
    // THIS PART IS CRUCIAL: Check your VS Code terminal for this output
    console.log("--- GROQ ERROR DETECTED ---");
    console.error(error.message); 
    
    return NextResponse.json({ 
      text: `Engine Error: ${error.message.substring(0, 50)}...` 
    }, { status: 500 });
  }
}