import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/create-user.schema';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'node_modules/bcryptjs';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { UserSignUpDto } from './dto/create-user.dto';
import { UserSignInDto } from './dto/user-login.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel:mongoose.Model<User>,
        private jwtService:JwtService
    ){}

    async createUser(
        user:UserSignUpDto
    ):Promise<{token:string}>{
        const {userName,fullName,email,phoneNumber,password}=user
        const hashedPassword=await bcrypt.hash(password,10)
        const verifyemail=await this.userModel.findOne({email:email})
        if(verifyemail){
            throw new UnauthorizedException("user already exist")
        }
        const data=await this.userModel.create({
            userName:userName,
            fullName:fullName,
            email:email,
            phoneNumber:phoneNumber,
            password:hashedPassword
        })
        if(!data){
            throw new UnauthorizedException("user not created")
        }

        const token=await this.jwtService.sign({id:data._id})

        return {token:token}
    }


    async signInUser(
        user:UserSignInDto
    ):Promise<{token:string}>{
        const {email,password}=user
        const existingUser=await this.userModel.findOne({email:email})
        if(!existingUser){
            throw new UnauthorizedException("user not found")
        }
        const isMatch=await bcrypt.compare(password,existingUser.password)
        if(!isMatch){
            throw new UnauthorizedException("invalid credentials")
        }
        const token=await this.jwtService.sign({id:existingUser._id})
        return {token:token}
    }
    
}
