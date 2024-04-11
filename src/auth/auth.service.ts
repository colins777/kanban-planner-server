import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import {Response, Request} from "express";
import {verify} from 'argon2';

@Injectable()
export class AuthService {

    EXPIRE_DAY_REFRESH_TOKEN = 1
    REFRESH_TOKEN_NAME = 'refreshToken'

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

        //get response as this https://prnt.sc/inCDEHI6NR3x
    }

    async register(dto:AuthDto) {

        //check if user exist
        const existingUser = await this.userService.getByEmail(dto.email);

        if (existingUser) throw new BadRequestException('User already exist');

        const {password, ...user} = await this.userService.create(dto);

        const tokens = this.issueTokens(user.id)

        return {
            user,
            ...tokens
        }
    }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwt.verifyAsync(refreshToken);

        if (!result) throw new UnauthorizedException('Invalid refresh token')

        //get only user
        const {password, ...user} = await this.userService.getById(result.id)

        console.log('password', password)
        console.log('user', user)

        const token = this.issueTokens(user.id)

        return {
            user,
            ...token
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
        const isValid = await verify(user.password, dto.password);

        if(!isValid) throw new NotFoundException('Invalid password');

        return user;
    }

    addRefreshTokenToResponse(res: Response, refreshToken: string) {

        //get current date
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            //it is server cookie
            httpOnly: true,
            domain: 'localhost',
            expires: expiresIn,
            //if production, HTTPS
            secure: true,
            //lax if production
            sameSite: 'none'
        })
    }


    removeRefreshTokenFromResponse(res: Response) {

        //get current date
        const expiresIn = new Date();

        res.cookie(this.REFRESH_TOKEN_NAME, '' , {
            //it is server cookie
            httpOnly: true,
            domain: 'localhost',
            //if production, HTTPS
            //there is no f-ty to delete cookie, we can only set null for cookie date
            expires: new Date(0),
            secure: true,
            //lax if production
            sameSite: 'none'
        })
    }
}
