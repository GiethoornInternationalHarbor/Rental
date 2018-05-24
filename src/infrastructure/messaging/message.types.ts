export enum MessageType {
    Unknown,
    RentalRequested,
    RentalAccepted,
    RentalDeclined,
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
    [MessageType.RentalRequested, 'RentalRequested'],
    [MessageType.RentalAccepted, 'RentalAccepted'],
    [MessageType.RentalDeclined, 'RentalDeclined'],
    [MessageType.CustomerCreated, 'CustomerCreated'],
    [MessageType.CustomerUpdated, 'CustomerUpdated'],
    [MessageType.CustomerDeleted, 'CustomerDeleted']
  ]);
