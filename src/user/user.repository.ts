import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './user.entity';

export class UserRepository extends Repository<User>{
    constructor(private dataSource:DataSource){
        super(User, dataSource.createEntityManager());
    }
}