import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate'
import { Link } from 'react-router';

import AppActions from '../.././actions/AppActions';
import AuthStore from '../.././stores/AuthStore';

import Icon from '.././shared/Icon';

export default class AppHeader extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions('_logoutUser');
  }
  _logoutUser() {
    debugger;
  }
  render() {
    let p = this.props;
    let headerContent;

    if (p.currentUser) {
      return (
        <header className='app-header-wrapper'>
          <Link className='pull-left logo' to='/dashboard'>
            <Icon icon='access-time' size='3rem' />
            Tickit
          </Link>
          <div className='pull-right'>
            <Link to='profile'>Profile</Link>
            <span onClick={this._logoutUser}>Logout</span>
          </div>
        </header>
      );
    } else {
      return (
        <header className='app-header-wrapper'>
          <Link className='pull-left logo' to='/'>
            <Icon icon='access-time' size='3rem' />
            Tickit
          </Link>
          <div className='pull-right'>
            <Link to='login'>Login</Link>
            <Link to='join'>Join</Link>
          </div>
        </header>
      );
    }

  }
}

AppHeader.propTypes = {
  currentUser: React.PropTypes.any
};