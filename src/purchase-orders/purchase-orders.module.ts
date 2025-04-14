import { Module } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderAddress } from './entities/order-address.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([PurchaseOrder, OrderItem, OrderAddress]),
  ],
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService],
  exports: [PurchaseOrdersService],
})
export class PurchaseOrdersModule {}
