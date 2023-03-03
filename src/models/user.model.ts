import {
  BelongsToMany,
  Column,
  DataType, HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import {PostModel} from "./post.model";
import {PostLikeModel} from "./post-like.model";

interface CreateAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
}

@Table({ tableName: `users` })
export class UserModel extends Model<UserModel, CreateAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: true })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;

  @HasMany(() => PostModel)
  postOwners: PostModel[];

  @BelongsToMany(() => PostModel, () => PostLikeModel)
  likes: PostModel[];
}
