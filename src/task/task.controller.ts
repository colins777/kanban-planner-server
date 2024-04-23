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
import { TaskService } from './task.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CurrentUser} from "../auth/decorators/user.decorator";
import {TaskDto} from "./task.dto";

@Controller('user/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  //getAll
  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId:string) {
    return this.taskService.getAll(userId)
  }


  //create
  @UsePipes(new ValidationPipe())
  //status of success request
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: TaskDto, @CurrentUser('id') userId:string) {
    return this.taskService.create(dto, userId)
  }


  //update
  @UsePipes(new ValidationPipe())
  //status of success request
  @HttpCode(200)
  //set task id(232323223) from url user/tasks/232323223
  @Put(':id')
  @Auth()
  async update(
      @Body() dto: TaskDto,
      @CurrentUser('id') userId:string,
      @Param('id') id:string
  ) {
    return this.taskService.update(dto, id, userId)
  }

  //delete
  @HttpCode(200)
  @Delete(':id')
  @Auth()

  async delete(@Param('id') id:string) {
    return this.taskService.delete(id)
  }

}
