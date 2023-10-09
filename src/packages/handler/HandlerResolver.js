import express from 'express';
import {AsyncModuleLoader} from "./async-module-loader";

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
    async resolve() {
        await Promise.all(this.#modules.map(module => {
            if (module instanceof AsyncModuleLoader) {
                return module.buildAsyncLoaders();
            }

            module.build(this.#globalRouter);
            module.buildSwagger(this.#swagger);
            return module;
        }));
        return this.#globalRouter;
    }
}
