import { Controller, Body, Query, Get, Post, UseGuards } from '@nestjs/common';
import {
  ArticleCreateDTO,
  ArticleEditDTO,
  IdDTO,
  ListDTO,
} from './article.dto';
import { ArticleService } from './article.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  getMore(@Query() listDTO: ListDTO) {
    return this.articleService.getMore(listDTO);
  }

  @Get('info')
  getOne(@Query() idDto: IdDTO) {
    return this.articleService.getOne(idDto);
  }

  // 用户身份校验
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @ApiBearerAuth()
  create(@Body() article: ArticleCreateDTO) {
    return this.articleService.create(article);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('edit')
  update(@Body() articleEditDTO: ArticleEditDTO) {
    console.log('articleEditDTO',articleEditDTO)
    return this.articleService.update(articleEditDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
  delete(@Body() idDto: IdDTO) {
    return this.articleService.delete(idDto);
  }
}
