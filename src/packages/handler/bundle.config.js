// @ts-check
import * as express from 'express';
import methodOverride from 'method-override';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { InvalidResolver } from 'packages/handler/system';
import { ConfigService } from 'packages/config/config.service';
import { LoggerFactory } from 'packages/logger/factory/logger.factory';
import { InvalidUrlFilter } from './filter';
import { SecurityFilter } from '../authModel/core/security/SecurityFilter';
import { HttpExceptionFilter } from '../httpException/HttpExceptionFilter';


export class AppBundle {
    BASE_PATH = '/api';

    BASE_PATH_SWAGGER = '/docs';

    #resolver;

    #swaggerInstance;

    /**
     * @param {import("express-serve-static-core").Express} app
     */
    constructor(app) {
        LoggerFactory.globalLogger.info('App is starting bundling');

        this.app = app;
        this.init();
    }

    addModuleResolver(resolver) {
        if (!resolver['resolve']) {
            throw new InvalidResolver(resolver);
        }

        this.#resolver = resolver;
        return this;
    }

    addSwagger(swaggerBuilder) {
        this.#swaggerInstance = swaggerBuilder.instance;
        return this;
    }

    /**
     * Default config
     */
    init() {
        LoggerFactory.globalLogger.info(`Application is in mode [${ConfigService.getSingleton().get('NODE_ENV')}]`);
        /**
         * Setup basic express
         */
        this.app.use(cors({
            origin: ConfigService.getSingleton().get('CORS_ALLOW'),
            optionsSuccessStatus: 200
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        /**
         * Setup method override method to use PUT, PATCH,...
         */
        this.app.use(methodOverride('X-HTTP-Method-Override'));
        this.app.use(
            methodOverride(req => {
                if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                    const method = req.body._method;
                    delete req.body._method;

                    return method;
                }

                return undefined;
            }),
        );
        LoggerFactory.globalLogger.info('Building initial config');

        return this;
    }

    /*
    Setup asynchronous config here
     */
    async run() {
        LoggerFactory.globalLogger.info('Building asynchronous config');

        this.app.use(new SecurityFilter().filter);

        const resolvedModules = this.#resolver.resolve();

        this.app.use(this.BASE_PATH, resolvedModules);
        this.app.use(
            this.BASE_PATH_SWAGGER,
            swaggerUi.serve,
            swaggerUi.setup(this.#swaggerInstance)
        );
        LoggerFactory.globalLogger.info('Building swagger');
        LoggerFactory.globalLogger.info(`Swagger hosted at ${this.BASE_PATH_SWAGGER}`);

        this.app.use(new InvalidUrlFilter().filter);
        this.app.use(new HttpExceptionFilter().filter);

        await this.#resolver.resolveAsync();
    }
}
