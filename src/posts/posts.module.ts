import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostModel } from '../models/post.model';
import { PostLikeModel } from '../models/post-like.model';
import { PostCommentModel } from '../models/post-comment.model';
import { AuthModule } from '../auth/auth.module';
import { PostsLikeService } from './posts-like.service';
import { PostsCommentService } from './posts-comment.service';

@Module({
  providers: [PostsService, PostsLikeService, PostsCommentService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([PostModel, PostLikeModel, PostCommentModel]),
    AuthModule,
  ],
})
export class PostsModule {}
