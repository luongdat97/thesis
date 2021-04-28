import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { CvNS } from "./cv";
import { ProfileNS } from "../profile/profile"
import { AccountNS } from "../account/account"
import { NewAuthMiddleware, GetAuthData } from "../auth/auth.api.middleware";
import { UserAuthNS } from "../auth/auth";

export function NewCvAPI(cvBLL: CvNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    let cvData = req.body
    console.log(".........")
    console.log(cvData.activity)
    const params: CvNS.CreateCvParams = {
      ...req.body
    };

    const cv = await cvBLL.CreateCv(params);
    let cv_id = cv.id


    for (const activity of cvData.activity) {
      const activityParams: CvNS.CreateActivityParams = {
        cv_id,
        ...activity
      };
      cvBLL.CreateActivity(activityParams)
    }

    for (const education of cvData.education) {
      const educationParams: CvNS.CreateEducationParams = {
        cv_id,
        ...education
      };
      cvBLL.CreateEducation(educationParams)
    }

    for (const experience of cvData.experience) {
      const experienceParams: CvNS.CreateExperienceParams = {
        cv_id,
        ...experience
      };
      cvBLL.CreateExperience(experienceParams)
    }

    for (const skill of cvData.skill) {
      const skillParams: CvNS.CreateSkillParams = {
        cv_id,
        ...skill
      };
      cvBLL.CreateSkill(skillParams)
    }

    res.json(cv);
  });
  app.get("/list", async (req, res) => {
    const docs = req.query.applicant_id ? await cvBLL.ListCvByApplicant(req.query.applicant_id as string) : await cvBLL.ListCv();
    let detailDocs = await Promise.all(docs.map(async (doc) => {
      const cv_id = doc.id
      const activity = await cvBLL.ListActivity(cv_id)
      const education = await cvBLL.ListEducation(cv_id)
      const experience = await cvBLL.ListExperience(cv_id)
      const skill = await cvBLL.ListSkill(cv_id)
      let cv = { ...doc } as any
      cv.activity = activity
      cv.education = education
      cv.experience = experience
      cv.skill = skill
      return cv
    }))

    res.json(detailDocs);
  });

  app.post("/update", async (req, res) => {
    let cvData = req.body
    const cv_id = HttpParamValidators.MustBeString(req.body, "id");

    console.log(".........")
    console.log(cvData.activity)
    const { applicant_id, jobPosition, objective, favorite, avatar } = req.body

    const params: CvNS.UpdateCvParams = { jobPosition, objective, favorite, avatar };
    await cvBLL.UpdateCv(cv_id, params);

    for (const activity of cvData.activity) {
      await cvBLL.UpdateActivity(activity.id, activity)
    }

    for (const education of cvData.education) {
      await cvBLL.UpdateEducation(education.id, education)
    }

    for (const experience of cvData.experience) {
      await cvBLL.UpdateExperience(experience.id, experience)
    }

    for (const skill of cvData.skill) {
      await cvBLL.UpdateSkill(skill.id, skill)
    }
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const doc = await cvBLL.GetCv(req.query.id as string);
    const cv_id = doc.id
    const activity = await cvBLL.ListActivity(cv_id)
    const education = await cvBLL.ListEducation(cv_id)
    const experience = await cvBLL.ListExperience(cv_id)
    const skill = await cvBLL.ListSkill(cv_id)
    let cv = { ...doc } as any
    cv.activity = activity
    cv.education = education
    cv.experience = experience
    cv.skill = skill
    res.json(cv);
  });

  app.post("/delete", async (req, res) => {
    const doc = await cvBLL.DeleteCv(req.body.id as string);
    res.json(doc);
  });

  const commonErrors = new Set([...Object.values(CvNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
