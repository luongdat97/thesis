import { ProfileNS } from "./Profile";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../Helper/mongodb";

export class ProfileDALMongo implements ProfileNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {

    }

    private col_profile = this.db.collection("profile");

    async ListProfile() {
        const docs = await this.col_profile.find().toArray();
        return FromMongoData.Many<ProfileNS.Profile>(docs);
    }

    async GetProfile(id: string) {
        const doc = await this.col_profile.findOne({ _id: id });
        return FromMongoData.One<ProfileNS.Profile>(doc);
    }

    async GetProfileByEmail(email: string) {
        const doc = await this.col_profile.findOne({ email });
        return FromMongoData.One<ProfileNS.Profile>(doc);
    }

    async UpdateProfile(profile: ProfileNS.Profile) {
        const doc = ToMongoData.One(profile);
        await this.col_profile.updateOne({ _id: profile.id }, { $set: doc });
    }

    async DeleteProfile(id: string) {
        await this.col_profile.deleteOne({ _id: id });
    }

    async CreateProfile(profile: ProfileNS.Profile) {
        const doc = ToMongoData.One(profile);
        await this.col_profile.insertOne(doc);
    }
}
