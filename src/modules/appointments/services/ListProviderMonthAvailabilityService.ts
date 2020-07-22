import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentsRepositorys from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepositorys: IAppointmentsRepositorys,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = this.appointmentsRepositorys.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );
    console.log(appointments);
    return [{ day: 1, available: false }];
  }
}
