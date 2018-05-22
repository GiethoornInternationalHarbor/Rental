import { inject, injectable } from 'inversify';
import { IRentalService } from '../../application/services/irental.service';
import { TYPES } from '../../di/types';
import { Customer } from '../../domain/Customer';
import { MessageHandlerProvider } from '../di/di.config';
import { IMessageHandler } from '../messaging/imessage.handler';
import { MessageType } from '../messaging/message.types';
import { RabbitMQExchange } from '../rabbitmq/rabbitmq.exchanges';
import { RabbitMQQueue } from '../rabbitmq/rabbitmq.queues';

@injectable()
export class MessageBrokerHandlerRentalService {
  private messageHandler: IMessageHandler;
  constructor(
    @inject(TYPES.MessageHandlerProvider)
    private messageHandlerProvider: MessageHandlerProvider,
    @inject(TYPES.IRentalService) private rentalService: IRentalService
  ) {}

  public async postInit() {
    this.messageHandler = await this.messageHandlerProvider(
      RabbitMQExchange.Default,
      RabbitMQQueue.Default
    );

    console.log('Starting message handling, (handling outstanding events)');
    await this.messageHandler.start(this.handleMessage.bind(this));
    console.log('Message handling started, (new events)');
  }

  private async handleMessage(type: MessageType, body?: any) {
    if (!body) {
      // We cant handle anything without a body
      throw new Error(
        `Expected body for message type: ${MessageType.toString(type)}`
      );
    }

    switch (type) {
      case MessageType.CustomerCreated:
        await this.handleCustomerCreated(body);
        break;
      case MessageType.CustomerUpdated: {
        await this.handleCustomerUpdated(body);
        break;
      }
      case MessageType.CustomerDeleted: {
        await this.handleCustomerDeleted(body);
      }
    }
  }

  private async handleCustomerCreated(body: any) {
    const customer = new Customer();

    return this.rentalService.customerCreated(customer);
  }

  private async handleCustomerUpdated(body?: any) {
    const customer = new Customer();

    return this.rentalService.customerUpdated(customer);
  }

  private async handleCustomerDeleted(body: any) {
    const customer = new Customer();

    return this.rentalService.customerDeleted(customer._id);
  }
}
