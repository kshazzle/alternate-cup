function baseUrl() {
  const env = process.env.NEXT_PUBLIC_APP_URL;
  if (env) return env.replace(/\/$/, "");
  const port = process.env.PORT ?? "3000";
  return `http://localhost:${port}`;
}

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl()}${normalizedPath}`;
}

export { baseUrl };
