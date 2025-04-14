import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PurchaseOrder } from './entities/purchase-order.entity';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const purchaseOrder = this.purchaseOrderRepository.create(
      createPurchaseOrderDto,
    );
    return await this.purchaseOrderRepository.save(purchaseOrder);
  }

  async findAll() {
    return await this.purchaseOrderRepository.find({
      relations: ['items', 'shippingAddress'],
    });
  }

  async findOne(id: string) {
    return await this.purchaseOrderRepository.findOne({
      where: { id },
      relations: ['items', 'shippingAddress'],
    });
  }

  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    const purchaseOrder = await this.findOne(id);
    if (!purchaseOrder) {
      throw new Error('Purchase order not found');
    }
    const updatedPurchaseOrder = this.purchaseOrderRepository.merge(
      purchaseOrder,
      updatePurchaseOrderDto,
    );
    return await this.purchaseOrderRepository.save(updatedPurchaseOrder);
  }

  async remove(id: string) {
    const purchaseOrder = await this.findOne(id);
    if (!purchaseOrder) {
      throw new Error('Purchase order not found');
    }
    return await this.purchaseOrderRepository.remove(purchaseOrder);
  }
}
