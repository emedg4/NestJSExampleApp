import { Module, Global, CacheModule } from '@nestjs/common';

@Global()
@Module({
    imports:[CacheModule.register({ttl:28800})],
    exports:[CacheModule]
})
export class AppCacheModule {

}