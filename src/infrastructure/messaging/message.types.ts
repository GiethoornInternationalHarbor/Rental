export enum MessageType {
    Unknown,
    RentalRequested,
    RentalAccepted,
    CustomerCreated,
    CustomerUpdated,
    CustomerDeleted
  }

// tslint:disable-next-line:no-namespace
export namespace MessageType {
    export function toString(type: MessageType) {
      return messageTypeName.get(type);
    }

    export function parse(type: string): MessageType {
      for (const iterator of messageTypeName.entries()) {
        if (iterator['1'] === type) {
          return iterator['0'];
        }
      }

      return MessageType.Unknown;
    }
  }

const messageTypeName = new Map<MessageType, string>([
    [MessageType.RentalRequested, 'RentalRequestedEvent'],
    [MessageType.RentalAccepted, 'RentalAcceptedEvent'],
    [MessageType.CustomerCreated, 'CustomerCreatedEvent'],
    [MessageType.CustomerUpdated, 'CustomerUpdatedEvent'],
    [MessageType.CustomerDeleted, 'CustomerDeletedEvent']
  ]);
