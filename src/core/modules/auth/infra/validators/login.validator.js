import { DefaultValidatorInterceptor } from 'core/system/interceptor/default-validator.interceptor';
import Joi from 'joi';
import { JoiUtils } from '../../../../utils';

export const LoginValidator = new DefaultValidatorInterceptor(
    Joi.object({
        email: JoiUtils.email().required(),
        password: JoiUtils.password().required(),
    })
);
