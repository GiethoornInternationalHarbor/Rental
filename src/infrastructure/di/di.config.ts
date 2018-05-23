import { ContainerModule } from 'inversify';
import { IRentalService } from '../../application/services/irental.service';
import { diContainer } from '../../di/di.config';
import { TYPES } from '../../di/types';
import { IMessageHandler } from '../messaging/imessage.handler';
import { IMessagePublisher } from '../messaging/imessage.publisher';
import { getDatabaseClient, MongoDbClient } from '../mongodb/mongodb.client';
import { MongoDbRequestRepository } from '../mongodb/mongodb.request.repository';
import { getRabbitMQChannel, RabbitMQChannel } from '../rabbitmq/rabbitmq.channel';
import { RabbitMQMessageHandler } from '../rabbitmq/rabbitmq.message.handler';
import { RabbitMQMessagePublisher } from '../rabbitmq/rabbitmq.message.publisher';
import { IRentalRepository } from '../repository/irental.repository';
import { MessageBrokerHandlerRentalService } from '../services/messagebroker.handler.rental.service';
import { RepositoryAndMessageBrokerRentalService } from '../services/repository.messagebroker.rental.service';

/**
 * Provider for the IMessagePublisher interface
 */
export type MessagePublisherProvider = (exchange: string) => Promise<IMessagePublisher>;

/**
 * Provider for the IMessageHandler interface
 */
export type MessageHandlerProvider = (exchange: string, queue: string) => Promise<IMessageHandler>;

/**
 * Provider for the ITruckRepository interface
 */
export type RentalRepositoryProvider = () => Promise<IRentalRepository>;

export const InfrastructureContainerModule = new ContainerModule(bind => {
  bind<MessagePublisherProvider>(TYPES.MessagePublisherProvider).toProvider<IMessagePublisher>(context => {
    return async (exchange: string) => {
      const channel = await getRabbitMQChannel();

      // We have the connection and channel now
      // Need to assert the exchange (this ensures the exchange exists)
      await channel.assertExchange(exchange, 'fanout', {durable: true, autoDelete: false});

      const publisher = new RabbitMQMessagePublisher(exchange, channel);

      return publisher;
    };
  });

  bind<MessageHandlerProvider>(TYPES.MessageHandlerProvider).toProvider<IMessageHandler>(context => {
    return async (exchange: string, queue: string) => {
      const channel = await getRabbitMQChannel();

      // We have the connection and channel now
      // Need to assert the exchange (this ensures the exchange exists)
      await channel.assertExchange(exchange, 'fanout', {durable: true, autoDelete: false});

      await channel.assertQueue(queue);
      await channel.bindQueue(queue, exchange, '');

      const handler = new RabbitMQMessageHandler(queue, channel);
      return handler;
    };
  });

  bind<RentalRepositoryProvider>(TYPES.RentalRepositoryProvider).toProvider<IRentalRepository>(context => {
    return async () => {
      const dbClient = await getDatabaseClient();
      return new MongoDbRequestRepository(dbClient);
    };
  });

  bind<IRentalService>(TYPES.IRentalService).to(RepositoryAndMessageBrokerRentalService);

  bind(TYPES.MessageHandler).to(MessageBrokerHandlerRentalService).inSingletonScope();
});

export async function checkInfrastructureInitialization() {
  return Promise.all([getDatabaseClient(), getRabbitMQChannel()]);
}
