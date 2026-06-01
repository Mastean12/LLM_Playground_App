"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
          }),
        }
      );

      const data = await res.json();

      setResponse(data.response);

    } catch (error) {
      console.error(error);

      setResponse(
        "Failed to connect to backend."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          LLM Playground
        </h1>

        <textarea
          className="w-full border rounded-lg p-4"
          rows={5}
          placeholder="Ask anything..."
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
        />

        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-3 border rounded-lg"
        >
          Send
        </button>

        {loading && (
          <p className="mt-4">
            Thinking...
          </p>
        )}

        {response && (
          <div className="mt-6 border rounded-lg p-4">
            <h2 className="font-bold mb-2">
              Response
            </h2>

            <p>{response}</p>
          </div>
        )}

      </div>

    </main>
  );
}