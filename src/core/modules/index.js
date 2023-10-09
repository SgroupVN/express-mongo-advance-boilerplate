import { HandlerResolver } from 'packages/handler/HandlerResolver';
import { UserResolver } from './user/user.resolver';
import { AuthResolver } from './auth/auth.resolver';
import { ApiDocument } from '../system/config/swagger.config';
import { ExcelResolver } from './document/excel.resolver';
import { MediaResolver } from './document/media.resolver';

export const ModuleResolver = HandlerResolver
    .builder()
    .addSwaggerBuilder(ApiDocument)
    .addModule([
        UserResolver,
        AuthResolver,
        ExcelResolver,
        MediaResolver,
    ]);
