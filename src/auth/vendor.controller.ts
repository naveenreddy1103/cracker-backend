import { Body, Controller, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './vendor.service';
import { SignUpDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('vendor')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post('signup')
    signIn(
        @Body() 
        signUpDto:SignUpDto
    ):Promise<{token:string}>{
       return this.authService.signUp(signUpDto)
    }

    @Post("signin")
    signUp(
        @Body() 
        loginDto:LoginDto
    ):Promise<{token:string}>{
        return this.authService.signIn(loginDto)
    }

    @Patch('/update-password')
    @UseGuards(AuthGuard('jwt-auth'))
    updatePassword(
        @Body()
        updatePasswordDto:UpdatePasswordDto,
         @Req() req
    ):Promise<{message:string}>{
        const{newPassword,oldPassword,confirmPassword}=updatePasswordDto
        if(newPassword===oldPassword){
            throw new UnauthorizedException("new password and old password should not be same")
        }
        if(newPassword!==confirmPassword){
            throw new UnauthorizedException("new password and confirm password should be same")
        }
        return this.authService.changePassword(updatePasswordDto,req.user)
    }

}
