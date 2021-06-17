import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../Helper/http";
import { JobNS } from "./Job";
import { CompanyNS } from "../company/Company";
import { RecruiterNS } from "../recruiter/Recruiter";
import { NotificationNS } from "../notification/Notification";

export function NewJobAPI(jobBLL: JobNS.BLL, companyBLL: CompanyNS.BLL, recruiterBLL: RecruiterNS.BLL, notificationBLL: NotificationNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    const title = HttpParamValidators.MustBeString(req.body, "title");
    let params = req.body
    if (params.salary.from) {
      req.body.salary.from = parseInt(params.salary.from)
    } else {
      req.body.salary.from = 0
    }
    if (params.salary.to) {
      req.body.salary.to = parseInt(params.salary.to)
    } else {
      req.body.salary.to = 1000000
    }
    const job = await jobBLL.CreateJob({ ...req.body });
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

    let newDocs = await Promise.all(docs.map(async (job) => {

      let company: any = {}

      try {
        let recruiter = await recruiterBLL.GetRecruiter(job.recruiter_id)
        company = await companyBLL.GetCompany(recruiter.company_id)
      } catch (err) {
        console.log(err)
      }

      return { ...job, company }
    }))
    res.json(newDocs);
  });

  app.get("/search", async (req, res) => {
    let {index, ...param} = req.query
    let docs = await jobBLL.SearchJob(param, index);
    //console.log(docs)

    let newDocs = await Promise.all(docs.data.map(async (job) => {

      let company: any = {}

      try {
        let recruiter = await recruiterBLL.GetRecruiter(job.recruiter_id)
        company = await companyBLL.GetCompany(recruiter.company_id)
      } catch (err) {
        //console.log(err)
      }

      return { ...job, company }
    }))
    res.json({data: newDocs, total: docs.total});
  });

  app.post("/update", async (req, res) => {
    if (req.body.salary?.from) req.body.salary.from = parseInt(req.body.salary.from)
    if (req.body.salary?.to) req.body.salary.to = parseInt(req.body.salary.to)

    const job_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: JobNS.UpdateJobParams = { ...req.body };

    if (req.body.title) {
      params.title = HttpParamValidators.MustBeString(req.body, "title", 2);
    }
    await jobBLL.UpdateJob(job_id, params);

    if (req.body.state) {
      let job = await jobBLL.GetJob(req.body.id)
      notificationBLL.CreateNotification({
        user_id: job.recruiter_id,
        source_id: job.id,
        sourceType: "job"
      })
    }
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const job = await jobBLL.GetJob(req.query.id as string);
    let company: any = {}

    try {
      let recruiter = await recruiterBLL.GetRecruiter(job.recruiter_id)
      company = await companyBLL.GetCompany(recruiter.company_id)
    } catch (err) {
      console.log(err)
    }

    let doc = { ...job, company }
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
