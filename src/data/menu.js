import { MENU_CATEGORY } from '@/lib/constants'

/**
 * @typedef {Object} MenuItem
 * @property {number}   id
 * @property {string}   category
 * @property {string}   name
 * @property {string}   description
 * @property {number}   price
 * @property {number}   prepMinutes   - kitchen preparation time in minutes
 * @property {string}   image         - Unsplash URL
 * @property {boolean}  [popular]
 * @property {boolean}  [spicy]
 */

/** @type {MenuItem[]} */
export const MENU_ITEMS = [
  {
    id: 1,
    category: MENU_CATEGORY.PRINCIPAL,
    name: 'Pad Thai Clásico',
    description: 'Tallarines de arroz salteados con pollo, brotes de soja, huevo, cacahuetes tostados y salsa de tamarindo.',
    price: 11.90,
    prepMinutes: 8,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=400&q=80',
    popular: true,
  },
  {
    id: 2,
    category: MENU_CATEGORY.PRINCIPAL,
    name: 'Noodles Teriyaki Picantes',
    description: 'Fideos de trigo salteados al wok con ternera, pimientos, edamame y salsa teriyaki con sriracha.',
    price: 12.50,
    prepMinutes: 10,
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=400&q=80',
    spicy: true,
  },
  {
    id: 3,
    category: MENU_CATEGORY.PRINCIPAL,
    name: 'Ramen Miso',
    description: 'Caldo de miso con ramen, chashu de cerdo, huevo marinado, nori y cebollino.',
    price: 13.50,
    prepMinutes: 12,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80',
    popular: true,
  },
  {
    id: 4,
    category: MENU_CATEGORY.STARTER,
    name: 'Gyozas de Pollo',
    description: 'Empanadillas japonesas a la plancha (5 uds) rellenas de pollo y jengibre, con salsa ponzu cítrica.',
    price: 6.50,
    prepMinutes: 5,
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80',
    popular: true,
  },
  {
    id: 5,
    category: MENU_CATEGORY.STARTER,
    name: 'Bao de Panceta',
    description: 'Pan al vapor relleno de panceta glaseada con hoisin, pepino encurtido y mayonesa picante.',
    price: 5.50,
    prepMinutes: 5,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    category: MENU_CATEGORY.STARTER,
    name: 'Edamame con Sal Marina',
    description: 'Vainas de soja al vapor con escamas de sal marina y aceite de sésamo. Vegano.',
    price: 3.90,
    prepMinutes: 3,
    image: 'https://images.unsplash.com/photo-1576093268991-e8c7abf4e879?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 7,
    category: MENU_CATEGORY.DRINK,
    name: 'Thai Iced Tea',
    description: 'Té negro tailandés concentrado con leche condensada y hielo picado. Servido en vaso largo.',
    price: 3.50,
    prepMinutes: 2,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80',
    popular: true,
  },
  {
    id: 8,
    category: MENU_CATEGORY.DRINK,
    name: 'Matcha Latte',
    description: 'Matcha ceremonial japonés con leche de avena espumada. Caliente o frío.',
    price: 4.00,
    prepMinutes: 3,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 9,
    category: MENU_CATEGORY.DRINK,
    name: 'Agua con Gas',
    description: 'Agua mineral natural con gas, 500 ml.',
    price: 2.00,
    prepMinutes: 0,
    image: 'https://images.unsplash.com/photo-1536939459926-301cf7669571?auto=format&fit=crop&w=400&q=80',
  },
]
