"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { assets } from "@/data/assets";
import { cn } from "@/lib/utils";

function embedUrl(url: string) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: "iframe" as const, src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1` };
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: "iframe" as const, src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1` };
  return { kind: "video" as const, src: url };
}

/** VSL player with a lightweight poster (the video loads only on click → fast LCP). */
export function VslVideo({ url, title, label, className }: { url: string; title: string; label: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  const ready = Boolean(url);
  const media = ready ? embedUrl(url) : null;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative aspect-video overflow-hidden rounded-[22px] bg-grad-green-deep p-1.5 shadow-[0_30px_60px_-30px_rgb(5_5_5/0.45)] ring-1 ring-black/10">
        <div className="relative h-full w-full overflow-hidden rounded-[17px] bg-night">
          {playing && media ? (
            media.kind === "iframe" ? (
              <iframe
                src={media.src}
                title={title}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            ) : (
              <video src={media.src} className="absolute inset-0 h-full w-full object-cover" controls autoPlay playsInline />
            )
          ) : (
            <>
              <Image src={assets.ahmedPortrait.src} alt="" fill preload sizes="(min-width: 1024px) 860px, 94vw" className="object-cover object-[50%_32%] opacity-55" />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(100deg,rgb(3_17_11/0.92)_0%,rgb(3_17_11/0.55)_55%,rgb(10_51_34/0.35)_100%)]" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-5 text-left sm:p-8">
                <span className="rounded-full bg-white/12 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-white uppercase ring-1 ring-white/15">
                  {ready ? label : "Vidéo · bientôt disponible"}
                </span>
                <p className="font-display mt-3 max-w-[22ch] text-[1.05rem] leading-tight text-white sm:text-[1.75rem]">{title}</p>
                <p className="mt-1.5 hidden text-[0.8125rem] text-white sm:block">avec Ahmed Amine Ssi Tayeb, fondateur de PubMax</p>
              </div>
              {ready ? (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Lire la vidéo : ${title}`}
                  className="group absolute top-4 right-4 flex size-14 sm:top-1/2 sm:right-auto sm:left-1/2 sm:size-[72px] sm:-translate-x-1/2 sm:-translate-y-1/2 items-center justify-center rounded-full bg-grad-green text-white shadow-[0_0_0_10px_rgb(255_255_255/0.12),0_18px_40px_-10px_rgb(22_163_74/0.8)] transition-transform hover:scale-105 md:size-[88px]"
                >
                  <Play className="ml-1 size-7 fill-current sm:size-8" aria-hidden />
                </button>
              ) : (
                <span
                  aria-hidden
                  className="absolute top-4 right-4 flex size-14 sm:top-1/2 sm:right-auto sm:left-1/2 sm:size-[72px] sm:-translate-x-1/2 sm:-translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur md:size-[88px]"
                >
                  <Play className="ml-1 size-7 sm:size-8" />
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
