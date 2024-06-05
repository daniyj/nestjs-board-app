import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/createBoardDto';
import { Board } from './board.entity';
import { identity } from 'rxjs';

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
    // 게시물 단일, 전체 조회
    // 게시물 단일 조회 @Query이용
    @Get()
    async getBoard(@Query('boardId') boardId?:number
    ):Promise<Board| Board[]>{
        if(boardId){
            return this.boardService.getOneBoard(boardId);
        }else{
            return this.boardService.getAllBoards();
        }
    }

    // 게시물 단일 조회 @Param을 이용
    // @Get(':boardId')
    // async getOneBoard(@Param('boardId') boardId:number):Promise<Board>{
    //     console.log('Received boardId:',boardId);
    //     return this.boardService.getOneBoard(boardId);
    // }
}
