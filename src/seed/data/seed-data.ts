export interface ProductSizeData {
  size: string;
  stock: number;
}

export interface SeedProduct {
  id: string;
  title: string;
  price: number;
  description: null | string;
  slug: string;
  productSizes: ProductSizeData[];
  category: string;
  color: string[] | null;
  material: null;
  length: null;
  width: null;
  height: null;
  tags: any[];
  images: string[];
}

interface SeedData {
  products: SeedProduct[];
}

export const initialData: SeedData = {
  products: [
    {
      id: 'd9f1e7a2-4b8f-482b-9c3e-a2fbd9c845d5',
      title: 'mesa de luz, color madera clara',
      price: 65000,
      description: 'Mesa de luz con un diseño moderno y elegante.',
      slug: 'mesa_de_luz_color_madera_clara',
      productSizes: [
        { size: '60x40 cm', stock: 4 },
        { size: '80x60 cm', stock: 4 },
      ],
      category: 'mesa_de_luz',
      color: [],
      material: null,
      length: null,
      width: null,
      height: null,
      tags: ['minimalista', 'moderno', 'dormitorio'],
      images: [
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846575/kooben/mesa-de-luz/aa4el1tmjluhwd5td6x1.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846575/kooben/mesa-de-luz/bfwsuqim4ohjzq1k0rtf.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846575/kooben/mesa-de-luz/hjiaojdsarsmj5q0x3xe.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846575/kooben/mesa-de-luz/tfjof52ahn5vat9pz7h6.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846575/kooben/mesa-de-luz/gjwp90hkbuiq5aubshzs.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846575/kooben/mesa-de-luz/fpnlkkw1fyu8cvysxzss.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846575/kooben/mesa-de-luz/erm4pjj7q5vhkqyqidz8.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846575/kooben/mesa-de-luz/r7njx4eoh0ogwvcxykle.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846575/kooben/mesa-de-luz/fijxbv8rdgzo4mdym44c.jpg',
      ],
    },
    {
      id: '8638d9c0-b827-4305-8c9e-febf617ec84a',
      title: 'mesa de luz, color negro',
      price: 60000,
      description: 'Ideal para complementar tu dormitorio.',
      slug: 'mesa_de_luz_color_negro',
      productSizes: [
        { size: '60x40 cm', stock: 4 },
        { size: '80x60 cm', stock: 4 },
      ],
      category: 'mesa_de_luz',
      color: [],
      material: null,
      length: null,
      width: null,
      height: null,
      tags: [],
      images: [
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792723/26ffdaae-20240629_164705.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792723/facf9a3b-20240629_164705%281%29.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792722/0e866e95-20240629_164831.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792722/ed05d6f3-20240629_165022.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792722/a8b685a5-20240629_165027.jpg',
      ],
    },
    {
      id: 'a56f710d-6b0c-415b-84f6-3001f7ea89f0',
      title: 'mesa de luz, color blanco',
      price: 70000,
      description: 'Acabados de alta calidad.',
      slug: 'mesa_de_luz_color_blanco',
      productSizes: [
        { size: '60x40 cm', stock: 2 },
        { size: '80x60 cm', stock: 2 },
      ],
      category: 'mesa_de_luz',
      color: [],
      material: null,
      length: null,
      width: null,
      height: null,
      tags: [],
      images: [
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792765/80b87858-20240629_180611.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792765/1800f26f-20240629_173011.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792765/d1f2230d-20240629_181120.jpg',
      ],
    },
    {
      id: '572469ec-d109-45a9-a860-97cf86db8fe8',
      title: 'mesa de luz, color marron',
      price: 55000,
      description: 'Mesa de luz con diseño minimalista',
      slug: 'mesa_de_luz_color_marron',
      productSizes: [
        { size: '60x40 cm', stock: 4 },
        { size: '80x60 cm', stock: 4 },
      ],
      category: 'mesa_de_luz',
      color: [],
      material: null,
      length: null,
      width: null,
      height: null,
      tags: [],
      images: [
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792818/e154cc87-20240629_174713%281%29.jpg',
      ],
    },
    {
      id: 'f47c9a80-6b9e-4e8a-b9e4-73d4e3e5bfc2',
      title: 'mueble para TV, color negro',
      price: 180000,
      description: 'Mueble para TV moderno con almacenamiento integrado.',
      slug: 'mueble_para_tv_color_negro',
      productSizes: [
        { size: '120x40 cm', stock: 2 },
        { size: '150x45 cm', stock: 2 },
      ],
      category: 'mesa_tv',
      color: [],
      material: null,
      length: null,
      width: null,
      height: null,
      tags: ['moderno', 'almacenamiento', 'sala de estar'],
      images: [
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846968/kooben/tv/issnjqihhwrjp0k4fosx.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846968/kooben/tv/iqkx8yuftidvf07nfniu.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846968/kooben/tv/k2fji4cxl23unljvzafu.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740846969/kooben/tv/jrw5fsphxh52fo8hscnb.jpg',
      ],
    },
    {
      id: 'c89f1d37-2a6e-48b5-8b43-7f4a2b67d110',
      title: 'escritorio minimalista, color blanco',
      price: 220000,
      description:
        'Escritorio moderno y funcional, ideal para trabajo o estudio.',
      slug: 'escritorio_minimalista_color_blanco',
      productSizes: [
        { size: '120x60 cm', stock: 5 },
        { size: '140x70 cm', stock: 5 },
      ],
      category: 'escritorio',
      color: [],
      material: null,
      length: null,
      width: null,
      height: null,
      tags: ['moderno', 'minimalista', 'oficina', 'home office'],
      images: [
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740847416/kooben/escritorio/rw4nb8jxxg82ciivabmh.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740847416/kooben/escritorio/s250hihwt9qszhwuaz0q.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740847416/kooben/escritorio/eivu2ez9z0ikj8suigbl.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740847416/kooben/escritorio/xbxuvonumd6edmbneewi.jpg',
        'https://res.cloudinary.com/thusspokedata/image/upload/v1740847416/kooben/escritorio/xx0wekbq3qpibgl6csiz.jpg',
      ],
    },
    {
      id: '79ce17a3-d4d9-4e1a-8f48-d22a5ebbbbb3',
      title: 'respaldo de cama, negro',
      price: 240000,
      description: null,
      slug: 'respaldo_de_cama_negro',
      productSizes: [
        { size: '160x120 cm', stock: 2 },
        { size: '180x120 cm', stock: 2 },
      ],
      category: 'respaldo_de_cama',
      color: [],
      material: null,
      length: null,
      width: null,
      height: null,
      tags: [],
      images: [
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792963/4d4b21dc-20240629_164751.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792964/5c4806f8-20240629_165101.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792964/5c2c8358-20240630_131224.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792964/f5ca4585-20240630_131356.jpg',
      ],
    },
    {
      id: 'b32c56e6-e6ba-414c-a8e7-b0f18770b494',
      title: 'respaldo de cama, marron',
      price: 300000,
      description: null,
      slug: 'respaldo_de_cama_marron',
      productSizes: [
        { size: '160x120 cm', stock: 5 },
        { size: '180x120 cm', stock: 5 },
      ],
      category: 'respaldo_de_cama',
      color: [],
      material: null,
      length: null,
      width: null,
      height: null,
      tags: [],
      images: [
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792915/356a7ea6-20240629_170217.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792913/b1d5b15d-20240629_170221.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792915/f35ee557-20240629_170230.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/9ea0ee03-20240629_172859.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/f1aa3e77-20240629_172916.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792919/965f2e67-20240629_173023.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/de5e038b-20240629_173042.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/d76be350-20240629_173111.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/5fc5fc7e-20240629_173119.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/67cb7cca-20240629_173122.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/a3dbf786-20240629_173556.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/ada108ad-20240629_173559.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/fa1c29c3-20240629_173611.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/566f39ae-20240629_174702.jpg',
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/906bd042-20240629_174713.jpg',
      ],
    },
    {
      id: 'c3e64254-2cd2-4642-a86d-bca8df8cb012',
      title: 'botinero, color blanco',
      price: 250000,
      description: null,
      slug: 'botinero_color_blanco',
      productSizes: [
        { size: '100x50 cm', stock: 0 },
        { size: '120x50cm', stock: 0 },
      ],
      category: 'botinero',
      color: [],
      material: null,
      length: null,
      width: null,
      height: null,
      tags: [],
      images: [
        'https://res.cloudinary.com/dg1oorbbx/image/upload/v1725793035/db1b1046-20240630_135040.jpg',
      ],
    },
  ],
};
