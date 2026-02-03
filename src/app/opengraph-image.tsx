import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export const alt = "NoteGenix - Course Notes Browser";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #1a1a1a 0%, transparent 50%), radial-gradient(circle at 80% 80%, #151515 0%, transparent 50%)",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#0a0a0a",
            }}
          >
            N
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 16,
          }}
        >
          NoteGenix
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#a1a1a1",
            marginBottom: 48,
          }}
        >
          Find, preview, and share course notes by year and semester
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          {["36 Subjects", "100+ Notes", "3 Years"].map((stat) => (
            <div
              key={stat}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 24,
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#ffffff",
                fontSize: 18,
              }}
            >
              {stat}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
