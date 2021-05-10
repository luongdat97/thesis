import { JobNS } from "./job";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class JobDALMongo implements JobNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
        this.col_job.createIndex({ title: "text" })
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

    async SearchJob(params) {
        console.log(params.skillRequire)
        let textSearch = params.textSearch
        let p: any = {}
        if (params.workplace) p.workplace = params.workplace
        if (params.career) p.career = params.career
        if (params.experienceRequire) p.experienceRequire = parseInt(params.experienceRequire)
        if (params.workType) p.workType = parseInt(params.workType)
        if (params.textSearch) p.$text = { $search: params.textSearch }
        if (params.skillRequire) p.skillRequire = { $in: params.skillRequire }
        let from = 0, to = 1000;
        if (params.salary) {
            switch (parseInt(params.salary)) {

                case 1:
                    to = 3;
                    break;
                case 2:
                    from = 3;
                    to = 5;
                    break;
                case 3:
                    from = 5;
                    to = 8;
                    break;
                case 4:
                    from = 8;
                    to = 15;
                    break;
                case 5:
                    from = 15;
                    break;
            }
        }
        console.log("from to", from, to)
        console.log(p)
        console.log(params)
        let docs;

        docs = await this.col_job.find({
            ...p,
            $or: [
                { "salary.from": { $gte: from, $lte: to } },
                { "salary.to": { $gte: from, $lte: to } },
                {
                    "salary.from": { $lte: from },
                    "salary.to": { $gte: to }
                }
            ]
        }).toArray();


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
