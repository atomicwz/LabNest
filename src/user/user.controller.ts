import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../decorators/isPublicKey';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { AuthGuard } from '../auth/auth.guard';
import { HelperFile } from 'src/config/helper';
import { Observable, of } from 'rxjs';
import { join } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('admin/:id')
  findAllAdmin(@Param('id') id: string) {
    return this.userService.findAllAdmins(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('admin/:id')
  createAdmin(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    return this.userService.createAdmin(id, createUserDto);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/profileImages',
        filename: HelperFile.customFilename,
      }),
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  updateAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateAvatar(id, file.path, file.filename);
  }

  @Public()
  @Get('profile-image/uploads/profileImages/:imagename')
  findProfileImage(
    @Param('imagename') imagename,
    @Res() res,
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Observable<Object> {
    return of(
      res.sendFile(join(process.cwd(), 'uploads/profileImages/' + imagename)),
    );
  }
}
