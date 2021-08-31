import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  condition: string;

  @IsNumber()
  priority: number;
}
