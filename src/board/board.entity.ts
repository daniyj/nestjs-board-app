import { User } from "src/user/user.entity";
import { BaseEntity,Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;
    
    @Column({ default:true })
    isPublic: boolean;
    
    // N:1 관계 설정
    @ManyToOne(()=> User, user => user.boards)
    @JoinColumn()
    user : User;

}