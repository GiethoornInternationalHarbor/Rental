import { Document, Schema } from 'mongoose';
import { Request } from '../../../domain/Request';

export interface IRentalDocument extends Request, Document {}

export const RentalSchema = new Schema({
  request:{
    type: String,
    required: true
}, 
  accepted: {
    type: Boolean,
    required: false,
    default: false
} 
});
