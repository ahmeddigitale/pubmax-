import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="contenu" className="container-page flex min-h-[80vh] flex-col items-center justify-center pt-32 pb-24 text-center">
        <p className="eyebrow text-muted">Erreur 404</p>
        <h1 className="font-display type-h2 mt-4">Cette page n&apos;existe pas.</h1>
        <Link href="/" className="mt-8 inline-flex h-12 items-center rounded-[12px] bg-ink px-6 font-semibold text-white">
          Retour à l&apos;accueil
        </Link>
      </main>
    </>
  );
}
