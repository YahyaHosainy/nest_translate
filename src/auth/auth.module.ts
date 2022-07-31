import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/database/users/users.module';
import { LocalStrategy } from './local.strategy/strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy/strategy';
import environments from 'src/environments/current';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: environments.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
