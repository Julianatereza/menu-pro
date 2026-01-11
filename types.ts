
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuConfig {
  restaurantName: string;
  subtitle: string;
  titleFont: string;
  bodyFont: string;
  fontSize: number;
  lineHeight: number;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}

export interface MenuData {
  config: MenuConfig;
  categories: Category[];
  isPremium: boolean;
}

export type AppView = 'landing' | 'dashboard' | 'templates' | 'editor' | 'design' | 'preview' | 'checkout' | 'qrcode';
