import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {AuthDto} from "../auth/dto/auth.dto";
import * as argon2 from "argon2";
import {UserDto} from "./user.dto";

import {startOfDay, sub, subDays} from "date-fns";


@Injectable()
export class UserService {

constructor (private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        tasks: true
      }
    })
  }

  getByEmail(email:string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async getProfile(id:string) {
   const profile = await this.getById(id)

    //get profile statistic data
    const totalTasks = profile.tasks.length
    const completedTasks = await this.prisma.task.count({
      where: {
        userId: id,
        isCompleted: true
      }
    })

    const todayStart = startOfDay(new Date())
    const weekStart = startOfDay(subDays(new Date(), 7))

    const todayTasks = await this.prisma.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: todayStart.toISOString()
        }
      }
    });

    const weekTasks = await this.prisma.task.count({
      where: {
        userId: id,
        createdAt: {
          //gte - grater or equal than
          gte: weekStart.toISOString()
        }
      }
    })

    //we dont use password value
    const {password, ...rest} = profile;

    return {
      user: rest,
      statistics: [
        {label: 'Total ', value: totalTasks},
        {label: 'Completed tasks ', value: completedTasks},
        {label: 'Today tasks ', value: todayTasks},
        {label: 'Week tasks ', value: weekTasks},
      ]
    }

  }

  async create(dto:AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await argon2.hash(dto.password)
    }

    return this.prisma.user.create({
      data: user
    })
  }

  //for user updating
  async update(id:string, dto:UserDto) {

    let data = dto;

    if (dto.password) {
      data = {...dto, password: await argon2.hash(dto.password)}
    }

    return this.prisma.user.update({
      where: {
        id
      },
      data,
      select: {
        name: true,
        email: true
      }
    })
  }

}
