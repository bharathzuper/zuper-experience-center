"use client";

import LaptopFrame from "./LaptopFrame";
import PhoneFrame from "./PhoneFrame";
import type { Feature } from "@/lib/features";

export default function FeatureEmbed({ feature }: { feature: Feature }) {
  if (feature.embedType === "audio" && feature.audioUrl) {
    return <PhoneFrame audioUrl={feature.audioUrl} title={feature.title} />;
  }

  return <LaptopFrame src={feature.figmaEmbedUrl} title={feature.title} />;
}
