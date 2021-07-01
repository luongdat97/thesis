import * as express from "express";
import { authenticateToken } from "../Middleware/jwtMiddleware"
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../Helper/http";
import { CvNS } from "./Cv";
import { ProfileNS } from "../profile/Profile"
import { AccountNS } from "../account/Account"

export function NewCvAPI(cvBLL: CvNS.BLL) {
  const app = express();
  app.post("/create", authenticateToken, async (req, res) => {
    let cvData = req.body
    console.log(".........")
    console.log(cvData.activity)
    const params: CvNS.CreateCvParams = {
      ...req.body
    };

    const cv = await cvBLL.CreateCv(params);
    let cv_id = cv.id

    if (cvData.activity) {
      for (const activity of cvData.activity) {
        const activityParams: CvNS.CreateActivityParams = {
          cv_id,
          ...activity
        };
        cvBLL.CreateActivity(activityParams)
      }
    }

    if (cvData.education) {
      for (const education of cvData.education) {
        const educationParams: CvNS.CreateEducationParams = {
          cv_id,
          ...education
        };
        cvBLL.CreateEducation(educationParams)
      }
    }

    if (cvData.experience) {
      for (const experience of cvData.experience) {
        const experienceParams: CvNS.CreateExperienceParams = {
          cv_id,
          ...experience
        };
        cvBLL.CreateExperience(experienceParams)
      }
    }

    if (cvData.skill) {
      for (const skill of cvData.skill) {
        const skillParams: CvNS.CreateSkillParams = {
          cv_id,
          ...skill
        };
        cvBLL.CreateSkill(skillParams)
      }
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

  app.post("/update", authenticateToken, async (req, res) => {
    let cvData = req.body
    let cv_id = cvData.id
    console.log(".........")
    //console.log(cvData.activity)

    const params = req.body;
    await cvBLL.UpdateCv(cv_id, params);

    let cvOld :any = await cvBLL.GetCv(cv_id)
    console.log(cvOld.activity)
    for (const activity of cvOld.activity) {
      if (activity.id) await cvBLL.DeleteActivity(activity.id)
    }

    for (const education of cvOld.education) {
      if (education.id) await cvBLL.DeleteEducation(education.id)
    }

    for (const experience of cvOld.experience) {
      if (experience.id) await cvBLL.DeleteExperience(experience.id)
    }

    for (const skill of cvOld.skill) {
      if (skill.id) await cvBLL.DeleteSkill(skill.id)
    }
////////////////////////

    if (cvData.activity) {
      for (const activity of cvData.activity) {
        const activityParams: CvNS.CreateActivityParams = {
          cv_id,
          ...activity
        };
        cvBLL.CreateActivity(activityParams)
      }
    }

    if (cvData.education) {
      for (const education of cvData.education) {
        const educationParams: CvNS.CreateEducationParams = {
          cv_id,
          ...education
        };
        cvBLL.CreateEducation(educationParams)
      }
    }

    if (cvData.experience) {
      for (const experience of cvData.experience) {
        const experienceParams: CvNS.CreateExperienceParams = {
          cv_id,
          ...experience
        };
        cvBLL.CreateExperience(experienceParams)
      }
    }

    if (cvData.skill) {
      for (const skill of cvData.skill) {
        const skillParams: CvNS.CreateSkillParams = {
          cv_id,
          ...skill
        };
        cvBLL.CreateSkill(skillParams)
      }
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

  app.post("/delete", authenticateToken, async (req, res) => {
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
