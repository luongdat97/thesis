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
import { JobDALMongo } from './job/job.dal.mongo';
import { JobBLLBase } from "./job/job.bll.base";
import { CustomerDALMongo } from "./customer/customer.dal.mongo";
import { CustomerBLLBase } from "./customer/customer.bll.base";
import { AccountDALMongo } from './account/account.dal.mongo';
import { AccountBLLBase } from "./account/account.bll.base";
import { ProfileDALMongo } from './profile/profile.dal.mongo';
import { ProfileBLLBase } from "./profile/profile.bll.base";
import { ApplicantDALMongo } from './applicant/applicant.dal.mongo';
import { ApplicantBLLBase } from "./applicant/applicant.bll.base";
import { CvDALMongo} from "./cv/cv.dal.mongo"
import { CvBLLBase } from './cv/cv.bll.base';
import { SavedJobDALMongo} from "./savedJob/savedJob.dal.mongo"
import { SavedJobBLLBase } from './savedJob/savedJob.bll.base';
import { AppliedJobDALMongo} from "./appliedJob/appliedJob.dal.mongo"
import { AppliedJobBLLBase} from './appliedJob/appliedJob.bll.base';

import { NewTodoAPI } from "./todo/todo.api";
import { NewCustomerAPI } from "./customer/customer.api";
import { NewJobAPI} from "./job/job.api";
import { NewServiceAPI } from './service/service.api';
import { NewAccountAPI} from "./account/account.api";
import { NewProfileAPI} from "./profile/profile.api";
import { NewApplicantAPI} from "./applicant/applicant.api";
import { NewCvAPI} from "./cv/cv.api"
import { NewSavedJobAPI} from "./savedJob/savedJob.api"
import { NewAppliedJobAPI} from "./appliedJob/appliedJob.api"

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
  //--------
  const jobDAL = new JobDALMongo(database);
  await jobDAL.init();
  const jobBLL = new JobBLLBase(jobDAL);
  await jobBLL.init();

  //--------
  const accountDAL = new AccountDALMongo(database);
  await accountDAL.init();
  const accountBLL = new AccountBLLBase(accountDAL);
  await accountBLL.init();

  //--------
  const profileDAL = new ProfileDALMongo(database);
  await profileDAL.init();
  const profileBLL = new ProfileBLLBase(profileDAL);
  await profileBLL.init();

  //--------
  const applicantDAL = new ApplicantDALMongo(database);
  await applicantDAL.init();
  const applicantBLL = new ApplicantBLLBase(applicantDAL);
  await applicantBLL.init();

  //--------
  const cvDAL = new CvDALMongo(database);
  await cvDAL.init();
  const cvBLL = new CvBLLBase(cvDAL);
  await cvBLL.init();

  //--------
  const appliedJobDAL = new AppliedJobDALMongo(database);
  await appliedJobDAL.init();
  const appliedJobBLL = new AppliedJobBLLBase(appliedJobDAL, jobBLL);
  await appliedJobBLL.init();

  //--------
  const savedJobDAL = new SavedJobDALMongo(database);
  await savedJobDAL.init();
  const savedJobBLL = new SavedJobBLLBase(savedJobDAL, jobBLL);
  await savedJobBLL.init();
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
  app.use('/api/job/', NewJobAPI(jobBLL));
  app.use('/api/profile/', NewProfileAPI(profileBLL));
  app.use('/api/account/', NewAccountAPI(accountBLL));
  app.use('/api/applicant/', NewApplicantAPI(applicantBLL, profileBLL, accountBLL));
  app.use('/api/cv/', NewCvAPI(cvBLL))
  app.use('/api/applied-job', NewAppliedJobAPI(appliedJobBLL))
  app.use('/api/saved-job', NewSavedJobAPI(savedJobBLL))

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
