import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from '../models/user.model';
import { PostModel } from '../models/post.model';
import { PostLikeModel } from '../models/post-like.model';
import { PostCommentModel } from '../models/post-comment.model';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_NAME,
      models: [UserModel, PostModel, PostLikeModel, PostCommentModel],
      autoLoadModels: true,
      sync: { force: false },
      logging: false,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
