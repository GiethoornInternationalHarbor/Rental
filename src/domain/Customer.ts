import { Model } from 'objectmodel';

export class Customer extends Model({
  name: String,
  email: String,
  address: String,
  postalCode: String,
  Residence: String

}) {
  public id: string;
}
