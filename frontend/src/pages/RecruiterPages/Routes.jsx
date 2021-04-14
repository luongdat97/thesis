import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../../components/home/Home';
import JobDetailPage from '../../components/JobDetail'
import CreateCvPage from '../../components/cv/CreateCv'
import CvManagerPage from '../../components/cv/ManageCv'
import CvPreviewPage from '../../components/cv/CvPreview'
import JobSearchPage from '../../components/JobSearch'
import CvTemplates from '../../components/home/CvTemplates'

import SavedJobPage from '../../components/Applicant/SavedJob'
import AppliedJobPage from '../../components/Applicant/AppliedJob'
import SettingJobPage from '../../components/Applicant/SettingJob'
import SuitableJobPage from '../../components/Applicant/SuitableJob'
import RecruiterVisitPage from '../../components/Applicant/RecruiterVisit'

import PostJobPage from '../../components/Recruiter/PostJob'
import EditJobPage from '../../components/Recruiter/EditJob'
import JobManagerPage from '../../components/Recruiter/JobManager'
import CandidateSearch from '../../components/Recruiter/CandidateSearch1'
import SearchCampaignPage from '../../components/Recruiter/SearchCampaign'
import ViewCandidatesPage from '../../components/Recruiter/ViewCandidates'
import CandidateManagePage from '../../components/Recruiter/CandidateManage'
import SchedulePage from '../../components/Recruiter/Schedule'
import CompanyInfoPage from '../../components/Recruiter/CompanyInfo'
import AddCompanyPage from '../../components/Recruiter/AddCompany'
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
