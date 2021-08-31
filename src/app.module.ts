import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/test', {
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    UserModule,
    TodoModule,
  ],
})
export class AppModule {}
