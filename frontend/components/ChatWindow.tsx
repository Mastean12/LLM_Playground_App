"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/lib/types";
import { MessageBubble } from "./MessageBubble";
import { MarixionLogo } from "./MarixionLogo";

interface ChatWindowProps {
  messages: Message[];
  isLoading?: boolean;
}

export function ChatWindow({ messages, isLoading = false }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 space-y-4 max-w-5xl mx-auto w-full">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <div className="mb-6">
            <MarixionLogo size={64} text={false} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Welcome to Marixion ai
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm">
            Start a conversation with the AI. Ask questions, get creative, or
            explore ideas together.
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <MessageBubble
              message={{
                id: "loading",
                role: "assistant",
                content: "",
                timestamp: new Date().toISOString(),
              }}
              isLoading={true}
            />
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
