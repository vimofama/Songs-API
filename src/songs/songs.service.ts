import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaClient } from '@prisma/client';
// import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SongsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger(SongsService.name);

  constructor() {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async create(createSongDto: CreateSongDto, file: Express.Multer.File) {
    const { name } = createSongDto;
    // const projetRoot = path.join(__dirname, '..', '..');
    // const uploadDir = path.join(projetRoot, 'uploads', 'audio');

    // if (!fs.existsSync(uploadDir)) {
    //   fs.mkdirSync(uploadDir, { recursive: true });
    // }

    const fileName = `${Date.now()}${path.extname(file.originalname)}`;

    // Generate the file path and write the file to the disk
    // const filePath = path.join(uploadDir, fileName);
    // fs.writeFileSync(filePath, file.buffer);

    const relativePath = path.join('uploads', 'audio', fileName);

    const newSong = await this.song.create({
      data: {
        name,
        path: relativePath,
      }
    });

    return {
      song: newSong,
    };
  }

  async findAll() {
    const songs = await this.song.findMany();
    return {
      songs,
    };
  }

  async findOne(id: string) {
    const song = await this.song.findUnique({
      where: {
        id,
      },
    });

    if (!song) {
      throw new NotFoundException(`Song with id: ${id} not found`);
    }

    return {
      song,
    };
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    const { name, plays } = updateSongDto;
    await this.findOne(id);

    try {

      const updatedSong = await this.song.update({
        where: {
          id,
        },
        data: {
          name,
          plays,
        },
      });

      return {
        song: updatedSong,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Error updating song with id: ${id}`);
    }
  }

  async remove(id: string) {
    const { song } = await this.findOne(id);

    try {
      await this.song.delete({
        where: {
          id,
        },
      });

      return {
        message: `Song with id: ${song.id} deleted successfully`,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Error deleting song with id: ${id}`);
    }
  }
}
