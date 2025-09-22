import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Address } from './schemas/address.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/create-user.schema';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()

export class AddressService {
    constructor(
        @InjectModel(Address.name)
        private addressModel: mongoose.Model<Address>
    ) { }

    // create address
    async createAddress(
        address: Address,
        user: User
    ): Promise<Address> {
         const addressExist=await this.addressModel.findOne({user:user._id})
        if(addressExist){
            throw new NotFoundException('address already exists');
        }
        const completeData = Object.assign(address, { user: user._id })
        const data = await this.addressModel.create(completeData)
        if (!data) {
            throw new UnauthorizedException("address not added")
        }
        return data
    }



    // update address by Id
    async updateAddress(
        id: string,
        address: UpdateAddressDto,
    ): Promise<Address> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid address ID');
        }

       

        const data = await this.addressModel.findByIdAndUpdate(id, address, {
            new: true,
            runValidators: true
        });

        if (!data) {
            throw new NotFoundException('Address not found');
        }

        return data;
    }


}