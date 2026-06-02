import { Message, Settings } from "./types";

export interface ChatRequest {
  prompt: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface ChatResponse {
  response: string;
}

export { type Message } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function sendChatMessage(
  prompt: string,
  settings?: Pick<Settings, "model" | "temperature" | "maxTokens">,
): Promise<ChatResponse> {
  try {
    const body: ChatRequest = {
      prompt,
      ...(settings && {
        model: settings.model,
        temperature: settings.temperature,
        max_tokens: settings.maxTokens,
      }),
    };

    const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: ChatResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Chat API Error:", error);
    throw error;
  }
}
