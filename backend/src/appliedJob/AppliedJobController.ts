import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../Helper/http";
import { AppliedJobNS } from "./AppliedJob";
import { ProfileNS } from "../profile/Profile"
import { AccountNS } from "../account/Account"
import { RecruiterNS } from "../recruiter/Recruiter";
import { NotificationNS } from "../notification/Notification";
import { JobNS } from "../job/Job";

export function NewAppliedJobAPI(appliedJobBLL: AppliedJobNS.BLL, jobBLL: JobNS.BLL, notificationBLL: NotificationNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    const { applicant_id, job_id, cv_id } = req.body
    const params: AppliedJobNS.CreateAppliedJobParams = {
      applicant_id,
      job_id,
      cv_id
    };
    const appliedJob = await appliedJobBLL.CreateAppliedJob(params);
    let job = await jobBLL.GetJob(job_id)
    notificationBLL.CreateNotification({
      user_id: job.recruiter_id,
      source_id: job_id,
      sourceType: "appliedJob"
    })
    res.json(appliedJob);
  });
  app.get("/list", async (req, res) => {
    if (req.query.applicant_id) {
      const docs = await appliedJobBLL.ListAppliedJobByApplicant(req.query.applicant_id as string)
      res.json(docs);
    } else if (req.query.job_id) {
      const docs = await appliedJobBLL.ListAppliedJobByJob(req.query.job_id as string)
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
    let appliedJob = await appliedJobBLL.GetAppliedJob(appliedJob_id)
    let job = await jobBLL.GetJob(appliedJob.job_id)
    notificationBLL.CreateNotification({
      user_id: appliedJob.applicant_id,
      source_id: job.id,
      sourceType: "recruiterResponse"
    })
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
