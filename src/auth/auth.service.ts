import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {LoginUserDto} from "../users/dto/login-user.dto";
import {UsersService} from "../users/users.service";
import {UserModel} from "../models/user.model";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private usersService: UsersService) {}

    async register(dto: CreateUserDto) {
        const candidate = this.usersService.getUserByEmail(dto.email)
        if (candidate) throw new HttpException("Пользователь с таким email уже существует", HttpStatus.BAD_REQUEST)

        const hashedPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.usersService.createUser({...dto, password: hashedPassword})
        return this.generateToken(user)
    }

    async login(dto: LoginUserDto) {
        const user = await this.validateUser(dto)
        return this.generateToken(user)
    }

    async validateUser(dto: LoginUserDto) {
        const user = await this.usersService.getUserByEmail(dto.emaiL)
        const isPasswordEquals = bcrypt.compare(dto.password, user.password)
        if (user && isPasswordEquals) return user
        throw new UnauthorizedException({ message: "Некорректо введен email или пароль"})
    }

    validateToken(token: string) {
        return this.jwtService.verify(token)
    }

    generateToken(user: UserModel) {
        const payload = {id: user.id, email: user.email}
        const token = this.jwtService.sign(payload)
        return { token: token , user: { id: user.id, email: user.email }}
    }
}
