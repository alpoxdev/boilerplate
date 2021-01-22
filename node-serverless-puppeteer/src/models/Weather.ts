import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'WEATHER' })
export default class Weather extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public maxTemp: string;

    @Column()
    public minTemp: string;

    @Column()
    public avgTemp: string;

    @Column()
    public location: string;

    @Column({ type: 'datetime' })
    public date: Date;
}
