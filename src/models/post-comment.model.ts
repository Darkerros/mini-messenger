import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PostModel } from './post.model';
import { UserModel } from './user.model';

interface CreationAttributes {
  content: string;
  userId: number;
}

@Table({ tableName: 'post-comment' })
export class PostCommentModel extends Model<
  PostCommentModel,
  CreationAttributes
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @BelongsTo(() => PostModel)
  post: PostModel;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @ForeignKey(() => PostModel)
  postId: number;

  @ForeignKey(() => UserModel)
  ownerId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;
}
