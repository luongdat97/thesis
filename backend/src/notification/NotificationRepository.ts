import { NotificationNS } from "./Notification";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../Helper/mongodb";

export class NotificationDALMongo implements NotificationNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {

    }

    private col_notification = this.db.collection("notification");

    async ListNotification() {
        const docs = await this.col_notification.find().sort({$natural:-1}).toArray();
        return FromMongoData.Many<NotificationNS.Notification>(docs);
    }

    async ListNotificationByUserId(user_id: string) {
        const docs = await this.col_notification.find({user_id}).sort({$natural:-1}).toArray();
        return FromMongoData.Many<NotificationNS.Notification>(docs);
    }

    async GetNotification(id: string) {
        const doc = await this.col_notification.findOne({ _id: id });
        return FromMongoData.One<NotificationNS.Notification>(doc);
    }

    async UpdateNotification(notification: NotificationNS.Notification) {
        const doc = ToMongoData.One(notification);
        await this.col_notification.updateOne({ _id: notification.id }, { $set: doc });
    }

    async DeleteNotification(id: string) {
        await this.col_notification.deleteOne({ _id: id });
    }

    async CreateNotification(notification: NotificationNS.Notification) {
        const doc = ToMongoData.One(notification);
        await this.col_notification.insertOne(doc);
    }
}
