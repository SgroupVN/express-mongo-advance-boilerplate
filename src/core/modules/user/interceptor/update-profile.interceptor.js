import { DefaultValidatorInterceptor } from 'core/system/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';
import { SOCIAL_TYPE } from 'core/constants/enum/social.enum';
import { USER_STATUS } from 'core/constants/enum';

export const updateProfileInterceptor = new DefaultValidatorInterceptor(
    Joi.object().keys({
        status: Joi.string().valid(...Object.values(USER_STATUS)).optional(),
        specializedGroupId: JoiUtils.objectId().optional(),
        profile: Joi.object({
            firstName: JoiUtils.optionalString().trim().min(0),
            lastName: JoiUtils.optionalString().trim().min(0),
            gender: Joi.boolean().optional(),
            universityId: JoiUtils.objectId().optional(),
            birthday: Joi.date().timestamp().optional(),
            phone: JoiUtils.phoneNumber().optional(),
            hometown: JoiUtils.optionalString().trim(),
            facebook: JoiUtils.social(SOCIAL_TYPE.FACEBOOK).optional(),
        })
    })
);
