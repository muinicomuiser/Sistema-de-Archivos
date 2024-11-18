import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './orm/orm.module';
import { DocumentosController } from './documentos/documentos.controller';
import { DocumentosModule } from './documentos/documentos.module';

@Module({
  imports: [OrmModule, DocumentosModule],
  controllers: [AppController, DocumentosController],
  providers: [AppService],
})
export class AppModule {}
