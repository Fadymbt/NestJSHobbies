import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HobbyService } from './hobby.service';

@Controller('hobby')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  @Post('addHobby')
  async addHobby(
    @Body('user_id') user_id: string,
    @Body('passion_level') passion_level: string,
    @Body('hobby_name') hobby_name: string,
    @Body('year') year: string,
  ) {
    const hobby = await this.hobbyService.addHobby(
      user_id,
      passion_level,
      hobby_name,
      year,
    );
    return { hobby };
  }

  @Get('allHobbies')
  async getAllHobbies() {
    const hobbies = await this.hobbyService.getAllHobbies();
    return { hobbies };
  }

  @Get('userHobbies/:id')
  async getUserHobbies(@Param('id') userId) {
    const hobbies = await this.hobbyService.getUserHobbies(userId);
    return { hobbies };
  }

  @Patch('changePassionLevel')
  async changePassionLevel(
    @Body('id') id: string,
    @Body('new_passion_level') new_passion_level: string,
  ) {
    const updatedHobby = await this.hobbyService.changePassionLevel(
      id,
      new_passion_level,
    );
    return { updatedHobby };
  }

  @Delete('deleteHobby')
  async deleteHobby(@Body('id') id: string) {
    const message = await this.hobbyService.deleteHobby(id);
    return { message };
  }
}
