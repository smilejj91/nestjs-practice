import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleInfo, ModuleInfoSchema } from './schemas/module.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModuleInfo.name, schema: ModuleInfoSchema }]),
    HttpModule
  ],
  controllers: [ModulesController],
  providers: [ModulesService]
})
export class ModulesModule {}
