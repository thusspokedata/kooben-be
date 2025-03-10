import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const { rememberAddress, ...customerData } = createCustomerDto;

      const customer = this.customerRepository.create({
        ...customerData,
        hasDefaultAddress: rememberAddress || false,
      });

      await this.customerRepository.save(customer);
      return customer;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El cliente ya existe');
      }
      throw new BadRequestException('Error al crear el cliente');
    }
  }

  async findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: string) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException('Cliente no encontrado');
    }
    return customer;
  }

  async findByClerkId(clerkId: string) {
    const customer = await this.customerRepository.findOneBy({ clerkId });
    if (!customer) {
      throw new NotFoundException('Cliente no encontrado');
    }
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.findOne(id);
      const updatedCustomer = this.customerRepository.merge(
        customer,
        updateCustomerDto,
      );
      return await this.customerRepository.save(updatedCustomer);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El email ya está en uso');
      }
      throw new BadRequestException('Error al actualizar el cliente');
    }
  }

  async remove(id: string) {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
    return { message: 'Cliente eliminado correctamente' };
  }
}
