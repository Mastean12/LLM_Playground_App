"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Conversation, Message } from "../types";

export function useConversations() {
  const [conversations, setConversations] = useLocalStorage<Conversation[]>(
    "llm-playground-conversations",
    [],
  );

  const sortedConversations = useMemo(
    () => [...conversations].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [conversations],
  );

  const createConversation = useCallback(
    (): Conversation => {
      const now = new Date().toISOString();
      const conv: Conversation = {
        id: crypto.randomUUID(),
        title: "",
        messages: [],
        createdAt: now,
        updatedAt: now,
      };
      setConversations((prev) => [conv, ...prev]);
      return conv;
    },
    [setConversations],
  );

  const updateConversation = useCallback(
    (id: string, messages: Message[]) => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          const title =
            c.title ||
            messages.find((m) => m.role === "user")?.content.slice(0, 60) ||
            "New Chat";
          return {
            ...c,
            title,
            messages,
            updatedAt: new Date().toISOString(),
          };
        }),
      );
    },
    [setConversations],
  );

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
    },
    [setConversations],
  );

  const getConversation = useCallback(
    (id: string) => conversations.find((c) => c.id === id) ?? null,
    [conversations],
  );

  return {
    conversations: sortedConversations,
    createConversation,
    updateConversation,
    deleteConversation,
    getConversation,
    setConversations,
  };
}
