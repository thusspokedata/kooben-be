export interface SeedProduct {
  id:          string;
  title:       string;
  price:       number;
  description: null | string;
  slug:        string;
  stock:       number;
  sizes:       string[];
  category:    string;
  color:       null;
  material:    null;
  length:      null;
  width:       null;
  height:      null;
  tags:        any[];
  images:      string[];
}

interface SeedData {
  products: SeedProduct[];
}

export const initialData: SeedData = {
  products: [
  {
      "id": "8638d9c0-b827-4305-8c9e-febf617ec84a",
      "title": "mesa de luz, color negro",
      "price": 60000,
      "description": "Ideal para complementar tu dormitorio.",
      "slug": "mesa_de_luz_color_negro",
      "stock": 12,
      "sizes": [
          "60x40 cm",
          "80x60 cm"
      ],
      "category": "mesa_de_luz",
      "color": null,
      "material": null,
      "length": null,
      "width": null,
      "height": null,
      "tags": [],
      "images": [
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792723/26ffdaae-20240629_164705.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792723/facf9a3b-20240629_164705%281%29.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792722/0e866e95-20240629_164831.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792722/ed05d6f3-20240629_165022.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792722/a8b685a5-20240629_165027.jpg"
      ]
  },
  {
      "id": "a56f710d-6b0c-415b-84f6-3001f7ea89f0",
      "title": "mesa de luz, color blanco",
      "price": 70000,
      "description": "Acabados de alta calidad.",
      "slug": "mesa_de_luz_color_blanco",
      "stock": 5,
      "sizes": [
          "60x40 cm",
          "80x60 cm"
      ],
      "category": "mesa_de_luz",
      "color": null,
      "material": null,
      "length": null,
      "width": null,
      "height": null,
      "tags": [],
      "images": [
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792765/1800f26f-20240629_173011.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792765/80b87858-20240629_180611.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792765/d1f2230d-20240629_181120.jpg"
      ]
  },
  {
      "id": "572469ec-d109-45a9-a860-97cf86db8fe8",
      "title": "mesa de luz, color marron",
      "price": 55000,
      "description": "Mesa de luz con diseño minimalista",
      "slug": "mesa_de_luz_color_marron",
      "stock": 10,
      "sizes": [
          "60x40 cm",
          "80x60 cm"
      ],
      "category": "mesa_de_luz",
      "color": null,
      "material": null,
      "length": null,
      "width": null,
      "height": null,
      "tags": [],
      "images": [
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792818/e154cc87-20240629_174713%281%29.jpg"
      ]
  },
  {
      "id": "b32c56e6-e6ba-414c-a8e7-b0f18770b494",
      "title": "respaldo de cama, marron",
      "price": 300000,
      "description": null,
      "slug": "respaldo_de_cama_marron",
      "stock": 10,
      "sizes": [
          "160x120 cm",
          "180x120 cm"
      ],
      "category": "respaldo_de_cama",
      "color": null,
      "material": null,
      "length": null,
      "width": null,
      "height": null,
      "tags": [],
      "images": [
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792915/356a7ea6-20240629_170217.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792913/b1d5b15d-20240629_170221.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792915/f35ee557-20240629_170230.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/9ea0ee03-20240629_172859.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/f1aa3e77-20240629_172916.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792919/965f2e67-20240629_173023.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/de5e038b-20240629_173042.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/d76be350-20240629_173111.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/5fc5fc7e-20240629_173119.jpg",
          "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/67cb7cca-20240629_173122.jpg",
            "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/a3dbf786-20240629_173556.jpg",
            "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/ada108ad-20240629_173559.jpg",
            "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/fa1c29c3-20240629_173611.jpg",
            "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/566f39ae-20240629_174702.jpg",
            "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792914/906bd042-20240629_174713.jpg"
        ]
    },
    {
        "id": "79ce17a3-d4d9-4e1a-8f48-d22a5ebbbbb3",
        "title": "respaldo de cama, negro",
        "price": 240000,
        "description": null,
        "slug": "respaldo_de_cama_negro",
        "stock": 5,
        "sizes": [
            "160x120 cm",
            "180x120 cm"
        ],
        "category": "respaldo_de_cama",
        "color": null,
        "material": null,
        "length": null,
        "width": null,
        "height": null,
        "tags": [],
        "images": [
            "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792963/4d4b21dc-20240629_164751.jpg",
            "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792964/5c4806f8-20240629_165101.jpg",
            "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792964/5c2c8358-20240630_131224.jpg",
            "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725792964/f5ca4585-20240630_131356.jpg"
        ]
    },
    {
        "id": "c3e64254-2cd2-4642-a86d-bca8df8cb012",
        "title": "botinero, color blanco",
        "price": 250000,
        "description": null,
        "slug": "botinero_color_blanco",
        "stock": 0,
        "sizes": [
            "100x50 cm",
            "120x50cm"
        ],
        "category": "botinero",
        "color": null,
        "material": null,
        "length": null,
        "width": null,
        "height": null,
        "tags": [],
        "images": [
            "https://res.cloudinary.com/dg1oorbbx/image/upload/v1725793035/db1b1046-20240630_135040.jpg"
        ]
    }
]
}