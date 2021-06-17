import { AdminNS } from "../admin/Admin";
import { EmployeeNS } from "../employee/Employee";
import rand from "../Helper/rand";
import { AccountNS } from "./Account";

export class AccountBLLBase implements AccountNS.BLL {
    constructor(
        private dal: AccountNS.DAL,
        private employeeDal: EmployeeNS.DAL,
        private adminDal: AdminNS.DAL
    ) { }

    async init() {

    }

    async ListAccount() {
        return this.dal.ListAccount();
    }

    async GetAccount(id: string) {
        const account = await this.dal.GetAccount(id);
        if (!account) {
            throw AccountNS.Errors.ErrAccountNotFound;
        }
        return account;
    }

    async GetAccountByUsername(username: string) {
        const account = await this.dal.GetAccountByUsername(username);
        return account;
    }

    async DeleteAccount(id: string) {
        const account = await this.GetAccount(id);
        await this.dal.DeleteAccount(id);
        return account;
    }

    async UpdateAccount(account_id: string, params: AccountNS.UpdateAccountParams) {
        let account = await this.GetAccount(account_id);
        
        if (params.role != account.role) {
            if (account.role === "admin") {
                let admin = await this.adminDal.GetAdminByAccount(account.id)
                this.employeeDal.CreateEmployee(admin) 
                this.adminDal.DeleteAdmin(admin.id)
            } else {
                let employee = await this.employeeDal.GetEmployeeByAccount(account.id)
                this.adminDal.CreateAdmin(employee) 
                this.employeeDal.DeleteEmployee(employee.id)
            }
        }

        account = { ...account, ...params }
        account.mtime = Date.now();
        await this.dal.UpdateAccount(account);
    }

    async ChangePassword(account_id: string, newPassword: string) {

        let account = await this.GetAccount(account_id);
        account = { ...account, password: newPassword }
        account.mtime = Date.now();
        await this.dal.UpdateAccount(account);
    }

    async setActiveAccount(account_id: string, active: boolean) {

        let account = await this.GetAccount(account_id);
        account = { ...account, active }
        account.mtime = Date.now();
        await this.dal.UpdateAccount(account);
    }

    async CreateAccount(params: AccountNS.CreateAccountParams) {
        const now = Date.now();
        const account: AccountNS.Account = {
            ...params,
            id: rand.uppercase(8),
            active: true,
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateAccount(account);
        return account;
    }
}