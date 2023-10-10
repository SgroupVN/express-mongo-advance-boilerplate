import { JwtGuard } from '../../module/authentication/jwt.guard';
import { InValidHttpResponse } from '../../../handler';

export class SecurityFilter {
    #jwtGuard = new JwtGuard();

    filter = (req, res, next) => {
        try {
            this.#jwtGuard.access(req);
        } catch (e) {
            return new InValidHttpResponse(e.status, e.code, e.message)
                .toResponse(res);
        }

        return next();
    }
}
