import { EventoEntity } from 'src/evento/evento.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AsistenteEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
    @Column()
    codigoEstudiante: string;
    @Column()
    email: string;

    @ManyToOne(() => EventoEntity, evento => evento.asistentes)
    evento: EventoEntity;

}
