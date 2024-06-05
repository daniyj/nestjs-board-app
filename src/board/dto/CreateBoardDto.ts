import { User } from "src/user/user.entity";

export class CreateBoardDto{
    title: string;
    content: string;
    isPublic: boolean;
    user: User; // 추후 변경될 수 있음
}