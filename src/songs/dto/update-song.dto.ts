import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDto } from './create-song.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateSongDto extends PartialType(CreateSongDto) {
    @IsNumber()
    @IsPositive()
    plays: number;
}
