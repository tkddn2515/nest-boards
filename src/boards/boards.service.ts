import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './enum/board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private readonly boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board> {
    const board: Board = await this.boardRepository.findOne({
      where: {
        id,
      },
    });
    if (!board) {
      throw new NotFoundException(`Not found board with id ${id}`);
    }
    return board;
  }

  async deleteBoardById(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    console.log(result);
    if(result.affected === 0) {
      throw new NotFoundException(`Not found board with id ${id}`);
    }
    // remove : 데이터베이스에 없으면 에러
    // delete : 데이터베이스에 없어도 에러는 안뜸
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
}
