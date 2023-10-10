// @ts-check
import { compare, hash, genSalt } from 'bcryptjs';
import { LoggerFactory } from 'packages/logger/factory';
import { ConfigService } from 'packages/config/config.service';

class BcryptServiceImpl {
    saltRounds;

    constructor() {
        this.saltRounds = Number.parseInt(ConfigService.getSingleton().get('SALT_ROUNDS'), 10);
        LoggerFactory.globalLogger.info(`[${BcryptServiceImpl.name}] is bundling`);
    }

    /**
     * @param {string} str normal string
     * @param {string} hashed hashed string
     */
    compare(str, hashed) {
        return compare(str, hashed);
    }

    /**
     * @param {string} str to be hashed
     */
    hash(str) {
        const salt = genSalt(this.saltRounds);

        return hash(str, salt);
    }
}

export const BcryptService = new BcryptServiceImpl();
