import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { TodoController } from './todo.controller';
import { Todo, TodoSchema } from './todo.schema';
import { TodoService } from './todo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
