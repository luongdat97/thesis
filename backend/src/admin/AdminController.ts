import * as express from "express";
import { authenticateToken } from "../Middleware/jwtMiddleware"
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../Helper/http";
import { AdminNS } from "./Admin";
import {ProfileNS} from "../profile/Profile"
import {AccountNS} from "../account/Account"
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

export function NewAdminAPI(adminBLL: AdminNS.BLL, profileBLL: ProfileNS.BLL, accountBLL: AccountNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    const { account_id, profile_id } = req.body
    const params: AdminNS.CreateAdminParams = {
      account_id,
      profile_id
    };
    const admin = await adminBLL.CreateAdmin(params);
    res.json(admin);
  });
  app.get("/list", async (req, res) => {
    const docs = await adminBLL.ListAdmin();
    res.json(docs);
  });

  app.post("/update", authenticateToken, async (req, res) => {
    const admin_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: AdminNS.UpdateAdminParams = { ...req.body };
    await adminBLL.UpdateAdmin(admin_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const doc = await adminBLL.GetAdmin(req.query.id as string);
    res.json(doc);
  });

  app.post("/delete", authenticateToken, async (req, res) => {
    const doc = await adminBLL.DeleteAdmin(req.body.id as string);
    res.json(doc);
  });

  app.post("/register", async (req, res) => {
    let {name, phone, email, password} = req.body
    password = bcrypt.hashSync(password, 10);
    let account = await accountBLL.CreateAccount({username : email, password, role : "admin", active: true})
    let profile = await profileBLL.CreateProfile({name, email, phone})
    let admin = await adminBLL.CreateAdmin({account_id: account.id, profile_id: profile.id})
    res.json(admin);
  });

  app.post("/login", async (req, res) => {
    let { username, password } = req.body;
    const account = await accountBLL.GetAccountByUsername(username);
    console.log(account)
    if (!account) {
      res.json({ code: 9000, mess: "username không tồn tại" })
      return
    }

    if (!account.active) {
      res.json({ code: 9002, mess: "tài khoản bị khóa" })
      return
    }

    if (bcrypt.compareSync(password, account.password)) {
      let token = jwt.sign({
        accountId: account.id,
      }, process.env.TOKEN_SECRET);

      let admin = await adminBLL.GetAdminByAccount(account.id)
      let profile = profileBLL.GetProfile(admin.profile_id)
      res.json({ code: 1000, mess: "oke", data: {...admin, token, account_ref: account, profile_ref: profile} })
    } else {
      res.json({ code: 9001, mess: "incorrect password" })
    }
  });

  const commonErrors = new Set([...Object.values(AdminNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
