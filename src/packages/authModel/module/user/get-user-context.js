import { AUTH_CONTEXT } from '../../core/auth-context';

export function getUserContext(req) {
    return req[AUTH_CONTEXT.KEY_AUTH_CONTEXT];
}
