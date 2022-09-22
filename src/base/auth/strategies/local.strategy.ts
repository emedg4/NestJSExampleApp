import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { ssoLoginDTO } from '../dto/sso-login.DTO';
//esta no planeo usarla debido a que solamente se necesita validar el usuario
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.data.meta.status == "FAIL") {
      throw new HttpException("Credenciales invalidas", HttpStatus.BAD_REQUEST);
  }
    const response: ssoLoginDTO = {
      token: user.data.data.token,
      correo: username,
      num_empleado: user.data.data.user.employeeId
  }
    
    return response;
  }
}
