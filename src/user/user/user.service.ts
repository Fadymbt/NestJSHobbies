import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async addUser(name: string) {
    // Create a new user object to add to the database
    const newUser = new this.userModel({
      name,
    });
    try {
      const result = await newUser.save();
      return result;
    } catch (error) {
      // Check if the user name string entered is valid which means it contains only letters
      if (error.errors.name.kind === 'regexp') {
        return 'User name must only contain letters';
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getAllUsers() {
    try {
      // Get all users from the database
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async changeName(id: string, new_name: string) {
    try {
      // Check if user exists
      if (this.userModel.exists({ _id: id })) {
        const result = await this.userModel.findOneAndUpdate(
          { _id: id },
          { $set: { name: new_name } },
          { new: true, upsert: true },
        );
        return result;
      } else {
        return 'User does not exist';
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteUser(id: string) {
    try {
      if (this.userModel.exists({ _id: id })) {
        await this.userModel.deleteOne({ _id: id });
        return 'User Deleted Successfully';
      } else {
        return 'User does not exist';
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
