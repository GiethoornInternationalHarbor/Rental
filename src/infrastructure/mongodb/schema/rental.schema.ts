import { Document, Schema } from 'mongoose';
import { Request } from '../../../domain/Request';
import { v4 as uuid } from 'uuid';

export interface IRentalDocument extends Request, Document {}

export const RentalSchema = new Schema({
  request:{
    type: String,
    required: true
  },
  _id:{
    type: String,
    required: true,
    default: _=> uuid()
  },
  customerId:{
    type: String,
    required: true
  }, 
  accepted: {
    type: Boolean,
    required: false,
    default: false
  } 
});
