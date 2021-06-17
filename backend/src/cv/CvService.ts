import rand from "../Helper/rand";
import { CvNS } from "./Cv";

export class CvBLLBase implements CvNS.BLL {
    constructor(
        private dal: CvNS.DAL,
    ) { }

    async init() {

    }

    //cv
    async ListCv() {
        return this.dal.ListCv();
    }

    async ListCvByApplicant(applicant_id: string) {
        return this.dal.ListCvByApplicant(applicant_id);
    }

    async GetCv(id: string) {
        const cv = await this.dal.GetCv(id);
        if (!cv) {
            throw CvNS.Errors.ErrCvNotFound;
        }
        return cv;
    }

    async DeleteCv(id: string) {
        const cv = await this.GetCv(id);
        await this.dal.DeleteCv(id);
        return cv;
    }

    async UpdateCv(cv_id: string, params: CvNS.UpdateCvParams) {
        let cv = await this.GetCv(cv_id);
        cv = {...cv, ...params}
        cv.mtime = Date.now();
        await this.dal.UpdateCv(cv);
    }

    async CreateCv(params: CvNS.CreateCvParams) {
        const now = Date.now();
        const cv: CvNS.Cv = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateCv(cv);
        return cv;
    }

    //activity
    async ListActivity(cv_id: string) {
        return this.dal.ListActivity(cv_id);
    }

    async GetActivity(id: string) {
        const activity = await this.dal.GetActivity(id);
        if (!activity) {
            throw CvNS.Errors.ErrActivityNotFound;
        }
        return activity;
    }

    async DeleteActivity(id: string) {
        const activity = await this.GetActivity(id);
        await this.dal.DeleteActivity(id);
        return activity;
    }

    async UpdateActivity(activity_id: string, params: CvNS.UpdateActivityParams) {
        let activity = await this.GetActivity(activity_id);
        activity = {...activity, ...params}
        activity.mtime = Date.now();
        await this.dal.UpdateActivity(activity);
    }

    async CreateActivity(params: CvNS.CreateActivityParams) {
        const now = Date.now();
        const activity: CvNS.Activity = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateActivity(activity);
        return activity;
    }

    //education
    async ListEducation(cv_id: string) {
        return this.dal.ListEducation(cv_id);
    }

    async GetEducation(id: string) {
        const education = await this.dal.GetEducation(id);
        if (!education) {
            throw CvNS.Errors.ErrEducationNotFound;
        }
        return education;
    }

    async DeleteEducation(id: string) {
        const education = await this.GetEducation(id);
        await this.dal.DeleteEducation(id);
        return education;
    }

    async UpdateEducation(education_id: string, params: CvNS.UpdateEducationParams) {
        let education = await this.GetEducation(education_id);
        education = {...education, ...params}
        education.mtime = Date.now();
        await this.dal.UpdateEducation(education);
    }

    async CreateEducation(params: CvNS.CreateEducationParams) {
        const now = Date.now();
        const education: CvNS.Education = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateEducation(education);
        return education;
    }

    //experience
    async ListExperience(cv_id: string) {
        return this.dal.ListExperience(cv_id);
    }

    async GetExperience(id: string) {
        const experience = await this.dal.GetExperience(id);
        if (!experience) {
            throw CvNS.Errors.ErrExperienceNotFound;
        }
        return experience;
    }

    async DeleteExperience(id: string) {
        const experience = await this.GetExperience(id);
        await this.dal.DeleteExperience(id);
        return experience;
    }

    async UpdateExperience(experience_id: string, params: CvNS.UpdateExperienceParams) {
        let experience = await this.GetExperience(experience_id);
        experience = {...experience, ...params}
        experience.mtime = Date.now();
        await this.dal.UpdateExperience(experience);
    }

    async CreateExperience(params: CvNS.CreateExperienceParams) {
        const now = Date.now();
        const experience: CvNS.Experience = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateExperience(experience);
        return experience;
    }

    //skill
    async ListSkill(cv_id: string) {
        return this.dal.ListSkill(cv_id);
    }

    async GetSkill(id: string) {
        const skill = await this.dal.GetSkill(id);
        if (!skill) {
            throw CvNS.Errors.ErrSkillNotFound;
        }
        return skill;
    }

    async DeleteSkill(id: string) {
        const skill = await this.GetSkill(id);
        await this.dal.DeleteSkill(id);
        return skill;
    }

    async UpdateSkill(skill_id: string, params: CvNS.UpdateSkillParams) {
        let skill = await this.GetSkill(skill_id);
        skill = {...skill, ...params}
        skill.mtime = Date.now();
        await this.dal.UpdateSkill(skill);
    }

    async CreateSkill(params: CvNS.CreateSkillParams) {
        const now = Date.now();
        const skill: CvNS.Skill = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateSkill(skill);
        return skill;
    }
    
}