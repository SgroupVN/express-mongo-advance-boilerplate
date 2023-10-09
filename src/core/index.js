import './system/config/config-service.config';
import './system/config/restBuilder.config';
import express from 'express';
import { HttpExceptionFilter } from 'packages/httpException/HttpExceptionFilter';
import { SecurityFilter } from 'packages/authModel/core/security/SecurityFilter';
import { InvalidUrlFilter } from 'packages/handler/filter/InvalidUrlFilter';
import { AuthorizationLookup } from 'packages/authModel/module/authorization/AuthorizationLookup';
import { AuthorizationValidator } from 'packages/authModel/module/authorization/AuthorizationValidator';
import { ApiDocument } from './system/config/swagger.config';
import { AppBundle } from './system/config';
import { ModuleResolver } from './modules';

const app = express();

(async () => {
    await AppBundle
        .builder()
        .applyAppContext(app)
        .init()
        .applyGlobalFilters([new SecurityFilter()])
        .applyResolver(ModuleResolver)
        .applySwagger(ApiDocument)
        .applyGlobalFilters([new HttpExceptionFilter(), new InvalidUrlFilter()])
        .run();
    const container = await new AuthorizationLookup().collect();
    AuthorizationValidator.addAuthorizeStore(container);
})();

export default app;
