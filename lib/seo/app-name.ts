import { baseUrl } from "@/lib/utils/absolute-url";

export const APP_NAME = "What If? World Cup Edition";

export function appHostname() {
  try {
    return new URL(baseUrl()).host;
  } catch {
    return "whatif-worldcup.vercel.app";
  }
}
