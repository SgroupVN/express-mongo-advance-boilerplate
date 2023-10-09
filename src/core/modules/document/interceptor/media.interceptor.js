import { ROOT_DIR } from 'core/constants/env.constant';
import { BaseMulterInterceptor } from './multer.interceptor';
import { MulterUploader } from '../multer.handler';

export class MediaInterceptor extends BaseMulterInterceptor {
    constructor(fileQuantity = 1) {
        super(new MulterUploader(
            ['.png', '.jpg', '.jpeg'],
            'image',
            fileQuantity,
            `${ROOT_DIR}/core/system/uploads/media`
        ));
    }
}
