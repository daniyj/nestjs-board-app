import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/createBoardDto';
import { Board } from './board.entity';
import { identity } from 'rxjs';
import { UpdateBoardDto } from './dto/UpdateBoardDto';
import { DeleteBoardDto } from './dto/DeleteBoardDto';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService){}

    @Post()
    async createBoard(
        @Body() createBoardDto: CreateBoardDto
    ):Promise<{message:string}>{
        return this.boardService.createBoard(createBoardDto);
    }
    // 게시물 단일, 전체 조회
    // 게시물 단일 조회 @Query이용
    @Get()
    async getBoard(
        @Query('boardId') boardId?:number
    ):Promise<Board| Board[]>{
        if(boardId){
            return this.boardService.getOneBoard(boardId);
        }else{
            return this.boardService.getAllBoards();
        }
    }

    // 게시물 단일 조회 @Param 이용
    // @Get(':boardId')
    // async getOneBoard(@Param('boardId') boardId:number):Promise<Board>{
    //     console.log('Received boardId:',boardId);
    //     return this.boardService.getOneBoard(boardId);
    // }

    @Patch()
    async updateBoard(
        @Query('boardId') boardId:number,
        @Body() updateBoardDto:UpdateBoardDto)
        :Promise<{message:string}>{
        return this.boardService.updateBoard(boardId, updateBoardDto);
    }
    @Delete('/:boardId')
    async deleteBoard(
        @Param('boardId') boardId: number, 
        @Body() deleteBoardDto: DeleteBoardDto)
        :Promise<{message:string}>{
            return this.boardService.deleteBoard(boardId, deleteBoardDto);
        }
}
