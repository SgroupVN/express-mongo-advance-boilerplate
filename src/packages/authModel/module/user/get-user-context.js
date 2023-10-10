import { AUTH_CONTEXT } from '../../common/enum/auth-context';

export function getUserContext(req) {
    return req[AUTH_CONTEXT.KEY_AUTH_CONTEXT];
}
