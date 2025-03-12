import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddressDto } from './dto/address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { rememberAddress, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        role: userData.role || Role.CLIENT,
        hasDefaultAddress: rememberAddress || false,
      });

      await this.userRepository.save(user);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('User already exists');
      }
      throw new BadRequestException('Failed to create user');
    }
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByClerkId(clerkId: string) {
    const user = await this.userRepository.findOneBy({ clerkId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOrCreateByClerkId(userData: CreateUserDto) {
    try {
      // Try to find the user first
      const existingUser = await this.userRepository.findOneBy({
        clerkId: userData.clerkId,
      });

      // If user exists, return it
      if (existingUser) {
        return existingUser;
      }

      console.log(
        `User with clerkId ${userData.clerkId} not found, creating new user`,
      );

      // Create new user if not exists, passing the entire CreateUserDto
      return await this.create(userData);
    } catch (error) {
      console.error('Error in findOrCreateByClerkId:', error);
      if (error.code === '23505') {
        throw new BadRequestException('User already exists');
      }
      throw new BadRequestException('Failed to create user');
    }
  }

  async findAdmins() {
    return this.userRepository.findBy({ role: Role.ADMIN });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      const updatedUser = this.userRepository.merge(user, updateUserDto);
      return await this.userRepository.save(updatedUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Email already in use');
      }
      throw new BadRequestException('Failed to update user');
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }

  async removeAddress(id: string) {
    const user = await this.findOne(id);

    // Eliminar toda la información de dirección
    user.address = null;
    user.zipCode = null;
    user.city = null;
    user.province = null;
    user.hasDefaultAddress = false;

    await this.userRepository.save(user);
    return { message: 'Address removed successfully' };
  }

  async createDefaultAdmin() {
    const adminCount = await this.userRepository.countBy({ role: Role.ADMIN });

    const adminEmail = process.env.adminEmail;
    console.log(`Admin email from environment: ${adminEmail || 'Not set'}`);

    if (adminCount === 0) {
      console.log('Creating default admin user...');
      try {
        const defaultEmail = adminEmail;

        await this.create({
          clerkId: 'default-admin',
          name: 'Admin',
          email: defaultEmail,
          role: Role.ADMIN,
        });
        console.log('Default admin created successfully');
      } catch (error) {
        console.error('Failed to create default admin:', error.message);
        console.error(error.stack);
      }
    } else {
      console.log('Admin user already exists, skipping creation');
    }
  }

  async findAllAddresses(userId: string) {
    const user = await this.findOne(userId);
    return this.addressRepository.find({
      where: { userId: user.id },
    });
  }

  async findAddressById(userId: string, addressId: string) {
    const user = await this.findOne(userId);
    const address = await this.addressRepository.findOne({
      where: { id: addressId, userId: user.id },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  async createAddress(userId: string, addressDto: AddressDto) {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User with ID: ${userId} not found`);
    }

    // Si es dirección predeterminada, desactivar cualquier otra dirección predeterminada
    if (addressDto.isDefault) {
      await this.addressRepository.update(
        { userId, isDefault: true },
        { isDefault: false },
      );
    }

    // Crear nueva dirección
    const newAddress = this.addressRepository.create({
      ...addressDto,
      user,
    });

    return this.addressRepository.save(newAddress);
  }

  async updateAddress(
    userId: string,
    addressId: string,
    updateAddressDto: UpdateAddressDto,
  ) {
    const address = await this.findAddressById(userId, addressId);

    try {
      // Si estamos estableciendo esta dirección como predeterminada, desmarcamos las demás
      if (updateAddressDto.isDefault) {
        await this.addressRepository.update(
          { userId, isDefault: true },
          { isDefault: false },
        );
      }

      // Actualizar la dirección
      const updatedAddress = this.addressRepository.merge(
        address,
        updateAddressDto,
      );
      return this.addressRepository.save(updatedAddress);
    } catch (error) {
      throw new BadRequestException('Failed to update address');
    }
  }

  async removeAddressById(userId: string, addressId: string) {
    const address = await this.findAddressById(userId, addressId);
    await this.addressRepository.remove(address);
    return { message: 'Address removed successfully' };
  }
}
