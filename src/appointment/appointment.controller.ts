import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  


  @Get('next-appointment/:barberId')
  async nextAppointment(@Param('barberId') barberId: string) {

    return this.appointmentService.getNextAppointment(barberId);

  }




  @Get('daily-summary/:barberId')
  async dailySummary(@Param('barberId') barberId: string) {

    return this.appointmentService.getDailySummary(barberId);
  }







  @Get('/:barberId')
  findByBarber(@Param('barberId') barberId: string, @Query('startDate') startDate: string, @Query('endDate') endDate: string) {

    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate are required');
    }
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    return this.appointmentService.findByBarberAndDateRange(barberId, start, end);


  }




  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }

  @Get()
  async findByDate(@Query('date') date: string, @Query('barber_id') id: string) {
    return this.appointmentService.findByDate(new Date(date), id);
  }

}
