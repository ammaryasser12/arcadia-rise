export type Language = 'en' | 'ar';

export interface ServiceItem {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  longDescription: { en: string; ar: string };
  icon: string;
}

export interface ValuePoint {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
}

export interface StepItem {
  id: string;
  stepNumber: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

export interface PortfolioItem {
  id: string;
  title: { en: string; ar: string };
  category: { en: string; ar: string };
  industry: { en: string; ar: string };
  image: string;
  url: string;
}

export interface TestimonialItem {
  id: string;
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  business: { en: string; ar: string };
  content: { en: string; ar: string };
  rating: number;
}

export interface PricingTier {
  id: string;
  name: { en: string; ar: string };
  price: { en: string; ar: string };
  originalPrice?: { en: string; ar: string };
  period: { en: string; ar: string };
  description: { en: string; ar: string };
  features: { en: string[]; ar: string[] };
  isRecommended: boolean;
  ctaText: { en: string; ar: string };
}
