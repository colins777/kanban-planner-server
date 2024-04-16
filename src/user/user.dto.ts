import {IsEmail, IsNumber, IsOptional, IsString, Max, Min, MinLength} from "class-validator";

export class TimerSettingsDto {
    @IsOptional()
    @IsNumber()
    //work lap min 1
    @Min(1)
    workInterval?: number

    @IsOptional()
    @IsNumber()
    @Min(1)
    breakInterval?: number

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    intervalCount?: number
}

export class UserDto extends TimerSettingsDto {
    @IsEmail()
    @IsOptional()
    email?: string

    @IsOptional()
    @MinLength(6, {
        message: 'Password must be at least 6 characters long'
    })
    @IsString()
    password?: string
}
