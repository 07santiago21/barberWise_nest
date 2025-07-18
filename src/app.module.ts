import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointment/appointment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',  
      url: '',
      autoLoadEntities:true,
      synchronize:true
      }
    ),
    
    
    AppointmentModule,
    
    
    ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
