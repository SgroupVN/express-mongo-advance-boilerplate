import mongoose from 'mongoose';
import { LoggerFactory } from 'src/packages/logger';

export class MongooseProvider {
    #count = 3;

    /**
     * @type {string}
     */
    #connectionString;

    /**
     * @type {import('mongoose')}
     */
    #mongooseInstance = mongoose

    static builder() {
        return new MongooseProvider();
    }

    constructor(url) {
        this.#connectionString = url;
    }

    async connect() {
        let flag = false;

        try {
            await this.#mongooseInstance
                .connect(
                    this.#connectionString,
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useFindAndModify: false,
                        useCreateIndex: true
                    }
                );
            LoggerFactory.globalLogger.info('MongoDB connection success');
            flag = true;
        } catch (error) {
            LoggerFactory.globalLogger.error(error.message);
            this.#count -= 1;
        }

        setTimeout(() => {
            if (!flag && this.#count) return this.connect();
        }, 3000);
    }
}
