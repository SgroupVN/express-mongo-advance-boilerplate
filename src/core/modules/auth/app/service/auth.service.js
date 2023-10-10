import pick from 'lodash/pick';
import { UnAuthorizedException, UnprocessableEntityException } from 'packages/httpException';
import { LoggerFactory } from 'packages/logger';
import { UserRepository } from '../../../user';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';
import { JwtPayload } from '../../infra/dto';

class AuthServiceImpl {
    constructor() {
        this.bcryptService = BcryptService;
        this.jwtService = JwtService;
        this.userRepository = UserRepository;
        LoggerFactory.globalLogger.info(`[${AuthServiceImpl.name}] is bundling`);
    }

    async login(loginDto) {
        const user = await this.userRepository.getAvailableByEmail(loginDto.email);
        if (user && this.bcryptService.compare(loginDto.password, user.password)) {
            return {
                user: this.#getUserInfo(user),
                accessToken: this.jwtService.sign(JwtPayload(user))
            };
        }
        throw new UnAuthorizedException('Email or password is incorrect');
    }

    async refreshPassword(refreshPasswordDto) {
        const jwtPayload = this.jwtService.decode(refreshPasswordDto.refreshPasswordToken);

        if (!jwtPayload) {
            throw new UnAuthorizedException('Invalid refreshPasswordToken to refresh password');
        }

        const currentUser = await this.userRepository.getAvailableByEmail(jwtPayload.email);

        if (!currentUser) {
            throw new UnprocessableEntityException(`User ${jwtPayload.email} is not available now. Please contact admin to reactive your account first`);
        }

        this.bcryptService.verifyComparison(refreshPasswordDto.oldPassword, currentUser.password);

        const updateDoc = {
            password: this.bcryptService.hash(refreshPasswordDto.newPassword)
        };

        if (!currentUser.isPasswordChanged) {
            updateDoc.isPasswordChanged = true;
        }

        await this.userRepository.model.updateOne({
            _id: currentUser._id
        }, updateDoc);
    }

    #getUserInfo = user => pick(user, ['_id', 'email', 'profile', 'roles', 'avatar', 'status', 'isPasswordChanged']);
}

export const AuthService = new AuthServiceImpl();
