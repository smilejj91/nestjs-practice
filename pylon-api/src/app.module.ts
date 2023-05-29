import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleinfoModule } from './moduleinfo/moduleinfo.module';
import jenkinsConfig from './config/jenkinsConfig';
import { ExceptionModule } from './exception/exception.module';
import { BuildinfoModule } from './buildinfo/buildinfo.module';
import { DeployinfoModule } from './deployinfo/deployinfo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [jenkinsConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    ExceptionModule,
    ModuleinfoModule,
    BuildinfoModule,
    DeployinfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
