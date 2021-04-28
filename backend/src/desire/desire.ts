export namespace DesireNS {
  export interface Desire {
    id: string;
    enable?: boolean;
    cv_id?: string;
    address?: string;
    english?: string;
    experience?: string;
    field?: string;
    level?: string;
    salary?: { from: number, to: number };
    skill?: number;
    workType?: string;
    applicant_id?: string;
    ctime?: number;
    mtime?: number;
  }

  export interface CreateDesireParams {
    applicant_id?: string;
    enable?: boolean;
    cv_id?: string;
    address?: string;
    english?: string;
    experience?: string;
    field?: string;
    level?: string;
    salary?: { from: number, to: number };
    skill?: number;
    workType?: string;
  }

  export interface UpdateDesireParams {
    enable?: boolean;
    cv_id?: string;
    address?: string;
    english?: string;
    experience?: string;
    field?: string;
    level?: string;
    salary?: { from: number, to: number };
    skill?: number;
    workType?: string;
    mtime?: number;
  }

  export interface BLL {
    ListDesire(param): Promise<Desire[]>;
    GetDesire(id: string): Promise<Desire>;
    GetDesireByApplicant(id: string): Promise<Desire>;
    CreateDesire(params: CreateDesireParams): Promise<Desire>;
    UpdateDesire(id: string, params: UpdateDesireParams): Promise<void>;
    DeleteDesire(id: string): Promise<Desire>;
  }

  export interface DAL {
    ListDesire(param): Promise<Desire[]>;
    GetDesire(id: string): Promise<Desire>;
    GetDesireByApplicant(applicant_id: string): Promise<Desire>;
    CreateDesire(Desire: Desire): Promise<void>;
    UpdateDesire(Desire: Desire): Promise<void>;
    DeleteDesire(id: string): Promise<void>;
  }

  export const Errors = {
    ErrDesireNotFound: new Error("Desire not found"),
  };
}
