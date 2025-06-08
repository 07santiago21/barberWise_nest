import { Appointment } from "src/appointment/entities/appointment.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Service {

    @Column({ primary: true, generated: 'increment' })
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
