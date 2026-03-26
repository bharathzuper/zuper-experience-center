"use client";

import LaptopFrame from "./LaptopFrame";
import PhoneFrame from "./PhoneFrame";
import type { Feature } from "@/lib/features";

export default function FeatureEmbed({ feature }: { feature: Feature }) {
  if (feature.embedType === "audio" && feature.audioCalls?.length) {
    return <PhoneFrame calls={feature.audioCalls} title={feature.title} />;
  }

  return <LaptopFrame src={feature.figmaEmbedUrl} title={feature.title} />;
}
