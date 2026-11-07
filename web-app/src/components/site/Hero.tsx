import { motion } from "framer-motion";
import { ChevronDown, FolderGit2, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { PhoneFrame } from "@/components/phone/PhoneFrame";
import { PhoneApp } from "@/components/phone/PhoneApp";
import { profile } from "@/data/profile";
import { config } from "@/data/config";
import { techMarquee } from "@/data/skills";
import { isSafeExternalUrl } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
};

function openSocial(url: string) {
  const real =
    isSafeExternalUrl(url) &&
    !url.includes("yourusername") &&
    !url.includes("example.com");
  if (real) window.open(url, "_blank", "noopener,noreferrer");
  else window.alert("Placeholder link — set your real profile URL in src/data/config.ts");
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black_30%,transparent_75%)]" />
      <div className="absolute -top-44 left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <div className="absolute right-[-140px] top-1/3 h-[400px] w-[400px] rounded-full bg-secondary/15 blur-[130px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28 lg:pt-40">
        {/* Copy */}
        <div>
          <motion.div {...fadeUp} transition={{ duration: 0.55 }}>
            {config.availableForWork && (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-[12px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
                Open to opportunities
              </span>
            )}
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 font-mono text-[13px] text-primary"
          >
            ~/portfolio $ whoami
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-3 font-display text-[42px] font-bold leading-[1.06] tracking-tight sm:text-6xl"
          >
            I build software that scales —{" "}
            <span className="text-gradient">from database to pixel.</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-muted"
          >
            {profile.intro} Experienced across modern frontends, backend
            architecture, REST & GraphQL APIs, relational databases, and
            containerized deployments — now crafting cross-platform mobile apps
            with React Native.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {profile.roles.map((role) => (
              <span
                key={role}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-[11.5px] font-medium text-muted"
              >
                {role}
              </span>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-[14px] font-semibold text-white shadow-[0_12px_32px_-10px_var(--primary)] transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <FolderGit2 size={16} /> View My Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-[14px] font-semibold transition-colors hover:border-primary/50"
            >
              <Mail size={16} /> Contact Me
            </a>
            <div className="ml-1 flex items-center gap-1">
              <button
                aria-label="GitHub profile"
                onClick={() => openSocial(config.socials.github)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-foreground"
              >
                <GithubIcon size={18} />
              </button>
              <button
                aria-label="LinkedIn profile"
                onClick={() => openSocial(config.socials.linkedin)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-foreground"
              >
                <LinkedinIcon size={18} />
              </button>
            </div>
          </motion.div>

          {/* Countable facts — no invented numbers */}
          <motion.dl
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.46 }}
            className="mt-10 grid max-w-lg grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4"
          >
            {[
              { value: "03", label: "Featured projects" },
              { value: "40+", label: "Technologies" },
              { value: "06", label: "Skill domains" },
              { value: "'25", label: "Zigron internship" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-mono text-xl font-semibold text-foreground">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-[11px] leading-tight text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Live phone demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.21, 0.65, 0.16, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 m-auto h-[62%] w-[62%] rounded-full bg-primary/25 blur-[110px]" />

          <div className="absolute -left-10 top-20 z-10 hidden animate-float rounded-xl border border-line bg-surface/90 px-3.5 py-2 font-mono text-[11px] text-muted shadow-xl backdrop-blur md:block">
            React Native + Expo
          </div>
          <div className="absolute -right-8 bottom-32 z-10 hidden animate-float rounded-xl border border-line bg-surface/90 px-3.5 py-2 font-mono text-[11px] text-muted shadow-xl backdrop-blur [animation-delay:1.4s] md:block">
            NativeWind · Tailwind CSS
          </div>

          <div className="relative">
            <PhoneFrame>
              <PhoneApp />
            </PhoneFrame>
            <p className="mt-5 text-center font-mono text-[11px] tracking-wide text-muted/80">
              ↑ Fully interactive — tap through the app
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-foreground lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">scroll</span>
        <ChevronDown size={15} className="animate-bounce" />
      </motion.a>
    </section>
  );
}

export { techMarquee };
