import './system/config/config-service.config';
import './system/config/restBuilder.config';
import express from 'express';
import { SecurityFilter } from 'packages/authModel/core/security/security.filter';
import { ApiDocument } from './system/config/swagger.config';
import { AppBundle } from './system/config';
import { ModuleResolver } from './modules';

const app = express();

(async () => {
    await new AppBundle(app)
        .applyResolver(ModuleResolver)
        .applySwagger(ApiDocument)
        .applyGlobalFilters([new SecurityFilter()])
        .run();
})();

export default app;
