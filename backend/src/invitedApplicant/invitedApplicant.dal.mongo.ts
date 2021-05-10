import { InvitedApplicantNS } from "./invitedApplicant";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes } from "../lib/mongodb";

export class InvitedApplicantDALMongo implements InvitedApplicantNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {
    }

    private col_invitedApplicant = this.db.collection("invited_applicant");

    async ListInvitedApplicant() {
        const docs = await this.col_invitedApplicant.find().toArray();
        return FromMongoData.Many<InvitedApplicantNS.InvitedApplicant>(docs);
    }

    async ListInvitedApplicantByJob(job_id: string) {
        const docs = await this.col_invitedApplicant.find({job_id}).toArray();
        return FromMongoData.Many<InvitedApplicantNS.InvitedApplicant>(docs);
    }

    async ListInvitedApplicantByRecruiterAndApplicant(recruiter_id: string, applicant_id: string) {
        const docs = await this.col_invitedApplicant.find({recruiter_id, applicant_id}).toArray();
        return FromMongoData.Many<InvitedApplicantNS.InvitedApplicant>(docs);
    }

    async GetInvitedApplicant(id: string) {
        const doc = await this.col_invitedApplicant.findOne({ _id: id });
        return FromMongoData.One<InvitedApplicantNS.InvitedApplicant>(doc);
    }

    async GetInvitedApplicantByRecruiter(recruiter_id: string, applicant_id: string) {
        const doc = await this.col_invitedApplicant.findOne({ recruiter_id, applicant_id });
        return FromMongoData.One<InvitedApplicantNS.InvitedApplicant>(doc);
    }

    async UpdateInvitedApplicant(invitedApplicant: InvitedApplicantNS.InvitedApplicant) {
        const doc = ToMongoData.One(invitedApplicant);
        await this.col_invitedApplicant.updateOne({ _id: invitedApplicant.id }, { $set: doc });
    }

    async DeleteInvitedApplicant(id: string) {
        await this.col_invitedApplicant.deleteOne({ _id: id });
    }

    async DeleteInvitedApplicantByRecruiterAndApplicant(recruiter_id: string, applicant_id: string) {
        await this.col_invitedApplicant.deleteMany({ recruiter_id, applicant_id });
    }

    async CreateInvitedApplicant(invitedApplicant: InvitedApplicantNS.InvitedApplicant) {
        const doc = ToMongoData.One(invitedApplicant);
        await this.col_invitedApplicant.insertOne(doc);
    }

}
