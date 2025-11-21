import { EventoEntity } from 'src/evento/evento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuditorioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
    @Column()
    capacidad: number;
    @Column()
    ubicacion: string;

    @OneToMany(() => EventoEntity, evento => evento.auditorio)
    eventos: EventoEntity[];

}
