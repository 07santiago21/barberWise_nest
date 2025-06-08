// src/appointment/entities/appointment.entity.ts
import { Service } from 'src/service/entities/service.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Appointment {

    @Column({ primary: true, generated: 'increment' })
    id: number;

    @Column()
    clientName: string;

    @Column()
    startTime: Date;

    @Column()
    EndTime: Date;

    @Column()
    BarberId: string;


    @ManyToOne(() => Service, (service) => service.appointments, { eager: true })
    service: Service;

}
