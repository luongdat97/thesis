import rand from "../lib/rand";
import { AdminNS } from "./admin";

export class AdminBLLBase implements AdminNS.BLL {
    constructor(
        private dal: AdminNS.DAL,
    ) { }

    async init() {

    }

    async ListAdmin() {
        return this.dal.ListAdmin();
    }

    async GetAdmin(id: string) {
        const admin = await this.dal.GetAdmin(id);
        if (!admin) {
            throw AdminNS.Errors.ErrAdminNotFound;
        }
        return admin;
    }

    async GetAdminByAccount(account_id: string) {
        const admin = await this.dal.GetAdminByAccount(account_id);
        if (!admin) {
            throw AdminNS.Errors.ErrAdminNotFound;
        }
        return admin;
    }

    async DeleteAdmin(id: string) {
        const admin = await this.GetAdmin(id);
        await this.dal.DeleteAdmin(id);
        return admin;
    }

    async UpdateAdmin(admin_id: string, params: AdminNS.UpdateAdminParams) {
        let admin = await this.GetAdmin(admin_id);
        admin = {...admin, ...params}
        admin.mtime = Date.now();
        await this.dal.UpdateAdmin(admin);
    }

    async CreateAdmin(params: AdminNS.CreateAdminParams) {
        const now = Date.now();
        const admin: AdminNS.Admin = {
            ...params,
            id: rand.uppercase(8),
            ctime: now,
            mtime: now,
        }

        await this.dal.CreateAdmin(admin);
        return admin;
    }
}