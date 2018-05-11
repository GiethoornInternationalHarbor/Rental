import { AsyncContainerModule } from 'inversify';
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

export type MessagePublisherProvider = (exchange: string) => Promise<IMessagePublisher>;

export type MessageHandlerProvider = (exchange: string, queue: string) => Promise<IMessageHandler>;

export const InfrastructureContainerModule = new AsyncContainerModule(
  async bind => {
    const [dbClient, rabbitMqClient] = await Promise.all([getDatabaseClient(), getRabbitMQChannel()]);

    // Add the db to the di container
    // diContainer.bind<MongoDbClient>(TYPES.MongoDbClient).toConstantValue(dbClient);

    diContainer.bind<RabbitMQChannel>(TYPES.RabbitMQChannel).toConstantValue(rabbitMqClient);

    diContainer
      .bind<MessagePublisherProvider>(TYPES.MessagePublisherProvider)
      .toProvider<IMessagePublisher>(context => {
        return async (exchange: string) => {
          const channel = context.container.get<RabbitMQChannel>(
            TYPES.RabbitMQChannel
          );

          // We have the connection and channel now
          // Need to assert the exchange (this ensures the exchange exists)
          await channel.assertExchange(exchange, 'fanout', {
            durable: true,
            autoDelete: false
          });

          const publisher = new RabbitMQMessagePublisher(exchange, channel);
          return publisher;
        };
      });

    diContainer
      .bind<MessageHandlerProvider>(TYPES.MessageHandlerProvider)
      .toProvider<IMessageHandler>(context => {
        return async (exchange: string, queue: string) => {
          const channel = context.container.get<RabbitMQChannel>(
            TYPES.RabbitMQChannel
          );

          // We have the connection and channel now
          // Need to assert the exchange (this ensures the exchange exists)
          await channel.assertExchange(exchange, 'fanout', {
            durable: true,
            autoDelete: false
          });

          await channel.assertQueue(queue);
          await channel.bindQueue(queue, exchange, '');

          const handler = new RabbitMQMessageHandler(queue, channel);
          return handler;
        };
      });

    diContainer.bind<IRentalRepository>(TYPES.IRentalRepository).to(MongoDbRequestRepository);

    diContainer
      .bind<IRentalService>(TYPES.IRentalService)
      .to(RepositoryAndMessageBrokerRentalService)
      .inSingletonScope();

    diContainer
      .bind(TYPES.MessageHandler)
      .to(MessageBrokerHandlerRentalService)
      .inSingletonScope();
  }
);
