import { Logger, Module } from '@nestjs/common';
import { ModuleinfoService } from './moduleinfo.service';
import { ModuleinfoController } from './moduleinfo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleInfo, ModuleInfoSchema } from './schemas/moduleinfo.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModuleInfo.name, schema: ModuleInfoSchema },
    ]),
    HttpModule,
  ],
  controllers: [ModuleinfoController],
  providers: [ModuleinfoService, Logger],
})
export class ModuleinfoModule {}
