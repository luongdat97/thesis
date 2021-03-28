import * as express from 'express';
import { HttpError, HttpStatusCodes, HttpParamValidators } from '../lib/http';
import { UserAuthNS } from './auth';
import { NewAuthMiddleware, GetAuthData } from './auth.api.middleware';

export function NewAuthAPI(
    userAuthBLL: UserAuthNS.BLL,
) {
    const app = express();
    app.post("/login", async (req, res) => {
        const { username, password } = req.body;
        try {
            const session = await userAuthBLL.Login(username, password);
            res.json(session);
        } catch (e) {
            switch (e) {
                case UserAuthNS.Errors.ErrUsernameNotFound:
                case UserAuthNS.Errors.ErrWrongPassword:
                case UserAuthNS.Errors.ErrUserHasNoLogin:
                    throw new HttpError(e.message, HttpStatusCodes.Unauthorized);
                default:
                    throw e;
            }
        }
    });
    // disabled auth
    app.post("/user/create", async (req, res) => {
        const username = HttpParamValidators.MustBeString(req.body, 'username', 6);
        const fullname = HttpParamValidators.MustBeString(req.body, 'fullname', 3);
        const params: UserAuthNS.CreateUserParams = {
            username, fullname
        };
        const user = await userAuthBLL.CreateUser(params);
        res.json(user);
    });
    app.get("/user/list", async (req, res) => {
        const docs = await userAuthBLL.ListUser();
        res.json(docs);
    });
    app.post("/user/update", async (req, res) => {
        const user_id = HttpParamValidators.MustBeString(req.body, 'id');
        const params: UserAuthNS.UpdateUserParams = {};
        if (req.body.fullname) {
            params.fullname = HttpParamValidators.MustBeString(req.body, 'fullname', 3);
        }
        await userAuthBLL.UpdateUser(user_id, params);
        res.json(1);
    });
    app.get("/user/get", async (req, res) => {
        const doc = await userAuthBLL.GetUser(req.query.id as string);
        res.json(doc);
    });
    app.post("/user/set_password", async (req, res) => {
        const user_id = HttpParamValidators.MustBeString(req.body, 'id');
        const password = HttpParamValidators.MustBeString(req.body, 'password', 6);
        await userAuthBLL.SetPassword(user_id, password);
        res.json(1);
    });

    app.use(NewAuthMiddleware(userAuthBLL));
    app.get("/me", async (req, res) => {
        const session = GetAuthData(req);
        const user = await userAuthBLL.GetUser(session.user_id);
        res.json({ session, user });
    });
    app.get("/me/set_password", async (req, res) => {
        const session = GetAuthData(req);
        const password = HttpParamValidators.MustBeString(req.body, 'password', 6);
        await userAuthBLL.SetPassword(session.user_id, password);
        res.json(1);
    });

    const commonErrors = new Set([
        ...Object.values(UserAuthNS.Errors),
    ]);
    app.use((err: Error, req, res, next) => {
        if (commonErrors.has(err)) {
            err = new HttpError(err.message, HttpStatusCodes.BadRequest);
        }
        next(err);
    });
    return app;
}