import rand from "../lib/rand";
import { RecruiterNS } from "./recruiter";

export class RecruiterBLLBase implements RecruiterNS.BLL {
    constructor(
        private dal: RecruiterNS.DAL,
    ) { }

    async init() {

    }

    async ListRecruiter() {
        return this.dal.ListRecruiter();
    }

    async GetRecruiter(id: string) {
        const recruiter = await this.dal.GetRecruiter(id);
        if (!recruiter) {
            throw RecruiterNS.Errors.ErrRecruiterNotFound;
        }
        return recruiter;
    }

    async GetRecruiterByAccount(account_id: string) {
        console.log(".....")
        console.log(account_id)
        const recruiter = await this.dal.GetRecruiterByAccount(account_id);
        if (!recruiter) {
            throw RecruiterNS.Errors.ErrRecruiterNotFound;
        }
        return recruiter;
    }

    async DeleteRecruiter(id: string) {
        const recruiter = await this.GetRecruiter(id);
        await this.dal.DeleteRecruiter(id);
        return recruiter;
    }

    async UpdateRecruiter(recruiter_id: string, params: RecruiterNS.UpdateRecruiterParams) {
        let recruiter = await this.GetRecruiter(recruiter_id);
        recruiter = {...recruiter, ...params}
        recruiter.mtime = Date.now();
        await this.dal.UpdateRecruiter(recruiter);
    }

    async CreateRecruiter(params: RecruiterNS.CreateRecruiterParams) {
        const now = Date.now();
        const recruiter: RecruiterNS.Recruiter = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateRecruiter(recruiter);
        return recruiter;
    }
}