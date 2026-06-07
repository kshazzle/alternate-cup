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

function getContentField(content: unknown, key: string): string | null {
  if (!content || typeof content !== "object") return null;
  const val = (content as Record<string, unknown>)[key];
  return typeof val === "string" ? val : null;
}

function getFirstHeadline(content: unknown): string | null {
  if (!content || typeof content !== "object") return null;
  const h = (content as Record<string, unknown>).headlines;
  if (Array.isArray(h) && typeof h[0] === "string") return h[0];
  return null;
}

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params;
  const universe = await universeRepository.findBySlug(slug).catch(() => null);

  const title = universe?.title ?? "Unknown Universe";
  const scenario = universe?.scenario ?? "";
  const winner = universe?.winner ?? "Unresolved";
  const divergence = universe?.divergenceScore ?? 0;
  const chaos = universe?.chaosScore ?? 0;
  const content = universe?.generatedContent;
  const goldenBoot = getContentField(content, "goldenBoot");
  const goldenBall = getContentField(content, "goldenBall");
  const fairPlay = getContentField(content, "fairPlay");
  const headline = getFirstHeadline(content);

  const titleSize = title.length > 55 ? 52 : title.length > 38 ? 62 : title.length > 25 ? 70 : 78;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#09090b",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* Warm amber glow behind the right panel */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 520,
            height: "100%",
            background:
              "radial-gradient(ellipse 80% 70% at 80% 40%, rgba(120,53,15,0.45) 0%, transparent 70%)",
          }}
        />

        {/* Amber top border */}
        <div
          style={{
            width: "100%",
            height: 4,
            background: "linear-gradient(90deg, #facc15 0%, #f59e0b 50%, #facc15 100%)",
            flexShrink: 0,
          }}
        />

        {/* Body */}
        <div
          style={{
            flex: 1,
            display: "flex",
            padding: "40px 64px 36px",
            gap: 0,
          }}
        >
          {/* ── LEFT COLUMN ── */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingRight: 52,
            }}
          >
            {/* Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#facc15",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#facc15",
                  letterSpacing: 5,
                  textTransform: "uppercase",
                }}
              >
                {APP_NAME}
              </span>
            </div>

            {/* Title + scenario */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div
                style={{
                  fontSize: titleSize,
                  fontWeight: 900,
                  color: "white",
                  lineHeight: 1.05,
                  letterSpacing: -2,
                }}
              >
                {truncate(title, 65)}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: "#71717a",
                  lineHeight: 1.55,
                  maxWidth: 640,
                }}
              >
                {truncate(scenario, 110)}
              </div>
            </div>

            {/* Headline quote */}
            {headline ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "12px 16px",
                  background: "rgba(250,204,21,0.06)",
                  border: "1px solid rgba(250,204,21,0.15)",
                  borderRadius: 10,
                  maxWidth: 640,
                }}
              >
                <div
                  style={{
                    width: 3,
                    height: "100%",
                    minHeight: 36,
                    background: "#facc15",
                    borderRadius: 2,
                    flexShrink: 0,
                    alignSelf: "stretch",
                  }}
                />
                <span style={{ color: "#a1a1aa", fontSize: 15, lineHeight: 1.5, fontStyle: "italic" }}>
                  {truncate(headline, 90)}
                </span>
              </div>
            ) : null}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div
            style={{
              width: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              paddingLeft: 48,
            }}
          >
            {/* Score meters */}
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {/* Divergence */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ color: "#52525b", fontSize: 10, letterSpacing: 3, fontWeight: 700 }}>
                    DIVERGENCE
                  </span>
                  <span style={{ color: "#facc15", fontSize: 34, fontWeight: 900, lineHeight: 1 }}>
                    {divergence}%
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 6,
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: 3,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: `${divergence}%`,
                      height: 6,
                      background: "linear-gradient(90deg, #facc15, #f59e0b)",
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>

              {/* Chaos */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ color: "#52525b", fontSize: 10, letterSpacing: 3, fontWeight: 700 }}>
                    CHAOS
                  </span>
                  <span style={{ color: "#f87171", fontSize: 34, fontWeight: 900, lineHeight: 1 }}>
                    {chaos}%
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 6,
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: 3,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: `${chaos}%`,
                      height: 6,
                      background: "linear-gradient(90deg, #ef4444, #dc2626)",
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Award pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <StatPill dotColor="#facc15" label="WINNER" value={winner} valueColor="#facc15" />
              {goldenBoot ? (
                <StatPill dotColor="#a1a1aa" label="GOLDEN BOOT" value={goldenBoot} valueColor="#e4e4e7" />
              ) : null}
              {goldenBall ? (
                <StatPill dotColor="#a1a1aa" label="GOLDEN BALL" value={goldenBall} valueColor="#e4e4e7" />
              ) : null}
              {fairPlay && !goldenBall ? (
                <StatPill dotColor="#a1a1aa" label="FAIR PLAY" value={fairPlay} valueColor="#e4e4e7" />
              ) : null}
            </div>

            {/* Hostname */}
            <span style={{ color: "#3f3f46", fontSize: 13, letterSpacing: 1 }}>
              {appHostname()}
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

function StatPill({
  dotColor,
  label,
  value,
  valueColor,
}: {
  dotColor: string;
  label: string;
  value: string;
  valueColor: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 8,
        padding: "9px 14px",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: dotColor,
          flexShrink: 0,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ color: "#52525b", fontSize: 9, letterSpacing: 2, fontWeight: 700 }}>
          {label}
        </span>
        <span style={{ color: valueColor, fontSize: 14, fontWeight: 700 }}>
          {truncate(value, 24)}
        </span>
      </div>
    </div>
  );
}
