import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/createBoardDto';
import { Board } from './board.entity';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService){}

    @Post()
    async createBoard(
        @Body() createBoardDto: CreateBoardDto
    ):Promise<{message:string}>{
        this.boardService.createBoard(createBoardDto);
        return { message: "Board created successfully" };
    }
    @Get()
    async getBoards():Promise<Board[]>{
        return this.boardService.getAllBoards();
    }
}
