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

  constructor(dbClient: MongoDbClient) {
    this.Model = dbClient.model<IRentalDocument>('Rental', RentalSchema);
  }

  public async sendRequest(request: Request): Promise<Request> {
    const createRequest = await this.Model.create(request);

    return mapModelToEntity<IRentalDocument, Request>(createRequest, Request);
  }

  public async acceptRequest(id: String, request: Request): Promise<Request> {
    const getRequest = await this.Model.findByIdAndUpdate(id, request, { new: true });
  
    if (getRequest === null) {
      throw new Error('Customer not found');
    }

    return mapModelToEntity<IRentalDocument, Request>(getRequest, Request);
  }

  public async declineRequest(id: string, request: Request): Promise<Request> {
    const getRequest = await this.Model.findByIdAndUpdate(id, request, { new: true });
  
    if (getRequest === null) {
      throw new Error('Customer not found');
    }

    return mapModelToEntity<IRentalDocument, Request>(getRequest, Request);
  }
}
