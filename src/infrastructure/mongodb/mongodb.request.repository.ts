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

  public async sendRequest(question: string): Promise<Request> {
    const createRequest = await this.Model.create(question);
    const createdRequest = mapModelToEntity<IRentalDocument, Request>(createRequest, Request);
    return createdRequest;
  }

  public async acceptRequest(): Promise<boolean> {
    return true;
  }

  public async declineRequest(): Promise<boolean> {
    return false;
  }
}
