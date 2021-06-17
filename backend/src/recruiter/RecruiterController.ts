import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../Helper/http";
import { RecruiterNS } from "./Recruiter";
import {ProfileNS} from "../profile/Profile"
import {AccountNS} from "../account/Account"
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

export function NewRecruiterAPI(recruiterBLL: RecruiterNS.BLL, profileBLL: ProfileNS.BLL, accountBLL: AccountNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    const { account_id, profile_id } = req.body
    const params: RecruiterNS.CreateRecruiterParams = {
      account_id,
      profile_id
    };
    const recruiter = await recruiterBLL.CreateRecruiter(params);
    res.json(recruiter);
  });
  app.get("/list", async (req, res) => {
    const docs = await recruiterBLL.ListRecruiter();
    res.json(docs);
  });

  app.post("/update", async (req, res) => {
    const recruiter_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: RecruiterNS.UpdateRecruiterParams = { ...req.body };
    await recruiterBLL.UpdateRecruiter(recruiter_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const doc = await recruiterBLL.GetRecruiter(req.query.id as string);
    res.json(doc);
  });

  app.post("/delete", async (req, res) => {
    const doc = await recruiterBLL.DeleteRecruiter(req.body.id as string);
    res.json(doc);
  });

  app.post("/register", async (req, res) => {
    let {name, phone, email, password} = req.body
    password = bcrypt.hashSync(password, 10);
    let account = await accountBLL.CreateAccount({username : email, password, role : "recruiter", active: true})
    let profile = await profileBLL.CreateProfile({name, email, phone})
    let recruiter = await recruiterBLL.CreateRecruiter({account_id: account.id, profile_id: profile.id})
    res.json(recruiter);
  });

  app.post("/login", async (req, res) => {
    let { username, password } = req.body;
    const account = await accountBLL.GetAccountByUsername(username);
    console.log(account)
    if (!account) {
      res.json({ code: 9000, mess: "username không tồn tại" })
      return
    }

    if (bcrypt.compareSync(password, account.password)) {
      let token = jwt.sign({
        accountId: account.id,
      }, process.env.TOKEN_SECRET);

      let recruiter = await recruiterBLL.GetRecruiterByAccount(account.id)
      let profile = profileBLL.GetProfile(recruiter.profile_id)
      res.json({ code: 1000, mess: "oke", data: {...recruiter, token, account_ref: account, profile_ref: profile} })
    } else {
      res.json({ code: 9001, mess: "incorrect password" })
    }
  });

  const commonErrors = new Set([...Object.values(RecruiterNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
