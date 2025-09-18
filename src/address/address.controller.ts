import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './schemas/address.schema';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('address')
export class AddressController {
    constructor(
        private addressService:AddressService
    ){}

    @Post()
    @UseGuards(AuthGuard('jwt-user'))
    async addAddress(
        @Body()
        address:CreateAddressDto,
        @Req() req
    ):Promise<Address>{
        return this.addressService.createAddress(address,req.user)
    }

    

}
