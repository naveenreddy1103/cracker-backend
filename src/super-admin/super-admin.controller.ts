import { Body, Controller, Post } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { SuperAdminSignupDto } from './dto/signUp-dto';
import { SuperAdmin } from './schema/super-admin.schema';
import { SuperAdminSignInDto } from './dto/signIn-dto';

@Controller('super-admin')
export class SuperAdminController {
    constructor(
        private readonly superAdminService:SuperAdminService
    ){}

    @Post('signup')
    async signUp(
        @Body()
        superAdmin:SuperAdminSignupDto
    ):Promise<SuperAdmin>{
        const {adminName,email,password,superAdminKey}=superAdmin
         const newAdmin={adminName,email,password}
         const super_AdminKey=superAdminKey
        return this.superAdminService.signUp(newAdmin,super_AdminKey)
    }

    @Post('signin')
    async signIn(
        @Body()
        superAdmin:SuperAdminSignInDto
    ):Promise<{token:string,res:any}>{
        return this.superAdminService.signIn(superAdmin)
    }
}
