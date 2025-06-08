import { Appointment } from "src/appointment/entities/appointment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ type: 'varchar'})
    name: string;

    @Column({type:'decimal'})
    price: number;

    @Column({ type: 'integer'})
    duration: number;


    @OneToMany(() => Appointment, (appointment) => appointment.service)
    appointments: Appointment[];

}
