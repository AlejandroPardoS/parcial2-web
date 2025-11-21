import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditorioEntity } from './auditorio.entity';

@Injectable()
export class AuditorioService {
    constructor(
        @InjectRepository(AuditorioEntity)
        private readonly auditorioRepository: Repository<AuditorioEntity>
    ) {}

    async crearAuditorio(auditorio: AuditorioEntity): Promise<AuditorioEntity> {
        if (auditorio.capacidad <= 0)
            throw new Error("La capaciadad del auditorio debe ser mayor a 0")
        return await this.auditorioRepository.save(auditorio);
    }


}
