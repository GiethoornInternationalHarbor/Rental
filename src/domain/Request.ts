import { Model } from 'objectmodel';

export class Request extends Model({
  request: String,
  accepted: Boolean
}) {}

Request.defaults({accepted: false});
