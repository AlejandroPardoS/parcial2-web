import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PonenteEntity } from './ponente.entity';

@Injectable()
export class PonenteService {
    constructor(
        @InjectRepository(PonenteEntity)
        private readonly ponenteRepository: Repository<PonenteEntity>
    ) {}

    async crearPonente(ponente: PonenteEntity): Promise<PonenteEntity> {
        if (ponente.tipoPonente === "Interno") {
            if (!ponente.email.endsWith(".edu")) 
                throw new Error("Un ponente interno debe tener un correo institucional que termine en .edu");
        }
        if (ponente.tipoPonente === "Invitado") {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(ponente.email)) 
                throw new Error("El correo del ponente invitado no es válido");
        }
            return this.ponenteRepository.save(ponente);
        }

    async findPonenteById(id: string): Promise<PonenteEntity> {
        const ponente = await this.ponenteRepository.findOne({where: {id}, relations: ["eventos"] } );
        if (!ponente)
          throw new Error("The ponente with the given id was not found");
        return ponente;
    }

    async eliminarPonente(id: string): Promise<void> {
        const ponente = await this.ponenteRepository.findOne({where:{id}});
        if (!ponente)
            throw new Error("The ponente with the given id was not found");
        if (ponente.eventos && ponente.eventos.length > 0)
            throw new Error("The ponente with the given id cannot be deleted because it has associated eventos");
        await this.ponenteRepository.remove(ponente);
   }

}