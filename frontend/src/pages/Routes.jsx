import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import PostJobPage from './RecruiterPages/PostJobPage'
import EditJobPage from './RecruiterPages/EditJobPage'
import JobManagerPage from './RecruiterPages/JobManagerPage'
import CandidateSearch from './RecruiterPages/CandidateSearchPage'
import SearchCampaignPage from './RecruiterPages/SearchCampaignPage'
import ViewCandidatesPage from './RecruiterPages/ViewCandidatesPage'
import CandidateManagePage from './RecruiterPages/CandidateManagePage'
import SchedulePage from './RecruiterPages/SchedulePage'
import CompanyInfoPage from './RecruiterPages/CompanyInfoPage'
import AddCompanyPage from './RecruiterPages/AddCompanyPage'
import VerifyCompanyPage from './EmployeePages/VerifyCompanyPage'
import VerifyJobPage from './EmployeePages/VerifyJobPage'
import CvTemplatePage from './EmployeePages/CvTemplatePage'
import AccountPage from './ManagerPages/AccountPage'
import ReportPage from './ManagerPages/ReportPage'
import StatisticPage from './ManagerPages/StatisticPage'
import WorkhistoryPage from './ManagerPages/WorkHistoryPage'

import HomePages from './HomePages'
import ApplicantPages from './ApplicantPages'
import RecruiterPages from './RecruiterPages'
export const routes = [
  {
    path: '/recruiter',
    component: RecruiterPages,
  },
  {
    path: '/recruiter/post-job',
    component: PostJobPage,
    exact: true
  },
  {
    path: '/recruiter/edit-job/:id',
    component: EditJobPage,
    exact: true
  },
  {
    path: '/recruiter/job-manager',
    component: JobManagerPage,
    exact: true
  },
  {
    path: '/recruiter/candidate-search',
    component: CandidateSearch,
    exact: true
  },
  {
    path: '/recruiter/search-campaign',
    component: SearchCampaignPage,
    exact: true
  },
  {
    path: '/recruiter/view-candidates',
    component: ViewCandidatesPage,
    exact: true
  },
  {
    path: '/recruiter/candidate-manage',
    component: CandidateManagePage,
    exact: true
  },
  {
    path: '/recruiter/schedule',
    component: SchedulePage,
    exact: true
  },
  {
    path: '/recruiter/company-info',
    component: CompanyInfoPage,
    exact: true
  },
  {
    path: '/recruiter/add-company',
    component: AddCompanyPage,
    exact: true
  },
  {
    path: '/employee/cv-template',
    component: CvTemplatePage,
    exact: true
  },
  {
    path: '/employee/verify-company',
    component: VerifyCompanyPage,
    exact: true
  },
  {
    path: '/employee/verify-job',
    component: VerifyJobPage,
    exact: true
  },
  {
    path: '/manager/account',
    component: AccountPage,
    exact: true
  },
  {
    path: '/manager/report',
    component: ReportPage,
    exact: true
  },
  {
    path: '/manager/statistic',
    component: StatisticPage,
    exact: true
  },
  {
    path: '/manager/work-history',
    component: WorkhistoryPage,
    exact: true
  },
  {
    path: '/applicant',
    component: ApplicantPages,
  },
  {
    path: '/',
    component: HomePages,
  },
];

const PrivateRoute = ({ component: Component, ...rest }) => {
  //const isLogin = useSelector((state) => state.user.isLogin);
  const isLogin = true

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /sign in page
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default () => (
  <Switch>
    {routes.map(({ path, exact = false, component: Component, ...rest }) => {
      return (
        <PrivateRoute
          key={path}
          exact={exact}
          path={path}
          component={Component}
          {...rest}
        />
      );
    })}
  </Switch>
);
