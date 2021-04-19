import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { SavedJobNS } from "./savedJob";
import { ProfileNS } from "../profile/profile"
import { AccountNS } from "../account/account"
import { NewAuthMiddleware, GetAuthData } from "../auth/auth.api.middleware";
import { UserAuthNS } from "../auth/auth";
import { JobNS } from "../job/job";

export function NewSavedJobAPI(savedJobBLL: SavedJobNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    const { applicant_id, job_id } = req.body
    const params: SavedJobNS.CreateSavedJobParams = {
      applicant_id,
      job_id
    };
    const savedJob = await savedJobBLL.CreateSavedJob(params);
    res.json(savedJob);
  });
  app.get("/list", async (req, res) => {
    let applicant_id = req.query.applicant_id as string
    if (applicant_id) {
      const docs = await savedJobBLL.ListSavedJobByApplicant(applicant_id);
      res.json(docs);
    } else {
      const docs = await savedJobBLL.ListSavedJob();
      res.json(docs);
    }
  });

  app.post("/update", async (req, res) => {
    const savedJob_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: SavedJobNS.UpdateSavedJobParams = { ...req.body };
    await savedJobBLL.UpdateSavedJob(savedJob_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const { id, applicant_id, job_id } = req.query
    if (id) {
      const doc = await savedJobBLL.GetSavedJob(id as string);
      res.json(doc);
    } else {
      const doc = await savedJobBLL.GetSavedJobByApplicantAndJob(applicant_id as string, job_id as string);
      res.json(doc);
    }

  });

  app.post("/delete", async (req, res) => {
    const doc = await savedJobBLL.DeleteSavedJob(req.body.id as string);
    res.json(doc);
  });

  const commonErrors = new Set([...Object.values(SavedJobNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
