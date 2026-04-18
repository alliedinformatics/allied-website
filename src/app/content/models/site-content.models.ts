export interface NavigationLink {
  label: string;
  path: string;
  showInHeader?: boolean;
  showInFooter?: boolean;
}

export interface BrandContent {
  name: string;
  foundedYear?: number;
  postalCode?: string;
  tagline?: string;
  logoUrl?: string;
}

export interface SiteContent {
  brand: BrandContent;
  navigation: NavigationLink[];
}
