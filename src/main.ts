import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentosModule } from './documentos/documentos.module';
import { DocumentadorSwagger } from './nico-utils/nico-swagger';
import { NicoLogs } from './nico-utils/nico-logs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const puerto: number = +process.env.PUERTO_API;
  const ambiente: string = process.env.AMBIENTE;
  const documentacion: DocumentadorSwagger = new DocumentadorSwagger(app, 'api')
    .packageJson()
    .modulos([DocumentosModule])
    .documentar();
  await app.listen(puerto);

  NicoLogs.anuncioValor('SERVICIO ACTIVO EN EL PUERTO:', puerto);
  NicoLogs.anuncioValor('AMBIENTE DE TRABAJO:', ambiente);
  await documentacion.logsRutas(`http://localhost:${puerto}`);
}
bootstrap();
