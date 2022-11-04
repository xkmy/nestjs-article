import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginDTO, RegisterDTO } from './user.dto';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({ type: RegisterDTO })
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.userService.register(registerDTO);
  }

  @ApiBody({ type: LoginDTO })
  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<any> {
    return this.userService.login(loginDTO);
  }
}
