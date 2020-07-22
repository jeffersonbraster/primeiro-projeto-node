import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileServices';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('UpdateProfile', () => {
  it('should be able to update the profile', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Jejezinho',
      email: 'jejezinho@gmail.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'jeje2',
      email: 'oiesooujeje@gmail.com',
    });

    expect(updateUser.name).toBe('jeje2');
    expect(updateUser.email).toBe('oiesooujeje@gmail.com');
  });

  it('should be not be able to update the profile becouse email its been used by another user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await fakeUsersRepository.create({
      name: 'Jejezinho',
      email: 'oiesooujeje@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'jeje2',
        email: 'oiesooujeje@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Jejezinho',
      email: 'jejezinho@gmail.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'jeje2',
      email: 'oiesooujeje@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('should not be able to update the password without old_password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Jejezinho',
      email: 'jejezinho@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'jeje2',
        email: 'oiesooujeje@gmail.com',

        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Jejezinho',
      email: 'jejezinho@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'jeje2',
        email: 'oiesooujeje@gmail.com',
        old_password: 'wrong old_pass',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
