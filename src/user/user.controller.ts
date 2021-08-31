import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<Object> {
    return this.userService.signup(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<Object>{
    return this.userService.login(loginUserDto);
  }
}
