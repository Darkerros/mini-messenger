import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';
import { PostLikeModel } from './post-like.model';
import { PostCommentModel } from './post-comment.model';

interface CreationAttributes {
  content: string;
  image: string;
  ownerId: number;
}

@Table({ tableName: 'posts' })
export class PostModel extends Model<PostModel, CreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @ForeignKey(() => UserModel)
  ownerId: number;

  @BelongsTo(() => UserModel)
  owner: UserModel;

  @BelongsToMany(() => UserModel, () => PostLikeModel)
  likes: UserModel[];

  @HasMany(() => PostCommentModel)
  comments: PostCommentModel[];
}
