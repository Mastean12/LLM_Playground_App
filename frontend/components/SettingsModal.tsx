"use client";

import { useState, useEffect } from "react";
import { X, Sun, Moon, Cpu } from "lucide-react";
import { useSettings } from "@/lib/hooks/useSettings";
import { AVAILABLE_MODELS } from "@/lib/types";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { settings, updateSettings } = useSettings();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-2xl transition-all duration-200 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <fieldset>
            <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Theme
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => updateSettings({ theme: "light" })}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                  settings.theme === "light"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                <Sun
                  size={20}
                  className={
                    settings.theme === "light"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Light
                </span>
              </button>
              <button
                onClick={() => updateSettings({ theme: "dark" })}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                  settings.theme === "dark"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                <Moon
                  size={20}
                  className={
                    settings.theme === "dark"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Dark
                </span>
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Cpu size={16} />
              Default Model
            </legend>
            <select
              value={settings.model}
              onChange={(e) => updateSettings({ model: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {AVAILABLE_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Temperature: {settings.temperature}
            </legend>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={settings.temperature}
              onChange={(e) =>
                updateSettings({ temperature: parseFloat(e.target.value) })
              }
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-gray-400">Precise</span>
              <span className="text-xs text-gray-400">Creative</span>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Max Tokens: {settings.maxTokens}
            </legend>
            <input
              type="range"
              min="256"
              max="8192"
              step="256"
              value={settings.maxTokens}
              onChange={(e) =>
                updateSettings({ maxTokens: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-gray-400">256</span>
              <span className="text-xs text-gray-400">8192</span>
            </div>
          </fieldset>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
