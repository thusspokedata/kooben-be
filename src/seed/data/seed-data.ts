// Definimos las interfaces directamente en la semilla
interface ProductImage {
  id: string;
  url: string;
}

interface SeedProduct {
  id?: string;
  title: string;
  price: number;
  description?: string;
  slug: string;
  stock?: number;
  sizes: string[];
  category: string;
  color?: string[];
  material?: string;
  length?: number;
  width?: number;
  height?: number;
  images?: string[];
  tags: string[];
}

interface SeedData {
  products: SeedProduct[];
}

// Mock data for ProductImage
export const mockProductImages: ProductImage[] = [
  {
    id: 'image-uuid-1',
    url: 'https://example.com/products/table-1/image1.jpg',
  },
  {
    id: 'image-uuid-2',
    url: 'https://example.com/products/table-1/image2.jpg',
  },
  {
    id: 'image-uuid-3',
    url: 'https://example.com/products/chair-1/image1.jpg',
  },
];

// Mock data for Product
export const initialData: SeedData = {
  products: [
    {
      title: 'Mesa de Roble',
      price: 350.0,
      description:
        'Mesa de comedor hecha de roble macizo, resistente y elegante.',
      slug: 'mesa_de_roble',
      stock: 10,
      sizes: ['Pequeña', 'Mediana', 'Grande'],
      category: 'Mesas',
      color: ['Marrón', 'Natural'],
      material: 'Roble',
      length: 180.0,
      width: 90.0,
      height: 75.0,
      images: ['image2', 'image3'],
      tags: ['madera', 'comedor', 'rústico'],
    },
    {
      title: 'Silla de Pino',
      price: 75.0,
      description: 'Silla cómoda de madera de pino con respaldo alto.',
      slug: 'silla_de_pino',
      stock: 50,
      sizes: ['Estándar'],
      category: 'Sillas',
      color: ['Blanco', 'Natural'],
      material: 'Pino',
      length: 45.0,
      width: 45.0,
      height: 100.0,
      images: ['image4'],
      tags: ['madera', 'silla', 'interior'],
    },
    {
      title: 'Estantería de Cedro',
      price: 220.0,
      description:
        'Estantería modular de madera de cedro con múltiples niveles.',
      slug: 'estanteria_de_cedro',
      stock: 5,
      sizes: ['Grande'],
      category: 'Estanterías',
      color: ['Natural'],
      material: 'Cedro',
      length: 200.0,
      width: 40.0,
      height: 180.0,
      images: ['image7', 'image8', 'image9'],
      tags: ['almacenamiento', 'modular', 'madera'],
    },
  ],
};
