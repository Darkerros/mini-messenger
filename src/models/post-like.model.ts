import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import { UserModel } from './user.model';
import { PostModel } from './post.model';

interface CreationAttributes {
  userId: number;
  postId: number;
}

@Table({ tableName: 'posts-like' })
export class PostLikeModel extends Model<PostLikeModel, CreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => UserModel)
  userId: number;
  @ForeignKey(() => PostModel)
  postId: number;
}
