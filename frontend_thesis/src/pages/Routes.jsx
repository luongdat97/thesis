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
