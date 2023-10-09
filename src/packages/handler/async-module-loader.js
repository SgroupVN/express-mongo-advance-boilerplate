import { LoggerFactory } from '../logger';

export class AsyncModuleLoader {
    /**
     *
     * @type {[{
     *     loader: (() => Promise<any>)
     *     name: string
     * }]}
     */
    #asyncLoaders = [];

    static builder() {
        return new AsyncModuleLoader();
    }

    /**
     *
     * @param loaders{[{
     *     loader: (() => Promise<any>)
     *     name: string
     * }]}
     */
    registerAsyncLoaders(loaders) {
        this.#asyncLoaders = loaders;
        return this;
    }

    async buildAsyncLoaders() {
        return Promise.all(this.#asyncLoaders.map(invoke => {
            LoggerFactory.globalLogger.info(`[${invoke?.name ?? 'Unknown'}] loaded`);

            return invoke.loader();
        }));
    }
}
