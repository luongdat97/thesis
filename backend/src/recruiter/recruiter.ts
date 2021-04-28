export namespace RecruiterNS {
  export interface Recruiter {
    id: string;
    account_id: string;
    profile_id: string;
    company_id?: string;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateRecruiterParams {
    account_id: string;
    profile_id: string;
    company_id?: string;
  }

  export interface UpdateRecruiterParams {
    account_id?: string;
    profile_id?: string;
    company_id?: string;
    mtime?: number;
  }

  export interface BLL {
    ListRecruiter(): Promise<Recruiter[]>;
    GetRecruiter(id: string): Promise<Recruiter>;
    CreateRecruiter(params: CreateRecruiterParams): Promise<Recruiter>;
    UpdateRecruiter(id: string, params: UpdateRecruiterParams): Promise<void>;
    DeleteRecruiter(id: string): Promise<Recruiter>;
    GetRecruiterByAccount(account_id: string): Promise<Recruiter>;
  }

  export interface DAL {
    ListRecruiter(): Promise<Recruiter[]>;
    GetRecruiter(id: string): Promise<Recruiter>;
    CreateRecruiter(Recruiter: Recruiter): Promise<void>;
    UpdateRecruiter(Recruiter: Recruiter): Promise<void>;
    DeleteRecruiter(id: string): Promise<void>;
    GetRecruiterByAccount(account_id: string): Promise<Recruiter>;
  }

  export const Errors = {
    ErrRecruiterNotFound: new Error("Recruiter not found"),
  };
}
