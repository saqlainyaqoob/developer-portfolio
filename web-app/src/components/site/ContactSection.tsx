import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Check,
  CheckCircle2,
  Copy,
  Mail,
  RotateCcw,
  Send,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Reveal, SectionHeading } from "./Section";
import { config } from "@/data/config";
import { buildMailto, isSafeExternalUrl } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z
    .string()
    .min(3, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-elevated px-4 py-3 text-[14px] outline-none transition-colors placeholder:text-muted/50 focus:border-primary ${
    hasError ? "border-red-400/70" : "border-line"
  }`;

export function ContactSection() {
  const [sent, setSent] = useState<FormValues | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const copy = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setNote(successMessage);
      window.setTimeout(() => setNote(null), 2400);
    } catch {
      setNote("Copy is not available in this browser");
    }
  };

  const openSocial = (url: string) => {
    const real =
      isSafeExternalUrl(url) &&
      !url.includes("yourusername") &&
      !url.includes("example.com");
    if (real) window.open(url, "_blank", "noopener,noreferrer");
    else
      setNote("Placeholder link — set your real URL in src/data/config.ts");
  };

  const onSubmit = (values: FormValues) => setSent(values);

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line bg-surface/30 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title="Let's build something together"
          description="Open to full-time roles, freelance projects, and interesting collaborations. Every message reaches me directly — no middlemen."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Left — direct channels */}
          <div className="space-y-4">
            <Reveal>
              <button
                onClick={() => copy(config.email, "Email address copied")}
                className="group flex w-full items-center gap-4 rounded-2xl border border-line bg-background p-5 text-left card-ring transition-colors hover:border-primary/40"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft text-primary">
                  <Mail size={19} strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                    Email — tap to copy
                  </p>
                  <p className="mt-1 truncate text-[15px] font-semibold">
                    {config.email}
                  </p>
                </div>
                <Copy
                  size={16}
                  className="shrink-0 text-muted transition-colors group-hover:text-primary"
                />
              </button>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => openSocial(config.socials.github)}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-background p-4 card-ring transition-colors hover:border-primary/40"
                >
                  <GithubIcon size={18} className="shrink-0 text-muted" />
                  <div className="text-left">
                    <p className="text-[13.5px] font-semibold">GitHub</p>
                    <p className="text-[11px] text-muted">Code & projects</p>
                  </div>
                </button>
                <button
                  onClick={() => openSocial(config.socials.linkedin)}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-background p-4 card-ring transition-colors hover:border-primary/40"
                >
                  <LinkedinIcon size={18} className="shrink-0 text-muted" />
                  <div className="text-left">
                    <p className="text-[13.5px] font-semibold">LinkedIn</p>
                    <p className="text-[11px] text-muted">Professional profile</p>
                  </div>
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-dashed border-line p-5">
                <p className="text-[12.5px] leading-relaxed text-muted">
                  <span className="font-semibold text-foreground">
                    A note on honesty:{" "}
                  </span>
                  this portfolio has no fake backend. The contact form validates
                  your message locally and hands it to your own email app,
                  pre-filled — nothing is transmitted or stored without your
                  explicit action.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-line bg-background p-6 card-ring sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <CheckCircle2 size={44} className="text-emerald-400" />
                  <div>
                    <p className="font-display text-xl font-bold">
                      Message ready to send
                    </p>
                    <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-muted">
                      No backend is configured, so nothing was sent
                      automatically. Open your email app with the pre-filled
                      message below, or copy it first.
                    </p>
                  </div>
                  <div className="mt-2 flex w-full max-w-sm flex-col gap-2.5">
                    <a
                      href={buildMailto(sent.name, sent.email, sent.message)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-[14px] font-semibold text-white transition-all hover:brightness-110"
                    >
                      <Send size={15} /> Open email app
                    </a>
                    <div className="flex gap-2.5">
                      <button
                        onClick={() =>
                          copy(
                            `From: ${sent.name} <${sent.email}>\n\n${sent.message}`,
                            "Message copied to clipboard",
                          )
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-[13px] font-semibold text-muted transition-colors hover:text-foreground"
                      >
                        <Check size={14} /> Copy message
                      </button>
                      <button
                        onClick={() => {
                          setSent(null);
                          reset();
                        }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-[13px] font-semibold text-muted transition-colors hover:text-foreground"
                      >
                        <RotateCcw size={14} /> Write another
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="ct-name"
                        className="mb-1.5 block text-[12px] font-semibold text-muted"
                      >
                        Name
                      </label>
                      <input
                        id="ct-name"
                        type="text"
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                        className={inputClass(!!errors.name)}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-[11.5px] text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="ct-email"
                        className="mb-1.5 block text-[12px] font-semibold text-muted"
                      >
                        Email
                      </label>
                      <input
                        id="ct-email"
                        type="email"
                        placeholder="you@company.com"
                        aria-invalid={!!errors.email}
                        className={inputClass(!!errors.email)}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-[11.5px] text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="ct-message"
                      className="mb-1.5 block text-[12px] font-semibold text-muted"
                    >
                      Message
                    </label>
                    <textarea
                      id="ct-message"
                      rows={6}
                      placeholder="Tell me about your project, role, or idea…"
                      aria-invalid={!!errors.message}
                      className={`${inputClass(!!errors.message)} resize-none`}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-[11.5px] text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_32px_-10px_var(--primary)] transition-all hover:brightness-110 active:scale-[0.99] sm:w-auto"
                  >
                    <Send size={15} /> Prepare Message
                  </button>
                </form>
              )}
              {note && (
                <p className="mt-4 rounded-lg border border-line bg-elevated px-3.5 py-2 text-center text-[12px] text-muted">
                  {note}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
