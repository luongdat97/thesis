import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ProvideAuth, PrivateRoute } from '../../components/authenticate'

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
export const routes = [
  {
    path: '/post-job',
    component: PostJobPage,
    exact: true
  },
  {
    path: '/edit-job/:id',
    component: EditJobPage,
    exact: true
  },
  {
    path: '/job-manager',
    component: JobManagerPage,
    exact: true
  },
  {
    path: '/',
    component: JobManagerPage,
    exact: true
  },
  {
    path: '/candidate-search',
    component: CandidateSearch,
    exact: true
  },
  {
    path: '/search-campaign',
    component: SearchCampaignPage,
    exact: true
  },
  {
    path: '/view-candidates',
    component: ViewCandidatesPage,
    exact: true
  },
  {
    path: '/candidate-manage',
    component: CandidateManagePage,
    exact: true
  },
  {
    path: '/schedule',
    component: SchedulePage,
    exact: true
  },
  {
    path: '/company-info',
    component: CompanyInfoPage,
    exact: true
  },
  {
    path: '/add-company',
    component: AddCompanyPage,
    exact: true
  },
  {
    path: '/edit-company/:id',
    component: EditCompany,
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

export default (props) => {
  const parentPath = props.path
  return (
    <Switch>
      {routes.map(({ path, exact = false, component: Component, ...rest }) => {
        return (
          <Route
            key={`${parentPath}${path}`}
            exact={exact}
            path={`${parentPath}${path}`}
            component={Component}
            {...rest}
          />
        )
      })}
      
    </Switch>
  )
};
