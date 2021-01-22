import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum LogType {
    WEATHER = 'weather',
}

@Entity({ name: 'LOG' })
export default class Log extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'enum', enum: LogType, default: LogType.WEATHER })
    public type: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    public lastUpdated: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;
}
