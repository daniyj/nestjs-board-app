import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post('/register')
    async register(
        @Body('username') username: string,
        @Body('password') password: string,
    ):Promise<{message:string}>{
        await this.userService.createUser(username, password);
        return { message: "User registered succeessfully" };
    }

    @Post('/login')
    async login(
        @Body('username') username: string,
        @Body('password') password: string,
    ): Promise<{ message: string }>{
        const user = await this.userService.findUser(username , password);
        if(!user){
            throw new Error('Invalid username or password');
        }
        return { message: `Login successful welcome ${username}`};
    }
}