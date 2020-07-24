// import AppError from '@shared/errors/AppError';

import ListProviderDayAvailabilityService from './ListProviderDayAvaibilityService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointementsRepository';
// import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvaibility', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the day availability from providers', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11, 0, 0).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: true },
        { hour: 12, available: false },
        { hour: 15, available: false },
      ]),
    );
  });
});
