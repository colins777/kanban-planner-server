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
import { TimerService } from './timer.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CurrentUser} from "../auth/decorators/user.decorator";
import {TimerRoundDto, TimerSessionDto} from "./timer.dto";

@Controller('user/timer')
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  //get today
  @Get('today')
  @Auth()
  async getTodaySession(@CurrentUser('id') userId:string) {
    return this.timerService.getTodaySession(userId)
  }


  //create
  //added 7 laps by default
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@CurrentUser('id') userId:string) {
    return this.timerService.create(userId)
  }


  //update round
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/round/:id')
  @Auth()
  async updateRound(
      @Param('id') id:string,
      @Body() dto: TimerRoundDto,
  ) {
    return this.timerService.updateRound(dto, id)
  }


  //update
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
      @Body() dto: TimerSessionDto,
      @CurrentUser('id') userId:string,
      @Param('id') id:string
  ) {
    return this.timerService.update(dto, id, userId)
  }

  //delete
  @HttpCode(200)
  @Delete(':id')
  @Auth()

  async deleteSession(
      @Param('id') id:string,
      @CurrentUser('id') userId:string
  ) {
    return this.timerService.deleteSession(id, userId)
  }

}
