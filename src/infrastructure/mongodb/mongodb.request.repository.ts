import { inject, injectable } from 'inversify';
import { Model, Schema } from 'mongoose';
import { TYPES } from '../../di/types';
import { Request } from '../../domain/Request';
import { IRentalRepository } from '../repository/irental.repository';
import { mapModelToEntity } from './helpers/mapper.helper';
import { MongoDbClient } from './mongodb.client';
import { IRentalDocument, RentalSchema } from './schema/rental.schema';

@injectable()
export class MongoDbRequestRepository implements IRentalRepository {
  protected Model: Model<IRentalDocument>;

  constructor(@inject(TYPES.MongoDbClient) dbClient: MongoDbClient) {
    this.Model = dbClient.model<IRentalDocument>('Rental', RentalSchema);
  }

  public async sendRequest(value: string): Promise<Request> {
    return Request;
  }

  public async acceptRequest(): Promise<Request> {
    return Request;
  }

  public async declineRequest(): Promise<Request> {
    return Request;
  }
}
