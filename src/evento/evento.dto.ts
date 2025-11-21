import {IsDate, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';

export class EventoDto {
    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @IsString()
    @IsDate()
    readonly fecha: Date;

    @IsString()
    @IsNumber()
    readonly duracionHoras: number;

    @IsString()
    @IsNotEmpty()
    readonly estado: string;
}
