import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Between, Repository } from 'typeorm';
import { Service } from 'src/service/entities/service.entity';

@Injectable()
export class AppointmentService {

  constructor(
    @InjectRepository(Appointment) private appointmentRepository:Repository<Appointment>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const service = await this.serviceRepository.findOneBy({ id: createAppointmentDto.serviceId});

    if (!service){
      throw new Error(`Servicio con ID ${createAppointmentDto.serviceId} no encontrado`)
    }

    const appointment = this.appointmentRepository.create({
      clientName: createAppointmentDto.clientName,
      startTime: new Date(createAppointmentDto.startTime),
      EndTime: new Date (createAppointmentDto.endTime),
      BarberId: createAppointmentDto.barberId,
      service,
    });

    return await this.appointmentRepository.save(appointment);


  }

  findAll() {
    return this.appointmentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }

  async findByDate(date:Date): Promise<Appointment[]>{
    const start = new Date(date.toISOString().split('T')[0]+'T00:00:00.000Z')
    const end = new Date(date.toISOString().split('T')[0]+'T23:59:59.999Z')

    return await this.appointmentRepository.find({
      where: {
        startTime: Between(start, end)
      },
      order: {startTime: 'ASC'}
    })
  }
}
