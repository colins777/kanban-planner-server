import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {TimerSessionDto, TimerRoundDto} from "./timer.dto";
import {TaskDto} from "../task/task.dto";

@Injectable()
export class TimerService {

constructor (private prisma:PrismaService) {}

//1 session = 1 day, there is no more than 1 session per day

  async getTodaySession(userId: string) {
    //get only date without time
    const today = new Date().toISOString().split('T')[0]

    return this.prisma.pomodoroSession.findFirst({
      where: {
        createdAt: {
          gte: new Date(today)
        },
        userId: userId
      },
      include: {
        rounds: {
          orderBy: {
            id: 'asc'
          }
        }
      }
    })

  }

  async create(userId: string) {
    const todaySession = await this.getTodaySession(userId)

    //if session exist we return exist session
    if (todaySession) return todaySession

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        intervalsCount: true
      }
    })

    if (!user) throw new NotFoundException('User not found')

    //if user exist
    return this.prisma.pomodoroSession.create({
      data: {
        rounds: {
          createMany: {
            data: Array.from({length: user.intervalsCount}, () => ({
              totalSeconds: 0
            }))
          }
        },
        user: {
          connect: {
            id: userId
          }
        }
      },
      include: {
        rounds: true
      }
    })

  }

    async update(
        dto:Partial<TimerSessionDto>,
        pomodoroId:string,
        userId:string
    ) {
        return this.prisma.pomodoroSession.update({
            where: {
                userId,
                id: pomodoroId
            },
            //update
            data: dto
        })
    }

    async updateRound(
        dto:Partial<TimerRoundDto>,
        roundId:string,
    ) {
        return this.prisma.pomodoroRound.update({
            where: {
                id: roundId
            },
            //update
            data: dto
        })
    }

    async deleteSession(
        sessionId:string,
        userId:string,
    ) {
        return this.prisma.pomodoroSession.delete({
            where: {
                id: sessionId,
                userId
            }
        })
    }

}
