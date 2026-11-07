import type { ReactNode } from "react";

/**
 * Physical device frame — bezel, side buttons, screen mask.
 * The themed app content (status bar, screens, tab bar) is passed as children.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-[min(375px,88vw)]">
      {/* Hardware buttons */}
      <div className="absolute -left-[2.5px] top-28 h-10 w-[3px] rounded-l-md bg-zinc-600" />
      <div className="absolute -left-[2.5px] top-42 h-14 w-[3px] rounded-l-md bg-zinc-600" />
      <div className="absolute -right-[2.5px] top-36 h-16 w-[3px] rounded-r-md bg-zinc-600" />

      {/* Bezel */}
      <div className="rounded-[3.1rem] bg-linear-to-b from-zinc-700 via-zinc-800 to-zinc-900 p-[9px] shadow-[0_50px_140px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
        {/* Screen */}
        <div className="relative h-[min(770px,80vh)] min-h-[560px] overflow-hidden rounded-[2.55rem] bg-background">
          {children}
        </div>
      </div>
    </div>
  );
}
