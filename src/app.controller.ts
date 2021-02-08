import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Hello World')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({status: 200, description: 'Prints a Hello World!'})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
