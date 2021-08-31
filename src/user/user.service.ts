import { BadRequestException, ConflictException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './dto/createUser.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.schema';
const bcrypt = require('bcrypt');
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<Object> {
    const { email, password } = createUserDto;
    const user = new this.userModel();

    user.email = email;
    user.password = await bcrypt.hash(password, 12);
    try {
      await user.save();
      return { user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<Object> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });

    if (!user) throw new ConflictException('email or password not correct');
    const shouldBeTrue = await bcrypt.compare(password, user.password);
    if (user && shouldBeTrue) {
      const payload: JwtPayload = { email: user.email };
      const token = this.jwtService.sign(payload);
      return { token };
    } else throw new ConflictException('email or password not correct');
  }
}
