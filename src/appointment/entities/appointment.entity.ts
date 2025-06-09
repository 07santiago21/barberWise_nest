// src/appointment/entities/appointment.entity.ts
import { Service } from 'src/service/entities/service.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    clientName: string;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @Column()
    barberId: string;


    @ManyToOne(() => Service, (service) => service.appointments, { eager: true })
    service: Service;

}
