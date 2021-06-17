import { DesireNS } from "./Desire";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../Helper/mongodb";

export class DesireDALMongo implements DesireNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {

    }

    private col_desire = this.db.collection("desire");

    async ListDesire(param, pageIndex) {
        console.log("........................")
        console.log(param)
        const docs = await this.col_desire.find(param).skip(pageIndex * 5).limit(5).toArray();
        let data = FromMongoData.Many<DesireNS.Desire>(docs);
        let total = await this.col_desire.find(param).count();
        return { data, total };
    }

    async GetDesire(id: string) {
        const doc = await this.col_desire.findOne({ _id: id });
        return FromMongoData.One<DesireNS.Desire>(doc);
    }

    async GetDesireByApplicant(applicant_id: string) {
        const doc = await this.col_desire.findOne({ applicant_id });
        return FromMongoData.One<DesireNS.Desire>(doc);
    }

    async UpdateDesire(desire: DesireNS.Desire) {
        const doc = ToMongoData.One(desire);
        await this.col_desire.updateOne({ _id: desire.id }, { $set: doc });
    }

    async DeleteDesire(id: string) {
        await this.col_desire.deleteOne({ _id: id });
    }

    async CreateDesire(desire: DesireNS.Desire) {
        const doc = ToMongoData.One(desire);
        await this.col_desire.insertOne(doc);
    }
}
