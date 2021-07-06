import * as express from "express";
import { authenticateToken } from "../Middleware/jwtMiddleware"
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../Helper/http";
import { InvitedApplicantNS } from "./InvitedApplicant";
import { ProfileNS } from "../profile/Profile"
import { AccountNS } from "../account/Account"
import { JobNS } from "../job/Job";

export function NewInvitedApplicantAPI(invitedApplicantBLL: InvitedApplicantNS.BLL) {
  const app = express();
  app.post("/create", authenticateToken, async (req, res) => {
    const invitedApplicant = await invitedApplicantBLL.CreateInvitedApplicant({ ...req.body });
    res.json(invitedApplicant);
  });

  app.get("/list", async (req, res) => {
    let job_id = req.query.job_id as string
    let { applicant_id, recruiter_id } = req.query
    if (job_id) {
      const docs = await invitedApplicantBLL.ListInvitedApplicantByJob(job_id);
      res.json(docs);
    } else if (applicant_id && recruiter_id) {
      const docs = await invitedApplicantBLL.ListInvitedApplicantByRecruiterAndApplicant(recruiter_id as string, applicant_id as string);
      res.json(docs);
    } else if (applicant_id){
      const docs = await invitedApplicantBLL.ListInvitedApplicantByApplicant(applicant_id as string);
      res.json(docs);
    } else {
      const docs = await invitedApplicantBLL.ListInvitedApplicant();
      res.json(docs);
    }
  });

  app.post("/update", authenticateToken, async (req, res) => {
    const invitedApplicant_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: InvitedApplicantNS.UpdateInvitedApplicantParams = { ...req.body };
    await invitedApplicantBLL.UpdateInvitedApplicant(invitedApplicant_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const { id, recruiter_id, applicant_id } = req.query
    if (id) {
      const doc = await invitedApplicantBLL.GetInvitedApplicant(id as string);
      res.json(doc);
    } else {
      const doc = await invitedApplicantBLL.GetInvitedApplicantByRecruiter(recruiter_id as string, applicant_id);
      res.json(doc);
    }

  });

  app.post("/delete", authenticateToken, async (req, res) => {
    let { recruiter_id, applicant_id, id } = req.body
    if (id) {
      const doc = await invitedApplicantBLL.DeleteInvitedApplicant(req.body.id as string);
      res.json(doc);
    } else {
      console.log("haaaaaaaaaaaaaaaaaaaaaaa")
      const doc = await invitedApplicantBLL.DeleteInvitedApplicantByRecruiterAndApplicant(recruiter_id, applicant_id);
      res.json("oke");
    }

  });

  const commonErrors = new Set([...Object.values(InvitedApplicantNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
