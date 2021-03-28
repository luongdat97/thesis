import { ServiceNS } from './service';
import rand from "../lib/rand";

export class ServiceBLLBase implements ServiceNS.BLL {
    constructor(
        private dal: ServiceNS.DAL,
    ) { }

    async init() {

    }

    async ListService() {
        return this.dal.ListService();
    }

    async GetService(id: string) {
        const service = await this.dal.GetService(id);
        if (!service) {
            throw ServiceNS.Errors.ErrServiceNotFound;
        }
        return service;
    }

    async CreateService(params: ServiceNS.CreateServiceParams) {
        const now = Date.now();
        const service: ServiceNS.Service = {
            id: rand.alphabet(8),
            code: params.code,
            name: params.name,
            price: params.price,
            type: params.type,
            ctime: now,
            mtime: now,
        }
        await this.dal.CreateService(service);
        return service;
    }

    async UpdateService(id: string, params: ServiceNS.UpdateServiceParams) {
        const service = await this.GetService(id);
        service.code = params.code;
        service.name = params.name;
        service.price = params.price;
        service.type = params.type;
        await this.dal.UpdateService(service);
    }

    async DeleteService(id: string) {
        const service = await this.GetService(id);
        await this.dal.DeleteService(id);
        return service;
    }

    async ListPolicy() {
        return this.dal.ListPolicy();
    }

    async GetPolicy(id: string) {
        const price_policy = await this.dal.GetPolicy(id);
        if (!price_policy) {
            throw ServiceNS.Errors.ErrServicePolicyNotFound;
        }
        return price_policy;
    }

    async CreatePolicy(params: ServiceNS.CreatePolicyParams) {
        const now = Date.now();
        const price_policy: ServiceNS.Policy = {
            id: rand.alphabet(8),
            code: params.code,
            name: params.name,
            discount: params.discount,
            ctime: now,
            mtime: now
        }
        await this.dal.CreatePolicy(price_policy);
        return price_policy;
    }

    async UpdatePolicy(id: string, params: ServiceNS.UpdatePolicyParams) {
        const price_policy = await this.GetPolicy(id);
        price_policy.code = params.code;
        price_policy.name = params.name;
        price_policy.discount = params.discount;

        await this.dal.UpdatePolicy(price_policy);
    }

    async DeletePolicy(id: string) {
        const price_policy = await this.GetPolicy(id);
        await this.dal.DeletePolicy(id);
        return price_policy;
    }
}
