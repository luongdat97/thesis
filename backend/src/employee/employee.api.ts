import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { EmployeeNS } from "./employee";
import {ProfileNS} from "../profile/profile"
import {AccountNS} from "../account/account"
var jwt = require('jsonwebtoken');

import { NewAuthMiddleware, GetAuthData } from "../auth/auth.api.middleware";
import { UserAuthNS } from "../auth/auth";
const bcrypt = require('bcrypt');

export function NewEmployeeAPI(employeeBLL: EmployeeNS.BLL, profileBLL: ProfileNS.BLL, accountBLL: AccountNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    const { account_id, profile_id } = req.body
    const params: EmployeeNS.CreateEmployeeParams = {
      account_id,
      profile_id
    };
    const employee = await employeeBLL.CreateEmployee(params);
    res.json(employee);
  });
  app.get("/list", async (req, res) => {
    const docs = await employeeBLL.ListEmployee();
    res.json(docs);
  });

  app.post("/update", async (req, res) => {
    const employee_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: EmployeeNS.UpdateEmployeeParams = { ...req.body };
    await employeeBLL.UpdateEmployee(employee_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const doc = await employeeBLL.GetEmployee(req.query.id as string);
    res.json(doc);
  });

  app.post("/delete", async (req, res) => {
    const doc = await employeeBLL.DeleteEmployee(req.body.id as string);
    res.json(doc);
  });

  app.post("/register", async (req, res) => {
    let {name, phone, email, password} = req.body    
    password = bcrypt.hashSync(password, 10);
    let account = await accountBLL.CreateAccount({username : email, password, role : "employee", active: true})
    let profile = await profileBLL.CreateProfile({name, email, phone})
    let employee = await employeeBLL.CreateEmployee({account_id: account.id, profile_id: profile.id})
    res.json(employee);
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

      let employee = await employeeBLL.GetEmployeeByAccount(account.id)
      let profile = profileBLL.GetProfile(employee.profile_id)
      res.json({ code: 1000, mess: "oke", data: {...employee, token, account_ref: account, profile_ref: profile} })
    } else {
      res.json({ code: 9001, mess: "incorrect password" })
    }
  });

  const commonErrors = new Set([...Object.values(EmployeeNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
