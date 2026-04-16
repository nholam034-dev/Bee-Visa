
export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  icon: string;
  label: string;
  value: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  icon: string;
  detailId?: string; // New field to link to detailed page
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface FooterLink {
  label: string;
  type?: 'navigate' | 'modal';
  target?: string; // pageId or modal tab ('chat' | 'assessment' | 'form')
}

export interface PageData {
  id: string;
  name: string;
  navItems: NavItem[];
  stats: StatItem[];
  services: ServiceItem[];
  process: ProcessStep[];
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    backgroundImage: string;
    buttonPrimary: string;
    buttonSecondary: string;
    buttonSecondaryIcon: string;
  };
  cta: {
    icon: string;
    title: string;
    description: string;
    note: string;
  };
  footer: {
    serviceColumnTitle: string;
    serviceLinks: FooterLink[];
    supportLinks: FooterLink[];
  };
}

export interface CountrySummary {
  id: string;
  name: string;
  image: string;
  description: string;
  badge: string;
}

// New Interface for Detailed Service Page
export interface ServiceDetailData {
  id: string;
  parentId: string; // e.g., 'usa'
  title: string;
  heroImage: string;
  overview: string;
  // New Banner Fields
  sidebarBannerImage?: string;
  sidebarBannerLink?: string; 
  
  benefits: string[];
  requirements: {
    title: string;
    items: string[];
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

// New Interface for Customer Leads (Consultation Requests)
export interface LeadData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  status: 'new' | 'contacted' | 'done'; // Trạng thái xử lý
  source: string; // Nguồn (Modal, Contact Page...)
  createdAt: any; // Firestore Timestamp
}

// Global Site Configuration
export interface SiteConfig {
  brandName: string;
  logoUrl: string; // URL ảnh logo
  tagline: string;
  hotline: string;
  email: string;
  address: string;
  googleSheetUrl?: string; // URL Google App Script
}

// Chatbot Types
export interface ChatAttachment {
  type: 'image' | 'pdf';
  url: string; // Local preview URL
  base64: string; // Actual data for API
  mimeType: string;
  name: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  attachments?: ChatAttachment[];
  timestamp: number;
  isError?: boolean;
}

// --- USER MANAGEMENT TYPES ---
export type UserRole = 'super_admin' | 'admin' | 'consultant';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
  createdAt?: any;
}
