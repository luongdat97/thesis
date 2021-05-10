import { ApplicantNS } from "../applicant/applicant";
import { JobNS } from "../job/job";

export namespace SavedApplicantNS {
  export interface SavedApplicant {
    id: string;
    recruiter_id: string;
    applicant_id: string;
    mtime?: number;
    ctime?: number;
  }

  export interface SavedApplicantDetail {
    id: string;
    recruiter_id: string;
    applicant_id: string;
    applicant?: ApplicantNS.Applicant;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateSavedApplicantParams {
    recruiter_id: string;
    applicant_id: string;
  }

  export interface UpdateSavedApplicantParams {
    recruiter_id?: string;
    applicant_id?: string;
    mtime?: number;
  }

  export interface BLL {
    ListSavedApplicant(): Promise<SavedApplicant[]>;
    ListSavedApplicantByJob(job_id: string): Promise<SavedApplicantDetail[]>;
    GetSavedApplicant(id: string): Promise<SavedApplicant>;
    GetSavedApplicantByRecruiter(recruiter_id: string, applicant_id: string): Promise<SavedApplicant>;
    CreateSavedApplicant(params: CreateSavedApplicantParams): Promise<SavedApplicant>;
    UpdateSavedApplicant(id: string, params: UpdateSavedApplicantParams): Promise<void>;
    DeleteSavedApplicant(id: string): Promise<SavedApplicant>;
  }

  export interface DAL {
    ListSavedApplicant(): Promise<SavedApplicant[]>;
    ListSavedApplicantByJob(job_id: string): Promise<SavedApplicant[]>;
    GetSavedApplicant(id: string): Promise<SavedApplicant>;
    GetSavedApplicantByRecruiter(recruiter_id: string, applicant_id: string): Promise<SavedApplicant>;
    CreateSavedApplicant(SavedApplicant: SavedApplicant): Promise<void>;
    UpdateSavedApplicant(SavedApplicant: SavedApplicant): Promise<void>;
    DeleteSavedApplicant(id: string): Promise<void>;
  }

  export const Errors = {
    ErrSavedApplicantNotFound: new Error("SavedApplicant not found"),
  };
}
