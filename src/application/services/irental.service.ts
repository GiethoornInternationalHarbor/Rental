import { Customer } from '../../domain/Customer';
import { Request } from '../../domain/Request';

export interface IRentalService {

  customerCreated(customer: Customer): Promise<Customer>;

  customerUpdated(customer: Customer): Promise<Customer>;

  customerDeleted(customer: Customer): Promise<Customer>;

  request(): Promise<Request>;

  accept(): Promise<boolean>;

  decline(): Promise<boolean>;
}
