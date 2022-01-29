import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user/user.model';
import { Hobby } from './hobby.model';

@Injectable()
export class HobbyService {
  constructor(
    @InjectModel('Hobby') private readonly hobbyModel: Model<Hobby>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async addHobby(
    user_id: string,
    passion_level: string,
    hobby_name: string,
    year: string,
  ) {
    // Check whether the given date is in normal range
    const currentYear = new Date().getFullYear();
    if (Number(year) < 1920 || Number(year) > currentYear) {
      return 'Year is not in range';
    }
    // Create a new hobby object to save to the database
    const newHobby = new this.hobbyModel({
      passion_level,
      name: hobby_name,
      year,
    });
    try {
      // Check if the user exists before adding hobby
      const findUser = await this.userModel.exists({ _id: user_id });
      if (findUser) {
        const result = await newHobby.save();
        await this.userModel.findOneAndUpdate(
          { _id: user_id },
          { $push: { hobbies: result.id } },
          { new: true },
        );
        return result;
      } else {
        return 'User does not exist';
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllHobbies() {
    try {
      // Get all hobbies from the database
      const hobbies = await this.hobbyModel.find();
      return hobbies;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getUserHobbies(user_id: string) {
    // Check if the user exists to retrieve hobbies IDs
    if (this.userModel.exists({ _id: user_id })) {
      const result = await this.userModel
        .findOne({ _id: user_id })
        .select('hobbies');
      // Get all hobbies of a specific user
      const hobbies = await this.hobbyModel.find({
        _id: { $in: result.hobbies },
      });
      return hobbies;
    } else {
      return 'User does not exist';
    }
  }

  async changePassionLevel(id: string, new_passion_level: string) {
    try {
      if (this.userModel.exists({ _id: id })) {
        // Get the hobby by ID and update it's passion level
        const updatedHobby = await this.hobbyModel.findOneAndUpdate(
          { _id: id },
          { $set: { passion_level: new_passion_level } },
          { new: true, upsert: true, runValidators: true },
        );
        return updatedHobby;
      } else {
        return 'Hobby does not exist';
      }
    } catch (error) {
      // Check for validation errors of invalid data
      if (error.errors.passion_level.kind === 'enum') {
        return 'Incorrect passion level value';
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteHobby(id: string) {
    try {
      if (this.userModel.exists({ _id: id })) {
        // Deletes hobby from the database
        await this.hobbyModel.deleteOne({ _id: id });

        // Removes all hobby IDs from user objects
        await this.userModel.updateMany(
          {},
          { $pull: { hobbies: id } },
          { new: true, upsert: true },
        );
        return 'Hobby Deleted Successfully';
      } else {
        return 'Hobby does not exist';
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
