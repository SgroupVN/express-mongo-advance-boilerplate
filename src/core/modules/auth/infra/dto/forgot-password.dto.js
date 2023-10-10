import { ApiDocument } from 'core/system/config/swagger.config';
import { ChangePasswordDto } from 'core/modules/user/infra/dto/change-password.dto';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('ForgotPasswordDto',
    {
        email: SwaggerDocument.ApiProperty({ type: 'string' }),
    });

ApiDocument.addModel('ChangePasswordDto',
    {
        refreshPasswordToken: SwaggerDocument.ApiProperty({ type: 'string' }),
        oldPassword: SwaggerDocument.ApiProperty({ type: 'string' }),
        newPassword: SwaggerDocument.ApiProperty({ type: 'string' }),
    });

export function ForgotPassword(body) {
    return {
        refreshPasswordToken: body.refreshPasswordToken,
        ...ChangePasswordDto(body)
    };
}
