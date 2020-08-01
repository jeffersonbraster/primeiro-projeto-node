import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointementsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeCacheProvider = new FakeCacheProvider();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: '123123',
      provider_id: 'testefakeappointments',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('testefakeappointments');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'testefakeappointments',
      user_id: '123123',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'testefakeappointments',
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on a past date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeCacheProvider = new FakeCacheProvider();
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: 'testefakeappointments',
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeCacheProvider = new FakeCacheProvider();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: '123123',
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment outside available hours', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeCacheProvider = new FakeCacheProvider();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 7),
        provider_id: '123123',
        user_id: '1231234',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 7),
        provider_id: '123123',
        user_id: '1231234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
