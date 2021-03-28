export namespace CustomerNS {
  export interface Customer {
    id: string;
    full_name: string;
    gender: string;
    birthday: string;
    idnum?: string;
  }

  export interface Contact {
    id: string;
    customer_id: string;
    full_name: string;
    idnum?: string;
    phone_number?: string;
    address: string;
    email?: string;
    relation?: string;
  }

  export interface VisitHistory {
    id: string;
    customer_id: string;
    time: number;
  }

  export interface CreateCustomerParams {
    full_name: string;
    gender: string;
    birthday: string;
    idnum?: string;
  }

  export interface UpdateCustomerParams {
    full_name?: string;
    gender?: string;
    birthday?: string;
    idnum?: string;
  }
  export interface SearchCustomerParams {
    full_name?: string;
    gender?: string;
    birthday?: string;
    idnum?: string;
  }

  export interface UpdateContactParams {
    full_name?: string;
    idnum?: string;
    phone_number?: string;
    address?: string;
    email?: string;
    relation?: string;
  }

  export interface CreateContactParams {
    full_name: string;
    customer_id: string;
    idnum?: string;
    phone_number?: string;
    address: string;
    email?: string;
    relation?: string;
  }

  export interface BLL {
    GetAllCustomer(): Promise<Customer[]>;
    GetAllContact(): Promise<Contact[]>;
    GetCustomer(customer_id: string): Promise<Customer>;
    GetContact(customer_id: string): Promise<Contact>;
    DeleteCustomer(customer_id: string): Promise<Customer>;
    DeleteContact(customer_id: string): Promise<Contact>;
    SearchCustomer(
      phone_number: string
    ): Promise<(Customer | Contact | VisitHistory)[]>;
    CreateCustomer(params: CreateCustomerParams): Promise<Customer>;
    UpdateCustomer(
      customer_id: string,
      params: UpdateCustomerParams
    ): Promise<void>;
    UpdateContact(
      customer_id: string,
      params: UpdateContactParams
    ): Promise<void>;
    CreateContact(params: CreateContactParams): Promise<Contact>;
    GetVisitHistory(customer_id: string): Promise<VisitHistory[]>;
    CreateVisitHistory(customer_id: string): Promise<VisitHistory>;
  }

  export interface DAL {
    GetAllCustomer(): Promise<Customer[]>;
    GetAllContact(): Promise<Contact[]>;
    GetCustomer(customer_id: string): Promise<Customer>;
    GetContact(customer_id: string): Promise<Contact>;
    SearchCustomer(
      phone_number: string
    ): Promise<(Customer | Contact | VisitHistory)[]>;
    DeleteCustomer(customer_id: string): Promise<void>;
    DeleteContact(customer_id: string): Promise<void>;
    CreateCustomer(customer: Customer): Promise<void>;
    UpdateCustomer(customer: Customer): Promise<void>;
    UpdateContact(Contact: Contact): Promise<void>;
    CreateContact(Contact: Contact): Promise<void>;

    GetVisitHistory(customer_id: string): Promise<VisitHistory[]>;
    CreateVisitHistory(VisitHistory: VisitHistory): Promise<void>;
  }
  export const Errors = {
    ErrCustomerNotFound: new Error("Customer not found"),
    ErrCustomerContactNotFound: new Error("Customer contact not found"),
  };
}
