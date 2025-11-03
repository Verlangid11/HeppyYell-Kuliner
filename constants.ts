
import { Product } from './types';

export const SHOPEE_LINK = "https://shopee.co.id/heppy-yell";
export const WHATSAPP_LINK = "https://wa.me/6281234567890?text=Halo%20Heppy%20Yell%2C%20saya%20mau%20pesan";
export const INSTAGRAM_LINK = "https://instagram.com/heppyyell";

export const initialProducts: Product[] = [
  {
    id: '1',
    image: "https://picsum.photos/seed/rendang/400/300",
    name: "Rendang Sapi Premium",
    description: "Slow-cooked beef simmered in a rich coconut milk and a mixture of authentic Minang spices.",
    price: "Rp 38.000",
    buyLink: "https://wa.me/6281234567890?text=Halo%20Heppy%20Yell%2C%20saya%20mau%20pesan%20Rendang"
  },
  {
    id: '2',
    image: "https://picsum.photos/seed/dendeng/400/300",
    name: "Dendeng Balado",
    description: "Thinly sliced crispy beef jerky, topped with a flavorful and spicy red chili 'balado' sauce.",
    price: "Rp 32.000",
    buyLink: SHOPEE_LINK
  },
  {
    id: '3',
    image: "https://picsum.photos/seed/ayamgulai/400/300",
    name: "Ayam Gulai",
    description: "Tender chicken cooked in a savory and aromatic curry-like 'gulai' sauce.",
    price: "Rp 25.000",
    buyLink: WHATSAPP_LINK
  }
];
