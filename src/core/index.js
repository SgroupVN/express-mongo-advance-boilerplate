import './system/config/config-service.config';
import './system/config/restBuilder.config';
import express from 'express';
import { ApiDocument } from './system/config/swagger.config';
import { AppBundle } from './system/config';
import { ModuleResolver } from './modules';

const app = express();

(async () => {
    await new AppBundle(app)
        .addModuleResolver(ModuleResolver)
        .addSwagger(ApiDocument)
        .run();
})();

export default app;
