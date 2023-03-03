import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {UsersModule} from "../users/users.module";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
      JwtModule.register({
        secret: process.env.SECTRET_KEY
      }),
      UsersModule,
  ],
    exports: [
        JwtModule
    ]
})
export class AuthModule {}
