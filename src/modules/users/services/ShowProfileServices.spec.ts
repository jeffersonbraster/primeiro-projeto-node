import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileServices';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('UpdateProfile', () => {
  it('should be able show the profile', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const showProfile = new ShowProfileService(fakeUsersRepository);

    const user = await fakeUsersRepository.create({
      name: 'Jejezinho',
      email: 'jejezinho@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jejezinho');
    expect(profile.email).toBe('ejezinho@gmail.com');
  });

  it('should not be able show the profile from no-existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const showProfile = new ShowProfileService(fakeUsersRepository);

    expect(
      showProfile.execute({
        user_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
