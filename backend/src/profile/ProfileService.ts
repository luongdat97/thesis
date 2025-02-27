import rand from "../Helper/rand";
import { ProfileNS } from "./Profile";

export class ProfileBLLBase implements ProfileNS.BLL {
    constructor(
        private dal: ProfileNS.DAL,
    ) { }

    async init() {

    }

    async ListProfile() {
        return this.dal.ListProfile();
    }

    async GetProfile(id: string) {
        const profile = await this.dal.GetProfile(id);
        if (!profile) {
            throw ProfileNS.Errors.ErrProfileNotFound;
        }
        return profile;
    }

    async GetProfileByEmail(email: string) {
        const profile = await this.dal.GetProfileByEmail(email);
        if (!profile) {
            return null
        }
        return profile;
    }

    async DeleteProfile(id: string) {
        const profile = await this.GetProfile(id);
        await this.dal.DeleteProfile(id);
        return profile;
    }

    async UpdateProfile(profile_id: string, params: ProfileNS.UpdateProfileParams) {
        let profile = await this.GetProfile(profile_id);
        profile = {...profile, ...params}
        profile.mtime = Date.now();
        await this.dal.UpdateProfile(profile);
    }

    async CreateProfile(params: ProfileNS.CreateProfileParams) {
        const now = Date.now();
        const profile: ProfileNS.Profile = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateProfile(profile);
        return profile;
    }
}