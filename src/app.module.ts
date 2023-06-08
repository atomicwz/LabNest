import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-ci0ti4g2qv21rs7kqh3g-a',
      port: 5432,
      username: 'fish',
      password: 'taRzczT9RSZW4DxUfZurRlLjsxW3intY',
      database: 'dash_z5xn',
      autoLoadEntities: true,
    }),
    CoursesModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
