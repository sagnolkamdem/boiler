import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Alert } from 'src/entity/alert.entity';

@Module({
  controllers: [AlertController],
  providers: [AlertService], 
  imports: [TypeOrmModule.forFeature([Alert])]
})
export class AlertModule {}
