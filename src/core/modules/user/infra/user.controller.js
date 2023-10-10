import { CreateUserDto, UserService } from 'core/modules/user/index';
import { ValidHttpResponse } from 'packages/handler/response';

class Controller {
    constructor() {
        this.service = UserService;
    }

    createOne = async req => {
        const data = await this.service.createOne(CreateUserDto(req.body));
        return ValidHttpResponse.toCreatedResponse(data);
    }

    findOne = async req => {
        const data = await this.service.findOne(req.params.id);
        return ValidHttpResponse.toOkResponse(data);
    }

    deleteOne = async req => {
        await this.service.deleteOne(req.params.id);
        return ValidHttpResponse.toNoContentResponse();
    }
}

export const UserController = new Controller();
