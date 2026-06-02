"use client";

import { useState, useCallback } from "react";
import { Menu } from "lucide-react";
import { ChatWindow } from "@/components/ChatWindow";
import { ChatInput } from "@/components/ChatInput";
import { Sidebar } from "@/components/Sidebar";
import { SettingsModal } from "@/components/SettingsModal";
import { MarixionLogo } from "@/components/MarixionLogo";
import { useConversations } from "@/lib/hooks/useConversations";
import { useSettings } from "@/lib/hooks/useSettings";
import { Message } from "@/lib/types";
import { sendChatMessage } from "@/lib/api";

export default function Home() {
  const { settings } = useSettings();
  const {
    conversations,
    createConversation,
    updateConversation,
    deleteConversation,
    getConversation,
  } = useConversations();

  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const activeMessages = activeConversationId
    ? getConversation(activeConversationId)?.messages ?? []
    : [];

  const handleSendMessage = useCallback(
    async (userMessage: string) => {
      const now = new Date().toISOString();
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: userMessage,
        timestamp: now,
      };

      setError(null);
      setIsLoading(true);

      let conversationId = activeConversationId;
      if (!conversationId) {
        const conv = createConversation();
        conversationId = conv.id;
        setActiveConversationId(conv.id);
      }

      const existing = getConversation(conversationId);
      const currentMessages = existing?.messages ?? [];
      updateConversation(conversationId, [...currentMessages, userMsg]);

      try {
        const response = await sendChatMessage(userMessage, {
          model: settings.model,
          temperature: settings.temperature,
          maxTokens: settings.maxTokens,
        });

        const assistantMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.response,
          timestamp: new Date().toISOString(),
        };

        const updated = getConversation(conversationId);
        const allMessages = [...(updated?.messages ?? []), assistantMsg];
        updateConversation(conversationId, allMessages);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to get response";
        setError(errorMessage);
        console.error("Chat error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [
      activeConversationId,
      createConversation,
      getConversation,
      updateConversation,
      settings,
    ],
  );

  const handleNewChat = useCallback(() => {
    setActiveConversationId(null);
    setError(null);
  }, []);

  const handleSelectChat = useCallback((id: string) => {
    setActiveConversationId(id);
    setError(null);
  }, []);

  const handleDeleteChat = useCallback(
    (id: string) => {
      deleteConversation(id);
      if (activeConversationId === id) {
        setActiveConversationId(null);
        setError(null);
      }
    },
    [activeConversationId, deleteConversation],
  );

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar
        conversations={conversations}
        activeId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onOpenSettings={() => setSettingsOpen(true)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 md:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Open sidebar"
              >
                <Menu size={24} className="text-gray-900 dark:text-white" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <MarixionLogo size={28} text={false} />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white hidden sm:inline">
                {activeConversationId
                  ? getConversation(activeConversationId)?.title ||
                    "Untitled Chat"
                  : "Marixion ai"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-500 dark:text-gray-400"
              title="Settings"
            >
              <span className="text-xl">⚙️</span>
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow messages={activeMessages} isLoading={isLoading} />

          {error && (
            <div className="px-4 md:px-6 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 rounded-lg mx-4 md:mx-6 mb-4 text-sm">
              Error: {error}
              <button
                onClick={() => setError(null)}
                className="ml-2 text-red-600 dark:text-red-400 hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            disabled={false}
          />
        </div>
      </div>

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
