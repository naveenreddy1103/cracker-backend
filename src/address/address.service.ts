import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Address } from './schemas/address.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/create-user.schema';

@Injectable()

export class AddressService {
    constructor(
        @InjectModel(Address.name)
        private addressModel:mongoose.Model<Address>
    ){}

    async createAddress(
        address:Address,
        user:User
    ):Promise<Address>{
        const completeData=Object.assign(address,{user:user._id})
       const data=await this.addressModel.create(completeData)
       if(!data){
        throw new UnauthorizedException("address not added")
       }
       return data
    }
}
