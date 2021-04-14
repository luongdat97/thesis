import { AccountNS } from "./account";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class AccountDALMongo implements AccountNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
        this.col_account.createIndex("username", { unique: true });
    }

    private col_account = this.db.collection("account");

    async ListAccount() {
        const docs = await this.col_account.find().toArray();
        return FromMongoData.Many<AccountNS.Account>(docs);
    }

    async GetAccount(id: string) {
        const doc = await this.col_account.findOne({ _id: id });
        return FromMongoData.One<AccountNS.Account>(doc);
    }

    async GetAccountByUsername(username: string) {
        const doc = await this.col_account.findOne({ username: username });
        return FromMongoData.One<AccountNS.Account>(doc);
    }

    async UpdateAccount(account: AccountNS.Account) {
        const doc = ToMongoData.One(account);
        await this.col_account.updateOne({ _id: account.id }, { $set: doc });
    }

    async DeleteAccount(id: string) {
        await this.col_account.deleteOne({ _id: id });
    }

    async CreateAccount(account: AccountNS.Account) {
        const doc = ToMongoData.One(account);
        await this.col_account.insertOne(doc);
    }
}
