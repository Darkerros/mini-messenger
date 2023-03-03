import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostCommentModel } from '../models/post-comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class PostsCommentService {
  constructor(
    @InjectModel(PostCommentModel)
    private postCommentRepository: typeof PostCommentModel,
  ) {}

  async createComment(dto: CreateCommentDto) {
    return await this.postCommentRepository.create(dto);
  }

  async updateComment(userId: number, commentId: number, content: string) {
    return await this.postCommentRepository.update(
      { content },
      { where: { ownerId: userId, id: commentId } },
    );
  }

  async deleteComment(userId: number, commentId: number) {
    return await this.postCommentRepository.destroy({
      where: { ownerId: userId, id: commentId },
    });
  }
}
