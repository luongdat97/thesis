import { JobNS } from "../job/job";

export namespace AppliedJobNS {
  export interface AppliedJob {
    id: string;
    applicant_id: string;
    job_id: string;
    cv_id: string;
    mtime?: number;
    ctime?: number;
  }

  export interface AppliedJobDetail {
    id: string;
    applicant_id: string;
    job_id: string;
    job_ref: JobNS.Job;
    cv_id: string;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateAppliedJobParams {
    applicant_id: string;
    job_id: string;
    cv_id: string;
  }

  export interface UpdateAppliedJobParams {
    applicant_id?: string;
    job_id?: string;
    cv_id?: string;
    mtime?: number;
  }

  export interface BLL {
    ListAppliedJob(): Promise<AppliedJob[]>;
    ListAppliedJobByApplicant(applicant_id: string): Promise<AppliedJobDetail[]>;
    GetAppliedJob(id: string): Promise<AppliedJob>;
    CreateAppliedJob(params: CreateAppliedJobParams): Promise<AppliedJob>;
    UpdateAppliedJob(id: string, params: UpdateAppliedJobParams): Promise<void>;
    DeleteAppliedJob(id: string): Promise<AppliedJob>;
    GetAppliedJobByApplicantAndJob(applicant_id: string, job_id: string): Promise<AppliedJob>;
  }

  export interface DAL {
    ListAppliedJob(): Promise<AppliedJob[]>;
    ListAppliedJobByApplicant(applicant_id: string): Promise<AppliedJob[]>;
    GetAppliedJob(id: string): Promise<AppliedJob>;
    CreateAppliedJob(AppliedJob: AppliedJob): Promise<void>;
    UpdateAppliedJob(AppliedJob: AppliedJob): Promise<void>;
    DeleteAppliedJob(id: string): Promise<void>;
    GetAppliedJobByApplicantAndJob(applicant_id: string, job_id: string): Promise<AppliedJob>;
  }

  export const Errors = {
    ErrAppliedJobNotFound: new Error("AppliedJob not found"),
  };
}
