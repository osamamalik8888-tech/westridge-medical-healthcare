"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { SendIcon, SparkleIcon, CopyIcon, TrashIcon, CheckIcon } from "@/components/shared/icons";
import { MultiChannelCta } from "@/components/shared/multi-channel-cta";
import { siteConfig } from "@/lib/site-config";
import { suggestedQuestions, disclaimerText, type Classification } from "@/lib/ai-assistant";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  classification?: Classification;
  suggestBooking?: boolean;
  followUps?: string[];
}

const classificationStyles: Record<Classification, string> = {
  emergency: "bg-red-600 text-white",
  urgent: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  routine: "bg-navy-900 text-white dark:bg-white dark:text-navy-900",
  "self-care": "bg-navy-50 text-navy-600 dark:bg-white/10 dark:text-white/65",
};

const classificationLabels: Record<Classification, string> = {
  emergency: "Emergency",
  urgent: "Urgent",
  routine: "Routine",
  "self-care": "Self-care",
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3.5 shadow-sm shadow-navy-900/[0.04] dark:bg-navy-800">
      <span className="sr-only">Assistant is typing…</span>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-navy-300 dark:bg-white/40"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function ChatInterface() {
  const [accepted, setAccepted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text: trimmed };
    const historyForRequest = messages.map((m) => ({ role: m.role, text: m.text }));
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: historyForRequest }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: data.text ?? "Sorry, something went wrong on my end. Please try WhatsApp instead.",
          classification: data.classification,
          suggestBooking: data.suggestBooking,
          followUps: data.followUps,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "Something went wrong reaching the assistant. Message us directly on WhatsApp instead — that always works.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function clearChat() {
    setMessages([]);
    setCopied(false);
  }

  async function copyConversation() {
    const transcript = messages
      .map((m) => `${m.role === "user" ? "You" : "Assistant"}: ${m.text}`)
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(transcript || "No messages yet.");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can fail (permissions, insecure context) — fail
      // quietly rather than showing an error for a non-critical action.
    }
  }

  if (!accepted) {
    return (
      <div className="rounded-[1.75rem] border border-line bg-white p-8 dark:border-white/10 dark:bg-navy-900 sm:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-900 dark:bg-white/10 dark:text-white">
          <SparkleIcon className="h-5 w-5" />
        </span>
        <h2 className="mt-5 font-serif text-2xl text-navy-950 dark:text-white">Before you start</h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-600 dark:text-white/70">
          {disclaimerText}
        </p>
        <button
          type="button"
          onClick={() => setAccepted(true)}
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-900"
        >
          I understand — start chatting
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-[36rem] flex-col overflow-hidden rounded-[1.75rem] border border-line bg-mist dark:border-white/10 dark:bg-navy-950 sm:h-[40rem]">
      <div className="flex items-center justify-between border-b border-line bg-white px-5 py-3.5 dark:border-white/10 dark:bg-navy-900">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-white dark:bg-white dark:text-navy-900">
            <SparkleIcon className="h-4 w-4" />
          </span>
          <span className="font-medium text-navy-900 dark:text-white">AI Health Assistant</span>
          <span className="hidden rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-500 dark:bg-white/10 dark:text-white/55 sm:inline-block">
            Demo mode
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={copyConversation}
            disabled={messages.length === 0}
            aria-label="Copy conversation"
            title="Copy conversation"
            className="flex h-8 w-8 items-center justify-center rounded-full text-navy-400 transition-colors hover:bg-navy-50 hover:text-navy-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {copied ? <CheckIcon className="h-4 w-4 text-red-600 dark:text-red-300" /> : <CopyIcon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={clearChat}
            disabled={messages.length === 0}
            aria-label="Clear chat"
            title="Clear chat"
            className="flex h-8 w-8 items-center justify-center rounded-full text-navy-400 transition-colors hover:bg-navy-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-red-400"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-5"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label="Conversation"
      >
        {messages.length === 0 && (
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-3.5 text-sm leading-relaxed text-navy-700 shadow-sm shadow-navy-900/[0.04] dark:bg-navy-800 dark:text-white/80">
              Hi — I can help with general guidance, hours, booking, and what to expect at a
              visit. What&rsquo;s on your mind?
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium text-navy-700 transition-colors hover:border-navy-300 hover:bg-navy-50 dark:border-white/15 dark:bg-navy-900 dark:text-white/75 dark:hover:bg-white/10"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn("flex flex-col gap-2", m.role === "user" ? "items-end" : "items-start")}
              >
                {m.classification && (
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      classificationStyles[m.classification]
                    )}
                  >
                    {classificationLabels[m.classification]}
                  </span>
                )}
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-sm bg-navy-900 text-white dark:bg-white dark:text-navy-900"
                      : "rounded-bl-sm bg-white text-navy-700 shadow-sm shadow-navy-900/[0.04] dark:bg-navy-800 dark:text-white/80"
                  )}
                >
                  {m.text}
                </div>

                {m.suggestBooking && (
                  <MultiChannelCta
                    whatsappMessage={`Hi Westridge Medical Healthcare, following up from the AI Health Assistant: ${m.text.slice(0, 80)}`}
                    variant="compact"
                  />
                )}

                {m.followUps && m.followUps.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {m.followUps.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-navy-600 transition-colors hover:border-navy-300 hover:bg-navy-50 dark:border-white/15 dark:bg-navy-900 dark:text-white/65 dark:hover:bg-white/10"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="flex items-start">
              <TypingIndicator />
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-line bg-white p-3.5 dark:border-white/10 dark:bg-navy-900"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a question..."
          aria-label="Message the AI Health Assistant"
          className="h-11 flex-1 rounded-full border border-line bg-mist px-4 text-sm text-navy-900 focus:border-navy-400 focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-white/40"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </form>

      <p className="border-t border-line bg-white px-5 py-2.5 text-center text-[0.6875rem] text-navy-400 dark:border-white/10 dark:bg-navy-900 dark:text-white/40">
        Not a substitute for medical advice. In an emergency, call {siteConfig.emergency.number}.
      </p>
    </div>
  );
}
