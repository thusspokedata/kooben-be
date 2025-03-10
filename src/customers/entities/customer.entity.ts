import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  clerkId: string;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  address: string;

  @Column('text', { nullable: true })
  zipCode: string;

  @Column('text', { nullable: true })
  city: string;

  @Column('text', { nullable: true })
  province: string;

  @Column('text', { nullable: true })
  phone: string;

  @Column('boolean', { default: false })
  hasDefaultAddress: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
