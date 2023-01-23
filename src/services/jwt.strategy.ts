import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@services/config.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private _configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: _configService.get('JWT_SECRET_KEY')
        });
    }

    async validate(payload) {
        return payload;
    }
    
}
