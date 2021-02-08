import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUppercase, MaxLength } from "class-validator";

export class CreateStateDto {
	@ApiProperty({ type: 'string', maxLength: 128,  example: 'Rio de Janeiro'})
	@IsNotEmpty()
	@IsString()
	@MaxLength(128)
	name: string;

	@ApiProperty({ type: 'string', maxLength: 2,  example: 'RJ', pattern: '/^[A-Z]{2}$/'})
	@IsNotEmpty()
	@IsString()
	@MaxLength(2)
	@IsUppercase()
	initials: string;
}
