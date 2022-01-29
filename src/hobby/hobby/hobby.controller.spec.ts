import { Test, TestingModule } from '@nestjs/testing';
import { HobbyController } from './hobby.controller';
import { HobbyService } from './hobby.service';

describe('HobbyController', () => {
  let controller: HobbyController;

  const mockHobbyService = {
    addHobby: jest.fn((user_id, passion_level, name, year) => {
      return {
        _id: 'jkn1234njkn',
        passion_level,
        name,
        year,
      };
    }),
    getAllHobbies: jest.fn(() => {
      return [
        {
          _id: 'jkn1234njkn',
          passion_level: 'High',
          name: 'Baseball',
          year: '1998',
        },
        {
          _id: 'jd8a9hcsd89n',
          passion_level: 'Low',
          name: 'Basketball',
          year: '2012',
        },
      ];
    }),
    getUserHobbies: jest.fn(() => {
      return [
        {
          _id: 'inaos89nais9',
          passion_level: 'High',
          name: 'Football',
          year: '1998',
        },
      ];
    }),
    changePassionLevel: jest.fn((id, new_passion_level) => {
      return {
        _id: id,
        passion_level: new_passion_level,
        name: 'Football',
        year: '1998',
      };
    }),
    deleteHobby: jest.fn((id) => {
      return 'Hobby Deleted Successfully';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HobbyController],
      providers: [HobbyService],
    })
      .overrideProvider(HobbyService)
      .useValue(mockHobbyService)
      .compile();

    controller = module.get<HobbyController>(HobbyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addHobby', () => {
    describe('when addHobby is called', () => {
      test('should add and return the added hobby', async () => {
        const user_id = 'ni9nwd98na9';
        const name = 'Fady';
        const passion_level = 'Medium';
        const year = '1998';
        expect(
          await controller.addHobby(user_id, passion_level, name, year),
        ).toEqual({
          hobby: {
            _id: expect.any(String),
            name: name,
            passion_level: passion_level,
            year: year,
          },
        });
      });
    });
  });

  describe('allHobbies', () => {
    describe('when allHobbies is called', () => {
      test('should return a list of all hobbies', async () => {
        expect(await controller.getAllHobbies()).toEqual({
          hobbies: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              name: expect.any(String),
              passion_level: expect.any(String),
              year: expect.any(String),
            }),
          ]),
        });
      });
    });
  });

  describe('allUserHobbies', () => {
    describe('when allUserHobbies is called', () => {
      test('should return a list of all hobbies for a specific user', async () => {
        const user_id = 'ni9nwd98na9';
        expect(await controller.getUserHobbies(user_id)).toEqual({
          hobbies: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              name: expect.any(String),
              passion_level: expect.any(String),
              year: expect.any(String),
            }),
          ]),
        });
      });
    });
  });

  describe('changePassionLevel', () => {
    describe('when changePassionLevel is called', () => {
      test('should change the passion level of a hobby and return the updaeted hobby', async () => {
        const id = 'Fady';
        const new_passion_level = 'Medium';
        expect(
          await controller.changePassionLevel(id, new_passion_level),
        ).toEqual({
          updatedHobby: {
            _id: id,
            name: expect.any(String),
            passion_level: new_passion_level,
            year: expect.any(String),
          },
        });
      });
    });
  });

  describe('deleteHobby', () => {
    describe('when deleteHobby is called', () => {
      test('should delete hobby and return a success string', async () => {
        const id = 'jkn1234njkn';
        expect(await controller.deleteHobby(id)).toEqual({
          message: 'Hobby Deleted Successfully',
        });
      });
    });
  });
});
