import { CreateUpdateCountDateService } from './feature/count-date/create-update-count-date/createupdatecountdate.service';
import { CountDateModule } from './feature/count-date/countdate.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './feature/auth/auth.module';
import { UserModule } from './feature/user/user.module';
import { ScoreModule } from './feature/score/score.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProofModule } from './feature/proof/proof.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { PayStubModule } from './feature/pay-stub/pay-stub.module';
import { config } from '../config';
import { DatabaseConfig } from 'database.config';
import { AlertModule } from './feature/position-alert/alert.module';

@Module({
  imports: [
    CountDateModule,
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
    ScoreModule,
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: './uploads',
    }),
    ProofModule,
    PayStubModule,
    AlertModule
  ],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule {}
