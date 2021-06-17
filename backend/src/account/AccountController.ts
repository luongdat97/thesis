import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../Helper/http";
import { AccountNS } from "./Account";
var jwt = require('jsonwebtoken');
import { ProfileNS } from "../profile/Profile";
const bcrypt = require('bcrypt');

export function NewAccountAPI(accountBLL: AccountNS.BLL, profileBLL: ProfileNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
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
    let accountList = await accountBLL.ListAccount();

    let docs = await Promise.all(accountList.map(async (account) => {
      let profile = await profileBLL.GetProfileByEmail(account.username)
      return ({ ...account, profile })
    }))
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

  app.post("/change-pass", async (req, res) => {
    let { account_id, oldPassword, newPassword } = req.body
    newPassword =  bcrypt.hashSync(newPassword, 10);
    let account = await accountBLL.GetAccount(account_id)
    if (!bcrypt.compareSync(oldPassword, account.password)) {
      res.json({ code: 1001, message: "Password is incorrect" })
    } else {
      await accountBLL.ChangePassword(account_id, newPassword)
      res.json({ code: 1000, message: "oke" })
    }
  });

  app.post("/change-active", async (req, res) => {
    const { account_id, active } = req.body
    await accountBLL.setActiveAccount(account_id, active)
    res.json("oke")
  });

  app.get("/get", async (req, res) => {
    const { id, username } = req.query
    if (id) {
      const doc = await accountBLL.GetAccount(id as string);
      res.json(doc);
    } else if (username) {
      const doc = await accountBLL.GetAccountByUsername(username as string);
      res.json(doc);
    }

  });

  app.post("/delete", async (req, res) => {
    const doc = await accountBLL.DeleteAccount(req.body.id as string);
    res.json(doc);
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
