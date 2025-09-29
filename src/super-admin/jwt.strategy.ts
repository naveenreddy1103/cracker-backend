import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { SuperAdmin } from "./schema/super-admin.schema";
import { Model } from "mongoose";
import { env } from "process";




@Injectable()
export class JwtStrategySuperAdmin extends PassportStrategy(Strategy,'jwt-superadmin'){
    constructor(
        @InjectModel(SuperAdmin.name)
        private superAdminModel:Model<SuperAdmin>
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:env.JWT_SCERET
        })
    }

    async validate(payload){
        const {id}=payload;
        const user=await this.superAdminModel.findById(id)

        if(!user){
            throw new UnauthorizedException("login first to access this end point")
        }
        return user
    }
}