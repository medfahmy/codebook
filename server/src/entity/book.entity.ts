import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cells: string;

    @Column()
    order: string;
}
