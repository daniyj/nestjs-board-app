import { Controller, Post, Body, Request, Delete, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/CreateUserDto";
import { LoginDto } from "./dto/LoginDto";

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post('/register')
    async register(
        @Body() createUserDto: CreateUserDto,
    ):Promise<{message:string}>{
        await this.userService.createUser(createUserDto.username, createUserDto.password);
        return { message: "User registered succeessfully" };
    }

    @Post('/login')
    async login(
        @Body() loginDto: LoginDto
    ): Promise<{ message: string }>{
        const user = await this.userService.findUser(loginDto.username, loginDto.password);
        if(!user){
            throw new Error('Invalid username or password');
        }
        return { message: `Login successful welcome ${loginDto.username}`};
    }
    @Delete('/:userId')
    async deleteUser(
        @Param('userId') userId:number
    ):Promise<{ message: string}>{
        console.log('userId=',userId);
        return this.userService.deleteUser(userId);
    }
}