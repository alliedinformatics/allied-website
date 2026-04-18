export interface HeroContent {
  eyebrow?: string;
  title?: string;
  summary?: string;
  ctaLabel?: string;
  ctaRoute?: string;
  imageUrl?: string;
}

export interface FocusAreaItem {
  title: string;
  summary?: string;
  imageUrl?: string;
}

export interface OperationalStructureItem {
  title: string;
  summary?: string;
  imageUrl?: string;
}

export interface IndustryItem {
  title: string;
  imageUrl?: string;
}

export interface HomepageContent {
  hero: HeroContent;
  spotlight?: {
    ariaLabel?: string;
    text?: string;
  };
  sections?: {
    services?: {
      eyebrow?: string;
      title?: string;
    };
    focusAreas?: {
      eyebrow?: string;
      title?: string;
    };
    operationalStructure?: {
      eyebrow?: string;
      title?: string;
      paragraphs?: string[];
      quote?: string;
      industriesLabel?: string;
      footerText?: string;
      footerCtaLabel?: string;
      footerCtaRoute?: string;
    };
    deliveryModels?: {
      eyebrow?: string;
      title?: string;
    };
  };
  finalCta?: HeroContent;
}

export interface HomeContent {
  homepage: HomepageContent;
  focusAreas: FocusAreaItem[];
  operationalStructure: OperationalStructureItem[];
  industries: IndustryItem[];
}
