var Reflux = require('reflux');
var _ = require('lodash');
var AppActions = require('.././actions/AppActions');

var AppStateTemplate = {
  currentUser: null,
  apiToken: null,
  modal: {
    newTimesheet: false
  },
  workTypes: [
    'Grip Boy',
    '3rd Assistant Director',
    'Assistant Director',
    'Boom Mic Operator',
    'Driver',
    'Producer'
  ],
  appHandlerReady: false,
};

var AppStore = Reflux.createStore({
  init: function() {
    this.state = _.cloneDeep(AppStateTemplate);
    this.listenToMany(AppActions);
  },
  getState: function() {
    return this.state;
  },
  getCurrentUser: function() {
    return this.state.currentUser;
  },
  getApiToken: function() {
    return this.state.apiToken;
  },
  onSetCurrentUser: function(user) {
    this.state.currentUser = user;
    this.trigger(this.state);
  },
  onSetApiToken: function(token) {
    this.state.apiToken = token;
    localStorage.setItem('jwt', token);
    this.trigger(this.state);
  },
  onFetchCurrentUserCompleted: function() {

  },
  onFetchCurrentUserFailed: function() {

  },
  onToggleModal: function(modalName) {
    // first sets all modals to false, and then sets true to inputted modal name is there is one
    this.state.modal = _.mapValues(this.state.modal, function(v) { return v = false; });
    if (modalName) { this.state.modal[modalName] = true; }
    this.trigger(this.state);
  },
});

module.exports = AppStore;