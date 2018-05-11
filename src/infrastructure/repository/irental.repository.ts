import { Request } from '../../domain/Request';

export interface IRentalRepository {

    sendRequest(value: string): Promise<Request>;

    acceptRequest(): Promise<boolean>;

    declineRequest(): Promise<boolean>;
}
