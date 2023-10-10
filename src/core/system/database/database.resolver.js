import { ConfigService } from 'packages/config/config.service';
import { MongooseProvider } from './mongoose.provider';
import { ModuleLoader } from '../../../packages/handler/module-loader';

export const DatabaseProvider = ModuleLoader.builder().registerLoaders([
    {
        asyncLoader: () => new MongooseProvider(ConfigService.getSingleton().get('DATABASE_URL'))
            .connect(),
        name: 'MongooseProvider'
    }
]);
