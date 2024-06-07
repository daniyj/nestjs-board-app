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
    async createUser(username:string, password:string):Promise<User>{
        const user = new User();
        user.username = username;
        user.password = password;
        return this.userRepository.save(user);
    }
    async findUser(username: string, password:string):Promise<User | undefined>{
        return this.userRepository.findOne(
            { where: {username,password} }
        );
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