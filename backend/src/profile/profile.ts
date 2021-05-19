export namespace ProfileNS {
  export interface Profile {
    id: string;
    name: string;
    phone?: number;
    email?: string;
    address?: number;
    birthday?: number;
    gender?: string;
    avatar?: string;
    ctime?: number;
    mtime?: number;
  }

  export interface CreateProfileParams {
    name: string;
    phone?: number;
    email?: string;
    address?: number;
    birthday?: number;
    gender?: string;
    avatar?: string;
  }

  export interface UpdateProfileParams {
    name?: string;
    phone?: number;
    email?: string;
    address?: number;
    birthday?: number;
    gender?: string;
    avatar?: string;
    mtime?: number;
  }

  export interface BLL {
    ListProfile(): Promise<Profile[]>;
    GetProfile(id: string): Promise<Profile>;
    GetProfileByEmail(email: string): Promise<Profile>;
    CreateProfile(params: CreateProfileParams): Promise<Profile>;
    UpdateProfile(id: string, params: UpdateProfileParams): Promise<void>;
    DeleteProfile(id: string): Promise<Profile>;
  }

  export interface DAL {
    ListProfile(): Promise<Profile[]>;
    GetProfile(id: string): Promise<Profile>;
    GetProfileByEmail(email: string): Promise<Profile>;
    CreateProfile(Profile: Profile): Promise<void>;
    UpdateProfile(Profile: Profile): Promise<void>;
    DeleteProfile(id: string): Promise<void>;
  }

  export const Errors = {
    ErrProfileNotFound: new Error("Profile not found"),
  };
}
