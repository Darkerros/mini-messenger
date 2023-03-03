import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async register() {

    }

    async login() {

    }

    async validateToken() {
        return
    }

    async generateToken() {
        return {}
    }
}
