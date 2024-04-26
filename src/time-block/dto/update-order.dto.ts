import {IsArray, IsString} from "class-validator";

export class UpdateOrderDto {

    //get array with ordered ids elements on front and transfer to backend and iterate every items in DB using ids from front
    @IsArray()
    @IsString({each: true})
    ids: string[]
}
