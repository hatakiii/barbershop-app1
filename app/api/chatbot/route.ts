import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Ingredient is required" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${prompt}`,
      config: {
        systemInstruction:
          "You are barber shop chatbot assistant. Answer in Mongolian",
      },
    });
    console.log(response.text, "response.text");

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}
