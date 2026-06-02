"use client";

import { Plus, Trash2, MessageSquare, Settings, PanelLeftClose } from "lucide-react";
import { Conversation } from "@/lib/types";
import { MarixionLogo } from "./MarixionLogo";

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onOpenSettings: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function Sidebar({
  conversations,
  activeId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onOpenSettings,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <aside
      className={`${
        collapsed ? "w-0 border-r-0" : "w-64"
      } hidden md:flex flex-col bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden shrink-0`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <MarixionLogo />
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
            title="Close sidebar"
          >
            <PanelLeftClose size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          New Chat
        </button>

        <div className="mt-4">
          <p className="text-[11px] text-gray-400 dark:text-gray-500 px-2 mb-2 font-semibold uppercase tracking-wider">
            Recent
          </p>

          {conversations.length === 0 ? (
            <p className="text-xs text-gray-400 dark:text-gray-500 px-2 py-3 text-center">
              No conversations yet
            </p>
          ) : (
            <div className="space-y-0.5">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    activeId === conv.id
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <button
                    onClick={() => onSelectChat(conv.id)}
                    className="flex items-center gap-2 min-w-0 flex-1 text-left"
                    title={conv.title}
                  >
                    <MessageSquare size={14} className="flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm truncate font-medium">
                        {conv.title || "Untitled Chat"}
                      </p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                        {formatDate(conv.updatedAt)}
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(conv.id);
                    }}
                    className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-all flex-shrink-0"
                    title="Delete conversation"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="p-3 pb-1.5">
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            <Settings size={16} />
            Settings
          </button>
        </div>
        <div className="px-4 pb-3 pt-1">
          <MarixionLogo text={false} size={20} />
        </div>
      </div>
    </aside>
  );
}
