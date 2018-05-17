import { Model } from 'objectmodel';

export class Request extends Model({
  question: String,
  accepted: Boolean
}) {}

Request.defaults({accepted: false});
