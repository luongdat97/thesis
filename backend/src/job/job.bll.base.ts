import rand from "../lib/rand";
import { JobNS } from "./job";

export class JobBLLBase implements JobNS.BLL {
    constructor(
        private dal: JobNS.DAL,
    ) { }

    async init() {

    }

    async ListJob(recruiter_id?: string) {
        if (recruiter_id) {
            return this.dal.ListJob(recruiter_id);
        } else {
            return this.dal.ListJob();
        }
        
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
        let job = await this.GetJob(job_id);
        job = {...job, ...params}
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