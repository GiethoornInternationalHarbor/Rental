import { Customer } from '../../domain/Customer';
import { Request } from '../../domain/Request';

export interface IRentalService {

  /*
  * @param Customer object
  */
  customerCreated(customer: Customer): Promise<Customer>;

  /*
  * @param Customer id
  * @param Customer object
  */
  customerUpdated(id: string, customer: Customer): Promise<Customer>;

  /*
  * @param Customer id
  */
  customerDeleted(id: string): Promise<Customer>;

  /*
  * @param Request object
  */
  request(request: Request): Promise<Request>;

  /*
  * @param Request id
  */
  accept(id: string, request: Request): Promise<boolean>;

  /*
  * @param Request id
  */
  decline(id: string, request: Request): Promise<boolean>;
}
