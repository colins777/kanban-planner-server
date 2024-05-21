import { Module } from '@nestjs/common';
import { TaskSpentTimeService } from './task-spent-time.service';
import { TaskSpentTimeController } from './task-spent-time.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [
      TaskSpentTimeController,
  ],
  providers: [TaskSpentTimeService, PrismaService],
  exports: [TaskSpentTimeService]
})
export class TaskSpentTimeModule {}
