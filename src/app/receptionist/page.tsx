"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
  role: "assistant" | "user";
  content: string;
};

type Lead = {
  name: string;
  email: string;
  phone: string;
  intent: string;
  notes: string;
};

const quickPrompts = [
  "I would like to ask about Distributed Ethics.",
  "Can I arrange a conversation with Peter?",
  "Where should I start on this site?",
  "Can someone follow up with me?",
];

const initialLead: Lead = {
  name: "",
  email: "",
  phone: "",
  intent: "New enquiry",
  notes: "",
};

const initialMessage: Message = {
  role: "assistant",
  content:
    "Welcome to Mindshare Desk. I can point you to the right work, take a note for Peter, or help frame an enquiry. What brings you here?",
};

export default function ReceptionistPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [lead, setLead] = useState<Lead>(initialLead);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesRef = useRef<HTMLOListElement>(null);
  const hasLoadedHireBrief = useRef(false);

  const leadSummary = useMemo(
    () => [lead.name, lead.email, lead.phone, lead.intent].filter(Boolean).join(" · "),
    [lead]
  );

  useEffect(() => {
    if (hasLoadedHireBrief.current || typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("hire") !== "1") return;

    hasLoadedHireBrief.current = true;
    const hireBrief = buildHireBrief(params);
    setInput(hireBrief);
    setLead(captureLeadDetails(hireBrief, { ...initialLead, intent: "Hire enquiry" }));
  }, []);

  async function submitMessage(event?: FormEvent<HTMLFormElement>, preset?: string) {
    event?.preventDefault();
    const content = (preset || input).trim();
    if (!content || isThinking) return;

    const nextLead = captureLeadDetails(content, lead);
    const nextMessages: Message[] = [...messages, { role: "user", content }];

    setInput("");
    setLead(nextLead);
    setMessages(nextMessages);
    setIsThinking(true);

    requestAnimationFrame(() => {
      messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
    });

    try {
      const response = await fetch("/api/receptionist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-10), lead: nextLead }),
      });
      const data = (await response.json()) as { reply?: string };
      setMessages([...nextMessages, { role: "assistant", content: data.reply || fallbackReply(content) }]);
    } catch {
      setMessages([...nextMessages, { role: "assistant", content: fallbackReply(content) }]);
    } finally {
      setIsThinking(false);
      requestAnimationFrame(() => {
        messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
      });
    }
  }

  function resetConversation() {
    setMessages([initialMessage]);
    setLead(initialLead);
    setInput("");
  }

  return (
    <main className="min-h-screen bg-[#080a0d] text-zinc-100 font-mono">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-0 lg:grid-cols-[0.72fr_1.28fr]">
        <section className="border-b border-zinc-800 bg-[linear-gradient(135deg,#101419,#050607)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mb-8 rounded border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Back to desk
          </button>

          <p className="text-xs font-bold uppercase tracking-normal text-cyan-300">Mindshare reception</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            A quiet front desk for the work on the desk.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
            Ask about Distributed Ethics, the publications, consultancy enquiries, or where to begin. The receptionist will prepare a concise handoff note when follow-up is needed.
          </p>

          <div className="mt-10 grid gap-3">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => submitMessage(undefined, prompt)}
                className="rounded border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-left text-sm text-zinc-300 transition hover:border-cyan-500 hover:text-white"
              >
                {prompt}
              </button>
            ))}
          </div>

          <aside className="mt-10 rounded border border-zinc-800 bg-black/35 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-normal text-amber-300">Handoff note</p>
              <button type="button" onClick={resetConversation} className="text-xs text-zinc-500 hover:text-zinc-200">
                Reset
              </button>
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              <div className="grid grid-cols-[88px_1fr] gap-3">
                <dt className="text-zinc-500">Visitor</dt>
                <dd className="text-zinc-300">{lead.name || "Not captured"}</dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] gap-3">
                <dt className="text-zinc-500">Email</dt>
                <dd className="break-words text-zinc-300">{lead.email || "Not captured"}</dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] gap-3">
                <dt className="text-zinc-500">Phone</dt>
                <dd className="break-words text-zinc-300">{lead.phone || "Not captured"}</dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] gap-3">
                <dt className="text-zinc-500">Intent</dt>
                <dd className="text-zinc-300">{lead.intent}</dd>
              </div>
            </dl>
            <p className="mt-4 border-t border-zinc-800 pt-4 text-sm leading-6 text-zinc-400">
              {lead.notes || leadSummary || "No notes yet."}
            </p>
          </aside>
        </section>

        <section className="flex min-h-[720px] flex-col bg-[#0d1117]">
          <header className="border-b border-zinc-800 px-5 py-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-normal text-cyan-300">AI receptionist</p>
            <h2 className="mt-1 text-xl font-semibold text-white">How can I help?</h2>
          </header>

          <ol ref={messagesRef} className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6 sm:px-6">
            {messages.map((message, index) => (
              <li
                key={`${message.role}-${index}`}
                className={`max-w-[86%] rounded px-4 py-3 text-sm leading-6 shadow-xl ${
                  message.role === "user"
                    ? "self-end bg-cyan-950 text-cyan-50"
                    : "self-start border border-zinc-800 bg-zinc-950 text-zinc-300"
                }`}
              >
                {message.content}
              </li>
            ))}
            {isThinking && (
              <li className="self-start rounded border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-500">
                Considering the handoff...
              </li>
            )}
          </ol>

          <form onSubmit={submitMessage} className="grid gap-3 border-t border-zinc-800 bg-black/30 p-4 sm:grid-cols-[1fr_auto] sm:p-6">
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <input
              id="message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-h-12 min-w-0 rounded border border-zinc-700 bg-zinc-950 px-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-cyan-400"
              placeholder="Ask a question or leave details..."
            />
            <button
              type="submit"
              disabled={isThinking}
              className="min-h-12 rounded bg-cyan-500 px-6 text-sm font-bold text-zinc-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              Send
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function buildHireBrief(params: URLSearchParams) {
  const fields = [
    ["Name", params.get("name")],
    ["Email", params.get("email")],
    ["Project type", params.get("project")],
    ["Timeline", params.get("timeline")],
    ["Budget / scale", params.get("budget")],
    ["Brief", params.get("brief")],
  ].filter(([, value]) => value && value.trim());

  if (fields.length === 0) {
    return "I am interested in hiring Peter. Can you help prepare a brief for follow-up?";
  }

  return [
    "I am interested in hiring Peter. Here is my brief:",
    ...fields.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
}

function captureLeadDetails(text: string, currentLead: Lead): Lead {
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || currentLead.email;
  const phone = text.match(/(?:\+?\d[\d\s().-]{7,}\d)/)?.[0] || currentLead.phone;
  const nameMatch = text.match(/\b(?:my name is|i am|i'm|this is|name:)\s+([a-z][a-z\s'-]{1,40})/i);
  const name = nameMatch ? titleCase(nameMatch[1].trim()) : currentLead.name;
  const intent = inferIntent(text, currentLead.intent);

  return {
    name,
    email,
    phone,
    intent,
    notes: text.length > 140 ? `${text.slice(0, 140)}...` : text,
  };
}

