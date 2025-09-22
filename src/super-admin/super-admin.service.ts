import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SuperAdmin } from './schema/super-admin.schema';
import mongoose from 'mongoose';
import bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SuperAdminService {
    constructor(
         @InjectModel(SuperAdmin.name)
        private superAdminModel:mongoose.Model<SuperAdmin>,
        private jwtService:JwtService
    ){}

    SuperAdminKey=process.env.SuperAdminKey

    async signUp(
        superAdmin:SuperAdmin,
        superAdminKey:string
    ):Promise<SuperAdmin>{
        const {adminName,email,password}=superAdmin
        const existingAdmin=await this.superAdminModel.findOne({email})
        if(existingAdmin){
            throw new UnauthorizedException("Admin already exisst")
        }
        const hashedPassword=await bcrypt.hash(password,10)

        if(superAdminKey !== this.SuperAdminKey){
            throw new NotFoundException("Invaild Super Admin Key")
        }

        const newAdmin= new this.superAdminModel({
            adminName,
            email,
            password:hashedPassword
        })

        return newAdmin.save()
    }

    async signIn(
        superAdmin:any
    ):Promise<{token:string,res:any}>{
       const {email,password}=superAdmin
       const existingAdmin=await this.superAdminModel.findOne({email})
       if(!existingAdmin){
        throw new NotFoundException("admin Not found")
       }
       const isMatch=await bcrypt.compare(password,existingAdmin.password)
       if(!isMatch){
        throw new UnauthorizedException("Invalid Credentials")
       }
       const token=await this.jwtService.sign({id:existingAdmin._id})
       return {token:token,res:existingAdmin.adminName}
    }

}
