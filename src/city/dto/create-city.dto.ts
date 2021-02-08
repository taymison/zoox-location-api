import { IsMongoId, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ObjectID } from "mongodb";

export class CreateCityDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(128)
	name: string;

	@IsNotEmpty()
	@IsMongoId()
	stateId: ObjectID
}
