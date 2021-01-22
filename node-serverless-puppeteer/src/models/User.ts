import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Generated,
} from 'typeorm';
import { signToken } from '../services';

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity({ name: 'USER' })
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'text', nullable: true })
    public email: string;

    @Column({ nullable: false, type: 'varchar', length: '10' })
    public name: string;

    @Column()
    public profile: string;

    @Column({ nullable: true })
    public socialId: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    public role: Role;

    @Column({ nullable: true, select: false })
    public hash: string;

    @Column({ nullable: true, select: false })
    public salt: string;

    @Column({ nullable: true })
    @Generated('uuid')
    public refreshToken: string;

    public get accessToken() {
        return signToken({
            id: this.id,
            email: this.email,
            name: this.name,
            profile: this.profile,
        });
    }
}
