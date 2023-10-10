import { ConfigService } from 'packages/config/config.service';
import { SwaggerBuilder } from '../../../packages/swagger';
import { ModuleLoader } from '../../../packages/handler/module-loader';

export const ApiDocument = new SwaggerBuilder();

export const SwaggerProvider = ModuleLoader.builder().registerLoaders([{
    loader: () => ApiDocument.addConfig({
        openapi: '3.0.1',
        info: {
            version: '1.0.0',
            title: 'APIs Document',
            description: 'API description',
            termsOfService: '',
            contact: {
                name: 'Backend S-group',
                email: 'laptrinh-sgroup@gmail.com',
            },
        },
        servers: [
            {
                url: `${ConfigService.getSingleton().get('HOST')}/api`,
                description: 'Local server',
                variables: {
                    env: {
                        default: 'app-dev',
                        description: 'DEV Environment',
                    },
                    port: {
                        enum: [
                            '8443',
                            '5000',
                            '443',
                        ],
                        default: ConfigService.getSingleton().get('PORT'),
                    },
                    basePath: {
                        default: 'api',
                    },
                },
            },
        ],
        basePath: '/api',
        auth: true,
    }).resolve(),
    name: 'SwaggerProvider'
}]);
