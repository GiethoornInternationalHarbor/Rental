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
    @inject(TYPES.IRentalRepository) private rentalRepository: IRentalRepository,
    @inject(TYPES.MessagePublisherProvider)
    private messagePublisherProvider: MessagePublisherProvider
  ) {}

  public async customerCreated(customer: Customer): Promise<Customer> {
    return customer;
  }

  public async customerUpdated(customer: Customer): Promise<Customer> {
    return customer;
  }

  public async customerDeleted(customer: Customer): Promise<Customer> {
    return customer;
  }

  public async request(): Promise<Request> {
    const request = this.rentalRepository.sendRequest('request sended');

    // Also publish it as an message
    const messagePublisher = await this.getMessagePublisher();
    await messagePublisher.publishMessage(MessageType.RentalRequested);

    return request;
  }

  public async accept(): Promise<boolean> {

    const request = this.rentalRepository.acceptRequest();

    return true;
  }

  public async decline(): Promise<boolean> {
    const request = this.rentalRepository.declineRequest();

    return false;
  }

  /**
   * Gets the message publisher
   */
  private async getMessagePublisher() {
    const t = await this.messagePublisherProvider(RabbitMQExchange.Default);
    return t;
  }
}
