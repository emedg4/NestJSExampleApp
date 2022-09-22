import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-http-bearer';
import { AuthService } from "../auth.service";

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(bearer: string): Promise<any> {
        const isValid = await this.authService.authorization(bearer);
        if (!isValid)
            throw new UnauthorizedException();
        return isValid;
    }
}