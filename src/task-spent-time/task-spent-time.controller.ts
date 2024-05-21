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
import { TaskSpentTimeService } from './task-spent-time.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CurrentUser} from "../auth/decorators/user.decorator";
import {TaskSpentTimeDto} from "./dto/task-spent-time.dto";


@Controller('user/tasks-spent-time')
export class TaskSpentTimeController {
  constructor(private readonly taskSpentTimeService: TaskSpentTimeService) {}

  // @Get()
  // @Auth()
  //
  // async getAll(@CurrentUser('id') userId:string) {
  //   return this.taskSpentTimeService.getAll(userId)
  // }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()

  async create(@Body() dto: TaskSpentTimeDto) {


    console.log('spent task time - dto controller: ', dto)

   // Logger.debug(`Creating task spent time with DTO: ${JSON.stringify(dto)}`);


    return this.taskSpentTimeService.create(dto)
  }


/*  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
      @Body() dto: TaskSpentTimeDto,
      @CurrentUser('id') userId:string,
      @Param('id') id:string
  ) {
    return this.taskSpentTimeService.update(dto, id, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update-order')
  @Auth()


  async updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    return this.taskSpentTimeService.updateOrder(updateOrderDto.ids)
  }

  \
  @HttpCode(200)
  @Delete(':id')
  @Auth()

  async delete(@CurrentUser('id') userId:string, @Param('id') id:string) {
    return this.timeBlockService.delete(id, userId)
  }*/

}
