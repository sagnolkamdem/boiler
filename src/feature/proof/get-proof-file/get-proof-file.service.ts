import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class GetProofFileService { 

    getFile(imageUrl: any, @Res() res) {
        return res.sendFile(imageUrl, { root: 'upload'});
    }
}
