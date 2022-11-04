import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { REG_MOBILE } from 'src/utilts/regex';

export class RegisterDTO {
  @ApiProperty({
    description: '手机号，唯一',
    example: '18888888888',
  })
  @Matches(REG_MOBILE, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  readonly mobile: string;

  @ApiProperty({
    description: '用户名',
    example: 'xkmy',
  })
  @IsNotEmpty({ message: '请输入用户昵称' })
  @IsString({ message: '名字必须是 String 类型' })
  readonly username: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}

export class LoginDTO {
  @ApiProperty({
    description: '手机号，唯一',
    example: '18888888888',
  })
  @Matches(REG_MOBILE, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  readonly mobile: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}
