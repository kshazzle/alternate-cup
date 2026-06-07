"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ShareActionsProps = {
  slug: string;
  title: string;
};

export function ShareActions({ slug, title }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>();

  async function recordShare() {
    const response = await fetch("/api/shares", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    if (!response.ok) {
      throw new Error("Share could not be recorded");
    }

    const payload = (await response.json()) as { url?: string };

    return payload.url ?? window.location.href;
  }

  async function resolveShareUrl() {
    try {
      return await recordShare();
    } catch {
      return window.location.href;
    }
  }

  async function copyToClipboard(text: string) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Fall through to legacy copy for embedded or permission-restricted browsers.
      }
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);
    }

    return copied;
  }

  async function copyLink() {
    const url = await resolveShareUrl();
    const copied = await copyToClipboard(url);

    if (!copied) {
      setError("Could not copy the link. Try your browser share menu.");
      return;
    }

    setError(undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function share() {
    try {
      const url = await resolveShareUrl();

      if (navigator.share) {
        await navigator.share({ title, url });
        setError(undefined);
        return;
      }

      const copied = await copyToClipboard(url);
      if (!copied) {
        setError("Sharing failed. Copy the URL from your address bar.");
        return;
      }

      setError(undefined);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Sharing failed. Copy the URL from your address bar.");
    }
  }

  async function tweetThis() {
    const url = await resolveShareUrl();
    const text = encodeURIComponent(`${title} — explore this alternate FIFA universe`);
    const encodedUrl = encodeURIComponent(url);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${encodedUrl}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button" onClick={share}>
        <Share2 className="size-4" />
        Share
      </Button>
      <Button type="button" variant="secondary" onClick={tweetThis}>
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Tweet
      </Button>
      <Button type="button" variant="secondary" onClick={copyLink}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Copied" : "Copy link"}
      </Button>
      {error ? <p className="basis-full text-sm text-red-200">{error}</p> : null}
    </div>
  );
}
