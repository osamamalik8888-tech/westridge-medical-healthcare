# AI Assistant Setup

How to move the AI Health Assistant from demo mode to a real language
model — OpenAI, Claude, or Gemini.

## The one file that controls this

`lib/ai-provider-config.ts` decides which provider is active. It checks,
in order: an explicit `AI_PROVIDER` environment variable, then whichever
of `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` / `GEMINI_API_KEY` is set, then
falls back to demo mode if none are. Nothing else in the codebase needs
to change to switch providers — set the key (or `AI_PROVIDER`), redeploy,
done.

The actual API call for each provider is deliberately **not**
implemented in `app/api/ai-assistant/route.ts` — that needs your real key
and an explicit choice, not a guess made for you. The code to drop in is
below, once for each provider, all going in the same spot: the comment
block under `// --- Real AI integration point ---`.

## How demo mode works right now

With no key set, the route calls `getDemoReply()` in `lib/ai-assistant.ts`
— pattern matching against real symptom keywords, emergency red flags,
and clinic FAQs, entirely on your own server. No external calls, no cost,
nothing stored. The chat UI doesn't know or care which mode is active; it
just reads whatever the API route returns.

A `SYSTEM_PROMPT` constant already exists at the top of the route file,
with every safety rule from the brief written into it (never diagnose,
never prescribe, classify into Emergency/Urgent/Routine/Self-care, offer
WhatsApp/phone/email together when suggesting a booking, direct
emergencies to call immediately, handle anything resembling a crisis with
care first, ask a clarifying question rather than guess when a message is
too vague). Review and adjust the wording to your liking before going
live — it's a starting point, not something to treat as untouchable.

## Option A — OpenAI

```bash
npm install openai
```

Add to `.env.local` (and Vercel's Environment Variables once deployed):

```
OPENAI_API_KEY=sk-...
```

Then in `app/api/ai-assistant/route.ts`, replace the placeholder block
under `// --- Real AI integration point ---` with:

```ts
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const completion = await openai.chat.completions.create({
  // providers.openai.model in lib/ai-provider-config.ts, or check
  // platform.openai.com/docs/models directly — this space moves fast.
  model: providers.openai.model,
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: message },
  ],
  max_tokens: 500,
});

const text = completion.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
return NextResponse.json({ text, demo: false });
```

## Option B — Claude (Anthropic)

```bash
npm install @anthropic-ai/sdk
```

Add to `.env.local` (and Vercel):

```
ANTHROPIC_API_KEY=sk-ant-...
```

Same integration point:

```ts
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const response = await anthropic.messages.create({
  model: providers.claude.model, // or check docs.claude.com for current models
  max_tokens: 500,
  system: SYSTEM_PROMPT,
  messages: [{ role: "user", content: message }],
});

const text = response.content[0]?.type === "text" ? response.content[0].text : "Sorry, I couldn't generate a response.";
return NextResponse.json({ text, demo: false });
```

## Option C — Gemini (Google)

```bash
npm install @google/genai
```

Add to `.env.local` (and Vercel):

```
GEMINI_API_KEY=...
```

Same integration point:

```ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.generateContent({
  model: providers.gemini.model, // or check ai.google.dev/gemini-api/docs/models
  contents: message,
  config: { systemInstruction: SYSTEM_PROMPT },
});

const text = response.text ?? "Sorry, I couldn't generate a response.";
return NextResponse.json({ text, demo: false });
```

Google's Node SDK and API surface for this have changed shape more than
once recently (a newer "Interactions" API exists alongside the
`generateContent` pattern above) — the version here is the one
consistently documented across multiple independent sources as of this
writing, but it's worth a quick check against current docs before
shipping, more so than for the other two providers.

## Carrying conversation history

The chat interface already sends the full conversation (not just the
latest message) to the API route — `parseBody()` in `route.ts` reads a
`history` array alongside `message`, ready for exactly this. Demo mode
ignores it (keyword matching doesn't need memory), but a real model
benefits from it: spread `history` into the `messages` (OpenAI/Claude) or
`contents` (Gemini) array ahead of the latest turn, instead of sending
just the single message shown in the snippets above.

## Worth doing before going live with a real key

- **Rate limiting.** Nothing stops one visitor from sending hundreds of
  messages right now, which is fine for free demo-mode keyword matching
  but turns into a real bill with a paid API. Vercel's
  [rate limiting](https://vercel.com/docs/security/rate-limiting) or a
  simple in-memory counter (fine for a single clinic's traffic) both work.
- **Streaming**, since it's on the wishlist: all three SDKs support it
  (`stream: true` for OpenAI, `anthropic.messages.stream()` for Claude,
  `ai.models.generateContentStream()` for Gemini) — meaningfully more
  integration work than the non-streaming versions above, worth doing
  once the basic integration is confirmed working, not before.
- **Fallback to demo mode on API failure**, not just on missing key — if
  the real API call throws (rate limit, outage, bad key), catch it and
  fall through to `getDemoReply()` rather than showing an error. A few
  lines of try/catch around the new code above.
- **Update the Privacy Policy's AI Health Assistant section** the day you
  add a real key — it currently says messages aren't sent anywhere
  external, which stops being true the moment a provider is connected.
  That section says explicitly it will be updated before that happens,
  not after — this is the "before."
