import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { CompanyNS } from "./company";
import { NewAuthMiddleware, GetAuthData } from "../auth/auth.api.middleware";
import { UserAuthNS } from "../auth/auth";

export function NewCompanyAPI(companyBLL: CompanyNS.BLL) {
  const app = express();
  app.post("/create", async (req, res) => {
    const params: CompanyNS.CreateCompanyParams = {
      ...req.body
    };
    const company = await companyBLL.CreateCompany(params);
    res.json(company);
  });
  app.get("/list", async (req, res) => {
    const docs = await companyBLL.ListCompany();
    res.json(docs);
  });

  app.post("/update", async (req, res) => {
    const company_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: CompanyNS.UpdateCompanyParams = { ...req.body };
    await companyBLL.UpdateCompany(company_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const doc = await companyBLL.GetCompany(req.query.id as string);
    res.json(doc);
  });

  app.post("/delete", async (req, res) => {
    const doc = await companyBLL.DeleteCompany(req.body.id as string);
    res.json(doc);
  });

  const commonErrors = new Set([...Object.values(CompanyNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
