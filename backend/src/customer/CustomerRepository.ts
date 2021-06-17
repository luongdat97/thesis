import { CustomerNS } from "./Customer";
import {
  MongoDB,
  FromMongoData,
  ToMongoData,
  MongoErrorCodes,
} from "../Helper/mongodb";

export class CustomerDALMongo implements CustomerNS.DAL {
  constructor(private db: MongoDB) {}

  async init() {}
  private col_customer_visit_history = this.db.collection(
    "customer_visit_history"
  );
  private col_customer = this.db.collection("customer");
  private col_customer_contact = this.db.collection("customer_contact");

  async GetAllCustomer() {
    const docs = await this.col_customer.find().toArray();
    return FromMongoData.Many<CustomerNS.Customer>(docs);
  }

  async GetAllContact() {
    const docs = await this.col_customer_contact.find().toArray();
    return FromMongoData.Many<CustomerNS.Contact>(docs);
  }

  async DeleteCustomer(customer_id: string) {
    await this.col_customer.deleteOne({ _id: customer_id });
  }

  async DeleteContact(customer_id: string) {
    await this.col_customer_contact.deleteOne({ customer_id: customer_id });
  }

  async GetCustomer(customer_id: string) {
    const doc = await this.col_customer.findOne({ _id: customer_id });
    return FromMongoData.One<CustomerNS.Customer>(doc);
  }

  async GetContact(customer_id: string) {
    const doc = await this.col_customer_contact.findOne({
      customer_id: customer_id,
    });

    return FromMongoData.One<CustomerNS.Contact>(doc);
  }

  async SearchCustomer(phone_number: string) {
    const customer_contact = await this.col_customer_contact.findOne({
      phone_number: phone_number,
    });
    const customer = await this.col_customer.findOne({
      _id: customer_contact.customer_id,
    });
    const visitHistory = await this.col_customer_visit_history.findOne({
      customer_id: customer_contact.customer_id,
    });

    return [
      FromMongoData.One<CustomerNS.Customer>(customer),
      FromMongoData.One<CustomerNS.Contact>(customer_contact),
      FromMongoData.One<CustomerNS.VisitHistory>(visitHistory),
    ];
  }

  async CreateCustomer(customer: CustomerNS.Customer) {
    const doc = ToMongoData.One(customer);
    await this.col_customer.insertOne(doc);
  }

  async UpdateCustomer(customer: CustomerNS.Customer) {
    const doc = ToMongoData.One(customer);
    await this.col_customer.updateOne({ _id: customer.id }, { $set: doc });
  }

  async UpdateContact(Contact: CustomerNS.Contact) {
    const doc = ToMongoData.One(Contact);
    await this.col_customer_contact.updateOne(
      { customer_id: Contact.customer_id },
      { $set: doc }
    );
  }

  async CreateContact(Contact: CustomerNS.Contact) {
    const doc = ToMongoData.One(Contact);
    await this.col_customer_contact.insertOne(doc);
  }

  async CreateVisitHistory(VisitHistory: CustomerNS.VisitHistory) {
    const doc = ToMongoData.One(VisitHistory);
    await this.col_customer_visit_history.insertOne(doc);
  }

  async GetVisitHistory(customer_id: string) {
    const docs = await this.col_customer_visit_history
      .find({ customer_id })
      .toArray();
    return FromMongoData.Many<CustomerNS.VisitHistory>(docs);
  }
}
