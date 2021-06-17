import { ReadConfig } from "./config";
import * as express from "express";
import "./Helper/express";
import * as cors from "cors";
import { MongoClient } from "mongodb";

import { JobDALMongo } from './job/JobRepository';
import { JobBLLBase } from "./job/JobService";
import { CustomerDALMongo } from "./customer/CustomerRepository";
import { CustomerBLLBase } from "./customer/CustomerService";
import { AccountDALMongo } from './account/AccountRepository';
import { AccountBLLBase } from "./account/AccountService";
import { ProfileDALMongo } from './profile/ProfileRepository';
import { ProfileBLLBase } from "./profile/ProfileService";
import { ApplicantDALMongo } from './applicant/ApplicantRepository';
import { ApplicantBLLBase } from "./applicant/ApplicantService";
import { RecruiterDALMongo } from './recruiter/RecruiterRepository';
import { RecruiterBLLBase } from "./recruiter/RecruiterService";
import { CvDALMongo } from "./cv/CvRepository"
import { CvBLLBase } from './cv/CvService';
import { SavedJobDALMongo } from "./savedJob/SavedJobRepository"
import { SavedJobBLLBase } from './savedJob/SavedJobService';
import { AppliedJobDALMongo } from "./appliedJob/AppliedJobRepository"
import { AppliedJobBLLBase } from './appliedJob/AppliedJobService';
import { CompanyDALMongo } from "./company/CompanyRepository"
import { CompanyBLLBase } from './company/CompanyService';
import { EmployeeDALMongo } from "./employee/EmployeeRepository"
import { EmployeeBLLBase } from './employee/EmployeeService';
import { InvitedApplicantDALMongo } from "./invitedApplicant/InvitedApplicantRepository"
import { InvitedApplicantBLLBase } from './invitedApplicant/InvitedApplicantService';
import { DesireDALMongo } from "./desire/DesireRepository"
import { DesireBLLBase } from './desire/DesireService';
import { SavedApplicantDALMongo } from "./savedApplicant/SavedApplicantRepository"
import { SavedApplicantBLLBase } from './savedApplicant/SavedApplicantService';
import { AdminDALMongo } from "./admin/AdminRepository"
import { AdminBLLBase } from './admin/AdminService';
import { NotificationDALMongo } from "./notification/NotificationRepository"
import { NotificationBLLBase } from './notification/NotificationService';

import { NewCustomerAPI } from "./customer/CustomerController";
import { NewJobAPI } from "./job/JobController";
import { NewAccountAPI } from "./account/AccountController";
import { NewProfileAPI } from "./profile/ProfileController";
import { NewApplicantAPI } from "./applicant/ApplicantController";
import { NewRecruiterAPI } from "./recruiter/RecruiterController";
import { NewCvAPI } from "./cv/CvController"
import { NewSavedJobAPI } from "./savedJob/SavedJobController"
import { NewAppliedJobAPI } from "./appliedJob/AppliedJobController"
import { NewCompanyAPI } from "./company/CompanyController"
import { NewEmployeeAPI } from "./employee/EmployeeController"
import { NewCloudAPI } from "./cloud/cloud.api"
import { NewDesireAPI } from "./desire/DesireController"
import { NewSavedApplicantAPI } from "./savedApplicant/SavedApplicantController"
import { NewInvitedApplicantAPI } from "./invitedApplicant/InvitedApplicantController"
import { NewAdminAPI } from "./admin/AdminController"
import { NewNotificationAPI } from "./notification/NotificationController"



