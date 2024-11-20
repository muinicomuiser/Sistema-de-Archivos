import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DocumentosModule } from './documentos/documentos.module';
import { OrmModule } from './orm/orm.module';

@Module({
  imports: [
    OrmModule,
    DocumentosModule,
    ServeStaticModule.forRoot({
      rootPath: `./${process.env.DIR_ARCHIVOS}`,
      serveRoot: `/${process.env.RUTA_ESTATICOS_SERVER}`,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
