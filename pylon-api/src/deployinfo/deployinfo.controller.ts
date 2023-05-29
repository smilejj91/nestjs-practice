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
import { DeployinfoService } from './deployinfo.service';
import { CreateDeployinfoDto } from './dto/create-deployinfo.dto';
import { QueryDeployinfoDto } from './dto/query-deployinfo.dto';

@Controller('deployinfo')
export class DeployinfoController {
  constructor(
    private readonly deployinfoService: DeployinfoService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  create(@Body() createDeployinfoDto: CreateDeployinfoDto) {
    this.printWinstonLog(createDeployinfoDto);
    return this.deployinfoService.update(createDeployinfoDto);
  }

  @Get()
  findAll() {
    return this.deployinfoService.findAll();
  }

  @Get('search')
  search(@Query() queryDeployinfoDto: QueryDeployinfoDto) {
    this.printWinstonLog(queryDeployinfoDto);
    return this.deployinfoService.search(queryDeployinfoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.printWinstonLog(id);
    return this.deployinfoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.printWinstonLog(id);
    return this.deployinfoService.remove(id);
  }

  private printWinstonLog(dto) {
    this.logger.log('log: ' + JSON.stringify(dto));
  }
}
