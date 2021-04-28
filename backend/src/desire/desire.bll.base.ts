import rand from "../lib/rand";
import { DesireNS } from "./desire";

export class DesireBLLBase implements DesireNS.BLL {
    constructor(
        private dal: DesireNS.DAL,
    ) { }

    async init() {

    }

    async ListDesire(param) {
        return this.dal.ListDesire(param);
    }

    async GetDesire(id: string) {
        const desire = await this.dal.GetDesire(id);
        if (!desire) {
            throw DesireNS.Errors.ErrDesireNotFound;
        }
        return desire;
    }

    async GetDesireByApplicant(applicant_id: string) {
        const desire = await this.dal.GetDesireByApplicant(applicant_id);
        if (!desire) {
            throw DesireNS.Errors.ErrDesireNotFound;
        }
        return desire;
    }

    async DeleteDesire(id: string) {
        const desire = await this.GetDesire(id);
        await this.dal.DeleteDesire(id);
        return desire;
    }

    async UpdateDesire(desire_id: string, params: DesireNS.UpdateDesireParams) {
        let desire = await this.GetDesire(desire_id);
        desire = {...desire, ...params}
        desire.mtime = Date.now();
        await this.dal.UpdateDesire(desire);
    }

    async CreateDesire(params: DesireNS.CreateDesireParams) {
        const now = Date.now();
        const desire: DesireNS.Desire = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateDesire(desire);
        return desire;
    }
}