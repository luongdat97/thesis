export namespace EmployeeNS {
  export interface Employee {
    id: string;
    account_id: string;
    profile_id: string;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateEmployeeParams {
    account_id: string;
    profile_id: string;
  }

  export interface UpdateEmployeeParams {
    account_id?: string;
    profile_id?: string;
    mtime?: number;
  }

  export interface BLL {
    ListEmployee(): Promise<Employee[]>;
    GetEmployee(id: string): Promise<Employee>;
    CreateEmployee(params: CreateEmployeeParams): Promise<Employee>;
    UpdateEmployee(id: string, params: UpdateEmployeeParams): Promise<void>;
    DeleteEmployee(id: string): Promise<Employee>;
    GetEmployeeByAccount(account_id: string): Promise<Employee>;
  }

  export interface DAL {
    ListEmployee(): Promise<Employee[]>;
    GetEmployee(id: string): Promise<Employee>;
    CreateEmployee(Employee: Employee): Promise<void>;
    UpdateEmployee(Employee: Employee): Promise<void>;
    DeleteEmployee(id: string): Promise<void>;
    GetEmployeeByAccount(account_id: string): Promise<Employee>;
  }

  export const Errors = {
    ErrEmployeeNotFound: new Error("Employee not found"),
  };
}
