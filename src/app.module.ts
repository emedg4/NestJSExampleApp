import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './base/auth/auth.module';
import configuration from './base/configuration/configuration';
import { LoggerMiddleware } from './base/middleware/logger.middleware';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { CentrosModule } from './modules/centros/centros.module';
import { UtilModule } from './base/util/util.module';
import { AppCacheModule } from './base/cache-manager/cache.module'
import { SsoApplicationModule } from './modules/sso-application/sso-application.module';
import { ConsultaOmnicanalModule } from './modules/consulta-omnicanal/consulta-omnicanal.module';
import { MenuModule } from './modules/menu/menu.module';
import { LoggerModule } from './base/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    UsuariosModule,
    AuthModule,
    CentrosModule,
    UtilModule,
    AppCacheModule,
    SsoApplicationModule,
    MenuModule,
    ConsultaOmnicanalModule,
    LoggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure( consumer: MiddlewareConsumer ) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      });
  }

}
