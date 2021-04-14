import rand from "../lib/rand";
import { ApplicantNS } from "./applicant";

export class ApplicantBLLBase implements ApplicantNS.BLL {
    constructor(
        private dal: ApplicantNS.DAL,
    ) { }

    async init() {

    }

    async ListApplicant() {
        return this.dal.ListApplicant();
    }

    async GetApplicant(id: string) {
        const applicant = await this.dal.GetApplicant(id);
        if (!applicant) {
            throw ApplicantNS.Errors.ErrApplicantNotFound;
        }
        return applicant;
    }

    async DeleteApplicant(id: string) {
        const applicant = await this.GetApplicant(id);
        await this.dal.DeleteApplicant(id);
        return applicant;
    }

    async UpdateApplicant(applicant_id: string, params: ApplicantNS.UpdateApplicantParams) {
        let applicant = await this.GetApplicant(applicant_id);
        applicant = {...applicant, ...params}
        applicant.mtime = Date.now();
        await this.dal.UpdateApplicant(applicant);
    }

    async CreateApplicant(params: ApplicantNS.CreateApplicantParams) {
        const now = Date.now();
        const applicant: ApplicantNS.Applicant = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateApplicant(applicant);
        return applicant;
    }
}