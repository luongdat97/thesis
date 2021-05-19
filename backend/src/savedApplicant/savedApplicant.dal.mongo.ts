import { SavedApplicantNS } from "./savedApplicant";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class SavedApplicantDALMongo implements SavedApplicantNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
    }

    private col_savedApplicant = this.db.collection("saved_applicant");

    async ListSavedApplicant() {
        const docs = await this.col_savedApplicant.find().toArray();
        return FromMongoData.Many<SavedApplicantNS.SavedApplicant>(docs);
    }

    async ListSavedApplicantByRecruiter(recruiter_id: string) {
        const docs = await this.col_savedApplicant.find({recruiter_id}).toArray();
        return FromMongoData.Many<SavedApplicantNS.SavedApplicant>(docs);
    }

    async GetSavedApplicant(id: string) {
        const doc = await this.col_savedApplicant.findOne({ _id: id });
        return FromMongoData.One<SavedApplicantNS.SavedApplicant>(doc);
    }

    async GetSavedApplicantByRecruiter(recruiter_id: string, applicant_id: string) {
        const doc = await this.col_savedApplicant.findOne({ recruiter_id, applicant_id });
        return FromMongoData.One<SavedApplicantNS.SavedApplicant>(doc);
    }

    async UpdateSavedApplicant(savedApplicant: SavedApplicantNS.SavedApplicant) {
        const doc = ToMongoData.One(savedApplicant);
        await this.col_savedApplicant.updateOne({ _id: savedApplicant.id }, { $set: doc });
    }

    async DeleteSavedApplicant(id: string) {
        await this.col_savedApplicant.deleteOne({ _id: id });
    }

    async CreateSavedApplicant(savedApplicant: SavedApplicantNS.SavedApplicant) {
        const doc = ToMongoData.One(savedApplicant);
        await this.col_savedApplicant.insertOne(doc);
    }

}
