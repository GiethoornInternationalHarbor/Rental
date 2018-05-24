import { Document, Schema } from 'mongoose';
import { Request } from '../../../domain/Request';
import { guid } from 'inversify';

export interface IRentalDocument extends Request, Document {}

export const RentalSchema = new Schema({
  request:{
    type: String,
    required: true
  }, 
  customerId:{
    type: guid,
    required: true
  }, 
  shipId:{
    type: guid,
    required: true
  }, 
  accepted: {
    type: Boolean,
    required: false,
    default: false
  } 
});
