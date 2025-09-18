import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto } from './dto/create-user.dto';
import { UserSignInDto } from './dto/user-login.dto';


@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){}

    @Post('signup')
    async createUser(
        @Body()
        user:UserSignUpDto
    ):Promise<{token:string}>{
        return this.userService.createUser(user)
    }

    @Post('signin')
    async signInUser(
        @Body()
        user:UserSignInDto
    ):Promise<{token:string}>{
        return this.userService.signInUser(user)
    }
}
