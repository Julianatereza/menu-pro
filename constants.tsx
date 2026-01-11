
import { MenuData } from './types';

export const INITIAL_MENU_DATA: MenuData = {
  config: {
    restaurantName: 'Bistro Central',
    subtitle: 'Menu Gastronômico',
    titleFont: 'Playfair Display',
    bodyFont: 'Lora',
    fontSize: 16,
    lineHeight: 1.5,
    primaryColor: '#ee6c2b',
    secondaryColor: '#1a1310',
    backgroundColor: '#ffffff',
  },
  isPremium: false,
  categories: [
    {
      id: 'cat-1',
      name: 'Entradas',
      items: [
        {
          id: 'item-1',
          name: 'Bruschetta de Tomate',
          description: 'Pão italiano tostado, tomates cereja frescos, manjericão e azeite extra virgem.',
          price: 'R$ 28,00',
        }
      ]
    },
    {
      id: 'cat-2',
      name: 'Pratos Principais',
      items: [
        {
          id: 'item-2',
          name: 'Risoto de Camarão',
          description: 'Arroz arbóreo, camarões selecionados e parmesão.',
          price: 'R$ 58,00',
        }
      ]
    }
  ]
};

export const TEMPLATES = [
  {
    id: 't1',
    name: 'Minimalista Moderno',
    tagline: 'Ideal para bares',
    category: 'Bares',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    premium: true,
  },
  {
    id: 't2',
    name: 'Rústico Elegante',
    tagline: 'Perfeito para bistrôs',
    category: 'Restaurantes',
    image: 'https://images.unsplash.com/photo-1550966842-28c4600e608d?auto=format&fit=crop&q=80&w=800',
    premium: false,
  },
  {
    id: 't3',
    name: 'Clássico Italiano',
    tagline: 'Especial Pizzarias',
    category: 'Pizzarias',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    new: true,
  },
  {
    id: 't4',
    name: 'Gourmet Premium',
    tagline: 'Alta Gastronomia',
    category: 'Restaurantes',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
    premium: true,
  },
  {
    id: 't5',
    name: 'Café Parisiense',
    tagline: 'Charme e Conforto',
    category: 'Cafés',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    premium: false,
  },
  {
    id: 't6',
    name: 'Burger Joint',
    tagline: 'Estilo Americano',
    category: 'Hamburguerias',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
    new: true,
  },
  {
    id: 't7',
    name: 'Sakura Sushi',
    tagline: 'Tradição Oriental',
    category: 'Japonês',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
    premium: true,
  }
];
