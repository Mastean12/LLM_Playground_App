"use client";

import { useLocalStorage } from "./useLocalStorage";
import { Settings, DEFAULT_SETTINGS } from "../types";

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<Settings>(
    "llm-playground-settings",
    DEFAULT_SETTINGS,
  );

  const updateSettings = (patch: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  };

  return { settings, updateSettings };
}
