import { Controller, Get, Param, Render } from '@nestjs/common';
import { Public } from 'src/feature/auth/auth/public.strategy';
import { RenderPayStubService } from './render-pay-stub.service';

@Controller('render')
export class RenderPayStubController {

    constructor(
        private renderPayStubService: RenderPayStubService,
    ) { }

    @Render('index')
    @Public()
    @Get(':userId')
    renderHtml(@Param('userId') userId: string) {
        return this.renderPayStubService.renderHtml(userId);
    }
}
