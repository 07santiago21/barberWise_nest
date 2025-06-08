import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Service } from 'src/service/entities/service.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Appointment,Service])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
