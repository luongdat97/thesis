import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import VerifyCompanyPage from '../../components/Employee/VerifyCompany'
import VerifyJobPage from '../../components/Employee/VerifyJob'
import CvTemplatePage from '../../components/Employee/CvTemplate'
import JobDetailPage from '../../components/JobDetailHome'
import Profile from '../../components/Profile'
import ChangePass from '../../components/ChangePass'
export const routes = [
  {
    path: '/cv-template',
    component: CvTemplatePage,
    exact: true
  },
  {
    path: '/job-detail/:id',
    component: JobDetailPage,
    exact: true
  },
  {
    path: '/verify-company',
    component: VerifyCompanyPage,
    exact: true
  },
  {
    path: '/verify-job',
    component: VerifyJobPage,
    exact: true
  },
  {
    path: '/',
    component: VerifyJobPage,
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
        isLogin ? <Component {...props} noAction /> : <Redirect to="/login" />
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
