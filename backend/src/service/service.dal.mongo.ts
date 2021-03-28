import { ServiceNS } from "./service";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class ServiceDALMongo implements ServiceNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {

    }

    private col_service = this.db.collection("service");
    private col_service_policy = this.db.collection("service_policy");

    async ListService() {
        const docs = await this.col_service.find().toArray();
        return FromMongoData.Many<ServiceNS.Service>(docs);
    }

    async GetService(id: string) {
        const doc = await this.col_service.findOne({ _id: id });
        return FromMongoData.One<ServiceNS.Service>(doc);
    }

    async CreateService(service: ServiceNS.Service) {
        const doc = ToMongoData.One(service);
        await this.col_service.insertOne(doc);
    }

    async UpdateService(service: ServiceNS.Service) {
        const doc = ToMongoData.One(service);
        await this.col_service.updateOne({ _id: service.id }, { $set: doc });
    }

    async DeleteService(id: string) {
        await this.col_service.deleteOne({ _id: id });
    }


    async ListPolicy() {
        const docs = await this.col_service_policy.find().toArray();
        return FromMongoData.Many<ServiceNS.Policy>(docs);
    }

    async GetPolicy(id: string) {
        const doc = await this.col_service_policy.findOne({ _id: id });
        return FromMongoData.One<ServiceNS.Policy>(doc);
    }

    async CreatePolicy(Policy: ServiceNS.Policy) {
        const doc = ToMongoData.One(Policy);
        await this.col_service_policy.insertOne(doc);
    }

    async UpdatePolicy(Policy: ServiceNS.Policy) {
        const doc = ToMongoData.One(Policy);
        await this.col_service_policy.updateOne({ _id: Policy.id }, { $set: doc });
    }

    async DeletePolicy(id: string) {
        await this.col_service_policy.deleteOne({ _id: id });
    }
}