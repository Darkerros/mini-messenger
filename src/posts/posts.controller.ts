import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../decorators/user';
import { PostsLikeService } from './posts-like.service';
import { PostsCommentService } from './posts-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('api/posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private postsLikeService: PostsLikeService,
    private postsCommentService: PostsCommentService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async createPost(@Body() dto: CreatePostDto, @User() user: any) {
    const dtoWithOwner = { ...dto, ownerId: Number(user.id) };
    return await this.postsService.createPost(dtoWithOwner);
  }

  @Get('/all')
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get('/:id')
  async getPostById(@Param('id') postId: number) {
    return await this.postsService.getPostById(postId);
  }

  @UseGuards(AuthGuard)
  @Put('like/:id')
  async putLike(@Param('id') postId: number, @User() user: any) {
    return await this.postsLikeService.putLike(user.id, postId);
  }

  @UseGuards(AuthGuard)
  @Delete('like/:id')
  async deleteLike(@Param('id') postId: number, @User() user: any) {
    return await this.postsLikeService.deleteLike(user.id, postId);
  }

  @UseGuards(AuthGuard)
  @Post('comment')
  async createComment(@Body() dto: CreateCommentDto, @User() user: any) {
    const commentDto = { ...dto, ownerId: user.id };
    return await this.postsCommentService.createComment(commentDto);
  }

  @UseGuards(AuthGuard)
  @Delete('comment/:id')
  async deleteComment(@Param('id') commentId: number, @User() user: any) {
    return await this.postsCommentService.deleteComment(user.id, commentId);
  }
}
