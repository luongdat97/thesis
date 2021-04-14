import rand from "../lib/rand";
import { AccountNS } from "./account";

export class AccountBLLBase implements AccountNS.BLL {
    constructor(
        private dal: AccountNS.DAL,
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
        account = {...account, ...params}
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