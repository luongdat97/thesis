import * as express from "express";
import { authenticateToken } from "../Middleware/jwtMiddleware"
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../Helper/http";
import { SavedApplicantNS } from "./SavedApplicant";
import { ProfileNS } from "../profile/Profile"
import { AccountNS } from "../account/Account"
import { JobNS } from "../job/Job";

export function NewSavedApplicantAPI(savedApplicantBLL: SavedApplicantNS.BLL) {
  const app = express();
  app.post("/create", authenticateToken, async (req, res) => {
    const savedApplicant = await savedApplicantBLL.CreateSavedApplicant({...req.body});
    res.json(savedApplicant);
  });

  app.get("/list", async (req, res) => {
    let recruiter_id = req.query.recruiter_id as string
    if (recruiter_id) {
      const docs = await savedApplicantBLL.ListSavedApplicantByRecruiter(recruiter_id);
      res.json(docs);
    } else {
      const docs = await savedApplicantBLL.ListSavedApplicant();
      res.json(docs);
    }
  });

  app.post("/update", authenticateToken, async (req, res) => {
    const savedApplicant_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: SavedApplicantNS.UpdateSavedApplicantParams = { ...req.body };
    await savedApplicantBLL.UpdateSavedApplicant(savedApplicant_id, params);
    res.json(1);
  });

  app.get("/get", async (req, res) => {
    const { id, recruiter_id, applicant_id } = req.query
    if (id) {
      const doc = await savedApplicantBLL.GetSavedApplicant(id as string);
      res.json(doc);
    } else {
      const doc = await savedApplicantBLL.GetSavedApplicantByRecruiter(recruiter_id as string, applicant_id as string);
      res.json(doc);
    }
      
  });

  app.post("/delete", authenticateToken, async (req, res) => {
    const doc = await savedApplicantBLL.DeleteSavedApplicant(req.body.id as string);
    res.json(doc);
  });

  const commonErrors = new Set([...Object.values(SavedApplicantNS.Errors)]);
  app.use((err: Error, req, res, next) => {
    if (commonErrors.has(err)) {
      err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    next(err);
  });
  return app;
}
