import {
    Table,
    Model,
    Column,
    PrimaryKey,
    DataType,
    Default,
    BelongsTo,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    ForeignKey,
} from 'sequelize-typescript';
import { nanoid } from 'nanoid';

export enum ContentType {
    html = 'HTML',
    markdown = 'MARKDOWN',
}

import { User } from '.';

@Table({ tableName: 'board' })
export class Board extends Model {
    @Default(() => nanoid())
    @PrimaryKey
    @Column
    public id: string;

    @Column(DataType.TEXT)
    public title: string;

    @Column(DataType.TEXT)
    public subtitle: string;

    @Column(DataType.TEXT)
    public content: string;

    @Column(DataType.ENUM(ContentType.html, ContentType.markdown))
    public contentType: string;

    @ForeignKey(() => User)
    @Column
    public userId: number;

    @BelongsTo(() => User, 'id')
    public user: User;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @DeletedAt
    public deletedAt: Date;
}
