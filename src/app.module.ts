import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PonenteModule } from './ponente/ponente.module';
import { AuditorioModule } from './auditorio/auditorio.module';
import { AsistenteModule } from './asistente/asistente.module';
import { EventoModule } from './evento/evento.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsistenteEntity } from './asistente/asistente.entity';
import { AuditorioEntity } from './auditorio/auditorio.entity';
import { EventoEntity } from './evento/evento.entity';
import { PonenteEntity } from './ponente/ponente.entity';

@Module({
  imports: [PonenteModule, AuditorioModule, AsistenteModule, EventoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'museum',
      entities: [PonenteEntity, AuditorioEntity, AsistenteEntity, EventoEntity],
      dropSchema: true,
      synchronize: true,
      //keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
