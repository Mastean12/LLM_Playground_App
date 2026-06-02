"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      {[0, 0.2, 0.4].map((delay, i) => (
        <span
          key={i}
          className="block w-2.5 h-2.5 rounded-full"
          style={{
            animation: `dot-wave 1.4s ease-in-out ${delay}s infinite`,
            backgroundColor:
              i === 0 ? "#60a5fa" : i === 1 ? "#3b82f6" : "#2563eb",
          }}
        />
      ))}
    </div>
  );
}
