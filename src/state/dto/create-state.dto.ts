import { IsNotEmpty, IsString, IsUppercase, MaxLength } from "class-validator";

export class CreateStateDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(128)
	name: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(2)
	@IsUppercase()
	initials: string;
}
