import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuleinfoDto } from './dto/create-moduleinfo.dto';
import { ModuleInfo, ModuleInfoDocument } from './schemas/moduleinfo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { QueryModuleinfoDto } from './dto/query-moduleinfo.dto';
import { ConfigType } from '@nestjs/config';
import jenkinsConfig from 'src/config/jenkinsConfig';

@Injectable()
export class ModuleinfoService {
  constructor(
    @Inject(jenkinsConfig.KEY) private config: ConfigType<typeof jenkinsConfig>,
    @InjectModel(ModuleInfo.name)
    private readonly moduleinfoModel: Model<ModuleInfoDocument>,
    private readonly httpService: HttpService,
  ) {}

  async update(updateModuleinfoDto: CreateModuleinfoDto): Promise<ModuleInfo> {
    const filter = {
      name: updateModuleinfoDto.name,
      phase: updateModuleinfoDto.phase,
    };
    const option = { new: true, upsert: true, runValidators: true };
    const updatedModuleinfo = await this.moduleinfoModel.findOneAndUpdate(
      filter,
      updateModuleinfoDto,
      option,
    );
    if (!updatedModuleinfo) {
      throw new NotFoundException();
    }
    return updatedModuleinfo;
  }

  async findAll(): Promise<ModuleInfo[]> {
    const findedModuleinfos = await this.moduleinfoModel.find().exec();
    if (!findedModuleinfos) {
      throw new NotFoundException();
    }
    return findedModuleinfos;
  }

  async findOne(id: string): Promise<ModuleInfo> {
    const findedModuleinfo = await this.moduleinfoModel
      .findOne({ _id: id })
      .exec();
    if (!findedModuleinfo) {
      throw new NotFoundException();
    }
    return findedModuleinfo;
  }

  async launch(id: string) {
    const module = await this.moduleinfoModel.findOne({ _id: id }).exec();
    const jenkinsBuildUrl = module.jenkinsUrl + '/build';
    const params = {
      auth: {
        username: this.config.auth.username,
        password: this.config.auth.password,
      },
    };
    return this.httpService.post(jenkinsBuildUrl, {}, params).pipe(
      map((response) => {
        return response.data;
      }),
    );
  }

  async search(queryModuleinfoDto: QueryModuleinfoDto): Promise<ModuleInfo[]> {
    const findedModuleinfos = await this.moduleinfoModel
      .find({
        $or: [
          { name: queryModuleinfoDto.name },
          { phase: queryModuleinfoDto.phase },
        ],
      })
      .exec();
    if (!findedModuleinfos) {
      throw new NotFoundException();
    }
    return findedModuleinfos;
  }

  remove(id: string) {
    return `This action removes a #${id} module`;
  }
}
