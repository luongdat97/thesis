import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { JobNS } from "./job";
import { NewAuthMiddleware, GetAuthData } from "../auth/auth.api.middleware";
import { UserAuthNS } from "../auth/auth";

export function NewJobAPI(jobBLL: JobNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    console.log("haaaaaaaaaaaaaaaaaaa")
    const title = HttpParamValidators.MustBeString(req.body, "title");
    // const { career, address, workplace, salary, genderRequire, workType, level,
    //   numberHire, endDate, experienceRequire, skillRequire, receiver, jobDescription, jobRequire, jobBenefit } = req.body

    // const params: JobNS.CreateJobParams = {
    //   recruiter_id: "1",
    //   title,
    //   career,
    //   address,
    //   workplace,
    //   salary,
    //   genderRequire,
    //   workType,
    //   level,
    //   numberHire,
    //   endDate,
    //   experienceRequire,
    //   skillRequire,
    //   receiver,
    //   jobDescription,
    //   jobRequire,
    //   jobBenefit,
    // };
    const job = await jobBLL.CreateJob({...req.body});
    res.json(job);
  });
  app.get("/list", async (req, res) => {
    let docs;
    let recruiter_id = req.query.recruiter_id as string
    if (recruiter_id) {
      docs = await jobBLL.ListJob(recruiter_id);
    } else {
      docs = await jobBLL.ListJob();
    }
     
    res.json(docs);
  });

  app.post("/update", async (req, res) => {
    const job_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: JobNS.UpdateJobParams = {...req.body};
    if (req.body.title) {
      params.title = HttpParamValidators.MustBeString(req.body, "title", 2);
    }
    await jobBLL.UpdateJob(job_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const doc = await jobBLL.GetJob(req.query.id as string);
    res.json(doc);
  });

  app.post("/delete", async (req, res) => {
    const doc = await jobBLL.DeleteJob(req.body.id as string);
    res.json(doc);
  });

  const commonErrors = new Set([...Object.values(JobNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
