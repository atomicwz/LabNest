import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: process.env.HOST || 'dpg-ci0ti4g2qv21rs7kqh3g-ay',
      username: process.env.USERDB || 'fish',
      password: process.env.PASSWORD || 'taRzczT9RSZW4DxUfZurRlLjsxW3intY',
      database: process.env.DATABASE || 'dash_z5xn',
      autoLoadEntities: true,
      synchronize: process.env.DATABASE && true,
    }),
    CoursesModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
