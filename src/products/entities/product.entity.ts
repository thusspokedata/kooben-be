import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { ProductSize } from './product-size.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  // Relationship with ProductSize
  @OneToMany(() => ProductSize, (productSize) => productSize.product, {
    cascade: true,
    eager: true,
  })
  productSizes: ProductSize[];

  @Column('text')
  category: string;

  @Column('text', {
    array: true,
    nullable: true,
  })
  colors: string[];

  @Column('text', {
    nullable: true,
  })
  material: string;

  @Column('numeric', {
    nullable: true,
  })
  length: number;

  @Column('numeric', {
    nullable: true,
  })
  width: number;

  @Column('numeric', {
    nullable: true,
  })
  height: number;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.normalizeSlug(this.slug);
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.normalizeSlug(this.slug);
  }

  private normalizeSlug(slug: string): string {
    return slug
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/,/g, '')
      .replace(/'/g, '_')
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u');
  }

  // Helper method to get total stock
  get totalStock(): number {
    if (!this.productSizes) return 0;
    return this.productSizes.reduce((total, size) => total + size.stock, 0);
  }
}
