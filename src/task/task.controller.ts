import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task/')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

}
