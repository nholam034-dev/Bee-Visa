
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, ChatAttachment } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// We use a safe initialization pattern to prevent the entire app from crashing.

let ai: GoogleGenAI | null = null;
const apiKey = process.env.API_KEY || process.env.VITE_FIREBASE_API_KEY;

// Safe Init
try {
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
        console.log("Gemini Client Initialized.");
    } else {
        console.warn("Gemini API Key is missing.");
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
}

export const sendMessageStream = async (
  history: ChatMessage[],
  currentMessage: string,
  attachments: ChatAttachment[],
  context: string = "Trang chủ"
): Promise<AsyncGenerator<string, void, unknown>> => {
  try {
    if (!ai) {
        // Retry with hard check
        if (apiKey) {
            ai = new GoogleGenAI({ apiKey });
        } else {
            throw new Error("Chưa cấu hình API Key. Vui lòng kiểm tra Netlify Environment Variables.");
        }
    }

    // 1. Format History for Gemini
    const contents: any[] = history.slice(-10).map((msg) => {
        const parts: any[] = [{ text: msg.text }];
        return {
            role: msg.role,
            parts: parts
        };
    });

    // 2. Prepare Current Message Parts
    const currentParts: any[] = [];
    
    // Handle Attachments
    if (attachments && attachments.length > 0) {
        attachments.forEach(att => {
            const base64Data = att.base64.includes(',') ? att.base64.split(',')[1] : att.base64;
            currentParts.push({
                inlineData: {
                    mimeType: att.mimeType,
                    data: base64Data
                }
            });
        });
    }

    // Add Text Prompt with Context
    const promptWithContext = `[Khách đang xem trang: ${context}]\n${currentMessage}`;
    currentParts.push({ text: promptWithContext });

    contents.push({
        role: 'user',
        parts: currentParts
    });

    // 3. Call API with Stream
    // Sử dụng model 'gemini-2.0-flash-exp' hoặc 'gemini-1.5-flash' nếu 3-flash chưa khả dụng với Key của bạn
    // Theo guideline ưu tiên: gemini-3-flash-preview
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview', 
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    // Return a generator that yields text chunks
    async function* streamGenerator() {
        for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) yield text;
        }
    }

    return streamGenerator();

  } catch (error: any) {
    console.error("Gemini API Error Full:", error);
    // Trả về message lỗi cụ thể để debug
    const errorMessage = error.message || JSON.stringify(error);
    throw new Error(errorMessage);
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};
