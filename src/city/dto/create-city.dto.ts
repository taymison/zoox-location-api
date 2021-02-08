import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ObjectID } from "mongodb";

export class CreateCityDto {
	@ApiProperty({ type: 'string', maxLength: 128,  example: 'Rio de Janeiro'})
	@IsNotEmpty()
	@IsString()
	@MaxLength(128)
	name: string;

	@ApiProperty({ type: 'string', example: '60218473d8fe93e3cce9aeac' })
	@IsNotEmpty()
	@IsMongoId()
	stateId: ObjectID
}
