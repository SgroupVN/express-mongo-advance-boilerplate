import { ValidHttpResponse } from 'packages/handler';

class Controller {
    uploadOne = async req => {
        console.log('req.file', req.file);
        return ValidHttpResponse.toNoContentResponse();
    }
}

export const ExcelController = new Controller();
