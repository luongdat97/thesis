export namespace ServiceNS {
    export enum ServiceType {
        Kham = 'kham',
        XetNghiem = 'xn'
    }
    // Service
    // -------------------
    export interface Service {
        id: string;
        code: string;
        name: string;
        price: number;
        type: ServiceType;
        ctime: number;
        mtime: number;
    }

    export interface CreateServiceParams {
        name?: string;
        code?: string;
        price: number;
        type?: ServiceType;
    }

    export interface UpdateServiceParams {
        code?: string;
        name?: string;
        price: number;
        type?: ServiceType;
    }

    //Price-policy
    //------------------------
    export interface Policy {
        id: string;
        code: string;
        name: string;
        discount: number;
        ctime: number;
        mtime: number;
    }

    export interface CreatePolicyParams {
        code?: string;
        name?: string;
        discount: number;
    }

    export interface UpdatePolicyParams {
        code?: string;
        name?: string;
        discount: number;
    }

    export interface BLL {
        ListService(): Promise<Service[]>;
        GetService(id: string): Promise<Service>;
        CreateService(params: CreateServiceParams): Promise<Service>;
        UpdateService(id: string, params: UpdateServiceParams): Promise<void>;
        DeleteService(id: string): Promise<Service>;

        ListPolicy(): Promise<Policy[]>;
        GetPolicy(id: string): Promise<Policy>;
        CreatePolicy(params: CreatePolicyParams): Promise<Policy>;
        UpdatePolicy(id: string, params: UpdatePolicyParams): Promise<void>;
        DeletePolicy(id: string): Promise<Policy>;
    }

    export interface DAL {
        ListService(): Promise<Service[]>;
        GetService(id: string): Promise<Service>;
        CreateService(Service: Service): Promise<void>;
        UpdateService(Service: Service): Promise<void>;
        DeleteService(id: string): Promise<void>;

        ListPolicy(): Promise<Policy[]>;
        GetPolicy(id: string): Promise<Policy>;
        CreatePolicy(Policy: Policy): Promise<void>;
        UpdatePolicy(Policy: Policy): Promise<void>;
        DeletePolicy(id: string): Promise<void>;
    }

    export const Errors = {
        ErrServiceNotFound: new Error("service not found"),
        ErrServicePolicyNotFound: new Error("service policy not found"),
    }

}