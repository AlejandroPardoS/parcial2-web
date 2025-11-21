import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsistenteEntity } from './asistente.entity';

@Injectable()
export class AsistenteService {
    constructor(
        @InjectRepository(AsistenteEntity)
        private readonly asistenteRepository: Repository<AsistenteEntity>
    ) {}

    async registrarAsistente(id: string, asistente: AsistenteEntity): Promise<AsistenteEntity> {
        const persistedAsistente = await this.asistenteRepository.findOne({where:{id}});
        if (!persistedAsistente)
            throw new Error("The asistente with the given id was not found");

        return await this.asistenteRepository.save({...persistedAsistente, ...asistente});
   }

}
