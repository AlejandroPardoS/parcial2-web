import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EventoService } from './evento.service';
import { EventoEntity } from './evento.entity';
import { EventoDto } from './evento.dto';

@Controller('evento')
export class EventoController {
    constructor(private readonly eventoService: EventoService) {}

    @Post()
    async create(@Body() eventoDto: EventoDto){
        const evento: EventoEntity = plainToInstance(EventoEntity, eventoDto);
        return await this.eventoService.crearEvento(evento)
    }

    @Patch(':eventoId')
    async aprobarEvento(@Param('eventoId') eventoId: string){
        return await this.eventoService.aprobarEvento(eventoId);
    }

    @Delete(':eventoId')
    @HttpCode(204)
    async delete(@Param('eventoId') eventoId: string) {
        return await this.eventoService.eliminarEvento(eventoId);
    }

    @Get(':eventoId')
    async findOne(@Param('eventoId') eventoId: string) {
        return await this.eventoService.findEventoById(eventoId);
    }

}
