import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'product_sizes' })
export class ProductSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  size: string;

  @Column('integer', { default: 0 })
  stock: number;

  @ManyToOne(() => Product, (product) => product.productSizes, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
