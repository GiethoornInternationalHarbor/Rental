import { Request } from '../../domain/Request';

export interface IRentalRepository {

    sendRequest(request: Request): Promise<Request>;

    acceptRequest(id: string, request: Request): Promise<Request>;

    declineRequest(id: string, request: Request): Promise<Request>;
}
