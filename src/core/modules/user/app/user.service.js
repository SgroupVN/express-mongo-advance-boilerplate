import { DuplicateException, InternalServerException, NotFoundException } from 'packages/httpException';
import { BcryptService } from 'core/modules/auth/app/service/bcrypt.service';
import { UserRepository } from '../infra/user.repository';
import { CreateUserValidator } from '../infra/validator';
import { mapToModelByUserCreationDto } from './mapper/user.mapper';

class UserServiceImpl {
    constructor() {
        this.repository = UserRepository;
        this.bcryptService = BcryptService;
        this.createUserValidator = CreateUserValidator;
    }

    /**
     * @param {import('core/modules/user/index').CreateUserDto} createUserDto
     * @returns
     */
    async createOne(createUserDto) {
        const user = await this.repository.getByEmail(createUserDto.email);

        if (user) {
            throw new DuplicateException('Email is being used');
        }

        await this.createUserValidator.validate(user);

        createUserDto.password = this.bcryptService.hash(createUserDto.password);

        const creationModel = mapToModelByUserCreationDto(createUserDto);

        try {
            const createdUser = await this.repository.create(creationModel);
            return { _id: createdUser._id };
        } catch (e) {
            throw new InternalServerException('Getting internal error during create new user');
        }
    }

    async findOne(id) {
        const user = await this.repository.getDetailById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    deleteOne(id) {
        return this.repository.softDeleteById(id);
    }
}

export const UserService = new UserServiceImpl();
