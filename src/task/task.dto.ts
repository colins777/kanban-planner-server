import {IsBoolean, IsEmail, IsEnum, IsOptional, IsString} from "class-validator";
import {Priority} from 'prisma/generated/client'
import {Transform} from "class-transformer";

export class TaskDto {

    constructor() {
        console.log('Priority', Priority)
    }


    @IsString()
    @IsOptional()
    name: string

    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean

    @IsString()
    @IsOptional()
    createdAt?: string

    @IsEnum(Priority)
    @IsOptional()
    @Transform(({value}) => ('' + value).toLowerCase())
    priority?: Priority
}
