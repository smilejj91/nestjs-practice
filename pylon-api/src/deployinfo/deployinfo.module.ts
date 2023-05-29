import { Logger, Module } from '@nestjs/common';
import { DeployinfoService } from './deployinfo.service';
import { DeployinfoController } from './deployinfo.controller';
import { DeployInfo, DeployInfoSchema } from './schemas/deployinfo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeployInfo.name, schema: DeployInfoSchema },
    ]),
  ],
  controllers: [DeployinfoController],
  providers: [DeployinfoService, Logger],
})
export class DeployinfoModule {}
