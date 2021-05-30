import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import VerifyCompanyPage from './EmployeePages/VerifyCompanyPage'
import VerifyJobPage from './EmployeePages/VerifyJobPage'
import CvTemplatePage from './EmployeePages/CvTemplatePage'
import AccountPage from './ManagerPages/AccountPage'
import ReportPage from './ManagerPages/ReportPage'
import StatisticPage from './ManagerPages/StatisticPage'
import WorkhistoryPage from './ManagerPages/WorkHistoryPage'
import { ProvideAuth, PrivateRoute } from '../components/authenticate'
import HomePages from './HomePages'
import ApplicantPages from './ApplicantPages'
import RecruiterPages from './RecruiterPages'
import EmployeePages from './EmployeePages'
import AdminPages from './AdminPages'
import { useCookies } from 'react-cookie';
export const routes = [
  {
    path: '/manager/account',
    component: AccountPage,
    exact: true,
    role: "manager"

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
    role: "employee"
  },
  {
    path: '/recruiter',
    component: RecruiterPages,
    role: 'recruiter'
  },
  {
    path: '/applicant',
    component: ApplicantPages,
    role: "applicant"
  },
  {
    path: '/admin',
    component: AdminPages,
    role: "admin"
  },
  {
    path: '/',
    component: HomePages,
  },
];

export default () => {
  const [cookies, setCookie] = useCookies(['user']);
  let history = useHistory();
  // if (cookies.user) {
  //   let account = cookies.user.account_ref
  //   history.replace({ pathname: `/${account.role}` })
  // }
  return (
    <Switch>
      {routes.map(({ path, exact = false, component: Component, ...rest }) => {
        console.log(rest.role)
        if (rest.role) {
          return (
            <PrivateRoute
              key={path}
              exact={exact}
              path={path}
              role={rest.role}
              {...rest}
            >
              <Component></Component>
            </PrivateRoute>
          )
        } else {
          return (
            <Route
              key={path}
              exact={exact}
              path={path}
              component={Component}
              {...rest}
            />
          );
        }
      })}
    </Switch>
  )
}

