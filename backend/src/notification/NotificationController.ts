import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../Helper/http";
import { NotificationNS } from "./Notification";

export function NewNotificationAPI(notificationBLL: NotificationNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    const notification = await notificationBLL.CreateNotification(req.body);
    res.json(notification);
  });
  app.get("/list", async (req, res) => {
    if (req.query.user_id) {
      const docs = await notificationBLL.ListNotificationByUserId(req.query.user_id as string)
      res.json(docs)
    } else {
      const docs = await notificationBLL.ListNotification();
      res.json(docs);
    }
  });

  app.post("/update", async (req, res) => {
    const notification_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: NotificationNS.UpdateNotificationParams = { ...req.body };
    await notificationBLL.UpdateNotification(notification_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const doc = await notificationBLL.GetNotification(req.query.id as string);
    res.json(doc);
  });

  app.post("/delete", async (req, res) => {
    const doc = await notificationBLL.DeleteNotification(req.body.id as string);
    res.json(doc);
  });

  const commonErrors = new Set([...Object.values(NotificationNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
