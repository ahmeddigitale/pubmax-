import { cn } from "@/lib/utils";

/** Small, honest UI fragments illustrating each stage of the PubMax system (no metrics claimed). */

export function PositionMock() {
  const dots = [
    { x: 22, y: 64, l: "Concurrent" },
    { x: 38, y: 72, l: "Concurrent" },
    { x: 30, y: 52, l: "Concurrent" },
    { x: 46, y: 60, l: "" },
  ];
  return (
    <div className="relative aspect-[4/3] w-full rounded-[16px] bg-paper p-4">
      <div className="grid-dots absolute inset-4 rounded-[12px] opacity-60" />
      <div className="absolute top-1/2 right-4 left-4 h-px bg-ink/15" />
      <div className="absolute top-4 bottom-4 left-1/2 w-px bg-ink/15" />
      <span className="absolute top-5 left-1/2 ml-2 text-[0.625rem] font-semibold tracking-wide text-muted uppercase">Différenciation +</span>
      <span className="absolute right-5 bottom-[calc(50%+6px)] text-[0.625rem] font-semibold tracking-wide text-muted uppercase">Valeur perçue +</span>
      {dots.map((d, i) => (
        <span key={i} className="absolute size-3 rounded-full bg-stone/70" style={{ left: `${d.x}%`, top: `${d.y}%` }} />
      ))}
      <span className="absolute flex items-center gap-2" style={{ left: "68%", top: "22%" }}>
        <span className="relative flex size-4">
          <span className="absolute inset-0 animate-ping rounded-full bg-green/40 motion-reduce:animate-none" />
          <span className="relative size-4 rounded-full bg-green ring-4 ring-green/15" />
        </span>
        <span className="rounded-full bg-ink px-2.5 py-1 text-[0.6875rem] font-semibold text-white">Votre marque</span>
      </span>
    </div>
  );
}

export function MessagingMock() {
  const rows = [
    { k: "Promesse", v: "Le résultat que votre client veut vraiment", w: "w-full" },
    { k: "Preuve", v: "Ce qui rend la promesse crédible", w: "w-[88%]" },
    { k: "Objection", v: "« C'est trop cher pour moi »  →  réponse", w: "w-[76%]" },
    { k: "Appel", v: "Une action claire, un seul message", w: "w-[64%]" },
  ];
  return (
    <div className="flex aspect-[4/3] w-full flex-col justify-center gap-2.5 rounded-[16px] bg-paper p-4">
      {rows.map((r, i) => (
        <div key={r.k} className={cn("surface flex items-center gap-3 rounded-[12px] px-3.5 py-3", r.w)}>
          <span className={cn("size-2 shrink-0 rounded-full", i === 0 ? "bg-green" : "bg-stone")} />
          <span className="w-[4.6rem] shrink-0 text-[0.6875rem] font-semibold tracking-wide text-muted uppercase">{r.k}</span>
          <span className="truncate text-[0.8125rem] font-medium text-ink">{r.v}</span>
        </div>
      ))}
    </div>
  );
}

export function CreativeMock() {
  const hooks = [
    { h: "Hook A", a: "Angle problème", t: "« Vous perdez des ventes ici… »" },
    { h: "Hook B", a: "Angle preuve", t: "« 3 raisons pour lesquelles… »" },
    { h: "Hook C", a: "Angle désir", t: "« Imaginez votre routine si… »" },
  ];
  return (
    <div className="grid aspect-[4/3] w-full grid-cols-3 gap-2.5 rounded-[16px] bg-paper p-4">
      {hooks.map((h, i) => (
        <div key={h.h} className={cn("surface flex flex-col rounded-[12px] p-2.5", i === 1 && "-translate-y-2 ring-2 ring-green/30")}>
          <div className="relative aspect-[9/12] rounded-[8px] bg-[linear-gradient(160deg,#ece7df,#dfc9aa)]">
            <span className="absolute top-2 left-2 rounded-full bg-white/85 px-2 py-0.5 text-[0.5625rem] font-bold">{h.h}</span>
            <span className="absolute inset-x-2 bottom-2 rounded-[6px] bg-ink/80 px-1.5 py-1 text-[0.5625rem] leading-tight font-medium text-white">
              {h.t}
            </span>
          </div>
          <span className="mt-2 text-[0.625rem] font-semibold text-muted">{h.a}</span>
        </div>
      ))}
    </div>
  );
}

export function AdsMock() {
  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-[16px] bg-paper p-4">
      <span className="rounded-[10px] bg-ink px-4 py-2 text-[0.75rem] font-semibold text-white">Campagne · Ventes</span>
      <svg viewBox="0 0 240 28" className="h-7 w-[70%]" aria-hidden>
        <path d="M120,0 V10 M30,28 V18 H210 V28 M120,10 V18" fill="none" stroke="#050505" strokeOpacity="0.25" strokeWidth="1.5" />
      </svg>
      <div className="grid w-full grid-cols-3 gap-2.5">
        {["Angle problème", "Angle preuve", "Angle désir"].map((a, i) => (
          <div key={a} className="surface rounded-[12px] p-2.5 text-center">
            <p className="text-[0.625rem] font-semibold text-muted uppercase">Ensemble {i + 1}</p>
            <p className="mt-1 text-[0.75rem] font-semibold text-ink">{a}</p>
            <div className="mt-2 flex justify-center gap-1">
              {[0, 1, 2].map((k) => (
                <span key={k} className={cn("h-5 w-3.5 rounded-[3px]", k === i ? "bg-green" : "bg-[#e3e3e0]")} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[0.6875rem] text-muted">Une hypothèse par ensemble → une lecture claire des données</p>
    </div>
  );
}

export function ScaleMock() {
  const rows = [
    { l: "Angle preuve", from: 34, to: 58, up: true },
    { l: "Angle problème", from: 33, to: 30, up: false },
    { l: "Angle désir", from: 33, to: 12, up: false },
  ];
  return (
    <div className="flex aspect-[4/3] w-full flex-col justify-center gap-4 rounded-[16px] bg-paper p-5">
      <p className="text-[0.6875rem] font-semibold tracking-wide text-muted uppercase">Réallocation du budget · exemple</p>
      {rows.map((r) => (
        <div key={r.l}>
          <div className="flex justify-between text-[0.75rem] font-semibold">
            <span>{r.l}</span>
            <span className={r.up ? "text-green" : "text-muted"}>{r.up ? "↑ renforcé" : "↓ réduit"}</span>
          </div>
          <div className="relative mt-1.5 h-2.5 rounded-full bg-[#e3e3e0]">
            <span className="absolute inset-y-0 left-0 rounded-full bg-ink/15" style={{ width: `${r.from}%` }} />
            <span className={cn("absolute inset-y-0 left-0 rounded-full", r.up ? "bg-green" : "bg-stone")} style={{ width: `${r.to}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
