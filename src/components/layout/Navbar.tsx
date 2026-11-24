"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav } from "@/data/content";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "pointer-events-auto relative mx-auto flex h-[60px] max-w-[1120px] items-center justify-between gap-4 rounded-[18px] pr-2 pl-4 lg:pr-3 transition-[background-color,box-shadow,border-color] duration-300 sm:pl-5",
          scrolled
            ? "border border-line bg-white/85 shadow-[0_10px_30px_-18px_rgb(5_5_5/0.35)] backdrop-blur-xl"
            : "border border-transparent bg-white/70 backdrop-blur-md",
        )}
      >
        <Link href="/" aria-label="PubMax — accueil" className="shrink-0 rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-1">
            {nav.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-[10px] px-3 py-2 text-[0.9375rem] font-medium whitespace-nowrap text-ink-2 transition-colors hover:bg-paper hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            className="inline-flex size-11 items-center justify-center rounded-[12px] bg-ink text-white lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="size-5" aria-hidden />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-x-3 top-3 z-50 flex max-h-[calc(100dvh-24px)] flex-col overflow-y-auto rounded-[24px] bg-white p-5 shadow-[var(--shadow-float)] outline-none">
              <div className="flex items-center justify-between">
                <Logo />
                <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-[12px] bg-paper" aria-label="Fermer le menu">
                  <X className="size-5" aria-hidden />
                </Dialog.Close>
              </div>
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <Dialog.Description className="sr-only">Navigation du site PubMax</Dialog.Description>
              <nav aria-label="Navigation mobile" className="mt-6">
                <ul className="divide-y divide-line border-y border-line">
                  {nav.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-4 font-display text-[1.6rem] text-ink"
                      >
                        {l.label}
                        <ArrowRight className="size-5 text-stone" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
