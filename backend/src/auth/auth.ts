export namespace UserAuthNS {
    export interface User {
        id: string;
        username: string;
        fullname: string;
    }
    
    export interface UserSecret {
        user_id: string;
        name: string;
        value: string;
        encode: string;
    }
    
    export interface UserSession {
        id: string;
        user_id: string;
    }

    export interface CreateUserParams {
        username: string;
        fullname: string;
    }

    export interface UpdateUserParams {
        fullname?: string;
    }
    
    export interface BLL {
        ListUser(): Promise<User[]>;
        GetUser(id: string): Promise<User>;
        CreateUser(params: CreateUserParams): Promise<User>;
        UpdateUser(id: string, params: UpdateUserParams): Promise<void>;
    
        SetPassword(user_id: string, password: string): Promise<void>;
        Login(username: string, password: string): Promise<UserSession>;
        GetUserSession(id: string): Promise<UserSession>;
    }
    
    
    export interface DAL {
        ListUser(): Promise<User[]>;
        GetUser(id: string): Promise<User>;
        GetUserByUsername(username: string): Promise<User>;
        CreateUser(user: User): Promise<void>;
        UpdateUser(user: User): Promise<void>;
    
        SaveUserSecret(value: UserSecret): Promise<void>;
        GetUserSecret(user_id: string, name: string): Promise<UserSecret>;
    
        CreateUserSession(session: UserSession): Promise<void>;
        GetUserSession(id: string): Promise<UserSession>;
    }
    
    export const Errors = {
        ErrUsernameNotFound: new Error("username not found"),
        ErrUserNotFound: new Error("user not found"),
        ErrUserHasNoLogin: new Error("user has no login"),
        ErrWrongPassword: new Error("wrong password"),
        ErrRoleNotFound: new Error("role not found"),
        ErrUsernameExisted: new Error("username existed"),
    }

    
}