import { Controller, Get, Param, Res } from '@nestjs/common';
import { Public } from 'src/feature/auth/auth/public.strategy';

@Controller('proofFile')
export class GetProofFileController {

    @Public()
    @Get(":imageUrl")
    getFile(@Param("imageUrl") imageUrl: any, @Res() res) {
        return res.sendFile(imageUrl, { root: 'upload'});
    }
}
