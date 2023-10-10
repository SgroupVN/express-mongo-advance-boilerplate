import { HandlerResolver } from 'packages/handler/HandlerResolver';
import { UserResolver } from './user/infra/user.resolver';
import { AuthResolver } from './auth/infra/auth.resolver';
import { ApiDocument, SwaggerProvider } from '../system/config/swagger.config';
import { ExcelResolver } from './files/infra/excel.resolver';
import { DatabaseProvider } from '../system/database/database.resolver';

export const ModuleResolver = HandlerResolver
    .builder()
    .addSwaggerBuilder(ApiDocument)
    .addModule([
        UserResolver,
        AuthResolver,
        ExcelResolver,
        DatabaseProvider,
        SwaggerProvider
    ]);
