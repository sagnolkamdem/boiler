import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../../modules/auth/auth.module';
import { UserModule } from '../../modules/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { config } from '../../../config';
import { DatabaseConfig } from 'database.config';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/common/guards/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    AuthModule,
    UserModule,
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard
    // }
  ],
})
export class AppModule {}
