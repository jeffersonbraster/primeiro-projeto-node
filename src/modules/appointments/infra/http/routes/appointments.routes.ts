import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProvidersAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providersAppointmentsController = new ProvidersAppointmentsController();

appointmentsRouter.use(ensureAuthenticaded);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providersAppointmentsController.index);

export default appointmentsRouter;
