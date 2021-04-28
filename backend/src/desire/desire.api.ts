import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { DesireNS } from "./desire";
import { NewAuthMiddleware, GetAuthData } from "../auth/auth.api.middleware";
import { UserAuthNS } from "../auth/auth";
import { ProfileNS } from "../profile/profile";
import { CvNS } from "../cv/cv";
import { AccountNS } from "../account/account";
import { ApplicantNS } from "../applicant/applicant";

export function NewDesireAPI(desireBLL: DesireNS.BLL, applicantBLL: ApplicantNS.BLL, cvBLL: CvNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {

    const params: DesireNS.CreateDesireParams = {
      ...req.body
    };
    const desire = await desireBLL.CreateDesire(params);
    res.json(desire);
  });
  app.get("/list", async (req, res) => {
    let param = req.query as any
    if (param.enable) {
      param.enable = param.enable === 'true'
    }
    const docs = await desireBLL.ListDesire(param);

    let newDocs = await Promise.all(docs.map(async (doc) => {
      let cv = await cvBLL.GetCv(doc.cv_id) as any
      const cv_id = doc.cv_id
      const activity = await cvBLL.ListActivity(cv_id)
      const education = await cvBLL.ListEducation(cv_id)
      const experience = await cvBLL.ListExperience(cv_id)
      const skill = await cvBLL.ListSkill(cv_id)

      const applicant = await applicantBLL.GetApplicant(doc.applicant_id)
      cv.activity = activity
      cv.education = education
      cv.experience = experience
      cv.skill = skill
      let newDoc: any = { ...doc, cv, applicant }
  
      return newDoc
    }))

    res.json(newDocs);
  });

  app.post("/update", async (req, res) => {
    const desire_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: DesireNS.UpdateDesireParams = { ...req.body };
    await desireBLL.UpdateDesire(desire_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    if (req.query.id) {
      const doc = await desireBLL.GetDesire(req.query.id as string);
      res.json(doc);
    } else if (req.query.applicant_id) {
      const doc = await desireBLL.GetDesireByApplicant(req.query.applicant_id as string);
      res.json(doc);
    } else {
      res.json("err")
    }

  });

  app.post("/delete", async (req, res) => {
    const doc = await desireBLL.DeleteDesire(req.body.id as string);
    res.json(doc);
  });

  const commonErrors = new Set([...Object.values(DesireNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
