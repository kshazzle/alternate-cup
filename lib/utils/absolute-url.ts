export function absoluteUrl(path = "") {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl.replace(/\/$/, "")}${normalizedPath}`;
}
