import { City } from "src/city/entities/city.entity";
import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class State {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	name: string;

	@Column()
	initials: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@OneToMany(() => City, city => city.state)
	cities: City[];
}
