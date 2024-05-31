import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {AuthDto} from "../auth/dto/auth.dto";
import * as argon2 from "argon2";
import {TaskDto} from "./task.dto";

@Injectable()
export class TaskService {

constructor (private prisma:PrismaService) {}

  async getAll(userId: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
      },
      include: {
        timeSpentTasks: true,
      },
    });

    return tasks
  }

  async create(dto:TaskDto, userId:string) {
    return this.prisma.task.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          }
        }
      }
    })
  }

  //Partial<TaskDto> - set field optional for updating
  async update(dto:Partial<TaskDto>, taskId:string, userId:string) {
    return this.prisma.task.update({
      where: {
        userId,
        id: taskId
      },
      //update
      data: dto
    })
  }

  async delete(taskId:string) {
    return this.prisma.task.delete({
      where: {
        id: taskId
      }
    })
  }

}
