import { Board } from 'src/board/board.entity';
import { BaseEntity,Column,Entity,OneToMany,PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // 1:N 관계 설정
    @OneToMany(() => Board, board => board.user)
    boards: Board[];
}