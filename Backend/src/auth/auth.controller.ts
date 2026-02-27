/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/LoginDto';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AccessTokenGuard } from './guards/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto, @Res({ passthrough: true }) res: any,
) {
    const result = await this.authService.register(createAuthDto);
    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite:
        process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth/refresh',
    });
    return {
      accessToken: result.accessToken,
    };
  }
  
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const tokens = await this.authService.login(dto);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite:
        process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(
    @GetCurrentUser('sub') userId: string,
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
  ) {
    const token = req.cookies.refresh_token;

    const tokens = await this.authService.refresh(userId, token);

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite:
        process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/auth/refresh',
    });

    return { accessToken: tokens.accessToken };
  }
  
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(
    @GetCurrentUser('sub') userId: string,
    @Res({ passthrough: true }) res: any,
  ) {
    await this.authService.logout(userId);

    res.clearCookie('refresh_token', {
      path: '/auth/refresh',
    });

    return { message: 'Logged out successfully' };
  }

  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  @Get('/me')
  findOne(@GetCurrentUser('sub') userId: string,

  ) {
    return this.authService.findMe(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
