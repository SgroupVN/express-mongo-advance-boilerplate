import { ROOT_DIR } from 'core/constants/env.constant';
import { FileProcessor } from './multer.interceptor';
import { MulterUploader } from '../../app/multer.handler';

export class ExcelInterceptor extends FileProcessor {
    constructor(fileQuantity = 1) {
        super(new MulterUploader(
            '.xlsx',
            'excel',
            fileQuantity,
            `${ROOT_DIR}/core/system/uploads/excel`
        ));
    }
}
