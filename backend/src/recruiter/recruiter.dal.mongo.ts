import { RecruiterNS } from "./recruiter";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class RecruiterDALMongo implements RecruiterNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
    }

    private col_recruiter = this.db.collection("recruiter");

    async ListRecruiter() {
        const docs = await this.col_recruiter.find().toArray();
        return FromMongoData.Many<RecruiterNS.Recruiter>(docs);
    }

    async GetRecruiter(id: string) {
        const doc = await this.col_recruiter.findOne({ _id: id });
        return FromMongoData.One<RecruiterNS.Recruiter>(doc);
    }

    async GetRecruiterByAccount(account_id: string) {
        const doc = await this.col_recruiter.findOne({ account_id });
        return FromMongoData.One<RecruiterNS.Recruiter>(doc);
    }

    async UpdateRecruiter(recruiter: RecruiterNS.Recruiter) {
        const doc = ToMongoData.One(recruiter);
        await this.col_recruiter.updateOne({ _id: recruiter.id }, { $set: doc });
    }

    async DeleteRecruiter(id: string) {
        await this.col_recruiter.deleteOne({ _id: id });
    }

    async CreateRecruiter(recruiter: RecruiterNS.Recruiter) {
        const doc = ToMongoData.One(recruiter);
        await this.col_recruiter.insertOne(doc);
    }
}
