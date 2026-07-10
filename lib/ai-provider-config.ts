/**
 * The one file that decides which AI provider is active. Nothing else in
 * the codebase should need to change to switch providers — set the
 * matching API key (or force a choice with AI_PROVIDER), redeploy, done.
 *
 * Demo mode (no key set) needs zero configuration and is the default.
 */

export type AiProvider = "demo" | "openai" | "claude" | "gemini";

export interface ProviderInfo {
  provider: Exclude<AiProvider, "demo">;
  /**
   * Current, reasonably-priced default as of when this was written — not
   * a permanent recommendation. Model names in this space change fast;
   * check the provider's own docs before assuming this is still current.
   */
  model: string;
  envKey: string;
}

export const providers: Record<Exclude<AiProvider, "demo">, ProviderInfo> = {
  openai: { provider: "openai", model: "gpt-4o-mini", envKey: "OPENAI_API_KEY" },
  claude: { provider: "claude", model: "claude-sonnet-5", envKey: "ANTHROPIC_API_KEY" },
  gemini: { provider: "gemini", model: "gemini-2.5-flash", envKey: "GEMINI_API_KEY" },
};

/**
 * Resolution order: an explicit AI_PROVIDER override first (so setting
 * multiple keys at once — e.g. while comparing providers — doesn't leave
 * it ambiguous which one is actually active), then whichever single key
 * is set, then demo mode as the always-safe fallback.
 */
export function getActiveProvider(): AiProvider {
  const explicit = process.env.AI_PROVIDER as AiProvider | undefined;
  if (explicit && explicit in providers) return explicit;

  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.ANTHROPIC_API_KEY) return "claude";
  if (process.env.GEMINI_API_KEY) return "gemini";
  return "demo";
}
