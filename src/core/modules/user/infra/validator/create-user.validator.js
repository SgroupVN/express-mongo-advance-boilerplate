import { USER_STATUS } from 'core/constants/enum';
import { BadRequestException } from 'packages/httpException';

/**
 * @author dnphu
 */
class CreateUserValidatorImpl {
    async validate(user) {
        if (user?.status === USER_STATUS.SUSPEND) {
            throw new BadRequestException('This account is not available at the moment');
        }
    }
}

export const CreateUserValidator = new CreateUserValidatorImpl();
