import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { AppliedJobNS } from "./appliedJob";
import {ProfileNS} from "../profile/profile"
import {AccountNS} from "../account/account"
import { NewAuthMiddleware, GetAuthData } from "../auth/auth.api.middleware";
import { UserAuthNS } from "../auth/auth";

export function NewAppliedJobAPI(appliedJobBLL: AppliedJobNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    const { applicant_id, job_id, cv_id } = req.body
    const params: AppliedJobNS.CreateAppliedJobParams = {
      applicant_id,
      job_id,
      cv_id
    };
    const appliedJob = await appliedJobBLL.CreateAppliedJob(params);
    res.json(appliedJob);
  });
  app.get("/list", async (req, res) => {
    if (req.query.applicant_id) {
      const docs = await appliedJobBLL.ListAppliedJobByApplicant(req.query.applicant_id as string)
      res.json(docs);
    } else {
      const docs = await appliedJobBLL.ListAppliedJob();
      res.json(docs);
    }
  });

  app.post("/update", async (req, res) => {
    const appliedJob_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: AppliedJobNS.UpdateAppliedJobParams = { ...req.body };
    await appliedJobBLL.UpdateAppliedJob(appliedJob_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    if (req.query.id) {
      const doc = await appliedJobBLL.GetAppliedJob(req.query.id as string);
      res.json(doc);
    } else {
      const doc = await appliedJobBLL.GetAppliedJobByApplicantAndJob(req.query.applicant_id as string, req.query.job_id as string);
      res.json(doc);
    }
    
  });

  app.post("/delete", async (req, res) => {
    const doc = await appliedJobBLL.DeleteAppliedJob(req.body.id as string);
    res.json(doc);
  });

  const commonErrors = new Set([...Object.values(AppliedJobNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
