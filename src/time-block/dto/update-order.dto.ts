import {IsBoolean, IsEnum, IsNumber, IsOptional, IsString} from "class-validator";

export class TimeBlockDto {

    //get array with ordered ids elements on front and transfer to backend and iterate every items in DB using ids from front
    @IsString()
    @IsString({each: true})
    ids: string[]
}
