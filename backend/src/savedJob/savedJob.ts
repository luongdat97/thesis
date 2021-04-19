import { JobNS } from "../job/job";

export namespace SavedJobNS {
  export interface SavedJob {
    id: string;
    applicant_id: string;
    job_id: string;
    mtime?: number;
    ctime?: number;
  }

  export interface SavedJobDetail {
    id: string;
    applicant_id: string;
    job_id: string;
    job_ref: JobNS.Job;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateSavedJobParams {
    applicant_id: string;
    job_id: string;
  }

  export interface UpdateSavedJobParams {
    applicant_id?: string;
    job_id?: string;
    mtime?: number;
  }

  export interface BLL {
    ListSavedJob(): Promise<SavedJob[]>;
    ListSavedJobByApplicant(applicant_id: string): Promise<SavedJobDetail[]>;
    GetSavedJob(id: string): Promise<SavedJob>;
    CreateSavedJob(params: CreateSavedJobParams): Promise<SavedJob>;
    UpdateSavedJob(id: string, params: UpdateSavedJobParams): Promise<void>;
    DeleteSavedJob(id: string): Promise<SavedJob>;
    GetSavedJobByApplicantAndJob(applicant_id: string, job_id: string): Promise<SavedJob>;
  }

  export interface DAL {
    ListSavedJob(): Promise<SavedJob[]>;
    ListSavedJobByApplicant(applicant_id: string): Promise<SavedJob[]>;
    GetSavedJob(id: string): Promise<SavedJob>;
    CreateSavedJob(SavedJob: SavedJob): Promise<void>;
    UpdateSavedJob(SavedJob: SavedJob): Promise<void>;
    DeleteSavedJob(id: string): Promise<void>;
    GetSavedJobByApplicantAndJob(applicant_id: string, job_id: string): Promise<SavedJob>;
  }

  export const Errors = {
    ErrSavedJobNotFound: new Error("SavedJob not found"),
  };
}
