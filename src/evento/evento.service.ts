import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventoEntity } from './evento.entity';

@Injectable()
export class EventoService {
    constructor(
        @InjectRepository(EventoEntity)
        private readonly eventoRepository: Repository<EventoEntity>
    ) {}

    async crearEvento(evento: EventoEntity): Promise<EventoEntity> {
        if (evento.duracionHoras <= 0) {
            throw new Error("La duración del evento debe ser un número positivo");
        }
        if (evento.ponente.tipoPonente === "Invitado") {
            if (evento.descripcion.length < 50) {
                throw new Error("La descripción de un evento con ponente invitado debe tener al menos 50 caracteres");
            }
        }
        return await this.eventoRepository.save(evento);
    }

    async aprobarEvento(id: string): Promise<EventoEntity> {
        const evento = await this.eventoRepository.findOne({where: {id}});
        if (!evento) {
            throw new Error("El evento con el ID proporcionado no fue encontrado");
        }
        if (!evento.auditorio)
            throw new Error("El evento no tiene un auditorio asignado");

        evento.estado = "Aprobado";
        return await this.eventoRepository.save(evento);
    }

    async eliminarEvento(id: string) {
        const evento = await this.eventoRepository.findOne({where:{id}});
        if (!evento)
            throw new Error("The evento with the given id was not found");

        if (evento.estado === 'Aprobado')
            throw new Error("El evento no puede eliminarse porque ya fue aprobado")

        await this.eventoRepository.remove(evento);
    }

    async findEventoById(id: string): Promise<EventoEntity> {
        const evento = await this.eventoRepository.findOne({where: {id}, relations: ["asistentes", "ponente", "auditorio"] } );
        if (!evento)
          throw new Error("The evento with the given id was not found");
    
        return evento;
    }
}
