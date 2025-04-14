import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsPositive,
  Min,
  IsString,
} from 'class-validator';
import { PurchaseOrder } from './purchase-order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer', { default: 0 })
  @IsInt()
  @IsPositive()
  @Min(0)
  quantity: number;

  @Column('float', { default: 0 })
  @IsNumber()
  @IsPositive()
  @Min(0)
  price: number;

  @Column('uuid')
  @IsString()
  productId: string;

  @Column('text', { default: '' })
  size: string;

  @ManyToOne(() => PurchaseOrder, (order) => order.items)
  order: PurchaseOrder;
}
