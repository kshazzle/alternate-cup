import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils/absolute-url";

type UniverseMetadataInput = {
  slug: string;
  title: string;
  summary: string;
};

export function createUniverseMetadata(input: UniverseMetadataInput): Metadata {
  const url = absoluteUrl(`/universe/${input.slug}`);
  const ogImage = absoluteUrl(`/universe/${input.slug}/opengraph-image`);

  return {
    title: input.title,
    description: input.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: input.title,
      description: input.summary,
      url,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.summary,
      images: [ogImage],
    },
  };
}
