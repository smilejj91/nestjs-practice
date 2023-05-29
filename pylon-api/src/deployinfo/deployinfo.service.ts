import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeployinfoDto } from './dto/create-deployinfo.dto';
import { DeployInfo, DeployInfoDocument } from './schemas/deployinfo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QueryDeployinfoDto } from './dto/query-deployinfo.dto';

@Injectable()
export class DeployinfoService {
  constructor(
    @InjectModel(DeployInfo.name)
    private readonly deployinfoModel: Model<DeployInfoDocument>,
  ) {}

  async update(updateDeployinfoDto: CreateDeployinfoDto): Promise<DeployInfo> {
    const filter = {
      awx_job_id: updateDeployinfoDto.awx_job_id,
    };

    updateDeployinfoDto.module_id = new Types.ObjectId(
      updateDeployinfoDto.module_id,
    );

    const option = { new: true, upsert: true, runValidators: true };
    const updatedDeployinfo = await this.deployinfoModel.findOneAndUpdate(
      filter,
      updateDeployinfoDto,
      option,
    );
    if (!updatedDeployinfo) {
      throw new NotFoundException();
    }
    return updatedDeployinfo;
  }

  async findAll(): Promise<DeployInfo[]> {
    const findedDeployinfos = await this.deployinfoModel.find().exec();
    if (!findedDeployinfos) {
      throw new NotFoundException();
    }
    return findedDeployinfos;
  }

  async findOne(id: string): Promise<DeployInfo> {
    const findedModule = await this.deployinfoModel.findOne({ _id: id }).exec();
    if (!findedModule) {
      throw new NotFoundException();
    }
    return findedModule;
  }

  async search(queryDeployinfoDto: QueryDeployinfoDto): Promise<DeployInfo[]> {
    queryDeployinfoDto.module_id = new Types.ObjectId(
      queryDeployinfoDto.module_id,
    );

    const findedDeployinfos = await this.deployinfoModel
      .find({
        $or: [{ module_id: queryDeployinfoDto.module_id }],
      })
      .exec();
    if (!findedDeployinfos) {
      throw new NotFoundException();
    }
    return findedDeployinfos;
  }

  remove(id: string) {
    return `This action removes a #${id} buildinfo`;
  }
}
