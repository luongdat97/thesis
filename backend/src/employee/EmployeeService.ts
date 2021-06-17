import rand from "../Helper/rand";
import { EmployeeNS } from "./Employee";

export class EmployeeBLLBase implements EmployeeNS.BLL {
    constructor(
        private dal: EmployeeNS.DAL,
    ) { }

    async init() {

    }

    async ListEmployee() {
        return this.dal.ListEmployee();
    }

    async GetEmployee(id: string) {
        const employee = await this.dal.GetEmployee(id);
        if (!employee) {
            throw EmployeeNS.Errors.ErrEmployeeNotFound;
        }
        return employee;
    }

    async GetEmployeeByAccount(account_id: string) {
        const employee = await this.dal.GetEmployeeByAccount(account_id);
        if (!employee) {
            throw EmployeeNS.Errors.ErrEmployeeNotFound;
        }
        return employee;
    }

    async DeleteEmployee(id: string) {
        const employee = await this.GetEmployee(id);
        await this.dal.DeleteEmployee(id);
        return employee;
    }

    async UpdateEmployee(employee_id: string, params: EmployeeNS.UpdateEmployeeParams) {
        let employee = await this.GetEmployee(employee_id);
        employee = {...employee, ...params}
        employee.mtime = Date.now();
        await this.dal.UpdateEmployee(employee);
    }

    async CreateEmployee(params: EmployeeNS.CreateEmployeeParams) {
        const now = Date.now();
        const employee: EmployeeNS.Employee = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateEmployee(employee);
        return employee;
    }
}