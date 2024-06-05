import { User } from "src/user/user.entity";

export class UpdateBoardDto{
    title: string;
    content: string;
    isPublic: boolean;
    user: User;
}