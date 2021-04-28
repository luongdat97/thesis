export namespace JobNS {
  export interface Job {
    id: string;
    recruiter_id: string;
    title: string;
    state?: number;
    employeeVerify_id?: string;
    rejectReason?: string;
    career?: string;
    address?: string;
    workplace?: string;
    salary?: {
      from: number;
      to: number;
    }
    genderRequire?: string;
    workType?: number;
    level?: number;
    numberHire?: number;
    endDate?: number;
    experienceRequire?: number;
    skillRequire?: number[];
    receiver?: {
      name: string;
      email: string;
      phone: number;
    }
    jobDescription?: string;
    jobRequire?: string;
    jobBenefit?: string;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateJobParams {
    title: string;
    recruiter_id: string;
    state?: number;
    employeeVerify_id?: string;
    career?: string;
    address?: string;
    workplace?: string;
    salary?: {
      from: number;
      to: number;
    }
    genderRequire?: string;
    workType?: number;
    level?: number;
    numberHire?: number;
    endDate?: number;
    experienceRequire?: number;
    skillRequire?: number[];
    receiver?: {
      name: string;
      email: string;
      phone: number;
    }
    jobDescription?: string;
    jobRequire?: string;
    jobBenefit?: string;
  }

  export interface UpdateJobParams {
    state?: number;
    employeeVerify_id?: string;
    rejectReason?: string;
    title?: string;
    career?: string;
    address?: string;
    workplace?: string;
    salary?: {
      from: number;
      to: number;
    }
    genderRequire?: string;
    workType?: number;
    level?: number;
    numberHire?: number;
    endDate?: number;
    experienceRequire?: number;
    skillRequire?: number[];
    receiver?: {
      name: string;
      email: string;
      phone: number;
    }
    jobDescription?: string;
    jobRequire?: string;
    jobBenefit?: string;
  }

  export interface BLL {
    ListJob(recruiter_id?: string): Promise<Job[]>;
    GetJob(id: string): Promise<Job>;
    CreateJob(params: CreateJobParams): Promise<Job>;
    UpdateJob(id: string, params: UpdateJobParams): Promise<void>;
    DeleteJob(id: string): Promise<Job>;
  }

  export interface DAL {
    ListJob(recruiter_id?: string): Promise<Job[]>;
    GetJob(id: string): Promise<Job>;
    CreateJob(Job: Job): Promise<void>;
    UpdateJob(Job: Job): Promise<void>;
    DeleteJob(id: string): Promise<void>;
  }

  export const Errors = {
    ErrJobNotFound: new Error("Job not found"),
  };
}
