import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import SavedJobPage from '../../../components/Applicant/SavedJob'
import AppliedJobPage from '../../../components/Applicant/AppliedJob'
import InvitedJob from "../../../components/Applicant/InvitedJob"
import SettingJobPage from '../../../components/Applicant/SettingJob'
import SuitableJobPage from '../../../components/Applicant/SuitableJob'
import RecruiterVisitPage from '../../../components/Applicant/RecruiterVisit'
import CvManage from '../../../components/cv/ManageCv'
import ViewCv from '../../../components/cv/ViewCv'
import EditCv from '../../../components/cv/EditCv'
import ViewCv1 from '../../../components/cv1/ViewCv'
import EditCv1 from '../../../components/cv1/EditCv'
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
    path: '/invited-job',
    component: InvitedJob,
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
  {
    path: '/manage-cv',
    component: CvManage,
    exact: true
  },
  {
    path: '/view-cv/:id',
    component: ViewCv,
    exact: true
  },
  {
    path: '/edit-cv/:id',
    component: EditCv,
    exact: true
  },
  {
    path: '/view-cv1/:id',
    component: ViewCv1,
    exact: true
  },
  {
    path: '/edit-cv1/:id',
    component: EditCv1,
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
