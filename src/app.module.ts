import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import {TaskModule} from "./task/task.module";
import {TimeBlockModule} from "./time-block/time-block.module";
import {TimerModule} from "./timer/timer.module";
import {TaskSpentTimeModule} from "./task-spent-time/task-spent-time.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    TaskModule,
    TimeBlockModule,
    TimerModule,
    TaskSpentTimeModule
  ],

})
export class AppModule {}
