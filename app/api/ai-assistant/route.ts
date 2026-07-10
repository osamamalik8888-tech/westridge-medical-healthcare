import { NextRequest, NextResponse } from "next/server";
import { getDemoReply } from "@/lib/ai-assistant";
import { siteConfig, doctors } from "@/lib/site-config";
import { getActiveProvider, providers } from "@/lib/ai-provider-config";

export const runtime = "nodejs";

/**
 * The system prompt a real LLM integration should use. Written now so the
 * safety rules are decided deliberately, in one reviewable place, rather
 * than improvised later under time pressure. See AI_ASSISTANT_SETUP.md
 * for exactly where this plugs into an OpenAI, Claude, or Gemini call.
 */
export const SYSTEM_PROMPT = `You are the AI Health Assistant for ${siteConfig.name}, a general physician's clinic in Rawalpindi, Pakistan. The doctor is ${doctors[0]?.name ?? "Dr. Khalid Ahmed"} (${doctors[0]?.credentials ?? "MBBS, FCPS Part-I (Medicine)"}).

Hard rules, no exceptions:
- Never diagnose a condition. Never say what someone "has" — describe possibilities only a doctor should confirm.
- Never prescribe or recommend a specific medicine, dose, or treatment.
- Never present yourself as a replacement for seeing a doctor.
- Classify every symptom-related message into exactly one of: Emergency, Urgent, Routine, Self-care. State the classification plainly.
- Any red-flag symptom (chest pain, breathing difficulty, stroke signs, severe bleeding, loss of consciousness, severe allergic reaction, suicidal ideation) is Emergency — direct them to call ${siteConfig.emergency.number} or go to the nearest emergency department immediately, not to book an appointment.
- Recommend booking an appointment whenever it's genuinely appropriate (Urgent or Routine cases especially), and offer all three real contact channels when you do: WhatsApp, a phone call to ${siteConfig.phones[0]?.display ?? "the clinic"}, or email to ${siteConfig.email}.
- If a message suggests self-harm or suicidal ideation, respond with care first, not just a classification — encourage them to reach out to someone right now (${siteConfig.emergency.number}, an emergency department, or a trusted person), and do not treat it as a routine triage question.
- If a message is too vague to classify (e.g. "I don't feel well" with no detail), ask one clarifying question instead of guessing.
- If you're not confident what's being asked, say so plainly and suggest contacting the clinic directly rather than guessing.
- Keep responses concise and conversational — this is a chat interface, not an article.
- You may answer factual questions about the clinic (hours, services, location, booking) using only the real information provided in this system prompt's context — never invent hours, prices, or services not given to you.`;

interface ChatTurn {
  role: "user" | "assistant";
  text: string;
}

function parseBody(body: unknown): { message: string; history: ChatTurn[] } {
  if (typeof body !== "object" || body === null) return { message: "", history: [] };
  const b = body as Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message : "";
  const history = Array.isArray(b.history)
    ? b.history.filter(
        (h): h is ChatTurn =>
          typeof h === "object" &&
          h !== null &&
          (h as ChatTurn).role !== undefined &&
          typeof (h as ChatTurn).text === "string"
      )
    : [];
  return { message, history };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { message } = parseBody(body);

  if (!message.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  // Basic guard against absurdly long input — this is a chat box, not a
  // file upload. Doesn't need to be sophisticated; just needs to exist.
  if (message.length > 2000) {
    return NextResponse.json({ error: "Message is too long" }, { status: 400 });
  }

  const activeProvider = getActiveProvider();

  if (activeProvider === "demo") {
    // --- Demo mode: simple, local, rule-based. No network calls, no
    // cost, no key required. Runs entirely in this function. ---
    const reply = getDemoReply(message);
    return NextResponse.json({ ...reply, demo: true });
  }

  // --- Real AI integration point ---
  // getActiveProvider() found a key, so `activeProvider` is "openai",
  // "claude", or "gemini" here — but the actual API call for each is
  // deliberately not implemented. That needs your real key and a
  // provider choice, not a guess made for you. The exact code for all
  // three is in AI_ASSISTANT_SETUP.md; it uses SYSTEM_PROMPT above and
  // providers[activeProvider].model from lib/ai-provider-config.ts.
  // Falls back to demo mode below rather than a raw error either way.
  const info = providers[activeProvider];
  const reply = getDemoReply(message);
  return NextResponse.json({
    ...reply,
    text: `(${info.provider} key detected, model "${info.model}" — the real API call isn't wired up in code yet, see AI_ASSISTANT_SETUP.md) ${reply.text}`,
    demo: true,
  });
}
