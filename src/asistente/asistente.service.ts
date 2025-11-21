import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsistenteEntity } from './asistente.entity';
import { EventoEntity } from 'src/evento/evento.entity';

@Injectable()
export class AsistenteService {
    constructor(
        @InjectRepository(AsistenteEntity)
        private readonly asistenteRepository: Repository<AsistenteEntity>,
        
        @InjectRepository(EventoEntity)
        private readonly eventoRepository: Repository<EventoEntity>
    ) {}

    async registrarAsistente(eventoId: string, asistente: AsistenteEntity): Promise<AsistenteEntity> {
        const evento = await this.eventoRepository.findOne({where: { id: eventoId }, relations: ['asistentes']});
        if (!evento)
            throw new Error("El evento con el id dado no existe");

        if (evento.asistentes.length > evento.auditorio.capacidad)
            throw new Error("Los asistentes del evento superan la capacidad del auditorio");
        asistente.evento = evento;

        return await this.asistenteRepository.save(asistente)
   }

    async findAsistentesByEvento(eventoId: string): Promise<AsistenteEntity[]> {
        const evento = await this.eventoRepository.findOne({where: { id: eventoId }, relations: ["asistentes", "ponente", "auditorio"] });
        if (!evento)
            throw new Error("El evento con el id dado no existe");
        return evento.asistentes;
    }

}
