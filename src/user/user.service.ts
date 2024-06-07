import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,
){}
    async createUser(username:string, password:string){
        const user = new User();
        user.username = username;
        user.password = password;
        this.userRepository.save(user);
        return { message: "User registered succeessfully" };
    }
    async getAllUsers():Promise<User[]>{ 
        return await this.userRepository.find();
    }
    async findUser(username: string, password:string){
        const user = this.userRepository.findOne(
            { where: {username,password} }
        );
        if(!user){
            throw new Error('Invalid username or password');
        }
        return { message: `Login successful welcome ${username}`};
    }
    async deleteUser(userId:number){
        const user = await this.userRepository.findOne({
            where: {id: userId},
        })
        if(!user){
            throw new NotFoundException('user not found');
        }
        // await this.userRepository.remove(user); // hard delete
        await this.userRepository.softDelete(user.id); // soft delete
        return { message: "User deleted successfully"};
    }
}