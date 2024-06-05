import { Board } from "../board.entity";

export class GetAllBoards{
    id:number;
    title:string;
    content:string;
    isPublic:boolean;
    userId: number;

    constructor(board:any){
        this.id = board.id;
        this.title = board.title;
        this.content = board.content;
        this.isPublic = board.isPublic;
        this.userId = board.user ? board.user.id : null;
    }


}