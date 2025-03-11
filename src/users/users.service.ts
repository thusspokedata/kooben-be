import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async createDefaultAdmin() {
    const adminCount = await this.userRepository.countBy({ role: Role.ADMIN });

    if (adminCount === 0) {
      console.log('Creating default admin user...');
      try {
        await this.create({
          clerkId: 'default-admin',
          name: 'Admin',
          email: 'admin@kooben.com',
          role: Role.ADMIN,
        });
        console.log('Default admin created successfully');
      } catch (error) {
        console.error('Failed to create default admin:', error);
      }
    }
  }
}
