import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ROUTESCONTROLLERS } from './routes/index.routes';
import { AppService } from './app.service';

@ApiTags('index')
@Controller({ path: ROUTESCONTROLLERS.INDEX })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'server is running' })
  getServer(): string {
    return this.appService.getServer();
  }
}
