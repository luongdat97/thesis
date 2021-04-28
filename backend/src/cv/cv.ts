export namespace CvNS {
  export interface Cv {
    //cv
    id: string;
    avatar?: {
      public_id: string;
      url: string;
    };
    applicant_id: string;
    jobPosition?: string;
    objective?: string;
    favorite?: string;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateCvParams {
    avatar?: {
      public_id: string;
      url: string;
    };
    applicant_id: string;
    jobPosition?: string;
    objective?: string;
    favorite?: string;
  }

  export interface UpdateCvParams {
    avatar?: {
      public_id: string;
      url: string;
    };
    jobPosition?: string;
    objective?: string;
    favorite?: string;
    mtime?: number;
  }

  //activity
  export interface Activity {
    id: string;
    cv_id: string;
    description?: string;
    duration?: string;
    name?: string;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateActivityParams {
    cv_id: string;
    description?: string;
    duration?: string;
    name?: string;
  }

  export interface UpdateActivityParams {
    description?: string;
    duration?: string;
    name?: string;
    mtime?: number;
  }

  //education
  export interface Education {
    id: string;
    cv_id: string;
    description?: string;
    duration?: string;
    major?: string;
    schoolName?: string;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateEducationParams {
    cv_id: string;
    description?: string;
    duration?: string;
    major?: string;
    schoolName?: string;
  }

  export interface UpdateEducationParams {
    description?: string;
    duration?: string;
    major?: string;
    schoolName?: string;
    mtime?: number;
  }

  //Experience
  export interface Experience {
    id: string;
    cv_id: string;
    description?: string;
    duration?: string;
    level?: string;
    workplace?: string;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateExperienceParams {
    cv_id: string;
    description?: string;
    duration?: string;
    level?: string;
    workplace?: string;
  }

  export interface UpdateExperienceParams {
    description?: string;
    duration?: string;
    level?: string;
    workplace?: string;
    mtime?: number;
  }

  //Skill
  export interface Skill {
    id: string;
    cv_id: string;
    description?: string;
    name?: string;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateSkillParams {
    cv_id: string;
    description?: string;
    name?: string;
  }

  export interface UpdateSkillParams {
    jdescription?: string;
    name?: string;
    mtime?: number;
  }

  export interface BLL {
    ListCv(): Promise<Cv[]>;
    ListCvByApplicant(applicant_id: string): Promise<Cv[]>;
    GetCv(id: string): Promise<Cv>;
    CreateCv(params: CreateCvParams): Promise<Cv>;
    UpdateCv(id: string, params: UpdateCvParams): Promise<void>;
    DeleteCv(id: string): Promise<Cv>;

    ListActivity(cv_id: string): Promise<Activity[]>;
    GetActivity(id: string): Promise<Activity>;
    CreateActivity(params: CreateActivityParams): Promise<Activity>;
    UpdateActivity(id: string, params: UpdateActivityParams): Promise<void>;
    DeleteActivity(id: string): Promise<Activity>;

    ListEducation(cv_id: string): Promise<Education[]>;
    GetEducation(id: string): Promise<Education>;
    CreateEducation(params: CreateEducationParams): Promise<Education>;
    UpdateEducation(id: string, params: UpdateEducationParams): Promise<void>;
    DeleteEducation(id: string): Promise<Education>;

    ListExperience(cv_id: string): Promise<Experience[]>;
    GetExperience(id: string): Promise<Experience>;
    CreateExperience(params: CreateExperienceParams): Promise<Experience>;
    UpdateExperience(id: string, params: UpdateExperienceParams): Promise<void>;
    DeleteExperience(id: string): Promise<Experience>;

    ListSkill(cv_id: string): Promise<Skill[]>;
    GetSkill(id: string): Promise<Skill>;
    CreateSkill(params: CreateSkillParams): Promise<Skill>;
    UpdateSkill(id: string, params: UpdateSkillParams): Promise<void>;
    DeleteSkill(id: string): Promise<Skill>;
  }

  export interface DAL {
    ListCv(): Promise<Cv[]>;
    ListCvByApplicant(applicant_id): Promise<Cv[]>;
    GetCv(id: string): Promise<Cv>;
    CreateCv(Cv: Cv): Promise<void>;
    UpdateCv(Cv: Cv): Promise<void>;
    DeleteCv(id: string): Promise<void>;

    ListActivity(cv_id: string): Promise<Activity[]>;
    GetActivity(id: string): Promise<Activity>;
    CreateActivity(Activity: Activity): Promise<void>;
    UpdateActivity(Activity: Activity): Promise<void>;
    DeleteActivity(id: string): Promise<void>;

    ListEducation(cv_id: string): Promise<Education[]>;
    GetEducation(id: string): Promise<Education>;
    CreateEducation(education: Education): Promise<void>;
    UpdateEducation(education: Education): Promise<void>;
    DeleteEducation(id: string): Promise<void>;

    ListExperience(cv_id: string): Promise<Experience[]>;
    GetExperience(id: string): Promise<Experience>;
    CreateExperience(experience: Experience): Promise<void>;
    UpdateExperience(experience: Experience): Promise<void>;
    DeleteExperience(id: string): Promise<void>;

    ListSkill(cv_id: string): Promise<Skill[]>;
    GetSkill(id: string): Promise<Skill>;
    CreateSkill(skill: Skill): Promise<void>;
    UpdateSkill(skill: Skill): Promise<void>;
    DeleteSkill(id: string): Promise<void>;
  }

  export const Errors = {
    ErrCvNotFound: new Error("Cv not found"),
    ErrActivityNotFound: new Error("Activity not found"),
    ErrEducationNotFound: new Error("Education not found"),
    ErrExperienceNotFound: new Error("Experience not found"),
    ErrSkillNotFound: new Error("Skill not found"),
  };
}
