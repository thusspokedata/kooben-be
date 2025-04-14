import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { OrderAddress } from './order-address.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', { default: 0 })
  @IsNumber()
  @IsPositive()
  @Min(0)
  subTotal: number;

  @Column('float', { default: 0 })
  @IsNumber()
  @IsPositive()
  @Min(0)
  tax: number;

  @Column('float', { default: 0 })
  @IsNumber()
  @IsPositive()
  @Min(0)
  total: number;

  @Column('integer', { default: 0 })
  @IsInt()
  @IsPositive()
  @Min(0)
  itemsInOrder: number;

  @Column('boolean', { default: false })
  @IsBoolean()
  isPaid: boolean;

  @Column('boolean', { default: false })
  @IsBoolean()
  isDelivered: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  paidAt: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  createdAt: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToOne(() => OrderAddress, (address) => address.order)
  shippingAddress: OrderAddress;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
