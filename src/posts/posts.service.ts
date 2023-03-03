import { Injectable } from '@nestjs/common';
import { PostModel } from '../models/post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel) private postsRepository: typeof PostModel,
  ) {}

  async createPost(dto: CreatePostDto) {
    return await this.postsRepository.create(dto);
  }

  async updatePost(postId: number, dto: UpdatePostDto) {
    return await this.postsRepository.update(dto, {
      where: { id: postId },
    });
  }

  async getPostById(postId: number) {
    return await this.postsRepository.findOne({ where: { id: postId } });
  }

  async getAllPosts() {
    return await this.postsRepository.findAll({ include: { all: true } });
  }
}
