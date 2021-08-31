import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema()
export class Todo extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: ['open', 'close'], default: 'open' })
  condition: string;

  @Prop()
  priority: number;

  @Prop({ type: User })
  user: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };

  @Prop({ type: Date, default: Date.now() })
  date: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
