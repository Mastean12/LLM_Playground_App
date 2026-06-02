export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  theme: "light" | "dark";
  model: string;
  temperature: number;
  maxTokens: number;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: "dark",
  model: "llama3.2",
  temperature: 0.7,
  maxTokens: 2048,
};

export const AVAILABLE_MODELS = [
  { id: "llama3.2", label: "Llama 3.2" },
  { id: "llama3.1:8b", label: "Llama 3.1 8B" },
  { id: "mistral", label: "Mistral" },
  { id: "codellama", label: "Code Llama" },
  { id: "gemma2:9b", label: "Gemma 2 9B" },
  { id: "qwen2.5:7b", label: "Qwen 2.5 7B" },
] as const;

export type AvailableModel = (typeof AVAILABLE_MODELS)[number]["id"];
