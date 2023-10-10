import { LoggerFactory } from '../logger';

export class ModuleLoader {
    /**
     *
     * @type {[{
     *     asyncLoader: (() => Promise<any>)
     *     loader: (() => any)
     *     name: string
     * }]}
     */
    #loaders = [];

    static builder() {
        return new ModuleLoader();
    }

    /**
     *
     * @param loaders{[{
     *     asyncLoader: (() => Promise<any>)
     *     loader: (() => any)
     *     name: string
     * }]}
     */
    registerLoaders(loaders) {
        this.#loaders = loaders;
        return this;
    }

    async buildAsyncLoaders() {
        return Promise.all(this.#loaders.map(invoke => {
            LoggerFactory.globalLogger.info(`[${invoke?.name ?? 'Unknown'}] loaded`);

            return invoke.asyncLoader?.();
        }));
    }

    async buildLoaders() {
        return this.#loaders.forEach(invoke => {
            LoggerFactory.globalLogger.info(`[${invoke?.name ?? 'Unknown'}] loaded`);
            invoke.loader?.();
        });
    }
}
