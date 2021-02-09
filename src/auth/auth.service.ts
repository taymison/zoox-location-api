import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
	constructor(private configService: ConfigService) {}

	validateApiKey(apikey: string): boolean {
		return apikey === this.configService.get<string>('API_KEY');
	}
}
