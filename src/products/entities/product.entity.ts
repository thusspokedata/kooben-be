// the entity is a class that represents a table (Product) in the database

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from '.';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
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

  @Column('int', {
    default: 0,
    nullable: true,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @Column('text')
  category: string;

  @Column('text', {
    array: true,
    nullable: true,
  })
  color: string[];

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

  // https://orkhan.gitbook.io/typeorm/docs/eager-and-lazy-relations
  // Eager relations only work when you use find* methods. If you use QueryBuilder eager relations are
  // disabled and have to use leftJoinAndSelect to load the relation. Eager relations can only be
  // used on one side of the relationship, using eager: true on both sides of relationship is disallowed.
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
}
