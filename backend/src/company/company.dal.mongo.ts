import { CompanyNS } from "./company";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class CompanyDALMongo implements CompanyNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {

    }

    private col_company = this.db.collection("company");

    async ListCompany() {
        const docs = await this.col_company.find().toArray();
        return FromMongoData.Many<CompanyNS.Company>(docs);
    }

    async GetCompany(id: string) {
        const doc = await this.col_company.findOne({ _id: id });
        return FromMongoData.One<CompanyNS.Company>(doc);
    }

    async UpdateCompany(company: CompanyNS.Company) {
        const doc = ToMongoData.One(company);
        await this.col_company.updateOne({ _id: company.id }, { $set: doc });
    }

    async DeleteCompany(id: string) {
        await this.col_company.deleteOne({ _id: id });
    }

    async CreateCompany(company: CompanyNS.Company) {
        const doc = ToMongoData.One(company);
        await this.col_company.insertOne(doc);
    }
}
