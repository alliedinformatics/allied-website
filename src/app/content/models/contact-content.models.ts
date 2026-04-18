export interface SocialLink {
  label: string;
  href: string;
}

export interface ContactContent {
  emails?: string[];
  phones?: string[];
  addressLines?: string[];
  postalCode?: string;
  socials?: SocialLink[];
  formCtaLabel?: string;
  mapEmbedUrl?: string;
}
