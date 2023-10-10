import { ForgotPassword, LoginDto } from 'core/modules/auth/index';
import { AuthService } from 'core/modules/auth/app/service/auth.service';
import { ValidHttpResponse } from 'packages/handler/response';

class AuthControllerImpl {
    constructor() {
        this.service = AuthService;
    }

    login = async req => {
        const data = await this.service.login(LoginDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
    }

    refreshPassword = async req => {
        await this.service.refreshPassword(ForgotPassword(req.body));
        return ValidHttpResponse.toNoContentResponse();
    }
}

export const AuthController = new AuthControllerImpl();
