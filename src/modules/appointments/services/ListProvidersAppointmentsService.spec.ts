// import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersAppointmentsService from './ListProvidersAppointmentsService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointementsRepository';
// import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProvidersAppointments: ListProvidersAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersAppointments = new ListProvidersAppointmentsService(
      fakeAppointmentRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments from providers', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 6, 30, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 6, 30, 10, 0, 0),
    });

    const appointments = await listProvidersAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 7,
      day: 30,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
