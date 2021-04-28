import { JobNS } from "./job";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class JobDALMongo implements JobNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {

    }

    private col_job = this.db.collection("job");

    async ListJob(recruiter_id?: string) {
        let docs;
        if (recruiter_id) {
            docs = await this.col_job.find({ recruiter_id }).toArray();
        } else {
            docs = await this.col_job.find().toArray();
        }
        
        return FromMongoData.Many<JobNS.Job>(docs);
    }

    async GetJob(id: string) {
        const doc = await this.col_job.findOne({ _id: id });
        return FromMongoData.One<JobNS.Job>(doc);
    }

    async UpdateJob(job: JobNS.Job) {
        const doc = ToMongoData.One(job);
        await this.col_job.updateOne({ _id: job.id }, { $set: doc });
    }

    async DeleteJob(id: string) {
        await this.col_job.deleteOne({ _id: id });
    }

    async CreateJob(job: JobNS.Job) {
        const doc = ToMongoData.One(job);
        await this.col_job.insertOne(doc);
    }
}
