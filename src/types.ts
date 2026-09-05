export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  brand: string;
  images: string[];
  price: number;
  originalPrice: number;
  discountPercent: number;
  tag?: 'Hot Product' | 'Top Selling' | 'Limited Time Offer' | 'Most Popular' | 'New Arrival' | 'Beat The Clock' | 'Best Deal' | 'Out of Stock' | string;
  isHot?: boolean;
  isOutOfStock?: boolean;
  warranty: string;
  capacityVariants?: string[];
  voltageVariants?: string[];
  colorVariants?: { name: string; hex: string }[];
  specs: { [key: string]: string };
  highlights: string[];
  shortDesc: string;
  description: string;
  rating: number;
  reviewsCount: number;
  minBooking?: number;
  purchasePoints?: number;
  emiAvailable?: string;
  bundleOffer?: {
    name: string;
    originalPrice: number;
    offerPrice: number;
    saveAmount: number;
  };
  carePlans?: {
    id: string;
    name: string;
    desc: string;
    price: number;
  }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  itemCount: number;
  subCategories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedCapacity?: string;
  selectedVoltage?: string;
  selectedColor?: string;
  selectedCarePlanId?: string;
  includeBundle?: boolean;
}

export interface BranchLocation {
  id: string;
  name: string;
  badge?: string;
  address: string;
  landmark: string;
  phone: string;
  offDay?: string;
  image: string;
  mapCoords?: string;
  googleMapUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  images?: string[];
  excerpt: string;
  author: string;
  content?: string;
}

export interface HeroSlideItem {
  id: number;
  image: string;
  alt?: string;
  tag: string;
  badge: string; // The attractive green text / green letter
  title: string;
  subtitle: string;
  category: string;
  buttonText: string;
}

export interface Slide3ShowcaseProduct {
  id: string;
  category: string;
  name: string;
  tag: string;
  spec: string;
  badge: string;
  accentColor: string;
  image: string;
}

export interface SubCategoryItem {
  id: string;
  categoryId?: string;
  name: string;
  itemCount?: number;
  image?: string;
  sdgTag?: string;
  sdgIcon?: string;
  slug?: string;
  productCount?: number;
  icon?: string;
}

export interface PeaceOfMindItem {
  id: string;
  tag: string;
  tagColor?: string;
  title: string;
  subtitle: string;
  iconType?: string;
}

export interface PeaceOfMindConfig {
  sectionTitle?: string;
  trustHighlight?: string;
  title?: string;
  subtitle?: string;
  items: PeaceOfMindItem[];
}

export interface SolarCareFeature {
  id?: string;
  title: string;
  subtitle: string;
}

export interface SolarCareConfig {
  badgeText?: string;
  titleMain?: string;
  titleHighlight?: string;
  title?: string;
  tag?: string;
  description: string;
  feature1Title?: string;
  feature1Desc?: string;
  feature2Title?: string;
  feature2Desc?: string;
  features?: SolarCareFeature[];
}

export interface BrandItem {
  id?: string;
  name: string;
  logo: string;
  logoImage?: string;
  image?: string;
  tagline?: string;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface LiveNotification {
  id: string;
  productName: string;
  image: string;
  timeAgo: string;
  location: string;
}

export interface HeroBillboardConfig {
  megaSaleRibbon: string;
  megaSaleTitle: string;
  lowestPriceTag: string;
  guaranteeBadgeTitle: string;
  guaranteeBadgeSubtitle: string;
  freeDeliveryTitle: string;
  freeDeliverySubtitle: string;
  termsDisclaimer: string;
  centerProductTitle: string;
  centerProductTag: string;
  centerProductSubtitle: string;
  leftProductTitle: string;
  leftProductSubtitle: string;
  rightProductTitle: string;
  rightProductSubtitle: string;
}

export interface SubBannerConfig {
  leftBanner: {
    topTag: string;
    title: string;
    guaranteeText: string;
    categoryLink: string;
    buttonText: string;
  };
  rightBanner: {
    topScript: string;
    titleMain: string;
    titleAccent: string;
    titleTag: string;
    discountBadge: string;
    bengaliTag: string;
    locationText: string;
    categoryLink: string;
  };
}

export interface FlashSaleConfig {
  title: string;
  subtitle: string;
  countdownHours: number;
  countdownMinutes: number;
  countdownSeconds: number;
  activeProductIds: string[];
}

export interface FooterConfig {
  aboutText: string;
  hotline: string;
  email: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    whatsapp: string;
  };
  copyrightText: string;
  isoText: string;
  poweredBy: string;
}

export interface BrandConfig {
  logoMain: string;
  logoAccent: string;
  logoSymbol: string;
  tagline: string;
  announcementText: string;
  warrantyHeaderTag: string;
  hotlineHeader: string;
  currencySymbol: string;
}

export interface SitePolicy {
  id: string;
  title: string;
  content: string;
}

