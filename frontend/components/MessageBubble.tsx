"use client";

import { Message } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import { TypingIndicator } from "./TypingIndicator";

interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
}

export function MessageBubble({ message, isLoading }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const timestamp = new Date(message.timestamp);

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6 animate-in fade-in duration-300`}
    >
      <div
        className={`flex gap-3 max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-transform hover:scale-110 ${
            isUser
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
              : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 font-bold"
          }`}
        >
          {isUser ? "U" : "✨"}
        </div>

        <div
          className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
        >
          <div
            className={`px-4 py-3 rounded-2xl transition-all ${
              isUser
                ? "bg-blue-600 text-white rounded-br-none"
                : `bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none ${isLoading ? "animate-pulse-glow" : "hover:shadow-md"}`
            }`}
          >
            {isLoading ? (
              <TypingIndicator />
            ) : (
              <div className="text-sm md:text-base break-words">
                {isUser ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => <h1 className="text-lg font-bold my-3 text-gray-900 dark:text-gray-100" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-base font-bold my-2.5 text-gray-900 dark:text-gray-100" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-base font-semibold my-2 text-gray-900 dark:text-gray-100" {...props} />,
                      h4: ({ node, ...props }) => <h4 className="text-sm font-semibold my-1.5 text-gray-900 dark:text-gray-100" {...props} />,
                      h5: ({ node, ...props }) => <h5 className="text-sm font-semibold my-1.5 text-gray-900 dark:text-gray-100" {...props} />,
                      h6: ({ node, ...props }) => <h6 className="text-sm font-semibold my-1.5 text-gray-900 dark:text-gray-100" {...props} />,
                      p: ({ node, ...props }) => <p className="my-2 leading-relaxed text-gray-900 dark:text-gray-100" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2 space-y-1 text-gray-900 dark:text-gray-100" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2 space-y-1 text-gray-900 dark:text-gray-100" {...props} />,
                      li: ({ node, ...props }) => <li className="my-1 text-gray-900 dark:text-gray-100" {...props} />,
                      code: ({ className, children, ...props }) =>
                        className ? (
                          <code className="block bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto text-xs font-mono my-2" {...props}>{children}</code>
                        ) : (
                          <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono text-gray-800 dark:text-gray-200" {...props}>{children}</code>
                        ),
                      pre: ({ node, ...props }) => <pre className="bg-gray-800 p-3 rounded overflow-x-auto my-2" {...props} />,
                      blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-400 pl-3 italic my-2 text-gray-700 dark:text-gray-300" {...props} />,
                      a: ({ node, ...props }) => <a className="text-blue-600 dark:text-blue-400 hover:underline font-medium" {...props} />,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            )}
          </div>
          <span className="text-xs text-gray-400 mt-1.5 px-1">
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
