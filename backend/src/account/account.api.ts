import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { AccountNS } from "./account";
import { NewAuthMiddleware, GetAuthData } from "../auth/auth.api.middleware";
import { UserAuthNS } from "../auth/auth";

export function NewAccountAPI(accountBLL: AccountNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    console.log("haaaaaaaaaaaaaaaaaaa")
    const title = HttpParamValidators.MustBeString(req.body, "title");
    const { username, password, role } = req.body

    const params: AccountNS.CreateAccountParams = {
      username,
      password,
      role,
    };
    const account = await accountBLL.CreateAccount(params);
    res.json(account);
  });
  app.get("/list", async (req, res) => {
    const docs = await accountBLL.ListAccount();
    res.json(docs);
  });

  app.post("/update", async (req, res) => {
    const account_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: AccountNS.UpdateAccountParams = { ...req.body };
    if (req.body.password) {
      params.password = HttpParamValidators.MustBeString(req.body, "password", 2);
    }
    await accountBLL.UpdateAccount(account_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const doc = await accountBLL.GetAccount(req.query.id as string);
    res.json(doc);
  });

  app.post("/delete", async (req, res) => {
    const doc = await accountBLL.DeleteAccount(req.body.id as string);
    res.json(doc);
  });

  app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const account = await accountBLL.GetAccountByUsername(username);
    console.log(account)
    if (!account) {
      res.json({code: 9000, mess: "username không tồn tại"})
      return
    }

    if (account.password === password) {
      res.json({code: 1000, mess: "oke", data: account})
    } else {
      res.json({code: 9001, mess: "incorrect password"})
    }
  });

  const commonErrors = new Set([...Object.values(AccountNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
