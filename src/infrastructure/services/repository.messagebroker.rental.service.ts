import { inject, injectable } from 'inversify';
import { IRentalService } from '../../application/services/irental.service';
import { TYPES } from '../../di/types';
import { Customer } from '../../domain/Customer';
import { Request } from '../../domain/Request';
import { MessagePublisherProvider, RentalRepositoryProvider } from '../di/di.config';
import { IMessagePublisher } from '../messaging/imessage.publisher';
import { MessageType } from '../messaging/message.types';
import { RabbitMQExchange } from '../rabbitmq/rabbitmq.exchanges';
import { IRentalRepository } from '../repository/irental.repository';

@injectable()
export class RepositoryAndMessageBrokerRentalService implements IRentalService {
  constructor(
    @inject(TYPES.RentalRepositoryProvider)
    private readonly rentalRepositoryProvider: RentalRepositoryProvider,
    @inject(TYPES.MessagePublisherProvider)
    private messagePublisherProvider: MessagePublisherProvider
  ) {}

  public async customerCreated(customer: Customer): Promise<Customer> {
    // Also publish it as an message
    const messagePublisher = await this.getMessagePublisher();
    await messagePublisher.publishMessage(MessageType.CustomerUpdated);

    return customer;
  }

  public async customerUpdated(id: string, customer: Customer): Promise<Customer> {
    // Also publish it as an message
    const messagePublisher = await this.getMessagePublisher();
    await messagePublisher.publishMessage(MessageType.CustomerUpdated);

    return customer;
  }

  public async customerDeleted(id: string): Promise<Customer> {
    const customerObj = new Customer;
    
    // Also publish it as an message
    const messagePublisher = await this.getMessagePublisher();
    await messagePublisher.publishMessage(MessageType.CustomerDeleted);
    
    return customerObj;
    
  }

  public async request(body: any): Promise<Request> {
    const requestRepository = await this.getRentalRepository();
    const request = new Request(body);
    
    const requestSended = requestRepository.sendRequest(request);

    // Also publish it as an message
    const messagePublisher = await this.getMessagePublisher();
    await messagePublisher.publishMessage(MessageType.RentalRequested, requestSended);

    return request;
  }

  public async accept(id: string, body: any): Promise<boolean> {
    const rentalRepository = await this.getRentalRepository();

    const request = new Request(body);
    
    const acceptedRentalRequest = rentalRepository.acceptRequest(id, request);

    // Also publish it as an message
    const messagePublisher = await this.getMessagePublisher();
    await messagePublisher.publishMessage(MessageType.RentalAccepted, acceptedRentalRequest);
    
    return true;
  }

  public async decline(id: string, body: any): Promise<boolean> {
    const rentalRepository = await this.getRentalRepository();
    const request = new Request(body);
    
    const DeclinedRequest = rentalRepository.declineRequest(id, request);

    // Also publish it as an message
    const messagePublisher = await this.getMessagePublisher();
    await messagePublisher.publishMessage(MessageType.RentalDeclined, DeclinedRequest);
    
    return false;
  }

  private async getRentalRepository() {
    return this.rentalRepositoryProvider();
  }

  /**
   * Gets the message publisher
   */
  private async getMessagePublisher() {
    return await this.messagePublisherProvider(RabbitMQExchange.Default);
  }
}
