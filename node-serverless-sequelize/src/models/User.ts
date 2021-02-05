import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    AutoIncrement,
    PrimaryKey,
    DataType,
    Default,
    DeletedAt,
    HasMany,
} from 'sequelize-typescript';

import { nanoid } from 'nanoid';
import { Board } from '.';
import { signToken } from '../services';

export enum UserRole {
    user = 'USER',
    admin = 'ADMIN',
}
@Table({
    tableName: 'user',
    timestamps: true,
})
export class User extends Model {
    @Default(() => nanoid())
    @PrimaryKey
    @Column
    public id: string;

    @Column
    public nickname: string;

    @Column
    public email: string;

    @Column(DataType.TEXT)
    public profile: string;

    @Column(DataType.TEXT)
    hash: string;

    @Column(DataType.TEXT)
    salt: string;

    @Default(UserRole.user)
    @Column(DataType.ENUM(UserRole.user, UserRole.admin))
    public role: UserRole;

    @HasMany((type) => Board, 'id')
    public boards: Board[];

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @DeletedAt
    public deletedAt: Date;

    public get accessToken() {
        return signToken({
            id: this.id,
            email: this.email,
            nickname: this.nickname,
            profile: this.profile,
        });
    }
}
