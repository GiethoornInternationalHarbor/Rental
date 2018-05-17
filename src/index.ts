import dotenv from 'dotenv';
import { bootstrap } from './di/bootstrap';
import { diContainer } from './di/di.config';
import { TYPES } from './di/types';
import { checkInfrastructureInitialization } from './infrastructure/di/di.config';
import { MessageBrokerHandlerRentalService } from './infrastructure/services/messagebroker.handler.rental.service';
dotenv.config();

async function runApp() {
  const expressApp = bootstrap(diContainer);
  await checkInfrastructureInitialization();
  const messageHandler = diContainer.get<MessageBrokerHandlerRentalService>(TYPES.MessageHandler);
  return Promise.all([expressApp]);
}

(async () => {
  try {
    await runApp();
  } catch (err) {
    // console.error(err);
    // process.exit(1);
    console.log('startup failed', err);
  }
})();

export { runApp };
