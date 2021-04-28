export namespace ApplicantNS {
  export interface Applicant {
    id: string;
    account_id: string;
    profile_id: string;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateApplicantParams {
    account_id: string;
    profile_id: string;
  }

  export interface UpdateApplicantParams {
    account_id?: string;
    profile_id?: string;
    mtime?: number;
  }

  export interface BLL {
    ListApplicant(): Promise<Applicant[]>;
    GetApplicant(id: string): Promise<Applicant>;
    CreateApplicant(params: CreateApplicantParams): Promise<Applicant>;
    UpdateApplicant(id: string, params: UpdateApplicantParams): Promise<void>;
    DeleteApplicant(id: string): Promise<Applicant>;
    GetApplicantByAccount(account_id: string): Promise<Applicant>;
  }

  export interface DAL {
    ListApplicant(): Promise<Applicant[]>;
    GetApplicant(id: string): Promise<Applicant>;
    CreateApplicant(Applicant: Applicant): Promise<void>;
    UpdateApplicant(Applicant: Applicant): Promise<void>;
    DeleteApplicant(id: string): Promise<void>;
    GetApplicantByAccount(account_id: string): Promise<Applicant>;
  }

  export const Errors = {
    ErrApplicantNotFound: new Error("Applicant not found"),
  };
}
