import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  LoggerService,
  Logger,
  Inject,
  Query,
} from '@nestjs/common';
import { BuildinfoService } from './buildinfo.service';
import { CreateBuildinfoDto } from './dto/create-buildinfo.dto';
import { QueryBuildinfoDto } from './dto/query-buildinfo.dto';

@Controller('buildinfo')
export class BuildinfoController {
  constructor(
    private readonly buildinfoService: BuildinfoService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  create(@Body() createBuildinfoDto: CreateBuildinfoDto) {
    this.printWinstonLog(createBuildinfoDto);
    return this.buildinfoService.update(createBuildinfoDto);
  }

  @Get()
  findAll() {
    return this.buildinfoService.findAll();
  }

  @Get('search')
  search(@Query() queryBuildinfoDto: QueryBuildinfoDto) {
    this.printWinstonLog(queryBuildinfoDto);
    return this.buildinfoService.search(queryBuildinfoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.printWinstonLog(id);
    return this.buildinfoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.printWinstonLog(id);
    return this.buildinfoService.remove(id);
  }

  private printWinstonLog(dto) {
    this.logger.log('log: ' + JSON.stringify(dto));
  }
}
