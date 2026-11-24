import { ImageResponse } from "next/og";

export const alt = "PubMax — Le système d'acquisition des marques e-commerce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #f4f4f2 0%, #f1e7d8 55%, #f3c7a8 100%)",
          color: "#050505",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontFamily: "sans-serif", fontWeight: 700 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#050505" }} />
          Pubmax
        </div>
        <div style={{ fontSize: 68, lineHeight: 1.06, maxWidth: 960, letterSpacing: -1.5 }}>
          Votre marque mérite mieux que des publicités qui fonctionnent par hasard.
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 26, fontFamily: "sans-serif", color: "#50545B" }}>
          <span>40 147 achats enregistrés</span>
          <span>·</span>
          <span>54 M+ impressions</span>
          <span>·</span>
          <span style={{ color: "#12894A" }}>Consultation 600 DH</span>
        </div>
      </div>
    ),
    size,
  );
}
