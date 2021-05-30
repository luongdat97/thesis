import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import PostJobPage from '../../components/Recruiter/PostJob'
import EditJobPage from '../../components/Recruiter/EditJob'
import JobManagerPage from '../../components/Recruiter/JobManager'
import CandidateSearch from '../../components/Recruiter/CandidateSearch1'
import SearchCampaignPage from '../../components/Recruiter/SearchCampaign'
import ViewCandidatesPage from '../../components/Recruiter/ViewCandidates'
import CandidateManagePage from '../../components/Recruiter/CandidateManage'
import SchedulePage from '../../components/Recruiter/Schedule'
import CompanyInfoPage from '../../components/Recruiter/Company/CompanyInfo'
import AddCompanyPage from '../../components/Recruiter/Company/AddCompany'
import EditCompany from '../../components/Recruiter/Company/EditCompany'
import Profile from '../../components/Profile'
import ChangePass from '../../components/ChangePass'
import AccountManage from '../../components/Manager/Account'
export const routes = [
  {
    path: '/account-manage',
    component: AccountManage,
    exact: true
  },
  {
    path: '/',
    component: AccountManage,
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
