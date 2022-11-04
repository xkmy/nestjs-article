import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { REG_NUMBER } from 'src/utilts/regex';

export class TagDTO {
  @IsNotEmpty()
  label: string;
}

export class IdDTO {
  @ApiProperty({
    description: '标签 id',
    example: 1,
  })
  @Matches(REG_NUMBER, { message: '请输入有效 id' })
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
}
