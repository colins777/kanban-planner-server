import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put, Param, Delete
} from '@nestjs/common';
import { TimeBlockService } from './time-block.service';

@Controller('user/time-blocks')
export class TimeBlockController {
  constructor(private readonly TimeBlockService: TimeBlockService) {}


}
