import { UserAuthNS } from "./auth";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class UserAuthDALMongo implements UserAuthNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
        await this.col_user.createIndex("username", { unique: true });
        await this.col_user_secret.createIndex("user_id");
    }

    private col_user = this.db.collection("user");
    private col_user_secret = this.db.collection("user_secret");
    private col_user_session = this.db.collection("user_session");

    async ListUser() {
        const docs = await this.col_user.find().toArray();
        return FromMongoData.Many<UserAuthNS.User>(docs);
    }

    async GetUserByUsername(username: string) {
        const doc = await this.col_user.findOne({ username });
        if (!doc) {
            throw UserAuthNS.Errors.ErrUsernameNotFound;
        }
        return FromMongoData.One<UserAuthNS.User>(doc);
    }

    async GetUser(id: string) {
        const doc = await this.col_user.findOne({ _id: id });
        return FromMongoData.One<UserAuthNS.User>(doc);
    }

    async UpdateUser(user: UserAuthNS.User) {
        const doc = ToMongoData.One(user);
        await this.col_user.updateOne({ _id: user.id }, { $set: doc });
    }

    async CreateUser(user: UserAuthNS.User) {
        try {
            const doc = ToMongoData.One(user);
            await this.col_user.insertOne(doc);
        } catch (err) {
            if (err.code === MongoErrorCodes.Duplicate) {
                throw UserAuthNS.Errors.ErrUsernameExisted;
            } else {
                throw err;
            }
        }
    }

    async SaveUserSecret(obj: UserAuthNS.UserSecret) {
        await this.col_user_secret.updateOne({
            user_id: obj.user_id,
            name: obj.name
        }, {
            $set: {
                user_id: obj.user_id,
                name: obj.name,
                value: obj.value,
                encode: obj.encode,
            }
        }, { upsert: true });
    }

    async GetUserSecret(user_id: string, name: string) {
        const doc = await this.col_user_secret.findOne({ user_id, name });
        return FromMongoData.One<UserAuthNS.UserSecret>(doc);
    }

    async CreateUserSession(session: UserAuthNS.UserSession) {
        const doc = ToMongoData.One(session);
        await this.col_user_session.insertOne(doc);
    }

    async GetUserSession(id: string) {
        const doc = await this.col_user_session.findOne({ _id: id });
        return FromMongoData.One<UserAuthNS.UserSession>(doc);
    }
}
