import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import SavedJobPage from '../../components/Applicant/SavedJob'
import AppliedJobPage from '../../components/Applicant/AppliedJob'
import SettingJobPage from '../../components/Applicant/SettingJob'
import SuitableJobPage from '../../components/Applicant/SuitableJob'
import RecruiterVisitPage from '../../components/Applicant/RecruiterVisit'
import JobSearch from '../../components/JobSearch'
import JobSearchIT from '../../components/JobSearchIT'
import JobDetail from '../../components/JobDetail'
import CvTemplates from '../../components/home/CvTemplates'
import IndividualPages from './IndividualPages'
import Profile from '../../components/Profile'
import ChangePass from '../../components/ChangePass'
import CreateCvPage from '../../components/cv/CreateCv'
import CreateCvPage1 from '../../components/cv1/CreateCv'
export const routes = [
  {
    path: '/individual',
    component: IndividualPages,
  },
  {
    path: '/job-search',
    component: JobSearch,
    exact: true
  },
  {
    path: '/job-search-it',
    component: JobSearchIT,
    exact: true
  },
  {
    path: '/job-detail/:id',
    component: JobDetail,
    exact: true
  },
  {
    path: '/',
    component: JobSearch,
    exact: true
  },
  {
    path: '/cv-template',
    component: CvTemplates,
    exact: true
  },
  {
    path: '/profile',
    component: Profile,
    exact: true
  },
  {
    path: '/change-pass',
    component: ChangePass,
    exact: true
  },
  {
    path: '/cv/create',
    component: CreateCvPage,
    exact: true
  },
  {
    path: '/cv1/create',
    component: CreateCvPage1,
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

export default (props) => {
  const parentPath = props.path
  return (
  <Switch>
    {routes.map(({ path, exact = false, component: Component, ...rest }) => {
      return (
        <PrivateRoute
          key={path}
          exact={exact}
          path={`${parentPath}${path}`}
          component={Component}
          {...rest}
        />
      );
    })}
  </Switch>
)};
