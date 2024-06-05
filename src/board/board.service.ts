import { Injectable } from '@nestjs/common';
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
        return await this.boardRepository.find();
    }

}
