import { Controller, Post, Body, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUserDto } from "./dto/createUserDto";
import { loginDto } from "./dto/loginDto";

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post('/register')
    async register(
        @Body() createUserDto: createUserDto,
    ):Promise<{message:string}>{
        await this.userService.createUser(createUserDto.username, createUserDto.password);
        return { message: "User registered succeessfully" };
    }

    @Post('/login')
    async login(
        @Body() loginDto: loginDto
    ): Promise<{ message: string }>{
        const user = await this.userService.findUser(loginDto.username, loginDto.password);
        if(!user){
            throw new Error('Invalid username or password');
        }
        return { message: `Login successful welcome ${loginDto.username}`};
    }
}