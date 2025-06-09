import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Between, Repository } from 'typeorm';
import { Service } from 'src/service/entities/service.entity';
import { startOfDay, endOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';


@Injectable()
export class AppointmentService {

  constructor(
    @InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>) { }

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const service = await this.serviceRepository.findOneBy({ id: createAppointmentDto.serviceId });

    if (!service) {
      throw new Error(`Servicio con ID ${createAppointmentDto.serviceId} no encontrado`)
    }

    const appointment = this.appointmentRepository.create({
      clientName: createAppointmentDto.clientName,
      startTime: new Date(createAppointmentDto.startTime),
      EndTime: new Date(createAppointmentDto.endTime),
      BarberId: createAppointmentDto.barberId,
      service,
    });

    return await this.appointmentRepository.save(appointment);


  }

  findAll() {
    return this.appointmentRepository.find();
  }



  async getNextAppointment(barberId: string) {

    const timeZone = 'America/Bogota';

    // Obtener la hora actual en la zona de Colombia
    const nowUTC = new Date();
    const nowColombia = toZonedTime(nowUTC, timeZone);
    const endColombia = endOfDay(nowColombia);



    // Obtener fin del día en zona Colombia

    const appointment = await this.appointmentRepository.findOne({
      where: {
        BarberId: barberId,
        startTime: Between(nowColombia, endColombia),
      },
      order: {
        startTime: 'ASC',
      },
      relations: ['service'],
    });

    if (!appointment) {
      throw new Error('No hay citas disponibles para el día de hoy');
    }



    const { id, EndTime, service, BarberId, ...rest } = appointment;

    const nextAppointment = {
      ...rest,
      endTime: EndTime,
      barberId: BarberId,
      serviceId: service.id,
      service: service,
    };
    return nextAppointment
      ;


  }



  async getDailySummary(barberId: string) {
    const todayAppointments = await this.getTodayAppointments(barberId);



    console.log('turnos que trae');
    console.log('Today Appointments:', todayAppointments);

    const totalTurns = this.getTotalTurns(todayAppointments);
    const completedTurns = this.getCompletedTurns(todayAppointments);
    const currentEarnings = this.getCurrentEarnings(todayAppointments);
    const estimatedEarnings = this.getEstimatedEarnings(todayAppointments);

    ;
    return {
      completedTurns,
      totalTurns,
      currentEarnings,
      estimatedEarnings,
    };
  }

  private async getTodayAppointments(barberId: string): Promise<Appointment[]> {


    const timeZone = 'America/Bogota';

    const nowUTC = new Date();
    const nowColombia = toZonedTime(nowUTC, timeZone);


    const startDay = startOfDay (nowColombia);
    const endColombia = endOfDay(nowColombia);



  

    return this.appointmentRepository.find({
      where: {
        BarberId: barberId,
        startTime: Between(startDay, endColombia),
      },
      relations: ['service'],
    });

  }

  private getTotalTurns(appointments: Appointment[]): number {
    return appointments.length;
  }

  private getCompletedTurns(appointments: Appointment[]): number {
    const now = new Date();
    return appointments.filter(app => app.EndTime < now).length;
  }

  private getCurrentEarnings(appointments: Appointment[]): number {
    const now = new Date();
    return appointments
      .filter(app => app.EndTime < now && app.service)
      .reduce((sum, app) => sum + Number(app.service.price), 0);
  }

  private getEstimatedEarnings(appointments: Appointment[]): number {
    return appointments
      .filter(app => app.service)
      .reduce((sum, app) => sum + Number(app.service.price), 0);
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

  async findByDate(date: Date): Promise<Appointment[]> {
    const start = new Date(date.toISOString().split('T')[0] + 'T00:00:00.000Z')
    const end = new Date(date.toISOString().split('T')[0] + 'T23:59:59.999Z')

    return await this.appointmentRepository.find({
      where: {
        startTime: Between(start, end)
      },
      order: { startTime: 'ASC' }
    })
  }
}
