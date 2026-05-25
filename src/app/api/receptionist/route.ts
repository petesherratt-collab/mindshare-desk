import { NextResponse } from "next/server";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type Lead = {
  name?: string;
  email?: string;
  phone?: string;
  intent?: string;
  notes?: string;
};

type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const systemPrompt = `You are the AI receptionist for Mindshare Desk, the personal website of Peter Sherratt.
You help visitors orient themselves around Distributed Ethics, Mindshare Advisory, The Salon, The Cold Eye, Iron Meridian, and consultancy enquiries.
You are concise, calm, and editorially sharp. You do not invent appointments, fees, or private contact details.
When follow-up is useful, collect name, email or phone, area of interest, and a short note for Peter.
Keep replies under 95 words.`;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: ChatMessage[]; lead?: Lead };
    const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
    const lead = body.lead || {};

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ reply: fallbackReply(messages.at(-1)?.content || "") });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "http-referer": process.env.NEXT_PUBLIC_SITE_URL || "https://mindshare-desk.vercel.app",
        "x-title": "Mindshare Desk",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "anthropic/claude-3.5-haiku",
        max_tokens: 260,
        temperature: 0.4,
        messages: [
          { role: "system", content: `${systemPrompt}\n\nCurrent handoff details: ${JSON.stringify(lead)}` },
          ...messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ reply: fallbackReply(messages.at(-1)?.content || "") });
    }

    const data = (await response.json()) as OpenRouterResponse;
    const reply = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({ reply: reply || fallbackReply(messages.at(-1)?.content || "") });
  } catch {
    return NextResponse.json({ reply: "Sorry, I could not process that just now. Please try again." }, { status: 500 });
  }
}

function fallbackReply(text: string) {
  if (/distributed ethics|governance|audit|policy/i.test(text)) {
    return "Distributed Ethics is the best starting point for governance, audit, policy, and accountability enquiries. Tell me your angle and I will shape a clear note for Peter.";
  }

  if (/call|conversation|meeting|follow|contact/i.test(text)) {
    return "I can take a note for follow-up. Please share your name, email or phone, and a sentence on what you would like to discuss.";
  }

  if (/salon|iron meridian|cold eye|substack|publication/i.test(text)) {
    return "The publications split into different rooms: The Salon for persona judgement, Mindshare Advisory for public commentary, The Cold Eye for satire, and Iron Meridian for pulp fiction. Which thread are you following?";
  }

  return "I can help with that. Could you add one more detail, and share the best way for Peter to follow up if this needs a reply?";
}
