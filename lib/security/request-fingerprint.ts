import { headers } from "next/headers";

export async function getRequestFingerprint(prefix: string) {
  const headerStore = await headers();
  const trustedHeader = process.env.TRUSTED_CLIENT_IP_HEADER;
  const trustedValue = trustedHeader ? headerStore.get(trustedHeader)?.split(",")[0]?.trim() : undefined;
  const ip = trustedValue || "global";

  return `${prefix}:${ip}`;
}
