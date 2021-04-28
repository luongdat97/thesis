import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../../components/home/Home';
import JobDetailPage from '../../components/JobDetail'
import CreateCvPage from '../../components/cv/CreateCv'
import CvManagerPage from '../../components/cv/ManageCv'
import JobSearchPage from '../../components/JobSearch'
import CandidateSearch from '../../components/home/CandidateSearch'
import CvTemplates from '../../components/home/CvTemplates'
import Login from '../../components/home/Login'
import Register from '../../components/home/Register'
import RecruiterIntro from '../../components/home/RecruiterIntro'
import RecruiterLogin from '../../components/Recruiter/Login'
import RecruiterRegister from '../../components/Recruiter/Register'
export const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/register',
    component: Register,
    exact: true
  },
  {
    path: '/job-detail/:id',
    component: JobDetailPage,
    exact: true
  },
  {
    path: '/job-search',
    component: JobSearchPage,
    exact: true
  },
  {
    path: '/candidate-search',
    component: CandidateSearch,
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
    path: '/cv-template',
    component: CvTemplates,
    exact: true
  },
  {
    path: '/recruiter-intro',
    component: RecruiterIntro,
    exact: true
  },
  {
    path: '/recruiter-login',
    component: RecruiterLogin,
    exact: true
  },
  {
    path: '/recruiter-register',
    component: RecruiterRegister,
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
          path={`${path}`}
          component={Component}
          {...rest}
        />
      );
    })}
  </Switch>
)};
