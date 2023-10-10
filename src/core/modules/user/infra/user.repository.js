import { UserModel } from '../domain/model/user.model';

class UserRepositoryImpl {
    model = UserModel

    create(document) {
        return this.model.create(document);
    }

    getAvailableByEmail(email) {
        return this.model.findOne({ email, deletedAt: null });
    }

    getByEmail(email) {
        return this.model.findOne({ email });
    }

    getDetailById(id) {
        return this.model.findById(id,
            ['_id', 'email', 'profile', 'status', 'avatar'],
            { timestamps: true });
    }

    getDetectingPasswordInfo(id) {
        return this.model.findById(
            id,
            '_id password remainingLoginTimes isPasswordChanged',
            {
                deletedAt: {
                    $eq: null
                }
            }
        );
    }

    softDeleteById(id) {
        return this.model.updateOne(id, { deletedAt: new Date() });
    }
}

export const UserRepository = new UserRepositoryImpl();
