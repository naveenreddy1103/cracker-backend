import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './schemas/address.schema';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
    constructor(
        private addressService:AddressService
    ){}


    // add address 
    @Post()
    @UseGuards(AuthGuard('jwt-user'))
    async addAddress(
        @Body()
        address:CreateAddressDto,
        @Req() req
    ):Promise<Address>{
        return this.addressService.createAddress(address,req.user)
    }


    // update address by address ObjectId
    @Patch(':id')
    @UseGuards(AuthGuard('jwt-user'))
    async updateAddress(
        @Body()
        address:UpdateAddressDto,
        @Param('id') id:string,
    ):Promise<Address>{
        return this.addressService.updateAddress(id,address)
    } 


    // get address by user
    @Get()
    @UseGuards(AuthGuard('jwt-user'))
    async getAddressByUser(
        @Req() Req
    ):Promise<Address[]>{
        return this.addressService.getAddressByUser(Req.user)
    }

    
    // delete address by id
    @Delete(':id')
    @UseGuards(AuthGuard('jwt-user'))
    async deleteAddressById(
        @Param('id') id:string
    ):Promise<string>{
        return this.addressService.deleteAddressById(id)
    }

}
