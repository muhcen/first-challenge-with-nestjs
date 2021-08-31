import { Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChangeStatusDto } from './dto/changeStatus.dto';
import { CreateTodoDto } from './dto/createTodo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post('/')
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req,
  ): Promise<Object> {
    const user = req.user;
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Get('/')
  findTodo(@Query() reqQuery, @Req() req): Promise<Object> {
    const user = req.user;
    return this.todoService.findTodo(reqQuery, user);
  }

  @Post('/changeStatus/:id')
  changeStatus(
    @Param('id') id: string,
    @Req() req,
    @Body() changeStatusDto: ChangeStatusDto,
  ): Promise<Object> {
    const user = req.user;
    return this.todoService.changeStatus(id, user, changeStatusDto);
  }
}
