import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/createBoardDto';
import { UpdateBoardDto } from './dto/UpdateBoardDto';
import { DeleteBoardDto } from './dto/DeleteBoardDto';


@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
            private readonly boardRepository: Repository<Board>,
        @InjectRepository(User)
            private readonly userRepository: Repository<User>,
){}
    async createBoard(createBoardDto: CreateBoardDto){
        const board = new Board();
        board.title = createBoardDto.title;
        board.content = createBoardDto.content;
        board.isPublic = createBoardDto.isPublic;
        board.user = createBoardDto.user; // 변경될 수 있음 우선 작성
        this.boardRepository.save(board);
        return { message: "Board created successfully" };
    }
    async getAllBoards():Promise<Board[]>{
        return await this.boardRepository.find();
    }
    async getOneBoard(boardId: number):Promise<Board>{
        const board = await this.boardRepository.findOne({ where:{id: boardId} });
        if(!board){
            throw new NotFoundException('Board not found');
        }
        return board;
    }
    async updateBoard(boardId:number, updateBoardDto:UpdateBoardDto){
        const board = await this.boardRepository.findOne({ where:{id: boardId}});
        const user = await this.userRepository.findOne({ where:{id: updateBoardDto.user.id}});

        if(boardId!=user.id){
            console.log('boardId',boardId);
            console.log('userId',user.id);
            throw new ForbiddenException('you dont have permission to access his resource');
        }
        board.title = updateBoardDto.title;
        board.content = updateBoardDto.content;
        board.isPublic = updateBoardDto.isPublic;
        this.boardRepository.save(board);
        return { message: "Board updated successfully" };
    }
    async deleteBoard(boardId:number, deleteBoardDto: DeleteBoardDto){
        const board = await this.boardRepository.findOne({ 
            where: {id: boardId},
            relations: ['user'],
        });
        if(!board){
            throw new NotFoundException('board not found');
        }
        
        const user = await this.userRepository.findOne({ where:{ id:deleteBoardDto.user.id}});

        if(!user){
            throw new NotFoundException('user not found');
        }
        if(user.id!==board.user.id){
            throw new BadRequestException(`you don't have permission to delete this board`);
        }
        await this.boardRepository.remove(board);
        
        return { message: "Board deleted successfully"};
    }

}
