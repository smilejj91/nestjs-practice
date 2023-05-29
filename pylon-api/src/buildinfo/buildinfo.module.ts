import { Logger, Module } from '@nestjs/common';
import { BuildinfoService } from './buildinfo.service';
import { BuildinfoController } from './buildinfo.controller';
import { BuildInfo, BuildInfoSchema } from './schemas/buildinfo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BuildInfo.name, schema: BuildInfoSchema },
    ]),
  ],
  controllers: [BuildinfoController],
  providers: [BuildinfoService, Logger],
})
export class BuildinfoModule {}
