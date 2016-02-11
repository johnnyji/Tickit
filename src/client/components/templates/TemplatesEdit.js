import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardSpinner from '.././shared/DashboardSpinner';
import TemplateEditorView from './TemplateEditorView';

import {createFlashMessage} from '../.././actions/AppActionCreators'
import TemplateActionCreators from '../.././actions/TemplateActionCreators';

@connect((state) => ({
  template: state.templates.get('templateBeingEdited')
}))
export default class TemplatesEdit extends Component {

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    template: CustomPropTypes.template
  };

  componentWillMount() {
    const {params, template} = this.props;
    // If there's a template `_id` in the route params and no template being edited, we'll fetch that
    // template from the server using the `_id`.
    if (!template && params.id) {
      this.context.dispatch(
        TemplateActionCreators.fetchTemplateById(params.id, TemplateActionCreators.setTemplateBeingEdited)
      );
    }
  }

  componentWillUnmount() {
    this.context.dispatch(TemplateActionCreators.resetTemplateBeingEdited());
  }

  componentWillUpdate(nextProps, nextState) {
    const {template} = this.props;
    const {template: nextTemplate} = nextProps;
    // If template is successfully edited (meaning theres no more `templateBeingEdited`),
    // log a flash message and redirect user to the template index view
    if (!Boolean(nextTemplate)) {
      const title = template.get('title') ? <b>{template.get('title')}</b> : 'Template';

      this.context.dispatch(
        createFlashMessage('green', <span>{title} was successfully updated!</span>)
      );
      
      this.context.router.push('/dashboard/templates');
    }
  }

  render() {
    if (!this.props.template) return <DashboardSpinner />;

    return (
      <TemplateEditorView
        mode='edit'
        template={this.props.template}
        onSave={this._handleSave}/>
    );
  }

  _handleError = (err) => {
    this.context.dispatch(createFlashMessage('red', err));
  };

  _handleSave = (template) => {
    if (template.get('title').length === 0) return this._handleError('Please provide a title for your template!');
    if (template.get('rawText').length === 0) return this._handleError('Your template can\'t be blank, duh...');

    // If all validations pass, we create the template
    this.context.dispatch(
      TemplateActionCreators.updateTemplate(this.props.template.get('_id'), template.toJS())
    );
  }
}
