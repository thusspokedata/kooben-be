import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { PurchaseOrder } from './purchase-order.entity';

@Entity()
export class OrderAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  address: string;

  @Column('text', { nullable: true })
  @IsString()
  @IsOptional()
  address2?: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  city: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  country: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ManyToOne(() => PurchaseOrder, (order) => order.shippingAddress)
  order: PurchaseOrder;
}
