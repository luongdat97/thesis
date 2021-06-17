import { ApplicantNS } from "../applicant/Applicant";
import { JobNS } from "../job/Job";
import rand from "../Helper/rand";
import { ProfileNS } from "../profile/Profile";
import { InvitedApplicantNS } from "./InvitedApplicant";


export class InvitedApplicantBLLBase implements InvitedApplicantNS.BLL {
    constructor(
        private dal: InvitedApplicantNS.DAL,
        private applicantDal: ApplicantNS.DAL,
        private profileDal: ProfileNS.DAL,
    ) { }

    async init() {

    }

    async ListInvitedApplicant() {
        return this.dal.ListInvitedApplicant();
    }

    async ListInvitedApplicantByJob(job_id: string) {

        let invitedList = await this.dal.ListInvitedApplicantByJob(job_id);
        let detailList = await Promise.all(invitedList.map(async (item) => {
            let applicant: any = await this.applicantDal.GetApplicant(item.applicant_id)
            let profile = await this.profileDal.GetProfile(applicant.profile_id)
            applicant.profile = profile
            return {
                ...item,
                applicant,
            }
        }))
        return detailList
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
        invitedApplicant = { ...invitedApplicant, ...params }
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