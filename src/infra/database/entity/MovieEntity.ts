import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  year!: number;

  @Column()
  title!: string;

  @Column()
  studios!: string;

  @Column()
  producers!: string;

  @Column({ default: false })
  winner!: boolean;
}
