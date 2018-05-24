import { Model } from 'objectmodel';
import { Customer } from './Customer';
import { Ship } from './Ship';
import { v4 as uuid } from 'uuid';

export class Request extends Model({
  id: String,
  request: String,
  customerId: String,
  accepted: Boolean
}) {}

Request.defaults({
  id: uuid(),
  accepted: false
});
