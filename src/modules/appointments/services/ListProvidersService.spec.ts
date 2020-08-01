// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersRepository from './ListProvidersService';

describe('LIstProviders', () => {
  it('should be able to list providers', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeCacheProvider = new FakeCacheProvider();
    const listProviders = new ListProvidersRepository(
      fakeUsersRepository,
      fakeCacheProvider,
    );

    const test1 = await fakeUsersRepository.create({
      name: 'Jejezinho',
      email: 'jejezinho@gmail.com',
      password: '123456',
    });

    const test2 = await fakeUsersRepository.create({
      name: 'Jeje',
      email: 'jejezinho123456@gmail.com',
      password: '123456',
    });

    const logged = await fakeUsersRepository.create({
      name: 'Andre',
      email: 'andre@gmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: logged.id,
    });

    expect(providers).toEqual([test1, test2]);
  });
});
