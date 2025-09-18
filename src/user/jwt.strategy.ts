import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "./schemas/create-user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Strategy,ExtractJwt } from "passport-jwt";


@Injectable()
export class JwtStrategyUser extends PassportStrategy(Strategy,'jwt-user'){
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>
    ){
        super({   // super calls parent class constructor
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SCERET
        })
    }

    async validate(payload){
        const {id}=payload;
        const user=await this.userModel.findById(id)
        
        if(!user){
            throw new UnauthorizedException("Login first to access this endpoint")
        }
        return user
    }   
}