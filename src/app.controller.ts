import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Public } from './feature/auth/auth/public.strategy';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
