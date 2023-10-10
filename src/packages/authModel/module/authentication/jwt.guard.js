import { AUTH_CONTEXT } from '../../core/auth-context';
import { JwtValidator } from './jwt.validator';
import { UserDetail } from '../user';

export class JwtGuard {
    access(req) {
        const token = req.headers[AUTH_CONTEXT.AUTHORIZATION_HEADER];

        if (!token) {
            return '';
        }

        const body = new JwtValidator().validate(token);

        req[AUTH_CONTEXT.KEY_AUTH_CONTEXT] = new UserDetail(body);
    }
}
