import { HttpModule,Module } from '@nestjs/common';
import { SsoApplicationService } from './sso-application.service';

@Module({
  imports: [ HttpModule],
  providers: [ SsoApplicationService ],
  exports: [ SsoApplicationService ]
})
export class SsoApplicationModule {}
