import { ReadConfig } from "./config";
import * as express from "express";
import "./lib/express";
import * as cors from "cors";
import { MongoClient } from "mongodb";
import { UserAuthDALMongo } from "./auth/auth.dal.mongo";
import { UserAuthBLLBase } from "./auth/auth.bll.base";
import { NewAuthAPI } from "./auth/auth.api";
import { TodoDALMongo } from "./todo/todo.dal.mongo";
import { TodoBLLBase } from "./todo/todo.bll.base";
import { CustomerDALMongo } from "./customer/customer.dal.mongo";
import { CustomerBLLBase } from "./customer/customer.bll.base";
import { NewTodoAPI } from "./todo/todo.api";
import { NewCustomerAPI } from "./customer/customer.api";

import { NewServiceAPI } from './service/service.api';
import { ServiceBLLBase } from './service/service.bll.base'
import { ServiceDALMongo } from './service/service.dal.mongo';

async function main() {
  const config = await ReadConfig();
  console.log(new Date(), config);
  const client = new MongoClient(config.database.db_url, {
    useUnifiedTopology: true
  });
  await client.connect();
  console.log(new Date(), 'connected to database');
  const database = client.db(config.database.db_name);
  /******************************************************* */
  const userAuthDAL = new UserAuthDALMongo(database);
  await userAuthDAL.init();
  const userAuthBLL = new UserAuthBLLBase(userAuthDAL);
  await userAuthBLL.init();
  const todoDAL = new TodoDALMongo(database);
  await todoDAL.init();
  const todoBLL = new TodoBLLBase(todoDAL);
  await todoBLL.init();
  //----------
  const serviceDAL = new ServiceDALMongo(database);
  await serviceDAL.init();
  const serviceBLL = new ServiceBLLBase(serviceDAL);
  await serviceBLL.init();
  //--------
  const customerDAL = new CustomerDALMongo(database);
  await customerDAL.init();
  const customerBLL = new CustomerBLLBase(customerDAL);
  await customerBLL.init();
  /****************************************************** */
  const app = require('express')();
  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.json());
  /******************************************************* */
  //Servie
  app.use('/api/auth/', NewAuthAPI(userAuthBLL));

  app.use('/api/service', NewServiceAPI(serviceBLL));
  app.use("/api/customer/", NewCustomerAPI(customerBLL));
  app.use('/api/todo/', NewTodoAPI(userAuthBLL, todoBLL));


  /******************************************************* */
  app.use((err, req, res, next) => {
    if (err && typeof err.HttpStatusCode === 'function') {
      const message = err.message;
      res.status(err.HttpStatusCode() || 500).json({
        error: message
      });
      return;
    }
    console.log(new Date(), err);
    res.status(500).send({
      error: 'internal server error'
    });
  });
  console.log(new Date(), `listen on ${config.server.port}`);
  app.listen(config.server.port, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

main().catch(console.log);
