export type FeatureIcon = "phone" | "sparkles" | "zap";

export interface AudioCall {
  label: string;
  caller: string;
  time: string;
  url: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  status: "available" | "coming-soon";
  icon: FeatureIcon;
  embedType: "figma" | "audio";
  figmaEmbedUrl: string;
  audioCalls?: AudioCall[];
}

export const features: Feature[] = [
  {
    id: "ai-call-responder",
    title: "CSR Agent",
    description:
      "Intelligent AI-powered call handling that answers, routes, and resolves customer inquiries in real time — so your team never misses a beat.",
    status: "available",
    icon: "phone",
    embedType: "audio",
    figmaEmbedUrl: "",
    audioCalls: [
      { label: "Service Inquiry", caller: "Sarah Mitchell", time: "Today, 2:14 PM", url: "/audio/call-1.mp3" },
      { label: "Appointment Booking", caller: "James Rivera", time: "Today, 11:30 AM", url: "/audio/call-2.mp3" },
      { label: "Follow-up Call", caller: "Emily Carter", time: "Yesterday, 4:45 PM", url: "/audio/call-3.mp3" },
    ],
  },
  {
    id: "zuper-sense",
    title: "Zuper Sense",
    description:
      "Contextual intelligence that surfaces the right information at the right moment, helping field teams make smarter decisions on every job.",
    status: "coming-soon",
    icon: "sparkles",
    embedType: "figma",
    figmaEmbedUrl: "https://astonishing-cocada-542e19.netlify.app",
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
