import { headers } from "next/headers";

export async function getRequestFingerprint(prefix: string) {
  const headerStore = await headers();
  const trustedHeader = process.env.TRUSTED_CLIENT_IP_HEADER;
  const trustedValue = trustedHeader ? headerStore.get(trustedHeader)?.split(",")[0]?.trim() : undefined;
  const ip =
    trustedValue ||
    headerStore.get("x-real-ip")?.trim() ||
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "global";

  return `${prefix}:${ip}`;
}
