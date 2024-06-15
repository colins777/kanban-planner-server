import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {TaskSpentTimeDto} from "./dto/task-spent-time.dto";

@Injectable()
export class TaskSpentTimeService {
  constructor (private prisma:PrismaService) {}

  async getAll(taskId: string) {
    return  this.prisma.timeSpentTask.findMany({
      where: {
        taskId
      }
    })
  }

  async create(dto: TaskSpentTimeDto) {

    //console.log('dto', dto)

    return this.prisma.timeSpentTask.create({
      data: {
        // taskId: dto?.taskId,
        // startTime: new Date(dto?.startTime),
        // endTime: dto?.endTime ? new Date(dto.endTime) : '',
        // totalTime: dto?.totalTime,
        // isCompleted: dto?.isCompleted,
        // additionalData: dto?.additionalData
        ...dto
      },
    });
  }

  //update spent time task block
  //id - time block
  async update(
               id:string,
               userId:string,
               //dto:Partial<TaskSpentTimeDto>
               dto:TaskSpentTimeDto,
  ) {

    console.log('server id', id)
    console.log('server dto', dto)

    try {
      return this.prisma.timeSpentTask.update({
        where: {
          id,
        },
        data: dto
      })
      .then(async () => {

        const totalTime = await this.getTotalTime(dto.taskId);

        console.log('getTotalTime', totalTime)

        //update task total time in table task!!!
        return this.prisma.task.update({
          where: {
            userId,
            id: dto.taskId
          },
          data: {
            totalTime
          }
        })
      })
    } catch (e) {
      console.log('ERROR timeSpentTask.update', e)
    }
  }

  async getTotalTime(taskId) {

    let taskTimeBlocks = await this.prisma.timeSpentTask.findMany({
      where: {
        taskId
      }
    });

    let taskTotalTime = 0
    taskTimeBlocks.map((item) => {
      return taskTotalTime += item.totalTime
    })

    return taskTotalTime
  }
}
