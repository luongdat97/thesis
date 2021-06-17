import rand from "../Helper/rand";
import { CustomerNS } from "./Customer";

export class CustomerBLLBase implements CustomerNS.BLL {
  constructor(private dal: CustomerNS.DAL) {}

  async init() {}

  async CreateCustomer(params: CustomerNS.CreateCustomerParams) {
    const customer: CustomerNS.Customer = {
      id: rand.uppercase(8),
      full_name: params.full_name,
      gender: params.gender,
      birthday: params.birthday,
      idnum: params.idnum,
    };
    await this.dal.CreateCustomer(customer);
    return customer;
  }

  async CreateContact(params: CustomerNS.CreateContactParams) {
    const contact: CustomerNS.Contact = {
      id: rand.uppercase(8),
      customer_id: params.customer_id,
      full_name: params.full_name,
      idnum: params.idnum,
      phone_number: params.phone_number,
      address: params.address,
      email: params.email,
      relation: params.relation,
    };
    await this.dal.CreateContact(contact);
    return contact;
  }

  async CreateVisitHistory(customer_id: string) {
    const now = Date.now();
    const visitHistory: CustomerNS.VisitHistory = {
      id: rand.uppercase(8),
      customer_id: customer_id,
      time: now,
    };
    await this.dal.CreateVisitHistory(visitHistory);
    return visitHistory;
  }

  async GetAllCustomer() {
    return this.dal.GetAllCustomer();
  }

  async GetAllContact() {
    return this.dal.GetAllContact();
  }

  async SearchCustomer(phone_number: string) {
    const customer_contact = await this.dal.SearchCustomer(phone_number);
    if (!customer_contact) {
      throw CustomerNS.Errors.ErrCustomerNotFound;
    }
    return customer_contact;
  }

  async DeleteCustomer(customer_id: string) {
    const customer = await this.GetCustomer(customer_id);
    await this.dal.DeleteCustomer(customer_id);
    return customer;
  }

  async DeleteContact(customer_id: string) {
    const customerContact = await this.GetContact(customer_id);
    await this.dal.DeleteContact(customer_id);
    return customerContact;
  }

  async GetCustomer(customer_id: string) {
    const customer = await this.dal.GetCustomer(customer_id);
    if (!customer) {
      throw CustomerNS.Errors.ErrCustomerNotFound;
    }
    return customer;
  }

  async GetContact(customer_id: string) {
    const customer_contact = await this.dal.GetContact(customer_id);
    if (!customer_contact) {
      throw CustomerNS.Errors.ErrCustomerContactNotFound;
    }
    return customer_contact;
  }

  async UpdateCustomer(
    customer_id: string,
    params: CustomerNS.UpdateCustomerParams
  ) {
    const customer = await this.GetCustomer(customer_id);
    for (const prop in params) {
      if (params[prop]) {
        customer[prop] = params[prop];
      }
    }
    await this.dal.UpdateCustomer(customer);
  }

  async UpdateContact(
    customer_id: string,
    params: CustomerNS.UpdateContactParams
  ) {
    const customer_contact = await this.GetContact(customer_id);
    for (const prop in params) {
      if (params[prop]) {
        customer_contact[prop] = params[prop];
      }
    }
    await this.dal.UpdateContact(customer_contact);
  }

  async GetVisitHistory(customer_id: string) {
    return this.dal.GetVisitHistory(customer_id);
  }
}
