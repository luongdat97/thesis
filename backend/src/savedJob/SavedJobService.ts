import { JobNS } from "../job/Job";
import rand from "../Helper/rand";
import { SavedJobNS } from "./SavedJob";


export class SavedJobBLLBase implements SavedJobNS.BLL {
    constructor(
        private dal: SavedJobNS.DAL,
        private jobBLL: JobNS.BLL,
    ) { }

    async init() {

    }

    async ListSavedJob() {
        return this.dal.ListSavedJob();
    }

    async ListSavedJobByApplicant(applicant_id: string) {
        let docs = await this.dal.ListSavedJobByApplicant(applicant_id);
        let docsDetail: SavedJobNS.SavedJobDetail[] = await Promise.all(docs.map(async (item) => {
            let job_ref = await this.jobBLL.GetJob(item.job_id)
            return ({
                ...item,
                job_ref
            })
        }))
        return docsDetail
    }

    async GetSavedJob(id: string) {
        const savedJob = await this.dal.GetSavedJob(id);
        if (!savedJob) {
            throw SavedJobNS.Errors.ErrSavedJobNotFound;
        }
        return savedJob;
    }

    async DeleteSavedJob(id: string) {
        const savedJob = await this.GetSavedJob(id);
        await this.dal.DeleteSavedJob(id);
        return savedJob;
    }

    async UpdateSavedJob(savedJob_id: string, params: SavedJobNS.UpdateSavedJobParams) {
        let savedJob = await this.GetSavedJob(savedJob_id);
        savedJob = {...savedJob, ...params}
        savedJob.mtime = Date.now();
        await this.dal.UpdateSavedJob(savedJob);
    }

    async CreateSavedJob(params: SavedJobNS.CreateSavedJobParams) {
        const now = Date.now();
        const savedJob: SavedJobNS.SavedJob = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateSavedJob(savedJob);
        return savedJob;
    }

    async GetSavedJobByApplicantAndJob(applicant_id: string, job_id: string) {
        const savedJob = await this.dal.GetSavedJobByApplicantAndJob(applicant_id, job_id);
        if (!savedJob) {
            throw SavedJobNS.Errors.ErrSavedJobNotFound;
        }
        return savedJob;
    }
}