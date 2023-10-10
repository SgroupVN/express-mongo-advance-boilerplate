import express from 'express';
import { ModuleLoader } from './module-loader';

export class HandlerResolver {
    #globalRouter = express.Router();

    /**
     * @type {import('../swagger/core/core')} swagger instance
     */
    #swagger;

    #modules;

    static builder() {
        return new HandlerResolver();
    }

    /**
     *
     * @param {[import('./Module').Module]} modules
     */
    addModule(modules) {
        this.#modules = modules;
        return this;
    }

    addSwaggerBuilder(swagger) {
        this.#swagger = swagger;
        return this;
    }

    /**
     *
     * @returns {import('express').Router}
     */
    resolve() {
        this.#modules.map(module => {
            if (module instanceof ModuleLoader) {
                return module.buildLoaders();
            }

            module.build(this.#globalRouter);
            module.buildSwagger(this.#swagger);
            return module;
        });

        return this.#globalRouter;
    }

    async resolveAsync() {
        await Promise.all(this.#modules.map(module => {
            if (module instanceof ModuleLoader) {
                return module.buildAsyncLoaders();
            }

            return module;
        }));
    }
}
