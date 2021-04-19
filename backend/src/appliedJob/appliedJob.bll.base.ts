import { JobNS } from "../job/job";
import rand from "../lib/rand";
import { AppliedJobNS } from "./appliedJob";

export class AppliedJobBLLBase implements AppliedJobNS.BLL {
    constructor(
        private dal: AppliedJobNS.DAL,
        private jobBLL: JobNS.BLL,
    ) { }

    async init() {

    }

    async ListAppliedJob() {
        return this.dal.ListAppliedJob();
    }

    async ListAppliedJobByApplicant(applicant_id: string) {
        let docs = await this.dal.ListAppliedJobByApplicant(applicant_id);
        let docsDetail: AppliedJobNS.AppliedJobDetail[] = await Promise.all(docs.map(async (item) => {
            let job_ref = await this.jobBLL.GetJob(item.job_id)
            return ({
                ...item,
                job_ref
            })
        }))
        return docsDetail
    }

    async GetAppliedJob(id: string) {
        const appliedJob = await this.dal.GetAppliedJob(id);
        if (!appliedJob) {
            throw AppliedJobNS.Errors.ErrAppliedJobNotFound;
        }
        return appliedJob;
    }

    async DeleteAppliedJob(id: string) {
        const appliedJob = await this.GetAppliedJob(id);
        await this.dal.DeleteAppliedJob(id);
        return appliedJob;
    }

    async UpdateAppliedJob(appliedJob_id: string, params: AppliedJobNS.UpdateAppliedJobParams) {
        let appliedJob = await this.GetAppliedJob(appliedJob_id);
        appliedJob = { ...appliedJob, ...params }
        appliedJob.mtime = Date.now();
        await this.dal.UpdateAppliedJob(appliedJob);
    }

    async CreateAppliedJob(params: AppliedJobNS.CreateAppliedJobParams) {
        const now = Date.now();
        const appliedJob: AppliedJobNS.AppliedJob = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateAppliedJob(appliedJob);
        return appliedJob;
    }

    async GetAppliedJobByApplicantAndJob(applicant_id: string, job_id: string) {
        const appliedJob = await this.dal.GetAppliedJobByApplicantAndJob(applicant_id, job_id);
        if (!appliedJob) {
            throw AppliedJobNS.Errors.ErrAppliedJobNotFound;
        }
        return appliedJob;
    }
}