"use client";
import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const COLD_OPEN = "Two types of people walk through that door: those in trouble and those looking for trouble. Which are you?";

export default function Detective() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: COLD_OPEN },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setStreaming(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...next, assistantMsg]);

    try {
      const res = await fetch("/api/acade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "The line went dead. Try again.",
        };
        return updated;
      });
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-mono">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <span className="text-amber-500 text-sm tracking-widest uppercase">A. Cade</span>
          <span className="text-zinc-600 text-sm ml-3">Private Investigations — Room 412</span>
        </div>
        <a
          href="/"
          className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
        >
          ← leave
        </a>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 max-w-2xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "flex justify-end" : ""}>
            {msg.role === "assistant" ? (
              <div className="space-y-1">
                <p className="text-zinc-600 text-xs uppercase tracking-widest mb-2">Cade</p>
                <p className="text-amber-200/90 leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                  {i === messages.length - 1 && streaming && (
                    <span className="inline-block w-1.5 h-4 bg-amber-500 ml-0.5 animate-pulse align-middle" />
                  )}
                </p>
              </div>
            ) : (
              <div className="max-w-sm space-y-1">
                <p className="text-zinc-600 text-xs uppercase tracking-widest mb-2 text-right">You</p>
                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-right">
                  {msg.content}
                </p>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 px-6 py-4 flex-shrink-0">
        <div className="max-w-2xl mx-auto flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={streaming}
            rows={1}
            placeholder="Speak your mind…"
            className="flex-1 bg-zinc-900 text-zinc-200 placeholder-zinc-600 border border-zinc-700 focus:border-amber-700 focus:outline-none px-4 py-3 resize-none leading-relaxed transition-colors"
            style={{ minHeight: "48px", maxHeight: "160px" }}
            onInput={(e) => {
              const t = e.target as HTMLTextAreaElement;
              t.style.height = "auto";
              t.style.height = Math.min(t.scrollHeight, 160) + "px";
            }}
          />
          <button
            onClick={send}
            disabled={streaming || !input.trim()}
            className="bg-amber-800 hover:bg-amber-700 disabled:bg-zinc-800 disabled:text-zinc-600 text-amber-100 px-5 py-3 text-sm transition-colors flex-shrink-0"
          >
            {streaming ? "—" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
