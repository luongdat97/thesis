import rand from "../lib/rand";
import { UserAuthNS } from "./auth";

export class UserAuthBLLBase implements UserAuthNS.BLL {
    constructor(
        private dal: UserAuthNS.DAL,
    ) { }

    async init() {

    }

    async ListUser() {
        return this.dal.ListUser();
    }

    async GetUser(id: string) {
        const user = await this.dal.GetUser(id);
        if (!user) {
            throw UserAuthNS.Errors.ErrUserNotFound;
        }
        return user;
    }

    async UpdateUser(user_id: string, params: UserAuthNS.UpdateUserParams) {
        const user = await this.GetUser(user_id);
        if (params.fullname) {
            user.fullname = params.fullname;
        }
        await this.dal.UpdateUser(user);
    }

    async CreateUser(params: UserAuthNS.CreateUserParams) {
        const user: UserAuthNS.User = {
            id: rand.uppercase(8),
            username: params.username,
            fullname: params.fullname,
        }
        await this.dal.CreateUser(user);
        return user;
    }

    async SetPassword(user_id: string, password: string) {
        const user = await this.dal.GetUser(user_id);
        if (!user) {
            throw UserAuthNS.Errors.ErrUserNotFound;
        }
        // TODO: bcrypt encode
        const value: UserAuthNS.UserSecret = {
            user_id,
            name: "password",
            value: password,
            encode: "",
        }
        await this.dal.SaveUserSecret(value);
    }

    async Login(username: string, password: string) {
        const user = await this.dal.GetUserByUsername(username);
        if (!user) {
            throw UserAuthNS.Errors.ErrUsernameNotFound;
        }
        const value = await this.dal.GetUserSecret(user.id, "password");
        if (!value) {
            throw UserAuthNS.Errors.ErrUserHasNoLogin;
        }
        if (value.value !== password) {
            throw UserAuthNS.Errors.ErrWrongPassword;
        }
        const session: UserAuthNS.UserSession = {
            id: rand.alphabet(16),
            user_id: user.id,
        };
        await this.dal.CreateUserSession(session);
        return session;
    }

    async GetUserSession(id: string) {
        return this.dal.GetUserSession(id);
    }
}