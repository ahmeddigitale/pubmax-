import Link from "next/link";
import { footer } from "@/data/content";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[var(--radius-2xl)] bg-night text-white">
        <div className="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
          <div className="max-w-sm">
            <Logo tone="light" className="gap-3 text-[2.25rem] sm:text-[2.6rem] [&>svg]:size-11 sm:[&>svg]:size-12" />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-white">{footer.statement}</p>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] text-white underline-offset-4 hover:text-white hover:underline"
            >
              {site.instagramHandle}
            </a>
          </div>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-white/85">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {"external" in l && l.external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[0.9375rem] text-white hover:text-white">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-[0.9375rem] text-white hover:text-white">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="container-page flex flex-col gap-3 border-t border-white/10 py-6 text-[0.8125rem] text-white/85 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.legal}</p>
          <p>Résultats présentés à titre historique — aucune garantie de performance future.</p>
        </div>
      </div>
    </footer>
  );
}
