import { AdminNS } from "./Admin";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../Helper/mongodb";

export class AdminDALMongo implements AdminNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
    }

    private col_admin = this.db.collection("admin");

    async ListAdmin() {
        const docs = await this.col_admin.find().toArray();
        return FromMongoData.Many<AdminNS.Admin>(docs);
    }

    async GetAdmin(id: string) {
        const doc = await this.col_admin.findOne({ _id: id });
        return FromMongoData.One<AdminNS.Admin>(doc);
    }
    async GetAdminByAccount(account_id: string) {
        const doc = await this.col_admin.findOne({ account_id });
        return FromMongoData.One<AdminNS.Admin>(doc);
    }

    async UpdateAdmin(admin: AdminNS.Admin) {
        const doc = ToMongoData.One(admin);
        await this.col_admin.updateOne({ _id: admin.id }, { $set: doc });
    }

    async DeleteAdmin(id: string) {
        await this.col_admin.deleteOne({ _id: id });
    }

    async CreateAdmin(admin: AdminNS.Admin) {
        const doc = ToMongoData.One(admin);
        await this.col_admin.insertOne(doc);
    }
}
