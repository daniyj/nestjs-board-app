import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

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
    
    

}