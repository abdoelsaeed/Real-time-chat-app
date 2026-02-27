/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentUser = createParamDecorator(
    (data: keyof any, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return data ? request.user?.[data] : request.user;
    },
);