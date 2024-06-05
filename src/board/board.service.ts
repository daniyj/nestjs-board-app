import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/createBoardDto';

@Injectable()
export class BoardService {
    constructor(@InjectRepository(Board)
private readonly boardRepository: Repository<Board>,
){}
    async createBoard(createBoardDto: CreateBoardDto):Promise<Board>{
        const board = new Board();
        board.title = createBoardDto.title;
        board.content = createBoardDto.content;
        board.isPublic = createBoardDto.isPublic;
        board.user = createBoardDto.user; // 변경될 수 있음 우선 작성
        return this.boardRepository.save(board);
    }
    async getAllBoards():Promise<Board[]>{
        console.log('getAllBoards 함수호출');
        return await this.boardRepository.find();
    }
    async getOneBoard(boardId: number):Promise<Board>{
        console.log('getOneBoard 함수호출');
        const board = await this.boardRepository.findOne({  where:{id: boardId}  });
        console.log(board.id);
        if(!board){
            throw new NotFoundException('Board not found');
        }
        return board;
    }

}
