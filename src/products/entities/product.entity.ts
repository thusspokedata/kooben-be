// the entity is a class that represents a table (Product) in the database

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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

  @Column('int', {
    default: 0,
    nullable: true, // Hacemos nullable porque el campo stock es opcional
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

  @Column('text', {
    array: true,
    nullable: true, // Agregamos el campo images que es opcional
  })
  images: string[];

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
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
