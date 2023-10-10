import { decode } from 'jsonwebtoken';
import { UnAuthorizedException } from '../../../httpException';
import { AUTH_CONTEXT } from '../../common/enum/auth-context';

export class JwtValidator {
    validate(token) {
        if (!token) {
            return '';
        }

        const accessToken = token.startsWith(AUTH_CONTEXT.PREFIX_HEADER)
            ? token.slice(7)
            : token;

        try {
            return decode(accessToken);
        } catch (e) {
            throw new UnAuthorizedException();
        }
    }
}
