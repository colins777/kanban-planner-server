import {IsBoolean, IsNumber, IsOptional} from "class-validator";


export class TimerSessionDto {

    //Done or not done
    @IsOptional()
    @IsBoolean()
    isCompleted: boolean
}

export class TimerRoundDto {

    @IsNumber()
    totalSeconds: number

    //Lap duration
    @IsOptional()
    @IsBoolean()
    isCompleted: boolean
}
