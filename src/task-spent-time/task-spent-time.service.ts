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
               //dto:Partial<TaskSpentTimeDto>
               dto:TaskSpentTimeDto
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
    } catch (e) {
      console.log('ERROR timeSpentTask.update', e)
    }

  }

/*  async delete(timeBlockId:string, userId:string) {
    return this.prisma.timeBlock.delete({
      where: {
        id: timeBlockId,
        userId
      }
    })
  }

  //use transaction for optimize DB query to update data
  //async updateOrder(ids:string[]) {
  async updateOrder(ids: string[]) {
    return this.prisma.$transaction(
        ids.map((id, order) =>
            this.prisma.timeBlock.update({
              where: { id },
              data: { order }
            })
        )
    )
  }*/

}
