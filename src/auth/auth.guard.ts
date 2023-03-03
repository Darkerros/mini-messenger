import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const splitedAuthHeader = req.headers.authorization.split(' ');
      //const tokenType = splitedAuthHeader[0]
      const token = splitedAuthHeader[1];

      req.user = this.authService.validateToken(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
  }
}
