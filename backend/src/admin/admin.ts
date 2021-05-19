export namespace AdminNS {
  export interface Admin {
    id: string;
    account_id: string;
    profile_id: string;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateAdminParams {
    account_id: string;
    profile_id: string;
  }

  export interface UpdateAdminParams {
    account_id?: string;
    profile_id?: string;
    mtime?: number;
  }

  export interface BLL {
    ListAdmin(): Promise<Admin[]>;
    GetAdmin(id: string): Promise<Admin>;
    CreateAdmin(params: CreateAdminParams): Promise<Admin>;
    UpdateAdmin(id: string, params: UpdateAdminParams): Promise<void>;
    DeleteAdmin(id: string): Promise<Admin>;
    GetAdminByAccount(account_id: string): Promise<Admin>;
  }

  export interface DAL {
    ListAdmin(): Promise<Admin[]>;
    GetAdmin(id: string): Promise<Admin>;
    CreateAdmin(Admin: Admin): Promise<void>;
    UpdateAdmin(Admin: Admin): Promise<void>;
    DeleteAdmin(id: string): Promise<void>;
    GetAdminByAccount(account_id: string): Promise<Admin>;
  }

  export const Errors = {
    ErrAdminNotFound: new Error("Admin not found"),
  };
}
