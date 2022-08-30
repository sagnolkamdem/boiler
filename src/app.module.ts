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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'presence',
      entities: [__dirname + '/entity/*'],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ScoreModule,
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: './uploads'
    }),
    ProofModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
