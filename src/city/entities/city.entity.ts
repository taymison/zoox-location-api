import { State } from "src/state/entities/state.entity";
import { Entity, ObjectIdColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { ObjectID } from 'mongodb';

@Entity()
export class City {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	name: string;

	@Column()
	stateId: ObjectID;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@ManyToOne(() => State, state => state.cities)
	state: State;
}
