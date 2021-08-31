import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeStatusDto } from './dto/changeStatus.dto';
import { CreateTodoDto } from './dto/createTodo.dto';
import { Todo } from './todo.schema';

@Injectable()
export class TodoService {
  async findTodo(reqQuery: any, user): Promise<Object> {
    let { sort, ...query } = reqQuery;
    if (!sort) sort = '';
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);
    const lists = await this.todoModel
      .find({ user: user._id, ...(queryStr as {}) })
      .sort(sort.split(',').join(' '));

    return {
      status: 'success',
      data: {
        lists,
      },
    };
  }
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async createTodo(createTodoDto: CreateTodoDto, user): Promise<Object> {
    try {
      const todo = new this.todoModel({
        ...createTodoDto,
        user: user._id,
      });

      return await todo.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changeStatus(
    id: string,
    user,
    changeStatusDto: ChangeStatusDto,
  ): Promise<Object> {
    try {
      const todo = await this.todoModel.findOneAndUpdate(
        {
          user: user._id,
          _id: id,
        },
        {
          condition: changeStatusDto.condition,
        },
        {
          new: true,
        },
      );

      if (!todo) throw new NotFoundException('todo with id not found');
      return { todo };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
