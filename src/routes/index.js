import React from 'react';
import Home from '../containers/School';
import Faculty from '../containers/Faculty';
import Department from '../containers/Department';
import Degree from '../containers/Degree';
import Course from '../containers/Course';
import { Router, Redirect } from '@reach/router';

export const ScrollToTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return children;
};

export default function Index() {
  return (
    <div>
      <Router primary={false}>
        <ScrollToTop path="/">
          <Home path="/" />
          <Faculty path="/faculty" />
          <Department path="/department" />
          <Degree path="/degree" />
          <Course path="/course" />
          <Redirect from="*" to="/" noThrow />
        </ScrollToTop>
      </Router>
    </div>
  );
}