function inferIntent(text: string, fallback: string) {
  if (/hire|brief|budget|project type/i.test(text)) return "Hire enquiry";
  if (/distributed ethics|policy|governance|audit/i.test(text)) return "Distributed Ethics enquiry";
  if (/consult|call|conversation|meeting|follow/i.test(text)) return "Follow-up request";
  if (/publication|salon|iron meridian|cold eye|substack/i.test(text)) return "Publication enquiry";
  return fallback;
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function fallbackReply(text: string) {
  if (/hire|brief|budget|project type/i.test(text)) {
    return "I can turn this into a concise handoff for Peter. Please add anything important about audience, deadline, constraints, or what a good outcome would look like.";
  }

  if (/distributed ethics|governance|audit/i.test(text)) {
    return "Distributed Ethics is the strongest starting point. I can note whether your interest is policy, research, deployment, or insurance, then prepare a useful handoff for Peter.";
  }

  if (/call|conversation|meeting|follow/i.test(text)) {
    return "I can help with that. Please share your name, email, and a sentence on what you would like to discuss, and I will turn it into a concise note.";
  }

  if (/where|start|begin/i.test(text)) {
    return "Start with Distributed Ethics if you want the governance work, The Salon for persona writing, or Mindshare Advisory for the daily public thread. I can point you more precisely if you tell me your interest.";
  }

  return "Understood. Could you share one more detail and the best way for Peter to follow up if needed?";
}
