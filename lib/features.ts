export type FeatureIcon = "phone" | "sparkles" | "zap";

export interface Feature {
  id: string;
  title: string;
  description: string;
  status: "available" | "coming-soon";
  icon: FeatureIcon;
  embedType: "figma" | "audio";
  figmaEmbedUrl: string;
  audioUrl?: string;
}

export const features: Feature[] = [
  {
    id: "ai-call-responder",
    title: "AI Call Responder",
    description:
      "Intelligent AI-powered call handling that answers, routes, and resolves customer inquiries in real time — so your team never misses a beat.",
    status: "available",
    icon: "phone",
    embedType: "audio",
    figmaEmbedUrl: "",
    audioUrl:
      "https://s3.ap-south-1.amazonaws.com/staging.in.pro.zuper/attachments/d72d9c81-ce36-4c62-8242-e5a67cfef34f/120e2274-d56d-405c-8132-bafeecfc5049.mp3",
  },
  {
    id: "zuper-sense",
    title: "Zuper Sense",
    description:
      "Contextual intelligence that surfaces the right information at the right moment, helping field teams make smarter decisions on every job.",
    status: "coming-soon",
    icon: "sparkles",
    embedType: "figma",
    figmaEmbedUrl: "https://early-glass-81375391.figma.site/",
  },
  {
    id: "zuper-power-dialer",
    title: "Power Dialer",
    description:
      "High-velocity outbound calling with AI-assisted scripts and automatic logging — connect with more customers in less time.",
    status: "coming-soon",
    icon: "zap",
    embedType: "figma",
    figmaEmbedUrl: "https://chess-play-07545902.figma.site/",
  },
];

export function getFeatureBySlug(slug: string): Feature | undefined {
  return features.find((f) => f.id === slug);
}
