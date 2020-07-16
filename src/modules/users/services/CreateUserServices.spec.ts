import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserServices';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Jejezinho',
      email: 'jejezinho@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with some email from another person', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Jejezinho',
      email: 'jejezinho@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Jejezinho',
        email: 'jejezinho@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
