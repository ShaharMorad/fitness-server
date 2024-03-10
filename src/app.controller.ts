import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({ host: 'localhost' })
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  IsAlive(): boolean {
    return this.appService.isAlive();
  }

  @Get()
  IsDBConnected(): boolean {
    return this.appService.isDBConnected();
  }
}
