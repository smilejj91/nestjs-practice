import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { ModuleInfo, ModuleInfoDocument } from './schemas/module.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(ModuleInfo.name)
    private readonly moduleModel: Model<ModuleInfoDocument>,
  ) { }

  async update(updateModuleDto: CreateModuleDto): Promise<ModuleInfo> {
    const filter = { name: updateModuleDto.name };
    const option = { new: true, upsert: true, runValidators: true };
    const updatedModule = await this.moduleModel.findOneAndUpdate(
      filter,
      updateModuleDto,
      option,
    );

    if (!updatedModule) {
      throw new NotFoundException();
    }

    return updatedModule._id;
  }

  findAll() {
    return `This action returns all modules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
