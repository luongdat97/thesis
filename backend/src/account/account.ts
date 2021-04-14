export namespace AccountNS {
  export interface Account {
    id: string;
    username: string;
    password: string;
    role: string;
    active?: boolean;
    mtime?: number;
    ctime?: number;
  }

  export interface CreateAccountParams {
    username: string;
    password: string;
    role: string;
    active?: boolean;
  }

  export interface UpdateAccountParams {
    password: string;
    role: string;
    active?: boolean;
  }

  export interface BLL {
    ListAccount(): Promise<Account[]>;
    GetAccount(id: string): Promise<Account>;
    GetAccountByUsername(username: string): Promise<Account>;
    CreateAccount(params: CreateAccountParams): Promise<Account>;
    UpdateAccount(id: string, params: UpdateAccountParams): Promise<void>;
    DeleteAccount(id: string): Promise<Account>;
  }

  export interface DAL {
    ListAccount(): Promise<Account[]>;
    GetAccount(id: string): Promise<Account>;
    GetAccountByUsername(username: string): Promise<Account>;
    CreateAccount(Account: Account): Promise<void>;
    UpdateAccount(Account: Account): Promise<void>;
    DeleteAccount(id: string): Promise<void>;
  }

  export const Errors = {
    ErrAccountNotFound: new Error("Account not found"),
  };
}
