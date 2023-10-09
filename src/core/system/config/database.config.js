import mongoose from 'mongoose';
import { ConfigService } from 'packages/config/config.service';
import { MongooseProvider } from '../../modules/mongoose/mongoose.provider';
import { AsyncModuleLoader } from '../../../packages/handler/async-module-loader';

export const DatabaseProvider = AsyncModuleLoader.builder().registerAsyncLoaders([
    {
        loader: () => MongooseProvider
            .builder()
            .setConnectionString(ConfigService.getSingleton().get('DATABASE_URL'))
            .setMongooseInstance(mongoose)
            .connect(),
        name: 'MongooseProvider'
    }
]);
