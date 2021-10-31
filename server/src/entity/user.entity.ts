import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: 0 })
    tokenVersion: number;
}
