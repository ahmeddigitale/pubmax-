import { Fragment } from "react";

const phrases = [
  "comprendre et optimiser", "gestion publicitaire", "Des décisions.",
  "Ahmed Amine Ssi Tayeb", "Des idées à appliquer", "regard stratégique",
  "appuyées sur les données", "l'acquisition e-commerce", "le premier pas",
  "système d'acquisition", "le problème", "Stratégie créative",
];

/** Keeps hyphenated words ("Donnez-lui", "e-commerce") on one line instead of splitting at the hyphen. */
export function KeepHyphenated({ text }: { text: string }) {
  const parts = text.split(/(\S+-\S+)/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Phrases highlighted in yellow with a hand-drawn circle around them. */
const circled = ["assez de ventes ?"];

function Circled({ text }: { text: string }) {
  return (
    <span className="relative mx-[0.05em] mt-[0.15em] inline-block whitespace-nowrap px-[0.75em] py-[0.22em]">
      <span className="relative">{text}</span>
      <svg
        aria-hidden
        viewBox="0 0 300 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-[-6%] left-0 h-[112%] w-full overflow-visible"
      >
        <path
          d="M 150 5 C 248 3, 296 22, 295 50 C 294 80, 232 96, 150 95 C 68 94, 5 80, 5 50 C 5 20, 62 6, 138 9"
          fill="none"
          stroke="#fcd34d"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/** Groups that must stay on a single line (from the sm breakpoint up). */
const keepTogether = ["Des données. Des décisions."];

export function TitleAccent({ text, dark = false, grouped = false }: { text: string; dark?: boolean; grouped?: boolean }) {
  const group = grouped ? undefined : keepTogether.find((value) => text.includes(value));
  if (group) {
    const at = text.indexOf(group);
    return (
      <>
        <TitleAccent text={text.slice(0, at)} dark={dark} />
        <span className="sm:block sm:whitespace-nowrap">
          <TitleAccent text={group} dark={dark} grouped />
        </span>
        <TitleAccent text={text.slice(at + group.length)} dark={dark} />
      </>
    );
  }
  const ring = circled.find((value) => text.includes(value));
  if (ring) {
    const at = text.indexOf(ring);
    return (
      <>
        <KeepHyphenated text={text.slice(0, at)} />
        <Circled text={ring} />
        <KeepHyphenated text={text.slice(at + ring.length)} />
      </>
    );
  }
  const phrase = phrases.find((value) => text.includes(value));
  if (!phrase) return <KeepHyphenated text={text} />;
  const start = text.indexOf(phrase);
  return (
    <>
      <KeepHyphenated text={text.slice(0, start)} />
      <span className={dark ? "title-accent title-accent-dark" : "title-accent"}>
        <KeepHyphenated text={phrase} />
      </span>
      <KeepHyphenated text={text.slice(start + phrase.length)} />
    </>
  );
}
