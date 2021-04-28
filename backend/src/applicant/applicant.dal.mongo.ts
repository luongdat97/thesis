import { ApplicantNS } from "./applicant";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class ApplicantDALMongo implements ApplicantNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
    }

    private col_applicant = this.db.collection("applicant");

    async ListApplicant() {
        const docs = await this.col_applicant.find().toArray();
        return FromMongoData.Many<ApplicantNS.Applicant>(docs);
    }

    async GetApplicant(id: string) {
        const doc = await this.col_applicant.findOne({ _id: id });
        return FromMongoData.One<ApplicantNS.Applicant>(doc);
    }
    async GetApplicantByAccount(account_id: string) {
        const doc = await this.col_applicant.findOne({ account_id });
        return FromMongoData.One<ApplicantNS.Applicant>(doc);
    }

    async UpdateApplicant(applicant: ApplicantNS.Applicant) {
        const doc = ToMongoData.One(applicant);
        await this.col_applicant.updateOne({ _id: applicant.id }, { $set: doc });
    }

    async DeleteApplicant(id: string) {
        await this.col_applicant.deleteOne({ _id: id });
    }

    async CreateApplicant(applicant: ApplicantNS.Applicant) {
        const doc = ToMongoData.One(applicant);
        await this.col_applicant.insertOne(doc);
    }
}
