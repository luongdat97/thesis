import { JobNS } from "../job/job";
import rand from "../lib/rand";
import { InvitedApplicantNS } from "./invitedApplicant";


export class InvitedApplicantBLLBase implements InvitedApplicantNS.BLL {
    constructor(
        private dal: InvitedApplicantNS.DAL,
    ) { }

    async init() {

    }

    async ListInvitedApplicant() {
        return this.dal.ListInvitedApplicant();
    }

    async ListInvitedApplicantByJob(job_id: string) {
        return this.dal.ListInvitedApplicantByJob(job_id);
    }

    async ListInvitedApplicantByRecruiterAndApplicant(recruiter_id: string, applicant_id: string) {
        return this.dal.ListInvitedApplicantByRecruiterAndApplicant(recruiter_id, applicant_id);
    }

    async GetInvitedApplicant(id: string) {
        const invitedApplicant = await this.dal.GetInvitedApplicant(id);
        if (!invitedApplicant) {
            throw InvitedApplicantNS.Errors.ErrInvitedApplicantNotFound;
        }
        return invitedApplicant;
    }

    async GetInvitedApplicantByRecruiter(recruiter_id: string, applicant_id: string) {
        const invitedApplicant = await this.dal.GetInvitedApplicantByRecruiter(recruiter_id, applicant_id);
        if (!invitedApplicant) {
            throw InvitedApplicantNS.Errors.ErrInvitedApplicantNotFound;
        }
        return invitedApplicant;
    }

    async DeleteInvitedApplicant(id: string) {
        const invitedApplicant = await this.GetInvitedApplicant(id);
        await this.dal.DeleteInvitedApplicant(id);
        return invitedApplicant;
    }

    async DeleteInvitedApplicantByRecruiterAndApplicant(recruiter_id: string, applicant_id: string) {
        //console.log("huuuuuuuuuuuuuuu")
        //const invitedApplicant = await this.GetInvitedApplicant(id);
        await this.dal.DeleteInvitedApplicantByRecruiterAndApplicant(recruiter_id, applicant_id);
        //return invitedApplicant;
    }

    async UpdateInvitedApplicant(invitedApplicant_id: string, params: InvitedApplicantNS.UpdateInvitedApplicantParams) {
        let invitedApplicant = await this.GetInvitedApplicant(invitedApplicant_id);
        invitedApplicant = {...invitedApplicant, ...params}
        invitedApplicant.mtime = Date.now();
        await this.dal.UpdateInvitedApplicant(invitedApplicant);
    }

    async CreateInvitedApplicant(params: InvitedApplicantNS.CreateInvitedApplicantParams) {
        const now = Date.now();
        const invitedApplicant: InvitedApplicantNS.InvitedApplicant = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateInvitedApplicant(invitedApplicant);
        return invitedApplicant;
    }
}