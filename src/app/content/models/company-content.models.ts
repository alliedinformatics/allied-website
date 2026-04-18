export interface RichTextSection {
  title: string;
  body: string;
}

export interface CompanyContent {
  pageContent?: {
    hero?: {
      introLabel?: string;
      lede?: string;
    };
    why?: {
      title?: string;
      subtitle?: string;
      paragraphs?: string[];
      highlights?: string[];
    };
    mission?: {
      title?: string;
      paragraph?: string;
      quote?: string;
    };
    identity?: {
      title?: string;
      paragraph?: string;
    };
    motto?: {
      title?: string;
      paragraph?: string;
    };
    philosophy?: {
      title?: string;
      paragraph?: string;
      points?: string[];
    };
    stats?: {
      founded?: {
        label?: string;
        note?: string;
      };
      zip?: {
        label?: string;
        note?: string;
      };
      serviceTracks?: {
        label?: string;
        note?: string;
      };
      leadershipProfiles?: {
        label?: string;
        note?: string;
      };
    };
  };
  overview: RichTextSection[];
  philosophy: RichTextSection[];
  whoWeAre: RichTextSection[];
}
