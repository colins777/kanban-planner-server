import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {AuthDto} from "../auth/dto/auth.dto";
import * as argon2 from "argon2";


@Injectable()
export class UserService {

constructor (private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        tasks: true
      }
    })
  }

  getByEmail(email:string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async create(dto:AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await argon2.hash(dto.password)
    }

    return this.prisma.user.create({
      data: user
    })
  }

}
