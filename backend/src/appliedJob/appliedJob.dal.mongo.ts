import { AppliedJobNS } from "./appliedJob";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class AppliedJobDALMongo implements AppliedJobNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
    }

    private col_appliedJob = this.db.collection("applied_job");

    async ListAppliedJob() {
        const docs = await this.col_appliedJob.find().toArray();
        return FromMongoData.Many<AppliedJobNS.AppliedJob>(docs);
    }

    async ListAppliedJobByApplicant(applicant_id: string) {
        const docs = await this.col_appliedJob.find({applicant_id}).toArray();
        return FromMongoData.Many<AppliedJobNS.AppliedJob>(docs);
    }

    async GetAppliedJob(id: string) {
        const doc = await this.col_appliedJob.findOne({ _id: id });
        return FromMongoData.One<AppliedJobNS.AppliedJob>(doc);
    }

    async UpdateAppliedJob(appliedJob: AppliedJobNS.AppliedJob) {
        const doc = ToMongoData.One(appliedJob);
        await this.col_appliedJob.updateOne({ _id: appliedJob.id }, { $set: doc });
    }

    async DeleteAppliedJob(id: string) {
        await this.col_appliedJob.deleteOne({ _id: id });
    }

    async CreateAppliedJob(appliedJob: AppliedJobNS.AppliedJob) {
        const doc = ToMongoData.One(appliedJob);
        await this.col_appliedJob.insertOne(doc);
    }

    async GetAppliedJobByApplicantAndJob(applicant_id: string, job_id: string) {
        const doc = await this.col_appliedJob.findOne({ applicant_id, job_id });
        return FromMongoData.One<AppliedJobNS.AppliedJob>(doc);
    }
}
