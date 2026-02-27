/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/LoginDto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  private async issueTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: await bcrypt.hash(refreshToken, 10),
      },
    });

    return { accessToken, refreshToken };
  }

  async register(createAuthDto: CreateAuthDto) {
    try {
      const hashed = await bcrypt.hash(createAuthDto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          email: createAuthDto.email,
          password: hashed,
          name: createAuthDto.name,
        },
      });
      return this.issueTokens(user.id, user.email);
    } catch (error) {
      if (
        error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async login(dto:LoginDto){
    const { password, email } = dto;
    const user = await this.prisma.user.findUnique({
      where: { email }
    })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.issueTokens(user.id, user.email);
  }

  async refresh(userId: string, token: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refreshToken)
      throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(token, user.refreshToken);

    if (!isMatch)
      throw new UnauthorizedException();

    return this.issueTokens(user.id, user.email);
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });
    if(!user){
      throw new NotFoundException('you are not logIn')
    }

    return user;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
