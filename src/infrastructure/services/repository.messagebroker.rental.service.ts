import { inject, injectable, postConstruct } from 'inversify';
import { IRentalService } from '../../application/services/irental.service';
import { TYPES } from '../../di/types';
import { Customer } from '../../domain/Customer';
import { Request } from '../../domain/Request';
import { MessagePublisherProvider } from '../di/di.config';
import { IMessagePublisher } from '../messaging/imessage.publisher';
import { MessageType } from '../messaging/message.types';
import { RabbitMQExchange } from '../rabbitmq/rabbitmq.exchanges';
import { IRentalRepository } from '../repository/irental.repository';

@injectable()
export class RepositoryAndMessageBrokerRentalService implements IRentalService {
  constructor(
    @inject(TYPES.IRentalRepository) private truckRepository: IRentalRepository,
    @inject(TYPES.MessagePublisherProvider)
    private messagePublisherProvider: MessagePublisherProvider
  ) {}

  /**
   * Gets the message publisher
   */
  private async getMessagePublisher() {
    const t = await this.messagePublisherProvider(RabbitMQExchange.Default);
    return t;
  }
}
