import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProviderController';
import ProviderMothAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providerRouter = Router();
const providerController = new ProviderController();
const providerMothAvailabilityController = new ProviderMothAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providerRouter.use(ensureAuthenticaded);

providerRouter.get('/', providerController.index);
providerRouter.get(
  '/:provider_id/month-availability',
  providerMothAvailabilityController.index,
);
providerRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default providerRouter;
