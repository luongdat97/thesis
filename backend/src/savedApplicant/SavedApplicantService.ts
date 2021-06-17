import { ApplicantNS } from "../applicant/Applicant";
import { JobNS } from "../job/Job";
import rand from "../Helper/rand";
import { ProfileNS } from "../profile/Profile";
import { SavedApplicantNS } from "./SavedApplicant";


export class SavedApplicantBLLBase implements SavedApplicantNS.BLL {
    constructor(
        private dal: SavedApplicantNS.DAL,
        private applicantDal: ApplicantNS.DAL,
        private profileDal: ProfileNS.DAL
    ) { }

    async init() {

    }

    async ListSavedApplicant() {
        return this.dal.ListSavedApplicant();
    }

    async ListSavedApplicantByRecruiter(recruiter_id: string) {
        let savedList = await this.dal.ListSavedApplicantByRecruiter(recruiter_id);
        let detailList = await Promise.all(savedList.map(async (item) => {
            let applicant : any =  await this.applicantDal.GetApplicant(item.applicant_id)
            let profile = await this.profileDal.GetProfile(applicant.profile_id)
            applicant.profile = profile
            return {
                ...item,
                applicant
            }
        }))
        return detailList
    }

    async GetSavedApplicant(id: string) {
        const savedApplicant = await this.dal.GetSavedApplicant(id);
        if (!savedApplicant) {
            throw SavedApplicantNS.Errors.ErrSavedApplicantNotFound;
        }
        return savedApplicant;
    }

    async GetSavedApplicantByRecruiter(recruiter_id: string, applicant_id: string) {
        const savedApplicant = await this.dal.GetSavedApplicantByRecruiter(recruiter_id, applicant_id);
        if (!savedApplicant) {
            throw SavedApplicantNS.Errors.ErrSavedApplicantNotFound;
        }
        return savedApplicant;
    }

    async DeleteSavedApplicant(id: string) {
        const savedApplicant = await this.GetSavedApplicant(id);
        await this.dal.DeleteSavedApplicant(id);
        return savedApplicant;
    }

    async UpdateSavedApplicant(savedApplicant_id: string, params: SavedApplicantNS.UpdateSavedApplicantParams) {
        let savedApplicant = await this.GetSavedApplicant(savedApplicant_id);
        savedApplicant = {...savedApplicant, ...params}
        savedApplicant.mtime = Date.now();
        await this.dal.UpdateSavedApplicant(savedApplicant);
    }

    async CreateSavedApplicant(params: SavedApplicantNS.CreateSavedApplicantParams) {
        const now = Date.now();
        const savedApplicant: SavedApplicantNS.SavedApplicant = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateSavedApplicant(savedApplicant);
        return savedApplicant;
    }
}