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
import { PButton, PCard, PHeader, PPage, PSection, PToast } from "../ui";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
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

function openSocial(url: string, note: (message: string) => void) {
  const real =
    isSafeExternalUrl(url) &&
    !url.includes("yourusername") &&
    !url.includes("example.com");
  if (real) window.open(url, "_blank", "noopener,noreferrer");
  else note("Placeholder link — set your real URL in src/data/config.ts");
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-elevated px-3.5 py-2.5 text-[12.5px] outline-none transition-colors placeholder:text-muted/50 focus:border-primary ${
    hasError ? "border-red-400/70" : "border-line"
  }`;

export function ContactScreen() {
  const [note, setNote] = useState<string | null>(null);
  const [sent, setSent] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const showToast = (message: string) => {
    setNote(message);
    window.setTimeout(() => setNote(null), 2600);
  };

  const copy = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMessage);
    } catch {
      showToast("Copy is not available in this browser");
    }
  };

  const onSubmit = (values: FormValues) => setSent(values);

  return (
    <PPage>
      <PHeader title="Contact" subtitle="Let's build something together" />
      <div className="space-y-6 px-5 py-5">
        <p className="text-[12.5px] leading-relaxed text-muted">
          I'm open to full-time roles, freelance projects, and interesting
          collaborations. The fastest way to reach me is email — or use the
          form below.
        </p>

        {/* Email card */}
        <PSection label="Direct Email">
          <PCard>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-soft text-primary">
                <Mail size={17} strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                  Email
                </p>
                <p className="truncate text-[13px] font-semibold">
                  {config.email}
                </p>
              </div>
              <button
                aria-label="Copy email address"
                onClick={() => copy(config.email, "Email address copied")}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:text-foreground"
              >
                <Copy size={13} />
              </button>
            </div>
          </PCard>
        </PSection>

        {/* Socials */}
        <PSection label="Profiles">
          <div className="flex gap-2.5">
            <button
              onClick={() => openSocial(config.socials.github, showToast)}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-surface text-[12px] font-semibold text-muted transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <GithubIcon size={15} /> GitHub
            </button>
            <button
              onClick={() => openSocial(config.socials.linkedin, showToast)}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-surface text-[12px] font-semibold text-muted transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <LinkedinIcon size={15} /> LinkedIn
            </button>
          </div>
        </PSection>

        {/* Form / success state */}
        <PSection label="Message">
          {sent ? (
            <PCard className="border-emerald-400/30">
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <CheckCircle2 size={34} className="text-emerald-400" />
                <div>
                  <p className="text-[14px] font-semibold">
                    Message ready to send
                  </p>
                  <p className="mx-auto mt-1.5 max-w-[250px] text-[11.5px] leading-relaxed text-muted">
                    No backend is configured, so nothing was sent automatically.
                    Send it yourself with your email app — everything is
                    pre-filled.
                  </p>
                </div>
                <div className="mt-1 flex w-full flex-col gap-2">
                  <a
                    href={buildMailto(sent.name, sent.email, sent.message)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:brightness-110"
                  >
                    <Send size={14} /> Open email app
                  </a>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        copy(
                          `From: ${sent.name} <${sent.email}>\n\n${sent.message}`,
                          "Message copied to clipboard",
                        )
                      }
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-line px-3 py-2 text-[11.5px] font-semibold text-muted transition-colors hover:text-foreground"
                    >
                      <Check size={13} />
                      Copy message
                    </button>
                    <button
                      onClick={() => {
                        setSent(null);
                        reset();
                      }}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-line px-3 py-2 text-[11.5px] font-semibold text-muted transition-colors hover:text-foreground"
                    >
                      <RotateCcw size={13} /> Write another
                    </button>
                  </div>
                </div>
              </div>
            </PCard>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <PCard className="space-y-3.5">
                <div>
                  <label
                    htmlFor="pf-name"
                    className="mb-1.5 block text-[11px] font-semibold text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="pf-name"
                    type="text"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    className={inputClass(!!errors.name)}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-[10.5px] text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="pf-email"
                    className="mb-1.5 block text-[11px] font-semibold text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="pf-email"
                    type="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    className={inputClass(!!errors.email)}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[10.5px] text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="pf-message"
                    className="mb-1.5 block text-[11px] font-semibold text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="pf-message"
                    rows={4}
                    placeholder="Tell me about your project or role…"
                    aria-invalid={!!errors.message}
                    className={`${inputClass(!!errors.message)} resize-none`}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[10.5px] text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <PButton
                  type="submit"
                  className="w-full"
                  icon={<Send size={14} />}
                  ariaLabel="Prepare contact message"
                >
                  Prepare Message
                </PButton>

                <p className="text-center text-[10px] leading-relaxed text-muted/70">
                  Your message will be securely submitted to my portfolio backend.
                </p>
              </PCard>
            </form>
          )}
        </PSection>
      </div>

      <PToast show={!!note}>{note}</PToast>
    </PPage>
  );
}
