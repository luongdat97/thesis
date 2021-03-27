import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './HomePage';
import JobDetailPage from './JobDetailPage'
import CreateCvPage from './CreateCvPage'
import CvManagerPage from './CvManagerPage'
import CvPreviewPage from './CvPreviewPage'
import SavedJobPage from './ApplicantPages/SavedJobPage'
import AppliedJobPage from './ApplicantPages/AppliedJobPage'
import SettingJobPage from './ApplicantPages/SettingJobPage'
import SuitableJobPage from './ApplicantPages/SuitableJobPage'
import RecruiterVisitPage from './ApplicantPages/RecruiterVisitPage'
import PostJobPage from './RecruiterPages/PostJobPage'
import JobManagerPage from './RecruiterPages/JobManagerPage'
import CandidateSearch from './RecruiterPages/CandidateSearchPage'
import SearchCampaignPage from './RecruiterPages/SearchCampaignPage'
import ViewCandidatesPage from './RecruiterPages/ViewCandidatesPage'
import CandidateManagePage from './RecruiterPages/CandidateManagePage'
import SchedulePage from './RecruiterPages/SchedulePage'
import CompanyInfoPage from './RecruiterPages/CompanyInfoPage'
import AddCompanyPage from './RecruiterPages/AddCompanyPage'
export const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    path: '/job-detail',
    component: JobDetailPage,
    exact: true
  },
  {
    path: '/cv/create',
    component: CreateCvPage,
    exact: true
  },
  {
    path: '/cv/manage',
    component: CvManagerPage,
    exact: true
  },
  {
    path: '/cv/preview',
    component: CvPreviewPage,
    exact: true
  },
  {
    path: '/applicant/saved-job',
    component: SavedJobPage,
    exact: true
  },
  {
    path: '/applicant/suitable-job',
    component: SuitableJobPage,
    exact: true
  },
  {
    path: '/applicant/applied-job',
    component: AppliedJobPage,
    exact: true
  },
  {
    path: '/applicant/setting-job',
    component: SettingJobPage,
    exact: true
  },
  {
    path: '/applicant/recruiter-visit',
    component: RecruiterVisitPage,
    exact: true
  },
  {
    path: '/recruiter/post-job',
    component: PostJobPage,
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
