import { JobNS } from "../job/job";

export namespace InvitedApplicantNS {
  export interface InvitedApplicant {
    id: string;
    recruiter_id: string;
    applicant_id: string;
    job_id: string;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateInvitedApplicantParams {
    recruiter_id: string;
    applicant_id: string;
    job_id: string;
  }

  export interface UpdateInvitedApplicantParams {
    recruiter_id?: string;
    applicant_id?: string;
    job_id?: string;
    mtime?: number;
  }

  export interface BLL {
    ListInvitedApplicant(): Promise<InvitedApplicant[]>;
    ListInvitedApplicantByJob(job_id: string): Promise<InvitedApplicant[]>;
    ListInvitedApplicantByRecruiterAndApplicant(recruiter_id: string, applicant_id: string): Promise<InvitedApplicant[]>;
    GetInvitedApplicant(id: string): Promise<InvitedApplicant>;
    GetInvitedApplicantByRecruiter(recruiter_id: string, applicant_id): Promise<InvitedApplicant>;
    CreateInvitedApplicant(params: CreateInvitedApplicantParams): Promise<InvitedApplicant>;
    UpdateInvitedApplicant(id: string, params: UpdateInvitedApplicantParams): Promise<void>;
    DeleteInvitedApplicant(id: string): Promise<InvitedApplicant>;
    DeleteInvitedApplicantByRecruiterAndApplicant(recruiter_id:string, applicant_id: string): Promise<void>;
  }

  export interface DAL {
    ListInvitedApplicant(): Promise<InvitedApplicant[]>;
    ListInvitedApplicantByJob(job_id: string): Promise<InvitedApplicant[]>;
    ListInvitedApplicantByRecruiterAndApplicant(recruiter_id: string, applicant_id: string): Promise<InvitedApplicant[]>;
    GetInvitedApplicant(id: string): Promise<InvitedApplicant>;
    GetInvitedApplicantByRecruiter(recruiter_id: string, applicant_id: string): Promise<InvitedApplicant>;
    CreateInvitedApplicant(InvitedApplicant: InvitedApplicant): Promise<void>;
    UpdateInvitedApplicant(InvitedApplicant: InvitedApplicant): Promise<void>;
    DeleteInvitedApplicant(id: string): Promise<void>;
    DeleteInvitedApplicantByRecruiterAndApplicant(recruiter_id:string, applicant_id: string): Promise<void>;
  }

  export const Errors = {
    ErrInvitedApplicantNotFound: new Error("InvitedApplicant not found"),
  };
}
