"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[16rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  href,
  icon: Icon,
  title,
  description,
  cta,
  className,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_20px_60px_rgba(6,182,212,0.25)]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-500/10 blur-[80px] transition-opacity duration-300 group-hover:opacity-100 opacity-60"
      />

      <div className="relative z-10">
        <Icon className="h-10 w-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
        <h3 className="mt-4 text-2xl font-bold text-slate-50">{title}</h3>
        <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
      </div>

      <span className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition-transform duration-300 group-hover:translate-x-1">
        {cta}
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
