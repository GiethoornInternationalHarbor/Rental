import { Model } from 'objectmodel';
import { Customer } from './Customer';
import { Ship } from './Ship';
import { guid } from 'inversify';

export class Request extends Model({
  request: String,
  customerId: guid,
  shipId: guid,
  accepted: Boolean
}) {}

Request.defaults({accepted: false});
