import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

import { User, UserDocument } from '../users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userModel
      .findOne({ email: email.toLowerCase() })
      .select('+password +refreshToken');
    if (!user || !user.isActive) return null;
    const valid = await bcrypt.compare(password, user.password);
    return valid ? user : null;
  }

  async register(dto: RegisterDto) {
    const existing = await this.userModel.findOne({ email: dto.email.toLowerCase() });
    if (existing) throw new ConflictException('Email already registered');

    const hash = await bcrypt.hash(dto.password, 12);
    const user = await this.userModel.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email.toLowerCase(),
      password: hash,
      role: dto.role,
    });

    const tokens = await this.generateTokens(user);
    await this.saveRefreshToken(user._id.toString(), tokens.refreshToken);
    return this.buildAuthResponse(user, tokens);
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const tokens = await this.generateTokens(user);
    await this.saveRefreshToken(user._id.toString(), tokens.refreshToken);
    return this.buildAuthResponse(user, tokens);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userModel.findById(userId).select('+refreshToken');
    if (!user || !user.refreshToken) throw new UnauthorizedException('Access denied');

    const match = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!match) throw new UnauthorizedException('Access denied');

    const tokens = await this.generateTokens(user);
    await this.saveRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken: null });
    return { message: 'Logged out successfully' };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.userModel.findById(userId).select('+password');
    if (!user) throw new BadRequestException('User not found');

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) throw new BadRequestException('Current password is incorrect');

    const hash = await bcrypt.hash(newPassword, 12);
    await this.userModel.findByIdAndUpdate(userId, { password: hash });
    return { message: 'Password changed successfully' };
  }

  // ── Private helpers ─────────────────────────────────────────────────────

  private async generateTokens(user: UserDocument) {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.accessSecret'),
        expiresIn: this.configService.get<string>('jwt.accessExpiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.userModel.findByIdAndUpdate(userId, { refreshToken: hash });
  }

  private buildAuthResponse(user: UserDocument, tokens: { accessToken: string; refreshToken: string }) {
    return {
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
