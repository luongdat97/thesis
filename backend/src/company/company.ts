export namespace CompanyNS {
  export interface Company {
    id: string;
    name: string;
    state?: number;
    employeeVerify_id?: string;
    rejectReason?: string;
    logo?: string;
    taxCode?: number;
    field?: string;
    address?: string;
    phone?: number;
    email?: string;
    website?: string;
    scale?: number;
    description?: number;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateCompanyParams {
    name: string;
    logo?: string;
    taxCode?: number;
    field?: string;
    address?: string;
    phone?: number;
    email?: string;
    website?: string;
    scale?: number;
    description?: number;
  }

  export interface UpdateCompanyParams {
    state?: number;
    employeeVerify_id?: string;
    name?: string;
    logo?: string;
    taxCode?: number;
    field?: string;
    address?: string;
    phone?: number;
    email?: string;
    website?: string;
    scale?: number;
    description?: number;
    mtime?: number;
  }

  export interface BLL {
    ListCompany(): Promise<Company[]>;
    GetCompany(id: string): Promise<Company>;
    CreateCompany(params: CreateCompanyParams): Promise<Company>;
    UpdateCompany(id: string, params: UpdateCompanyParams): Promise<void>;
    DeleteCompany(id: string): Promise<Company>;
  }

  export interface DAL {
    ListCompany(): Promise<Company[]>;
    GetCompany(id: string): Promise<Company>;
    CreateCompany(Company: Company): Promise<void>;
    UpdateCompany(Company: Company): Promise<void>;
    DeleteCompany(id: string): Promise<void>;
  }

  export const Errors = {
    ErrCompanyNotFound: new Error("Company not found"),
  };
}
