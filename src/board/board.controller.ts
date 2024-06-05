import { Body, Controller, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/createBoardDto';

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
}
