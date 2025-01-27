import { IsString } from "class-validator";

export class CreateSongDto {
    @IsString()
    name: string;
}
