import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ArticleCreateDTO,
  ArticleEditDTO,
  IdDTO,
  ListDTO,
} from './article.dto';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getMore(listDTO: ListDTO) {
    const { page = 1, pageSize = 10 } = listDTO;
    const articles = this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime',
      ])
      .addSelect(['tag.id', 'tag.label'])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const list = await articles;
    return list;
  }

  async getOne(idDto: IdDTO) {
    const { id } = idDto;
    const articleDetial = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .leftJoin('article.tags', 'tag')
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime',
      ])
      .addSelect(['tag.id', 'tag.label'])
      .getOne();

    if (!articleDetial) {
      throw new NotFoundException('找不到文章');
    }

    return articleDetial;
  }

  async create(article: ArticleCreateDTO): Promise<Article> {
    const result = await this.articleRepository.save(article);
    return result;
  }

  async update(articleEditDTO: ArticleEditDTO) {
    const result = await this.articleRepository.update(articleEditDTO.id, {
      title: articleEditDTO.title,
      description: articleEditDTO.description,
      content: articleEditDTO.content,
    });
    return result;
  }

  async delete(idDTO: IdDTO) {
    const res = await this.articleRepository.update(idDTO.id, {
      isDelete: true,
    });
    return res;
  }
}
