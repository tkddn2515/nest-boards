import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
