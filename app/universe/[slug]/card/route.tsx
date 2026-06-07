import { ImageResponse } from "next/og";
import { universeRepository } from "@/lib/db/repositories/universe-repository";
import { appHostname } from "@/lib/seo/app-name";

export const runtime = "nodejs";

const W = 1080;
const H = 1350;

function truncate(str: string, max: number) {
  return str.length <= max ? str : str.slice(0, max - 1) + "…";
}

function getField(content: unknown, key: string): string | null {
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

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const universe = await universeRepository.findBySlug(slug).catch(() => null);

  const title = universe?.title ?? "Unknown Universe";
  const scenario = universe?.scenario ?? "";
  const winner = universe?.winner ?? "Unresolved";
  const divergence = universe?.divergenceScore ?? 0;
  const chaos = universe?.chaosScore ?? 0;
  const content = universe?.generatedContent;
  const goldenBoot = getField(content, "goldenBoot");
  const goldenBall = getField(content, "goldenBall");
  const youngPlayer = getField(content, "youngPlayer");
  const headline = getFirstHeadline(content);

  const titleFontSize = title.length > 60 ? 62 : title.length > 40 ? 74 : title.length > 25 ? 84 : 96;

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          flexDirection: "column",
          background: "#08080a",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 800,
            height: 800,
            background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Gold top bar */}
        <div
          style={{
            width: "100%",
            height: 5,
            background: "linear-gradient(90deg, #f59e0b 0%, #facc15 50%, #f59e0b 100%)",
            flexShrink: 0,
          }}
        />

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "52px 64px 56px",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 9,
                height: 9,
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
                letterSpacing: 6,
                textTransform: "uppercase",
              }}
            >
              WHAT IF? WORLD CUP EDITION
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              marginTop: 52,
              fontSize: titleFontSize,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.0,
              letterSpacing: -3,
            }}
          >
            {truncate(title, 70)}
          </div>

          {/* Scenario */}
          <div
            style={{
              marginTop: 24,
              fontSize: 22,
              color: "#71717a",
              lineHeight: 1.5,
              fontStyle: "italic",
            }}
          >
            {truncate(scenario, 120)}
          </div>

          {/* Divider */}
          <div
            style={{
              marginTop: 44,
              width: "100%",
              height: 1,
              background: "rgba(255,255,255,0.07)",
              display: "flex",
            }}
          />

          {/* Winner block */}
          <div
            style={{
              marginTop: 36,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "28px 32px",
              background: "rgba(250,204,21,0.05)",
              border: "1px solid rgba(250,204,21,0.2)",
              borderRadius: 16,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#a16207",
                letterSpacing: 5,
                textTransform: "uppercase",
              }}
            >
              WINNER
            </span>
            <span
              style={{
                fontSize: 44,
                fontWeight: 900,
                color: "#facc15",
                letterSpacing: -1,
                lineHeight: 1,
              }}
            >
              {truncate(winner, 28)}
            </span>
          </div>

          {/* Divergence + Chaos */}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 24,
            }}
          >
            {/* Divergence */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: "20px 24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 10, color: "#52525b", letterSpacing: 3, fontWeight: 700 }}>
                  DIVERGENCE
                </span>
                <span style={{ fontSize: 30, fontWeight: 900, color: "#facc15", lineHeight: 1 }}>
                  {divergence}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 5,
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 3,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: `${divergence}%`,
                    height: 5,
                    background: "linear-gradient(90deg, #facc15, #f59e0b)",
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>

            {/* Chaos */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: "20px 24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 10, color: "#52525b", letterSpacing: 3, fontWeight: 700 }}>
                  CHAOS
                </span>
                <span style={{ fontSize: 30, fontWeight: 900, color: "#f87171", lineHeight: 1 }}>
                  {chaos}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 5,
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 3,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: `${chaos}%`,
                    height: 5,
                    background: "linear-gradient(90deg, #ef4444, #dc2626)",
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Awards row */}
          <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
            {goldenBoot ? (
              <AwardPill label="GOLDEN BOOT" value={goldenBoot} />
            ) : null}
            {goldenBall ? (
              <AwardPill label="GOLDEN BALL" value={goldenBall} />
            ) : null}
            {youngPlayer && !goldenBall ? (
              <AwardPill label="BEST YOUNG PLAYER" value={youngPlayer} />
            ) : null}
          </div>

          {/* Headline */}
          {headline ? (
            <div
              style={{
                marginTop: 28,
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                padding: "18px 20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  width: 3,
                  minHeight: 40,
                  background: "linear-gradient(180deg, #facc15, #f59e0b)",
                  borderRadius: 2,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  display: "flex",
                }}
              />
              <span style={{ fontSize: 18, color: "#a1a1aa", lineHeight: 1.6, fontStyle: "italic" }}>
                "{truncate(headline, 100)}"
              </span>
            </div>
          ) : null}

          {/* Spacer */}
          <div style={{ flex: 1, display: "flex" }} />

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 40,
                height: 2,
                background: "linear-gradient(90deg, #facc15, transparent)",
                display: "flex",
              }}
            />
            <span style={{ fontSize: 14, color: "#3f3f46", letterSpacing: 2 }}>
              {appHostname()}
            </span>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}

function AwardPill({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "14px 18px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 12,
      }}
    >
      <span style={{ fontSize: 9, color: "#52525b", letterSpacing: 3, fontWeight: 700 }}>
        {label}
      </span>
      <span style={{ fontSize: 16, color: "#e4e4e7", fontWeight: 700 }}>
        {truncate(value, 22)}
      </span>
    </div>
  );
}
