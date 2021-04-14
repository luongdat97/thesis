import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import SavedJobPage from '../../../components/Applicant/SavedJob'
import AppliedJobPage from '../../../components/Applicant/AppliedJob'
import SettingJobPage from '../../../components/Applicant/SettingJob'
import SuitableJobPage from '../../../components/Applicant/SuitableJob'
import RecruiterVisitPage from '../../../components/Applicant/RecruiterVisit'
export const routes = [
  {
    path: '/saved-job',
    component: SavedJobPage,
    exact: true
  },
  {
    path: '/suitable-job',
    component: SuitableJobPage,
    exact: true
  },
  {
    path: '/applied-job',
    component: AppliedJobPage,
    exact: true
  },
  {
    path: '/setting-job',
    component: SettingJobPage,
    exact: true
  },
  {
    path: '/recruiter-visit',
    component: RecruiterVisitPage,
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
