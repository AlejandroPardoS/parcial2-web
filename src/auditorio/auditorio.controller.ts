import { Body, Controller, Post } from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { plainToInstance } from 'class-transformer';
import { AuditorioDto } from './auditorio.dto';
import { AuditorioEntity } from './auditorio.entity';

@Controller('auditorio')
export class AuditorioController {
    constructor(private readonly auditorioService: AuditorioService) {}

    @Post()
    async create(@Body() auditorioDto: AuditorioDto){
        const auditorio: AuditorioEntity = plainToInstance(AuditorioEntity, auditorioDto);
        return await this.auditorioService.crearAuditorio(auditorio)
    }
}
