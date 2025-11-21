import {IsDate, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';

export class AuditorioDto {
    
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsString()
    @IsNumber()
    readonly capacidad: number;

    @IsString()
    @IsNotEmpty()
    readonly ubicacion: string;

}
