
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhFdnaot5e7BZ6423ENFDu2IjciSqPnHIyiQHN1kmD30IZfkkggYTORQalj3iWkulZ1eg4zfTQP90GxKZcvgMfY2V3jm2nAcCmoizc8-2K2g8e8kl_R_Labl7ccwLKWMFe-zsqZgYaR0FMDHuIRIEmHi8dqjpwhiy3Sw_p0WOwdCit1eHO7A2Sd26uTHZzyO9mBZcHa_QwDfAPh9S0wXpQJ2E0n-vG1JIF7A4RZjBYIqRXF5HjIrPFMZlR0zwcCCQ_EkI3r2mE12c',
    premium: true,
  },
  {
    id: 't2',
    name: 'Rústico Elegante',
    tagline: 'Perfeito para bistrôs',
    category: 'Restaurantes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5wll62s2CJ7vH8Ggpxg-oBWbAmK0LOrWJDh1a3kkBwnqPb0D-AFWi6087RSoA6gYQA-pMGSApqbGwo_R6Md8gvoeFGuCBEKYlCPpb0-Md9nyD47ZEH_AdwWfi_nr7u-vL4Rq5uxt2EIFoJSjhMTUKNROH3ymjdjxBcW8jZgu3h5ECID7r9cpnP3Sc3Lem21exbThqdfPByogkj6aAy-qw-K6m6e0-cXECicHddYnkftasfLeejOpYxFBckt3dtoKWGAuI6RxZOg8',
    premium: false,
  },
  {
    id: 't3',
    name: 'Clássico Italiano',
    tagline: 'Especial Pizzarias',
    category: 'Pizzarias',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbpQsp6iGUdaUdH_mhGnjbq0C6eJ0U8cl0uG8Z1PJswjZehIcY4pOWB6Z5Y_lw5AnmRFnv0OSSfBCQyexSUlj4s4XekvFqxlANKflcTZz6cDYh3n7p1Q1Cp-vM7PW2lgHd-Hm4IesQ8wMNg_T_BYD_C3rjOH0NRnbzTJSMNCmF1ZmqC7aLJktliXKaQfE8uKf0ehDwICljOfnbf7y6-t5onkt35cVfgge61nazlbnfP5xa62t6aQqbkQ5ZZY1hh1RCyS_70-CBuqg',
    new: true,
  },
  {
    id: 't4',
    name: 'Gourmet Premium',
    tagline: 'Alta Gastronomia',
    category: 'Restaurantes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeCZ80zqTVf0FJcwpc95VvzHnFL3v-1x3IHjiW9Nzkq_YtMuOUGq0GBonYyvG5JGl9Wmf17Ctys06iCGlcFcJ8BfqN15taW-FEq7KSGsqBPzenZZAk1a4NjbZzUA9ViCL-D8rBXDVU3vDdEXTEIt-OB9Nykl1BrvY8GYTovpJ_f0mz4cSN3uHn2WeIauveA7YXbfm_hmvKM955vpktyN4_XC5E5M1m8A6f2gjjTc_wuTB3montQQCwPtj0ufHmDV5-ZuCkll8QqJ4',
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
