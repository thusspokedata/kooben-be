import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddressDto } from './dto/address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('sync')
  findOrCreateByClerkId(@Body() createUserDto: CreateUserDto) {
    return this.usersService.findOrCreateByClerkId(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('admins')
  findAdmins() {
    return this.usersService.findAdmins();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('clerk/:clerkId')
  findByClerkId(@Param('clerkId') clerkId: string) {
    return this.usersService.findByClerkId(clerkId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Delete(':id/address')
  removeAddress(@Param('id') id: string) {
    return this.usersService.removeAddress(id);
  }

  @Get(':id/addresses')
  findAllAddresses(@Param('id') id: string) {
    return this.usersService.findAllAddresses(id);
  }

  @Get(':id/addresses/:addressId')
  findAddressById(
    @Param('id') id: string,
    @Param('addressId') addressId: string,
  ) {
    return this.usersService.findAddressById(id, addressId);
  }

  @Post(':id/addresses')
  createAddress(@Param('id') id: string, @Body() addressDto: AddressDto) {
    return this.usersService.createAddress(id, addressDto);
  }

  @Put(':id/addresses/:addressId')
  updateAddress(
    @Param('id') id: string,
    @Param('addressId') addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.usersService.updateAddress(id, addressId, updateAddressDto);
  }

  @Delete(':id/addresses/:addressId')
  removeAddressById(
    @Param('id') id: string,
    @Param('addressId') addressId: string,
  ) {
    return this.usersService.removeAddressById(id, addressId);
  }
}
