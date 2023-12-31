import { USER_STATUS } from 'core/constants/enum';
import { SwaggerDocument } from '../../../../../packages/swagger';
import { ApiDocument } from '../../../../system/config/swagger.config';

ApiDocument.addModel('UpdateProfileDto',
    {
        profile: SwaggerDocument.ApiProperty({ type: 'model', model: 'Profile' }),
        status: SwaggerDocument.ApiProperty({ type: 'enum', model: USER_STATUS }),
    });

export const UpdateProfileDto = body => ({
    status: body.status,
    profile: {
        firstName: body.profile?.firstName,
        lastName: body.profile?.lastName,
        gender: body.profile?.gender,
        birthday: body.profile?.birthday,
        phone: body.profile?.phone,
        hometown: body.profile?.hometown,
        facebook: body.profile?.facebook,
        universityId: body.profile?.universityId,
    }
});
