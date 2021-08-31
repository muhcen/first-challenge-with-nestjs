import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrtegy } from './local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: { expiresIn: 90 * 24 * 60 * 60 },
    }),
  ],
  controllers: [UserController],
  providers: [JwtStrtegy, UserService],
  exports: [JwtStrtegy, PassportModule],
})
export class UserModule {}
