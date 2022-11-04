import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdDTO, TagDTO } from './tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getMore() {
    const getList = this.tagRepository
      .createQueryBuilder('tag')
      .where({ isDelete: false })
      .select(['tag.id', 'tag.label'])
      .getMany();
    const result = await getList;
    return result
  }

  async create(tagDto: TagDTO) {
    const { label } = tagDto;
    const hasTag = await this.tagRepository.findOneBy({ label });
    if (hasTag) throw new NotFoundException(`${label}标签已存在`);
    const tag = new Tag();
    tag.label = tagDto.label;
    const result = await this.tagRepository.save(tag);
    return result
  }

  async update(tagUpdateDto: TagDTO & IdDTO) {
    const { id, label } = tagUpdateDto;
    const tag = await this.tagRepository.update(id, { label });
    return tag;
  }

  async remove(idDto: IdDTO) {
    const { id } = idDto;
    const tag = await this.tagRepository.update(id, { isDelete: true });
    return tag;
  }
}
