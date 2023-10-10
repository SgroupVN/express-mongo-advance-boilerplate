import { ClassScanner } from 'packages/scanner/core/container';
import { MogpConfig } from 'packages/mogp/core/config';

export class SeedingCollector extends ClassScanner {
    pattern = MogpConfig.getConfig().pathSeeding;
}
