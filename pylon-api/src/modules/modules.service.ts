import { Inject, Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { ModuleInfo, ModuleInfoDocument } from './schemas/module.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { QueryModuleDto } from './dto/query-module.dto';
import { ConfigType } from '@nestjs/config';
import jenkinsConfig from 'src/config/jenkinsConfig';

@Injectable()
export class ModulesService {
  constructor(
    @Inject(jenkinsConfig.KEY) private config: ConfigType<typeof jenkinsConfig>,
    @InjectModel(ModuleInfo.name)
    private readonly moduleModel: Model<ModuleInfoDocument>,
    private readonly httpService: HttpService,
  ) { }

  async update(updateModuleDto: CreateModuleDto): Promise<ModuleInfo> {
    try{
      const filter = { name: updateModuleDto.name, phase: updateModuleDto.phase  };
      const option = { new: true, upsert: true, runValidators: true };
      const updatedModule = await this.moduleModel.findOneAndUpdate(
        filter,
        updateModuleDto,
        option,
      );
      return updatedModule;
    } catch (e) {
      throw e;
    }
  } 

  async findAll(): Promise<ModuleInfo[]> {
    try {
      return await this.moduleModel.find().exec();
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: string): Promise<ModuleInfo> {
    try {
      return await this.moduleModel.findOne({ _id: id }).exec();
    } catch (e) {
      throw e;
    }
  }

  async launch(id: string) {
    try {
      const module = await this.moduleModel.findOne({ _id: id }).exec();
      var jenkinsBuildUrl = module.jenkinsUrl + '/build'
      var params = {
        auth: {
          username: this.config.auth.username,
          password: this.config.auth.password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      };
      return this.httpService.post(jenkinsBuildUrl,{}, params)
      .pipe(map(response => {return response.data}));
    } catch (e) {
      throw e;
    }
  }

  async search(queryModuleDto: QueryModuleDto) {
    try {
      return await this.moduleModel.find({$or: [
        {name: queryModuleDto.name},
        {phase: queryModuleDto.phase}
      ]}).exec();
    } catch (e) {
      throw e;
    }
  }

  remove(id: string) {
    return `This action removes a #${id} module`;
  }
}
