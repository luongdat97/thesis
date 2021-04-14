import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { ProfileNS } from "./profile";
import { NewAuthMiddleware, GetAuthData } from "../auth/auth.api.middleware";
import { UserAuthNS } from "../auth/auth";

export function NewProfileAPI(profileBLL: ProfileNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    const { name, phone, email, address, birthday, gender, avatar } = req.body
    const params: ProfileNS.CreateProfileParams = {
      name,
      phone,
      email,
      address,
      birthday,
      gender,
      avatar,
    };
    const profile = await profileBLL.CreateProfile(params);
    res.json(profile);
  });
  app.get("/list", async (req, res) => {
    const docs = await profileBLL.ListProfile();
    res.json(docs);
  });

  app.post("/update", async (req, res) => {
    const profile_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: ProfileNS.UpdateProfileParams = { ...req.body };
    await profileBLL.UpdateProfile(profile_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const doc = await profileBLL.GetProfile(req.query.id as string);
    res.json(doc);
  });

  app.post("/delete", async (req, res) => {
    const doc = await profileBLL.DeleteProfile(req.body.id as string);
    res.json(doc);
  });

  const commonErrors = new Set([...Object.values(ProfileNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
