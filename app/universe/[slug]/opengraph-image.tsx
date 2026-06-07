import { ImageResponse } from "next/og";
import { universeRepository } from "@/lib/db/repositories/universe-repository";
import { APP_NAME, appHostname } from "@/lib/seo/app-name";

export const alt = "What If? World Cup Edition universe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OgImageProps = {
  params: Promise<{ slug: string }>;
};

function truncate(str: string, max: number) {
  return str.length <= max ? str : str.slice(0, max - 1) + "…";
}

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params;
  const universe = await universeRepository.findBySlug(slug).catch(() => null);

  const title = universe?.title ?? "Unknown Universe";
  const scenario = universe?.scenario ?? "";
  const winner = universe?.winner ?? "Unresolved";
  const divergence = universe?.divergenceScore ?? 0;
  const chaos = universe?.chaosScore ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #09090b 0%, #1c0f00 55%, #09090b 100%)",
          padding: "52px 64px 48px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              color: "#facc15",
              fontSize: 15,
              letterSpacing: 7,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {APP_NAME}
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(250,204,21,0.08)",
                border: "1px solid rgba(250,204,21,0.2)",
                borderRadius: 8,
                padding: "6px 14px",
                color: "#facc15",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              DIVERGENCE {divergence}%
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 8,
                padding: "6px 14px",
                color: "#f87171",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              CHAOS {chaos}%
            </div>
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: title.length > 50 ? 58 : title.length > 35 ? 66 : 76,
              fontWeight: 900,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {truncate(title, 80)}
          </div>
          {scenario ? (
            <div
              style={{
                fontSize: 22,
                color: "#a1a1aa",
                lineHeight: 1.55,
                maxWidth: 880,
              }}
            >
              {truncate(scenario, 120)}
            </div>
          ) : null}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 22,
            marginTop: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                background: "rgba(250,204,21,0.12)",
                borderRadius: "50%",
                fontSize: 22,
              }}
            >
              🏆
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ color: "#71717a", fontSize: 11, letterSpacing: 3, fontWeight: 600 }}>
                WINNER
              </span>
              <span style={{ color: "white", fontSize: 22, fontWeight: 700 }}>
                {truncate(winner, 30)}
              </span>
            </div>
          </div>
          <span style={{ color: "#3f3f46", fontSize: 16, letterSpacing: 1 }}>
            {appHostname()}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
