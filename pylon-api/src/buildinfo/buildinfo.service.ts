import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuildinfoDto } from './dto/create-buildinfo.dto';
import { BuildInfo, BuildInfoDocument } from './schemas/buildinfo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QueryBuildinfoDto } from './dto/query-buildinfo.dto';

@Injectable()
export class BuildinfoService {
  constructor(
    @InjectModel(BuildInfo.name)
    private readonly buildinfoModel: Model<BuildInfoDocument>,
  ) {}

  async update(updateBuildinfoDto: CreateBuildinfoDto): Promise<BuildInfo> {
    const filter = {
      jenkins_jobname: updateBuildinfoDto.jenkins_jobname,
      jenkins_buildnumber: updateBuildinfoDto.jenkins_buildnumber,
    };

    updateBuildinfoDto.module_id = new Types.ObjectId(
      updateBuildinfoDto.module_id,
    );
    const option = { new: true, upsert: true, runValidators: true };
    const updatedBuildinfo = await this.buildinfoModel.findOneAndUpdate(
      filter,
      updateBuildinfoDto,
      option,
    );
    if (!updatedBuildinfo) {
      throw new NotFoundException();
    }
    return updatedBuildinfo;
  }

  async findAll(): Promise<BuildInfo[]> {
    const findedBuildinfos = await this.buildinfoModel.find().exec();
    if (!findedBuildinfos) {
      throw new NotFoundException();
    }
    return findedBuildinfos;
  }

  async findOne(id: string): Promise<BuildInfo> {
    const findedBuildinfo = await this.buildinfoModel
      .findOne({ _id: id })
      .exec();
    if (!findedBuildinfo) {
      throw new NotFoundException();
    }
    return findedBuildinfo;
  }

  async search(queryBuildinfoDto: QueryBuildinfoDto): Promise<BuildInfo[]> {
    queryBuildinfoDto.module_id = new Types.ObjectId(
      queryBuildinfoDto.module_id,
    );

    const findedBuildinfos = await this.buildinfoModel
      .find({
        $or: [{ module_id: queryBuildinfoDto.module_id }],
      })
      .exec();
    if (!findedBuildinfos) {
      throw new NotFoundException();
    }
    return findedBuildinfos;
  }

  remove(id: string) {
    return `This action removes a #${id} buildinfo`;
  }
}
