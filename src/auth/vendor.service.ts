import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/vendor.schema';
import mongoose from 'mongoose';
import bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from 'src/user/schemas/create-user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth.name)
        private userModel:mongoose.Model<Auth>,
        private jwtService:JwtService
    ){}

   async signUp(signUpDto:SignUpDto):Promise<{message:string[]}>{
         const {name,email,password}=signUpDto
         const verifyUser=await this.userModel.findOne({email:email})
         if(verifyUser){
            throw new UnauthorizedException("user already exist")
         }

         const hashedPassword=await bcrypt.hash(password,10)

         const user=await this.userModel.create({
            name:name,
            email:email,
            password:hashedPassword
         })

        //  const token=await this.jwtService.sign({id:user._id})
         return {message:[user.email,user.name]}
    }


    // Vendor Login

    async signIn(
        loginDto:LoginDto
    ):Promise<{token:string,user:any}>{
        const {email,password}=loginDto
        const user=await this.userModel.findOne({email:email})
        if(!user){
            throw new NotFoundException("User Not Found")
        }
        const comparePassword=await bcrypt.compare(password,user.password)
        if(!comparePassword){
           throw new NotFoundException("check password")
        }

        const token=await this.jwtService.sign({id:user._id})

        return {token:token,user:user}
    }


    // vendor password change
    async changePassword(
        passwordChange:UpdatePasswordDto,
        user:any
    ):Promise<{message:string}>{
        const {oldPassword,newPassword}=passwordChange
        const id=user._id
        const existuser=await this.userModel.findById(id)
        if(!existuser){
            throw new NotFoundException("user not found")
        }   
        const isMatch=await bcrypt.compare(oldPassword,user.password)
        if(!isMatch){
            throw new UnauthorizedException("old password is incorrect")
        }
        const hashedPassword=await bcrypt.hash(newPassword,10)
        user.password=hashedPassword
        await user.save()
        return {message:"password changed successfully"}
    }


}
