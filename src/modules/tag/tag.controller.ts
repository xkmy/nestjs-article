import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IdDTO, TagDTO } from './tag.dto';
import { TagService } from './tag.service';

@ApiTags('标签模块')
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @ApiOkResponse({ description: '标签列表' })
  @Get('list')
  getMore() {
    return this.tagService.getMore();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('create')
  @ApiCreatedResponse({ description: '创建标签' })
  create(@Body() tagCreateDto: TagDTO) {
    return this.tagService.create(tagCreateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('update')
  @ApiCreatedResponse({ description: '编辑标签' })
  update(@Body() tagUpdateDto: TagDTO & IdDTO) {
    return this.tagService.update(tagUpdateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('remove')
  @ApiCreatedResponse({ description: '删除标签' })
  remove(@Body() idDto: IdDTO) {
    return this.tagService.remove(idDto);
  }
}
