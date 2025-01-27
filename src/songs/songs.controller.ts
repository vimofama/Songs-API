import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createSongDto: CreateSongDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'audio/*' })
        ]
      }))
    file: Express.Multer.File) {
    return this.songsService.create(createSongDto, file);
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto ) {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
