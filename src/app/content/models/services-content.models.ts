export interface ServiceItem {
  title: string;
  summary?: string;
  highlights?: string[];
  imageUrl?: string;
}

export interface ServicesPageContent {
  hero?: {
    lede?: string;
    paragraph?: string;
  };
  belief?: {
    title?: string;
    paragraphs?: string[];
    points?: string[];
  };
  overview?: {
    title?: string;
    kicker?: string;
    paragraph?: string;
  };
  ai?: {
    title?: string;
    paragraph?: string;
  };
  applications?: {
    title?: string;
    paragraph?: string;
  };
  quote?: string;
}
