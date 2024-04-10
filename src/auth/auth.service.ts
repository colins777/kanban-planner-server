import {Injectable, NotFoundException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
//import {verify} from 'argon2'
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private userService: UserService,
    ) {

    }

    async login(dto:AuthDto) {
        //password is not need if success for security reasons
        //@ts-ignore
        const {password, ...user} = await this.validateUser(dto)
        const tokens = this.issueTokens(user.id)

        return {
            user,
            ...tokens
        }
    }

    private issueTokens(userId:string){
        const data = {id: userId}

        //for server requests
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        });

        //this for update access token if acces token expired
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        })

        return {accessToken, refreshToken}
    }

    private async validateUser(dto:AuthDto){
        //check if user email exist
        const user = await this.userService.getByEmail(dto.email);

        //@ts-ignore
        if(!user) throw new NotFoundException('User not found');
        //@ts-ignore
        //const isValid = await verify(user.password, dto.password);
        const isValid = await argon2().verify(user.password, dto.password);

        if(!isValid) throw new NotFoundException('Invalid password');

        return user;

    }
}
