import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { features, getFeatureBySlug } from "@/lib/features";
import FeatureEmbed from "@/components/FeatureEmbed";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) return { title: "Feature Not Found" };

  return {
    title: `${feature.title} — Zuper AI Experience Center`,
    description: feature.description,
  };
}

export default async function FeaturePage({ params }: PageProps) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) notFound();

  const isLive = feature.status === "available";

  return (
    <main>
      <Navigation />

      <div
        className="mx-auto max-w-[1400px] px-6"
        style={{
          paddingTop: "calc(64px + var(--space-lg))",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <Link
          href="/#features"
          className="feature-back-link"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>All Features</span>
        </Link>

        <div className="feature-detail-header">
          <div className="feature-detail-title-row">
            <h1
              className="font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h1)",
                lineHeight: 1.1,
              }}
            >
              {feature.title}
            </h1>
            <span
              className="feature-detail-badge"
              data-status={feature.status}
            >
              <span
                className="feature-detail-badge-dot"
                data-status={feature.status}
              />
              {isLive ? "Available Now" : "Coming Soon"}
            </span>
          </div>

          <p
            className="max-w-2xl leading-relaxed"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            {feature.description}
          </p>
        </div>

        <FeatureEmbed feature={feature} />
      </div>

      <Footer />
    </main>
  );
}
