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
  const headline = getFirstHeadline(content);

  const titleFontSize = title.length > 55 ? 58 : title.length > 38 ? 70 : title.length > 22 ? 82 : 96;

  // Chaos-based accent: high chaos = red tint, low = pure gold
  const accentColor = chaos >= 70 ? "#ef4444" : chaos >= 45 ? "#f97316" : "#facc15";
  const accentDim = chaos >= 70 ? "#7f1d1d" : chaos >= 45 ? "#7c2d12" : "#713f12";

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          flexDirection: "column",
          background: "#070709",
          fontFamily: "Arial Black, Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Rich background gradients */}
        <div style={{ position: "absolute", inset: 0, display: "flex",
          background: "radial-gradient(ellipse 110% 60% at 50% 0%, rgba(120,80,10,0.35) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex",
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(20,10,40,0.8) 0%, transparent 70%)" }} />

        {/* Card border glow */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          boxShadow: `inset 0 0 0 3px rgba(250,204,21,0.25), inset 0 0 80px rgba(250,204,21,0.04)`,
        }} />

        {/* Gold top bar */}
        <div style={{
          width: "100%", height: 6, flexShrink: 0,
          background: `linear-gradient(90deg, transparent 0%, #f59e0b 20%, #facc15 50%, #f59e0b 80%, transparent 100%)`,
        }} />

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "48px 60px 52px" }}>

          {/* Top row: brand + rarity */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#facc15" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#facc15", letterSpacing: 6, fontFamily: "Arial, sans-serif" }}>
                WHAT IF? UNIVERSE
              </span>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "5px 14px", borderRadius: 20,
              background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.2)",
            }}>
              <span style={{ fontSize: 11, color: "#facc15", letterSpacing: 3, fontFamily: "Arial, sans-serif" }}>ALT HISTORY</span>
            </div>
          </div>

          {/* Big stat circles */}
          <div style={{ display: "flex", gap: 20, marginTop: 44 }}>
            <div style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "32px 20px",
              background: "rgba(250,204,21,0.05)",
              border: "1px solid rgba(250,204,21,0.15)",
              borderRadius: 20,
            }}>
              <span style={{ fontSize: 88, fontWeight: 900, color: "#facc15", lineHeight: 1, letterSpacing: -4 }}>
                {divergence}
              </span>
              <span style={{ fontSize: 10, color: "#713f12", letterSpacing: 4, fontWeight: 700, marginTop: 8, fontFamily: "Arial, sans-serif" }}>
                DIVERGENCE
              </span>
            </div>
            <div style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "32px 20px",
              background: chaos >= 60 ? "rgba(239,68,68,0.06)" : "rgba(249,115,22,0.05)",
              border: `1px solid ${chaos >= 60 ? "rgba(239,68,68,0.2)" : "rgba(249,115,22,0.15)"}`,
              borderRadius: 20,
            }}>
              <span style={{ fontSize: 88, fontWeight: 900, color: accentColor, lineHeight: 1, letterSpacing: -4 }}>
                {chaos}
              </span>
              <span style={{ fontSize: 10, color: accentDim, letterSpacing: 4, fontWeight: 700, marginTop: 8, fontFamily: "Arial, sans-serif" }}>
                CHAOS
              </span>
            </div>
          </div>

          {/* Winner */}
          <div style={{
            marginTop: 28, display: "flex", flexDirection: "column",
            padding: "22px 28px",
            background: "linear-gradient(135deg, rgba(250,204,21,0.12) 0%, rgba(245,158,11,0.06) 100%)",
            border: "1px solid rgba(250,204,21,0.25)",
            borderRadius: 16,
          }}>
            <span style={{ fontSize: 10, color: "#92400e", letterSpacing: 5, fontFamily: "Arial, sans-serif", fontWeight: 700 }}>
              WORLD CHAMPION
            </span>
            <span style={{ fontSize: 48, fontWeight: 900, color: "#facc15", letterSpacing: -2, lineHeight: 1.05, marginTop: 6 }}>
              {truncate(winner, 24)}
            </span>
          </div>

          {/* Title */}
          <div style={{
            marginTop: 28,
            fontSize: titleFontSize,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.0,
            letterSpacing: -2,
          }}>
            {truncate(title, 60)}
          </div>

          {/* Scenario */}
          <div style={{
            marginTop: 14,
            fontSize: 19,
            color: "#71717a",
            lineHeight: 1.45,
            fontFamily: "Arial, sans-serif",
            fontStyle: "italic",
          }}>
            {truncate(scenario, 100)}
          </div>

          {/* Awards */}
          {(goldenBoot || goldenBall) ? (
            <div style={{
              marginTop: 24,
              display: "flex",
              gap: 12,
            }}>
              {goldenBoot ? (
                <div style={{
                  flex: 1, display: "flex", flexDirection: "column", gap: 4,
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                }}>
                  <span style={{ fontSize: 9, color: "#52525b", letterSpacing: 3, fontFamily: "Arial, sans-serif", fontWeight: 700 }}>
                    GOLDEN BOOT
                  </span>
                  <span style={{ fontSize: 17, color: "#e4e4e7", fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
                    {truncate(goldenBoot, 20)}
                  </span>
                </div>
              ) : null}
              {goldenBall ? (
                <div style={{
                  flex: 1, display: "flex", flexDirection: "column", gap: 4,
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                }}>
                  <span style={{ fontSize: 9, color: "#52525b", letterSpacing: 3, fontFamily: "Arial, sans-serif", fontWeight: 700 }}>
                    GOLDEN BALL
                  </span>
                  <span style={{ fontSize: 17, color: "#e4e4e7", fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
                    {truncate(goldenBall, 20)}
                  </span>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Headline */}
          {headline ? (
            <div style={{
              marginTop: 20,
              display: "flex",
              gap: 14,
              padding: "16px 18px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 12,
            }}>
              <div style={{
                width: 3, background: `linear-gradient(180deg, ${accentColor}, transparent)`,
                borderRadius: 2, flexShrink: 0, alignSelf: "stretch", display: "flex",
              }} />
              <span style={{ fontSize: 16, color: "#a1a1aa", lineHeight: 1.55, fontStyle: "italic", fontFamily: "Arial, sans-serif" }}>
                &quot;{truncate(headline, 95)}&quot;
              </span>
            </div>
          ) : null}

          <div style={{ flex: 1, display: "flex" }} />

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, ${accentColor}, transparent)`, display: "flex" }} />
            <span style={{ fontSize: 13, color: "#3f3f46", letterSpacing: 2, fontFamily: "Arial, sans-serif" }}>
              {appHostname()}
            </span>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div style={{
          width: "100%", height: 4, flexShrink: 0,
          background: `linear-gradient(90deg, transparent 0%, ${accentColor}88 30%, ${accentColor} 50%, ${accentColor}88 70%, transparent 100%)`,
        }} />
      </div>
    ),
    { width: W, height: H },
  );
}
