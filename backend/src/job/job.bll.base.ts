import rand from "../lib/rand";
import { JobNS } from "./job";

export class JobBLLBase implements JobNS.BLL {
    constructor(
        private dal: JobNS.DAL,
    ) { }

    async init() {

    }

    async ListJob(user_id: string) {
        return this.dal.ListJob(user_id);
    }

    async GetJob(id: string) {
        const job = await this.dal.GetJob(id);
        if (!job) {
            throw JobNS.Errors.ErrJobNotFound;
        }
        return job;
    }

    async DeleteJob(id: string) {
        const job = await this.GetJob(id);
        await this.dal.DeleteJob(id);
        return job;
    }

    async UpdateJob(job_id: string, params: JobNS.UpdateJobParams) {
        const job = await this.GetJob(job_id);
        if (params.title) {
            job.title = params.title;
        }
        job.mtime = Date.now();
        await this.dal.UpdateJob(job);
    }

    async CreateJob(params: JobNS.CreateJobParams) {
        const now = Date.now();
        const job: JobNS.Job = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateJob(job);
        return job;
    }
}