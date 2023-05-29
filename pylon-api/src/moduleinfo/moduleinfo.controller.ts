import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Inject,
  LoggerService,
  Logger,
} from '@nestjs/common';
import { ModuleinfoService } from './moduleinfo.service';
import { CreateModuleinfoDto } from './dto/create-moduleinfo.dto';
import { QueryModuleinfoDto } from './dto/query-moduleinfo.dto';

@Controller('moduleinfo')
export class ModuleinfoController {
  constructor(
    private readonly moduleinfoService: ModuleinfoService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  create(@Body() createModuleinfoDto: CreateModuleinfoDto) {
    this.printWinstonLog(createModuleinfoDto);
    return this.moduleinfoService.update(createModuleinfoDto);
  }

  @Get()
  findAll() {
    return this.moduleinfoService.findAll();
  }

  @Get('search')
  search(@Query() queryModuleinfoDto: QueryModuleinfoDto) {
    this.printWinstonLog(queryModuleinfoDto);
    return this.moduleinfoService.search(queryModuleinfoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.printWinstonLog(id);
    return this.moduleinfoService.findOne(id);
  }

  @Post(':id/launch')
  launch(@Param('id') id: string) {
    this.printWinstonLog(id);
    return this.moduleinfoService.launch(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.printWinstonLog(id);
    return this.moduleinfoService.remove(id);
  }

  private printWinstonLog(dto) {
    this.logger.log('log: ' + JSON.stringify(dto));
  }
}
