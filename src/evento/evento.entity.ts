import { AsistenteEntity } from 'src/asistente/asistente.entity';
import { AuditorioEntity } from 'src/auditorio/auditorio.entity';
import { PonenteEntity } from 'src/ponente/ponente.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;
    @Column()
    descripcion: string;
    @Column()
    fecha: Date;
    @Column()
    duracionHoras: number;
    @Column()
    estado: string;

    @OneToMany(() => AsistenteEntity, asistente => asistente.evento)
    asistentes: AsistenteEntity[];

    @ManyToOne(() => PonenteEntity, ponente => ponente.eventos)
    ponente: PonenteEntity;

    @ManyToOne(() => AuditorioEntity, auditorio => auditorio.eventos)
    auditorio: AuditorioEntity;


}
