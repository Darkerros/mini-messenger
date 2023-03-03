import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostLikeModel } from '../models/post-like.model';

@Injectable()
export class PostsLikeService {
  constructor(
    @InjectModel(PostLikeModel)
    private postLikeRepository: typeof PostLikeModel,
  ) {}

  async putLike(userId: number, postId: number) {
    return await this.postLikeRepository.create({ userId, postId });
  }

  async deleteLike(userId: number, postId: number) {
    return await this.postLikeRepository.destroy({ where: { userId, postId } });
  }
}
