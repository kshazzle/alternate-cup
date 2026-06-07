import { ImageResponse } from "next/og";
import { universeRepository } from "@/lib/db/repositories/universe-repository";
import { ogTheme } from "@/lib/seo/og-theme";

export const alt = "Alternate Cup universe";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type OgImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params;
  const universe = await universeRepository.findBySlug(slug).catch(() => null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ogTheme.background,
          color: "white",
          padding: 64,
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: ogTheme.accent }}>ALTERNATE CUP</div>
        <div>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 0.95 }}>
            {universe?.title ?? "Unknown Universe"}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: ogTheme.muted }}>
            Winner: {universe?.winner ?? "Unresolved"} · Divergence: {universe?.divergenceScore ?? 0}%
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#a1a1aa" }}>alternatecup.com</div>
      </div>
    ),
    size,
  );
}
