import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { validate } from "class-validator";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        //this for not get data directly from DB, we use Service
        private userService: UserService
    ) {
            super({
                //BearerToken is in header request
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: true,
                secretOrKey: configService.get('JWT_SECRET')
            })
    }

//set user_id in token, only we can encode this using JWT_SECRET
async validate({id}: {id: string}) {
    return this.userService.getById(id)
}

}



