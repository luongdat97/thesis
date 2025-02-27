import * as express from "express";
import { authenticateToken } from "../Middleware/jwtMiddleware"
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../Helper/http";
import { ApplicantNS } from "./Applicant";
import {ProfileNS} from "../profile/Profile"
import {AccountNS} from "../account/Account"
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

export function NewApplicantAPI(applicantBLL: ApplicantNS.BLL, profileBLL: ProfileNS.BLL, accountBLL: AccountNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    const { account_id, profile_id } = req.body
    const params: ApplicantNS.CreateApplicantParams = {
      account_id,
      profile_id
    };
    const applicant = await applicantBLL.CreateApplicant(params);
    res.json(applicant);
  });
  app.get("/list", async (req, res) => {
    const docs = await applicantBLL.ListApplicant();
    res.json(docs);
  });

  app.post("/update", authenticateToken, async (req, res) => {
    const applicant_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: ApplicantNS.UpdateApplicantParams = { ...req.body };
    await applicantBLL.UpdateApplicant(applicant_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const doc = await applicantBLL.GetApplicant(req.query.id as string);
    res.json(doc);
  });

  app.post("/delete", authenticateToken, async (req, res) => {
    const doc = await applicantBLL.DeleteApplicant(req.body.id as string);
    res.json(doc);
  });

  app.post("/register", async (req, res) => {
    let {name, phone, email, password} = req.body
    password = bcrypt.hashSync(password, 10);
    let account = await accountBLL.CreateAccount({username : email, password, role : "applicant", active: true})
    let profile = await profileBLL.CreateProfile({name, email, phone})
    let applicant = await applicantBLL.CreateApplicant({account_id: account.id, profile_id: profile.id})
    res.json(applicant);
  });

  app.post("/login", async (req, res) => {
    console.log("haaaaaaaa")
    console.log(req.body)
    const { username, password } = req.body;
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

      let applicant = await applicantBLL.GetApplicantByAccount(account.id)
      let profile = profileBLL.GetProfile(applicant.profile_id)
      res.json({ code: 1000, mess: "oke", data: {...applicant, token, account_ref: account, profile_ref: profile} })
    } else {
      res.json({ code: 9001, mess: "incorrect password" })
    }
  });

  const commonErrors = new Set([...Object.values(ApplicantNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
