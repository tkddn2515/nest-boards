import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository} from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./enum/board-status.enum";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
 async createBoard(createBoardDto: CreateBoardDto) :Promise<Board> {
  const { title, description } = createBoardDto;
  const board: Board = await this.create({
    title,
    description,
    status: BoardStatus.PUBLIC
  });
  await this.save(board);
  return board;
 }
}