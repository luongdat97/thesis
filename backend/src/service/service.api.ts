import * as express from 'express';
import { HttpError, HttpStatusCodes, HttpParamValidators } from '../lib/http';
import { ServiceNS } from './service';

export function NewServiceAPI(
    serviceBLL: ServiceNS.BLL
) {
    const app = express();
    const service_types = Object.values(ServiceNS.ServiceType);

    //create service
    app.post("/service/create", async (req, res) => {
        const code = HttpParamValidators.MustBeString(req.body, 'code');
        const name = HttpParamValidators.MustBeString(req.body, 'name');
        const price = req.body.price;
        const type = HttpParamValidators.MustBeOneOf(req.body, 'type', service_types);
        const params: ServiceNS.CreateServiceParams = {
            code,
            name,
            price,
            type
        };
        const service = await serviceBLL.CreateService(params);
        res.json(service);
    });

    //get list service
    app.get("/service/list", async (req, res) => {
        console.log("hahahahuuuuuuuuuuuuuuuuuuu")
        const docs = await serviceBLL.ListService();
        res.json(docs);
    });

    //get one service
    app.get("/service/get", async (req, res) => {
        const id = (req.query as any).id;
        const doc = await serviceBLL.GetService(id);
        res.json(doc);
    });

    //update service
    app.post("/service/update", async (req, res) => {
        const id = req.body.id;
        const code = HttpParamValidators.MustBeString(req.body, 'code');
        const name = HttpParamValidators.MustBeString(req.body, 'name');
        const price = req.body.price;
        const type = HttpParamValidators.MustBeOneOf(req.body, 'type', service_types);
        const params: ServiceNS.UpdateServiceParams = {
            code,
            name,
            price,
            type
        };
        const doc = await serviceBLL.UpdateService(id, params);
        res.json(1);
    });

    //Delete service
    app.post("/service/delete", async (req, res) => {
        const id = req.body.id;
        const doc = await serviceBLL.DeleteService(id);
        res.json(doc);
    })

    app.post("/policy/create", async (req, res) => {
        const code = HttpParamValidators.MustBeString(req.body, 'code');
        const name = HttpParamValidators.MustBeString(req.body, 'name');
        const discount = req.body.discount;
        const params: ServiceNS.CreatePolicyParams = {
            code,
            name,
            discount
        }
        const policy = await serviceBLL.CreatePolicy(params);
        res.json(policy);
    });

    app.get("/policy/list", async (req, res) => {
        const docs = await serviceBLL.ListPolicy();
        res.json(docs);
    });

    app.get("/policy/get", async (req, res) => {
        const id = (req.query as any).id;
        const doc = await serviceBLL.GetPolicy(id);
        res.json(doc);
    });

    app.post("/policy/update", async (req, res) => {
        const id = req.body.id;
        const code = HttpParamValidators.MustBeString(req.body, 'code');
        const name = HttpParamValidators.MustBeString(req.body, 'name');
        const discount = req.body.discount;
        const params: ServiceNS.UpdatePolicyParams = {
            code,
            name,
            discount
        };
        await serviceBLL.UpdatePolicy(id, params);
        res.json(1);
    });

    app.post("/policy/delete", async (req, res) => {
        const id = req.body.id;
        const doc = await serviceBLL.DeletePolicy(id);
        res.json(doc)
    });

    const commonErrors = new Set([
        ...Object.values(ServiceNS.Errors),
    ]);

    app.use((err: Error, req, res, next) => {
        if (commonErrors.has(err)) {
            err = new HttpError(err.message, HttpStatusCodes.BadRequest);
        }
        next(err);
    });

    return app;
}

