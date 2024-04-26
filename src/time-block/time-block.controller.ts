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
import {Auth} from "../auth/decorators/auth.decorator";
import {CurrentUser} from "../auth/decorators/user.decorator";
import {TimeBlockDto} from "./dto/time-block.dto";
import {UpdateOrderDto} from "./dto/update-order.dto"
import {TaskDto} from "../task/task.dto";

@Controller('user/time-blocks')
export class TimeBlockController {
  constructor(private readonly TimeBlockService: TimeBlockService) {}

  @Get()
  @Auth()

  async getAll(@CurrentUser('id') userId:string) {
    return this.TimeBlockService.getAll(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()

  async create(@Body() dto: TimeBlockDto, @CurrentUser('id') userId:string) {
    return this.TimeBlockService.create(dto, userId)
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
      @Body() dto: TimeBlockDto,
      @CurrentUser('id') userId:string,
      @Param('id') id:string
  ) {
    return this.TimeBlockService.update(dto, id, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update-order')
  @Auth()

  async updateOrder(@Body() updateOrderDto: UpdateOrderDto, @CurrentUser('id') userId:string) {
    return this.TimeBlockService.updateOrder(updateOrderDto.ids)
  }


  //delete
  @HttpCode(200)
  @Delete(':id')
  @Auth()

  async delete(@CurrentUser('id') userId:string, @Param('id') id:string) {
    return this.TimeBlockService.delete(id, userId)
  }

}
