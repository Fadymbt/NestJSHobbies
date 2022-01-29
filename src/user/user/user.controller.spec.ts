import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    addUser: jest.fn((data) => {
      return {
        _id: 'jkn1234njkn',
        name: data,
        hobbies: [],
      };
    }),
    getAllUsers: jest.fn(() => {
      return [
        {
          _id: 'jkn1234njkn',
          name: 'Name',
          hobbies: [],
        },
        {
          _id: 'jkn1234njkn',
          name: 'Name',
          hobbies: ['ainosna89ns9an', 'ad89ja8s998an'],
        },
      ];
    }),
    changeName: jest.fn((id, data) => {
      return {
        _id: id,
        name: data,
        hobbies: ['ad89ja8s998an'],
      };
    }),
    deleteUser: jest.fn((id) => {
      return 'User Deleted Successfully';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      test('should add and return the added user', async () => {
        const name = 'Fady';
        expect(await controller.addUser(name)).toEqual({
          user: {
            _id: expect.any(String),
            name: name,
            hobbies: [],
          },
        });
      });
    });
  });

  describe('getAllUser', () => {
    describe('when getAllUser is called', () => {
      test('should return a list of all users', async () => {
        expect(await controller.getAllUsers()).toEqual({
          users: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              name: expect.any(String),
              hobbies: expect.arrayContaining([expect.any(String) || []]),
            }),
          ]),
        });
      });
    });
  });

  describe('changeName', () => {
    describe('when changeName is called', () => {
      test('should update the user name and return a user', async () => {
        const id = 'iond89an9cdn9';
        const name = 'Fady';
        expect(await controller.changeName(id, name)).toEqual({
          user: {
            _id: id,
            name: name,
            hobbies: expect.arrayContaining([expect.any(String) || []]),
          },
        });
      });
    });
  });

  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      test('should delete user and return a success string', async () => {
        const id = 'iond89an9cdn9';
        expect(await controller.deleteUser(id)).toEqual({
          message: 'User Deleted Successfully',
        });
      });
    });
  });
});
