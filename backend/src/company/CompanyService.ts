import rand from "../Helper/rand";
import { CompanyNS } from "./Company";

export class CompanyBLLBase implements CompanyNS.BLL {
    constructor(
        private dal: CompanyNS.DAL,
    ) { }

    async init() {

    }

    async ListCompany() {
        return this.dal.ListCompany();
    }

    async GetCompany(id: string) {
        const company = await this.dal.GetCompany(id);
        if (!company) {
            throw CompanyNS.Errors.ErrCompanyNotFound;
        }
        return company;
    }

    async DeleteCompany(id: string) {
        const company = await this.GetCompany(id);
        await this.dal.DeleteCompany(id);
        return company;
    }

    async UpdateCompany(company_id: string, params: CompanyNS.UpdateCompanyParams) {
        let company = await this.GetCompany(company_id);
        company = {...company, ...params}
        company.mtime = Date.now();
        await this.dal.UpdateCompany(company);
    }

    async CreateCompany(params: CompanyNS.CreateCompanyParams) {
        const now = Date.now();
        const company: CompanyNS.Company = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateCompany(company);
        return company;
    }
}