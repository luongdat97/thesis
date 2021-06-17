import rand from "../Helper/rand";
import { NotificationNS } from "./Notification";

export class NotificationBLLBase implements NotificationNS.BLL {
    constructor(
        private dal: NotificationNS.DAL,
    ) { }

    async init() {

    }

    async ListNotification() {
        return this.dal.ListNotification();
    }

    async ListNotificationByUserId(user_id: string) {
        return this.dal.ListNotificationByUserId(user_id);
    }

    async GetNotification(id: string) {
        const notification = await this.dal.GetNotification(id);
        if (!notification) {
            throw NotificationNS.Errors.ErrNotificationNotFound;
        }
        return notification;
    }

    async DeleteNotification(id: string) {
        const notification = await this.GetNotification(id);
        await this.dal.DeleteNotification(id);
        return notification;
    }

    async UpdateNotification(notification_id: string, params: NotificationNS.UpdateNotificationParams) {
        let notification = await this.GetNotification(notification_id);
        notification = {...notification, ...params}
        notification.mtime = Date.now();
        await this.dal.UpdateNotification(notification);
    }

    async CreateNotification(params: NotificationNS.CreateNotificationParams) {
        const now = Date.now();
        const notification: NotificationNS.Notification = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateNotification(notification);
        return notification;
    }
}