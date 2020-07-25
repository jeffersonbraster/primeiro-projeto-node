import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProvidersApoointments from '@modules/appointments/services/ListProvidersAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listAppointment = container.resolve(ListProvidersApoointments);

    const appointments = await listAppointment.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}
