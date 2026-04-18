export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bulletItems?: string[];
}

export interface LegalPageContent {
  title: string;
  lastUpdated: string;
  intro?: string[];
  sections: LegalSection[];
}
