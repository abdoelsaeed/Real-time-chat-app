/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor() {
        const refreshSecret = process.env.JWT_REFRESH_SECRET;

        if (!refreshSecret) {
            throw new Error('JWT_REFRESH_SECRET is not defined');
        }

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req?.cookies?.refresh_token,
            ]),
            secretOrKey: refreshSecret,
        });
    }

    validate(payload: any) {
        return payload;
    }
}
