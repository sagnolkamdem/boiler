/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountDate } from 'src/entity/startDate.entity';
import { CreateUpdateCountDateController } from './create-update-count-date/createupdatecountdate.controller';
import { CreateUpdateCountDateService } from './create-update-count-date/createupdatecountdate.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CountDate]),
        ConfigModule,
    ],
    controllers: [CreateUpdateCountDateController],
    providers: [CreateUpdateCountDateService],
})
export class CountDateModule {}
