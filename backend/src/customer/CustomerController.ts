import * as express from "express";
import { authenticateToken } from "../Middleware/jwtMiddleware"
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../Helper/http";
// import { NewAuthMiddleware, GetAuthData } from "../auth/auth.api.middleware";
// import { UserAuthNS } from "../auth/auth";
import { CustomerNS } from "./Customer";

export function NewCustomerAPI(customerBLL: CustomerNS.BLL) {
  const app = express();
  app.use(express.json());

  app.post("/customer/create", async (req, res) => {
    const full_name = HttpParamValidators.MustBeString(req.body, "full_name", 3);
    const gender = HttpParamValidators.MustBeString(req.body, "gender", 2);
    const birthday = HttpParamValidators.MustBeString(req.body, "birthday", 2);
    const idnum = HttpParamValidators.MustBeString(
      req.body,
      "idnum",
      2
    );

    const params: CustomerNS.CreateCustomerParams = {
      full_name: full_name,
      gender: gender,
      birthday: birthday,
      idnum: idnum,
    };
    const customer = await customerBLL.CreateCustomer(params);
    res.json(customer);
  });

  app.post("/contact/create", async (req, res) => {
    const customer_id = HttpParamValidators.MustBeString(
      req.body,
      "customer_id",
      8
    );
    const full_name = HttpParamValidators.MustBeString(
      req.body,
      "full_name",
      8
    );
    const phone_number = HttpParamValidators.MustBeString(
      req.body,
      "phone_number",
      8
    );
    const email = HttpParamValidators.MustBeString(req.body, "email", 11);
    let relation;
    if (req.body.relation) {
      relation = HttpParamValidators.MustBeString(req.body, "relation", 2);
    }
    const address = HttpParamValidators.MustBeString(req.body, "address", 5);
    let idnum;
    if (req.body.idnum) {
      idnum = HttpParamValidators.MustBeString(
        req.body,
        "idnum",
        9
      );
    }

    const params: CustomerNS.CreateContactParams = {
      customer_id,
      full_name,
      idnum,
      phone_number,
      address,
      email,
      relation,
    };
    const customerContact = await customerBLL.CreateContact(params);
    res.json(customerContact);
  });

  app.post("/visit_history/create", async (req, res) => {
    const customer_id = HttpParamValidators.MustBeString(
      req.body,
      "customer_id",
      3
    );
    const customerContact = await customerBLL.CreateVisitHistory(customer_id);
    res.json(customerContact);
  });

  app.post("/customer/search", async (req, res) => {
    const phone_number = req.body.phone_number as string;
    const docs = await customerBLL.SearchCustomer(phone_number);
    res.json(docs);
  });

  app.get("/customer/getAll", async (req, res) => {
    const docs = await customerBLL.GetAllCustomer();
    res.json(docs);
  });

  app.get("/contact/getAll", async (req, res) => {
    const docs = await customerBLL.GetAllContact();
    res.json(docs);
  });

  app.post("/customer/delete", async (req, res) => {
    const doc = await customerBLL.DeleteCustomer(
      req.query.customer_id as string
    );
    res.json(doc);
  });

  app.post("/contact/delete", async (req, res) => {
    const doc = await customerBLL.DeleteContact(
      req.query.customer_id as string
    );
    res.json(doc);
  });

  app.post("/customer/update", async (req, res) => {
    const customer_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: CustomerNS.UpdateCustomerParams = {};
    for (const prop in req.body) {
      if (req.body[prop]) {
        params[prop] = HttpParamValidators.MustBeString(req.body, prop, 2);
      }
    }
    await customerBLL.UpdateCustomer(customer_id, params);
    res.json(1);
  });

  app.get("/customer/get", async (req, res) => {
    const customer_id = req.query.customer_id as string;
    const doc = await customerBLL.GetCustomer(customer_id);
    res.json(doc);
  });

  app.get("/contact/get", async (req, res) => {
    const customer_id = req.query.customer_id as string;
    const doc = await customerBLL.GetContact(customer_id);
    res.json(doc);
  });

  app.post("/contact/update", async (req, res) => {
    const customer_id = HttpParamValidators.MustBeString(
      req.body,
      "customer_id"
    );
    const params: CustomerNS.UpdateContactParams = {};
    for (const prop in req.body) {
      if (req.body[prop]) {
        params[prop] = HttpParamValidators.MustBeString(req.body, prop, 2);
      }
    }
    await customerBLL.UpdateContact(customer_id, params);
    res.json(1);
  });

  app.get("/visit_history/get", async (req, res) => {
    const customer_id = req.query.customer_id as string;
    const docs = await customerBLL.GetVisitHistory(customer_id);
    res.json(docs);
  });
  return app;
}