async function main() {
  const config = await ReadConfig();
  console.log(new Date(), config);
  const client = new MongoClient(config.database.db_url, {
    useUnifiedTopology: true
  });
  await client.connect();
  console.log(new Date(), 'connected to database');
  const database = client.db(config.database.db_name);

  //--------
  const recruiterDAL = new RecruiterDALMongo(database);
  await recruiterDAL.init();
  const recruiterBLL = new RecruiterBLLBase(recruiterDAL);
  await recruiterBLL.init();

  //--------
  const companyDAL = new CompanyDALMongo(database);
  await companyDAL.init();
  const companyBLL = new CompanyBLLBase(companyDAL);
  await companyBLL.init();

  //--------
  const customerDAL = new CustomerDALMongo(database);
  await customerDAL.init();
  const customerBLL = new CustomerBLLBase(customerDAL);
  await customerBLL.init();
  //--------
  const jobDAL = new JobDALMongo(database);
  await jobDAL.init();
  const jobBLL = new JobBLLBase(jobDAL, recruiterDAL, companyDAL);
  await jobBLL.init();

  //--------
  const profileDAL = new ProfileDALMongo(database);
  await profileDAL.init();
  const profileBLL = new ProfileBLLBase(profileDAL);
  await profileBLL.init();

  //--------
  const notificationDAL = new NotificationDALMongo(database);
  await notificationDAL.init();
  const notificationBLL = new NotificationBLLBase(notificationDAL);
  await notificationBLL.init();

  //--------
  const applicantDAL = new ApplicantDALMongo(database);
  await applicantDAL.init();
  const applicantBLL = new ApplicantBLLBase(applicantDAL, profileDAL);
  await applicantBLL.init();

  //--------
  const cvDAL = new CvDALMongo(database);
  await cvDAL.init();
  const cvBLL = new CvBLLBase(cvDAL);
  await cvBLL.init();

  //--------
  const appliedJobDAL = new AppliedJobDALMongo(database);
  await appliedJobDAL.init();
  const appliedJobBLL = new AppliedJobBLLBase(appliedJobDAL, jobBLL, applicantBLL);
  await appliedJobBLL.init();

  //--------
  const savedJobDAL = new SavedJobDALMongo(database);
  await savedJobDAL.init();
  const savedJobBLL = new SavedJobBLLBase(savedJobDAL, jobBLL);
  await savedJobBLL.init();

  //--------
  const employeeDAL = new EmployeeDALMongo(database);
  await employeeDAL.init();
  const employeeBLL = new EmployeeBLLBase(employeeDAL);
  await employeeBLL.init();

  //--------
  const adminDAL = new AdminDALMongo(database);
  await adminDAL.init();
  const adminBLL = new AdminBLLBase(adminDAL);
  await adminBLL.init();

  //--------
  const accountDAL = new AccountDALMongo(database);
  await accountDAL.init();
  const accountBLL = new AccountBLLBase(accountDAL, employeeDAL, adminDAL);
  await accountBLL.init();

  //--------
  const desireDAL = new DesireDALMongo(database);
  await desireDAL.init();
  const desireBLL = new DesireBLLBase(desireDAL);
  await desireBLL.init();

  //--------
  const savedApplicantDAL = new SavedApplicantDALMongo(database);
  await savedApplicantDAL.init();
  const savedApplicantBLL = new SavedApplicantBLLBase(savedApplicantDAL, applicantDAL, profileDAL);
  await savedApplicantBLL.init();

  //--------
  const invitedApplicantDAL = new InvitedApplicantDALMongo(database);
  await invitedApplicantDAL.init();
  const invitedApplicantBLL = new InvitedApplicantBLLBase(invitedApplicantDAL, applicantDAL, profileDAL);
  await invitedApplicantBLL.init();
  /****************************************************** */
  const app = require('express')();
  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.json());
  /******************************************************* */
  //Servie
  app.use("/api/customer/", NewCustomerAPI(customerBLL));
  app.use('/api/job/', NewJobAPI(jobBLL, companyBLL, recruiterBLL, notificationBLL));
  app.use('/api/profile/', NewProfileAPI(profileBLL));
  app.use('/api/notification/', NewNotificationAPI(notificationBLL));
  app.use('/api/account/', NewAccountAPI(accountBLL, profileBLL));
  app.use('/api/applicant/', NewApplicantAPI(applicantBLL, profileBLL, accountBLL));
  app.use('/api/recruiter/', NewRecruiterAPI(recruiterBLL, profileBLL, accountBLL));
  app.use('/api/employee/', NewEmployeeAPI(employeeBLL, profileBLL, accountBLL));
  app.use('/api/admin/', NewAdminAPI(adminBLL, profileBLL, accountBLL));
  app.use('/api/cv/', NewCvAPI(cvBLL))
  app.use('/api/applied-job', NewAppliedJobAPI(appliedJobBLL, jobBLL, notificationBLL))
  app.use('/api/saved-job', NewSavedJobAPI(savedJobBLL))
  app.use('/api/company', NewCompanyAPI(companyBLL))
  app.use('/api/cloud', NewCloudAPI())
  app.use('/api/desire', NewDesireAPI(desireBLL, applicantBLL, cvBLL))
  app.use('/api/saved-applicant', NewSavedApplicantAPI(savedApplicantBLL))
  app.use('/api/invited-applicant', NewInvitedApplicantAPI(invitedApplicantBLL))

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
