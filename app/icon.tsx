import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          borderRadius: 8,
        }}
      >
        {/* Gold top-left corner accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 32,
            height: 32,
            display: "flex",
            background: "radial-gradient(ellipse 120% 80% at 20% 10%, rgba(250,204,21,0.3) 0%, transparent 60%)",
            borderRadius: 8,
          }}
        />
        {/* "?" mark */}
        <span
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#facc15",
            fontFamily: "Arial Black, Arial, sans-serif",
            lineHeight: 1,
            letterSpacing: -1,
          }}
        >
          ?
        </span>
      </div>
    ),
    { ...size },
  );
}
