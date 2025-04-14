import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';

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

  @Column('integer', { default: 0 })
  @IsInt()
  @IsPositive()
  @Min(0)
  productId: number;

  @Column('text', { default: '' })
  size: string;
}
