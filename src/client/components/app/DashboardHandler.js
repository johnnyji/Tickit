import React from 'react';
import ProtectedComponent from '.././shared/ProtectedComponent';

import { RouteHandler } from 'react-router';

import DashboardNavbar from '.././app/DashboardNavbar';

import AppActions from '../.././actions/AppActions';

class DashboardHandler extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    AppActions.loadInitialDashboardData();
  }
  render() {
    let navLinks = [
      { path: '/dashboard', displayName: 'Groups' },
      { path: '/dashboard/notes', displayName: 'Notes' },
      { path: '/dashboard/contacts', displayName: 'Contacts' },
    ];
    
    return (
      <div>
        <DashboardNavbar links={navLinks} />
        <RouteHandler />
      </div>
    );
  }
}

DashboardHandler.defaultProps = {
  currentUser: React.PropTypes.any,
  apiToken: React.PropTypes.any
};

export default ProtectedComponent(DashboardHandler);