import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProviderController';

const providerRouter = Router();
const providerController = new ProviderController();

providerRouter.use(ensureAuthenticaded);

providerRouter.get('/', providerController.index);

export default providerRouter;
