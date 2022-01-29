import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('addUser')
  async addUser(@Body('name') name: string) {
    const user = await this.userService.addUser(name);
    return { user };
  }

  @Get('allUsers')
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return { users };
  }

  @Patch('changeName')
  async changeName(@Body('id') id: string, @Body('name') new_name: string) {
    const user = await this.userService.changeName(id, new_name);
    return { user };
  }

  @Delete('deleteUser')
  async deleteUser(@Body('id') id: string) {
    const message = await this.userService.deleteUser(id);
    return { message };
  }
}
