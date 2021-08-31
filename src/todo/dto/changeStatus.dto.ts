import { IsNotEmpty } from 'class-validator';

export class ChangeStatusDto {
  @IsNotEmpty()
  condition: string;
}
