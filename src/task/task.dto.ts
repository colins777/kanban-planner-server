import {IsBoolean, IsEmail, isEnum, IsOptional, IsString} from "class-validator";
import {Priority} from 'prisma/generated/client'
import {Transform} from "class-transformer";

export class TaskDto {
    @IsString()
    @IsOptional()
    name: string

    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean

    @IsString()
    @IsOptional()
    createdAt?: string

    @isEnum(Priority, false)
    @IsOptional()
    @Transform(({value}) => ('' + value).toLowerCase())
    priority?: Priority
}
