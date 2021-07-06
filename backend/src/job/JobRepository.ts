import { JobNS } from "./Job";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../Helper/mongodb";
var moment = require('moment') 

export class JobDALMongo implements JobNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
        this.col_job.createIndex({ title: "text", "company.name" : "text" })
    }

    private col_job = this.db.collection("job");

    async ListJob(recruiter_id?: string) {
        let docs;
        if (recruiter_id) {
            docs = await this.col_job.find({ recruiter_id }).sort({$natural:-1}).toArray();
        } else {
            docs = await this.col_job.find().sort({$natural:-1}).toArray();
        }

        return FromMongoData.Many<JobNS.Job>(docs);
    }

    async SearchJob(params, index) {
        console.log(moment().format())
        console.log(params.skillRequire)
        let textSearch = params.textSearch
        let p: any = {}
        if (params.workplace) p.workplace = params.workplace
        if (params.career) p.career = params.career
        if (params.experienceRequire) p.experienceRequire = parseInt(params.experienceRequire)
        if (params.workType) p.workType = parseInt(params.workType)
        if (params.textSearch) p.$text = { $search: params.textSearch }

        let skillRequire : any = [{state: 1}]
        if (params.skillRequire && params.jobType) {
            skillRequire = [{skillRequire : { $in: params.skillRequire } }, {skillRequire : { $in: [params.jobType] } }]
        } else {
            if (params.skillRequire) skillRequire = [{skillRequire : { $in: params.skillRequire } }]
            if (params.jobType) skillRequire = [{skillRequire : { $in: [params.jobType] } }]
        }
        
        p.state = 1
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
        // console.log("from to", from, to)
        // console.log(p)
        // console.log(params)
        let now = moment().format("YYYY-MM-DD")
        let docs;
        let collection
        docs = await this.col_job.find({
            ...p,
            $or: [
                { "salary.from": { $gte: from, $lte: to } },
                { "salary.to": { $gte: from, $lte: to } },
                {
                    "salary.from": { $lte: from },
                    "salary.to": { $gte: to }
                }
            ],
            endDate: { $gte: now },
            $and: skillRequire
        }).skip(index * 10)
            .limit(10).toArray();

        let total = await this.col_job.find({
            ...p,
            $or: [
                { "salary.from": { $gte: from, $lte: to } },
                { "salary.to": { $gte: from, $lte: to } },
                {
                    "salary.from": { $lte: from },
                    "salary.to": { $gte: to }
                }
            ],
            endDate: { $gte: now },
            $and: skillRequire
        }).count()

        //console.log(total)

        let data = FromMongoData.Many<JobNS.Job>(docs) as any
        return { data, total };
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
        this.db.collection("applied_job").deleteMany({job_id: id})
        this.db.collection("saved_job").deleteMany({job_id: id})
        this.db.collection("notification").deleteMany({source_id: id})
    }

    async CreateJob(job: JobNS.Job) {
        const doc = ToMongoData.One(job);
        await this.col_job.insertOne(doc);
    }
}
