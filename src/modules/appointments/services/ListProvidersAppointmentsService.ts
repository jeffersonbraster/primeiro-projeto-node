import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';

// import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentsRepositorys from '../repositories/IAppointmentsRepository';
// import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepositorys,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        day,
        month,
      },
    );

    return appointments;
  }
}
