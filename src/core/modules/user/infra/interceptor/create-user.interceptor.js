import { DefaultValidatorInterceptor } from 'core/system/interceptor';
import { SOCIAL_TYPE, USER_STATUS } from 'core/constants/enum';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const createUserInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        email: JoiUtils.email().required(),
        password: JoiUtils.password().required(),
        fingerprint: JoiUtils.optionalString(),
        status: Joi.string().valid(...Object.values(USER_STATUS)).optional(),
        specializedGroupId: JoiUtils.objectId().optional(),
        profile: Joi.object().keys({
            firstName: JoiUtils.requiredString(),
            lastName: JoiUtils.requiredString(),
            birthday: Joi.date().timestamp().optional(),
            phone: JoiUtils.phoneNumber().optional(),
            hometown: JoiUtils.optionalString().trim(),
            gender: Joi.boolean().optional(),
            facebook: JoiUtils.social(SOCIAL_TYPE.FACEBOOK).optional(),
            universityId: JoiUtils.objectId().optional()
        }).optional(),
    })
);
