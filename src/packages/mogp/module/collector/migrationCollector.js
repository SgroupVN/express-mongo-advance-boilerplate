import { ClassScanner } from 'packages/scanner/core/container';
import { MogpConfig } from 'packages/mogp/core/config';

export class MigrationCollector extends ClassScanner {
    pattern = MogpConfig.getConfig().pathMigration;
}
