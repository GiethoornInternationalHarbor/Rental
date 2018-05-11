import { Customer } from '../../domain/Customer';

export interface IRentalService {

  customerCreated(customer: Customer): Promise<Customer>;

  customerUpdated(customer: Customer): Promise<Customer>;

  customerDeleted(customer: Customer): Promise<Customer>;

  request(): Promise<Customer>;

  accept(): Promise<Customer>;
}
