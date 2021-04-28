import { CvNS } from "./cv";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class CvDALMongo implements CvNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
    }

    private col_cv = this.db.collection("cv");
    private col_cv_activity = this.db.collection("cv_activity");
    private col_cv_education = this.db.collection("cv_education");
    private col_cv_experience = this.db.collection("cv_experience");
    private col_cv_skill = this.db.collection("cv_skill");

    async ListCv() {
        const docs = await this.col_cv.find().toArray();
        return FromMongoData.Many<CvNS.Cv>(docs);
    }

    async ListCvByApplicant(applicant_id: string) {
        const docs = await this.col_cv.find({applicant_id}).toArray();
        return FromMongoData.Many<CvNS.Cv>(docs);
    }

    async GetCv(id: string) {
        const doc = await this.col_cv.findOne({ _id: id });
        return FromMongoData.One<CvNS.Cv>(doc);
    }

    async UpdateCv(cv: CvNS.Cv) {
        const doc = ToMongoData.One(cv);
        await this.col_cv.updateOne({ _id: cv.id }, { $set: doc });
    }

    async DeleteCv(id: string) {
        await this.col_cv.deleteOne({ _id: id });
    }

    async CreateCv(cv: CvNS.Cv) {
        const doc = ToMongoData.One(cv);
        await this.col_cv.insertOne(doc);
    }

    // activity
    async ListActivity(cv_id: string) {
        const docs = await this.col_cv_activity.find({cv_id}).toArray();
        return FromMongoData.Many<CvNS.Activity>(docs);
    }

    async GetActivity(id: string) {
        const doc = await this.col_cv_activity.findOne({ _id: id });
        return FromMongoData.One<CvNS.Activity>(doc);
    }

    async UpdateActivity(activity: CvNS.Activity) {
        const doc = ToMongoData.One(activity);
        await this.col_cv_activity.updateOne({ _id: activity.id }, { $set: doc });
    }

    async DeleteActivity(id: string) {
        await this.col_cv_activity.deleteOne({ _id: id });
    }

    async CreateActivity(activity: CvNS.Activity) {
        const doc = ToMongoData.One(activity);
        await this.col_cv_activity.insertOne(doc);
    }

    // education
    async ListEducation(cv_id: string) {
        const docs = await this.col_cv_education.find({cv_id}).toArray();
        return FromMongoData.Many<CvNS.Education>(docs);
    }

    async GetEducation(id: string) {
        const doc = await this.col_cv_education.findOne({ _id: id });
        return FromMongoData.One<CvNS.Education>(doc);
    }

    async UpdateEducation(education: CvNS.Education) {
        const doc = ToMongoData.One(education);
        await this.col_cv_education.updateOne({ _id: education.id }, { $set: doc });
    }

    async DeleteEducation(id: string) {
        await this.col_cv_education.deleteOne({ _id: id });
    }

    async CreateEducation(education: CvNS.Education) {
        const doc = ToMongoData.One(education);
        await this.col_cv_education.insertOne(doc);
    }

    // experience
    async ListExperience(cv_id: string) {
        const docs = await this.col_cv_experience.find({cv_id}).toArray();
        return FromMongoData.Many<CvNS.Experience>(docs);
    }

    async GetExperience(id: string) {
        const doc = await this.col_cv_experience.findOne({ _id: id });
        return FromMongoData.One<CvNS.Experience>(doc);
    }

    async UpdateExperience(experience: CvNS.Experience) {
        const doc = ToMongoData.One(experience);
        await this.col_cv_experience.updateOne({ _id: experience.id }, { $set: doc });
    }

    async DeleteExperience(id: string) {
        await this.col_cv_experience.deleteOne({ _id: id });
    }

    async CreateExperience(experience: CvNS.Experience) {
        const doc = ToMongoData.One(experience);
        await this.col_cv_experience.insertOne(doc);
    }

    // skill
    async ListSkill(cv_id: string) {
        const docs = await this.col_cv_skill.find({cv_id}).toArray();
        return FromMongoData.Many<CvNS.Skill>(docs);
    }

    async GetSkill(id: string) {
        const doc = await this.col_cv_skill.findOne({ _id: id });
        return FromMongoData.One<CvNS.Skill>(doc);
    }

    async UpdateSkill(skill: CvNS.Skill) {
        const doc = ToMongoData.One(skill);
        await this.col_cv_skill.updateOne({ _id: skill.id }, { $set: doc });
    }

    async DeleteSkill(id: string) {
        await this.col_cv_skill.deleteOne({ _id: id });
    }

    async CreateSkill(skill: CvNS.Skill) {
        const doc = ToMongoData.One(skill);
        await this.col_cv_skill.insertOne(doc);
    }
}
