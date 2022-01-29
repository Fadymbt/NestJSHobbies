import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user/user.model';
import { HobbyController } from './hobby.controller';
import { HobbySchema } from './hobby.model';
import { HobbyService } from './hobby.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Hobby', schema: HobbySchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [HobbyController],
  providers: [HobbyService],
})
export class HobbyModule {}
