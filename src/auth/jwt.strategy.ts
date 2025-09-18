

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy ,ExtractJwt } from "passport-jwt";
import { Model } from "mongoose";
import { Auth } from "src/auth/schemas/user.schema";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt-auth'){
    constructor(
        @InjectModel(Auth.name)
        private authModel:Model<Auth>
    ){
        super({   // super calls parent class constructor
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SCERET
        })
    }

    async validate(payload){
        const {id}=payload;

        const user=await this.authModel.findById(id)
        
        if(!user){
            console.log(user)
            throw new UnauthorizedException("Login first to access this endpoint")
        }
        
        return user
    }
}