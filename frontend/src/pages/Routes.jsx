import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
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
import EmployeePages from './EmployeePages'
export const routes = [
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
    path: '/employee',
    component: EmployeePages,
  },
  {
    path: '/recruiter',
    component: RecruiterPages,
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
