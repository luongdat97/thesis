import { SavedJobNS } from "./savedJob";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class SavedJobDALMongo implements SavedJobNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
    }

    private col_savedJob = this.db.collection("saved_job");

    async ListSavedJob() {
        const docs = await this.col_savedJob.find().toArray();
        return FromMongoData.Many<SavedJobNS.SavedJob>(docs);
    }

    async ListSavedJobByApplicant(applicant_id: string) {
        const docs = await this.col_savedJob.find({applicant_id}).toArray();
        return FromMongoData.Many<SavedJobNS.SavedJob>(docs);
    }

    async GetSavedJob(id: string) {
        const doc = await this.col_savedJob.findOne({ _id: id });
        return FromMongoData.One<SavedJobNS.SavedJob>(doc);
    }

    async UpdateSavedJob(savedJob: SavedJobNS.SavedJob) {
        const doc = ToMongoData.One(savedJob);
        await this.col_savedJob.updateOne({ _id: savedJob.id }, { $set: doc });
    }

    async DeleteSavedJob(id: string) {
        await this.col_savedJob.deleteOne({ _id: id });
    }

    async CreateSavedJob(savedJob: SavedJobNS.SavedJob) {
        const doc = ToMongoData.One(savedJob);
        await this.col_savedJob.insertOne(doc);
    }

    async GetSavedJobByApplicantAndJob(applicant_id: string, job_id: string) {
        const doc = await this.col_savedJob.findOne({ applicant_id, job_id });
        return FromMongoData.One<SavedJobNS.SavedJob>(doc);
    }
}
