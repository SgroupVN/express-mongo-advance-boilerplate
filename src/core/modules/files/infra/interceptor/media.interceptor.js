import { ROOT_DIR } from 'core/constants/env.constant';
import { FileProcessor } from './multer.interceptor';
import { MulterUploader } from '../../app/multer.handler';

export class MediaInterceptor extends FileProcessor {
    constructor(fileQuantity = 1) {
        super(new MulterUploader(
            ['.png', '.jpg', '.jpeg'],
            'image',
            fileQuantity,
            `${ROOT_DIR}/core/system/uploads/media`
        ));
    }
}
