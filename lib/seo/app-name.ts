export const APP_NAME = "What If? World Cup Edition";

export function appHostname() {
  try {
    return new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").host;
  } catch {
    return "localhost:3000";
  }
}
