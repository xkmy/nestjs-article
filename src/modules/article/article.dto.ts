import { Matches, IsNotEmpty } from 'class-validator';
import { REG_NUMBER } from 'src/utilts/regex';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '../tag/tag.entity';

export class ListDTO {
  @Matches(REG_NUMBER, { message: 'page 不可小于 0' })
  readonly page: number;

  @Matches(REG_NUMBER, { message: 'pageSize 不可小于 0' })
  readonly pageSize: number;
}

export class IdDTO {
  @ApiProperty({
    description: '文章id',
    example: 1,
  })
  @Matches(REG_NUMBER, { message: '请输入有效 id' })
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
}

export class ArticleCreateDTO {
  @ApiProperty({
    description: '文章标题',
    example: '这是标题',
  })
  @IsNotEmpty({ message: '请输入文章标题' })
  readonly title: string;

  @ApiProperty({
    description: '文章描述',
    example: '这是描述',
  })
  @IsNotEmpty({ message: '请输入文章描述' })
  readonly description: string;

  @ApiProperty({
    description: '文章内容',
    example: '这是文章内容',
  })
  @IsNotEmpty({ message: '请输入文章内容' })
  readonly content: string;

  /**
   * 标签
   * @example  [{id: 1}]
   */
  readonly tags?: Tag[];
}

export class ArticleEditDTO extends ArticleCreateDTO {
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
}
