import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }


  @Get('next-appointment/:barberId')
  async nextAppointment(@Param('barberId') barberId: string) {

    return this.appointmentService.getNextAppointment(barberId);
  
  }

  @Get('daily-summary/:barberId')
  async dailySummary(@Param('barberId') barberId: string) {
    
    return this.appointmentService.getDailySummary(barberId);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
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
  async findByDate(@Query('date') date: string) {
    return this.appointmentService.findByDate(new Date(date));
  }
}
