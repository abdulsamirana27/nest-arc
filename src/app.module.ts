import { SharedModule } from '@modules/shared/shared.module';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@services/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorFilter } from './filters/exception.filters';
import { HttpInterceptor } from './interceptor/http.interceptor';
import { AuthModule } from './modules/auth/auth.module';

const modules = [
  TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) =>
      configService.typeOrmConfig,
    inject: [ConfigService],
  }),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get("JWT_SECRET_KEY"),
      signOptions: { expiresIn: configService.get('JWT_EXPIRE') }
    }),
  }),
  SharedModule,AuthModule
]
const interceptor = [
  {
    provide: APP_FILTER,
    useClass: ErrorFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: HttpInterceptor,
  },
]
@Module({
  imports: [...modules],
  controllers: [AppController],
  providers: [AppService,...interceptor],
})
export class AppModule {}
