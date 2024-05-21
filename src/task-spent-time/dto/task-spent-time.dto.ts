import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";
export class TaskSpentTimeDto {

    //@IsOptional()
    @IsString()
    taskId: string

    //@IsOptional()
    @IsString()
    startTime: string

    @IsString()
    @IsOptional()
    endTime?: string

    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean

    @IsString()
    @IsOptional()
    additionalData?: string

}
