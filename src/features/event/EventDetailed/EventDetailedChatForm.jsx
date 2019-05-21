import React, { Component } from "react";
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextArea from '../../../app/common/form/TextArea';

class EventDetailedChatForm extends Component {
  handleCommentSubmit = (values) => {
    const {addEventComment, eventId, parentId, reset, closeForm } = this.props;
    addEventComment(eventId, parentId, values);
    reset();
    if (parentId !== 0) {
      closeForm();
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
        <Field
          name="comment"
          type="text"
          component={TextArea}
          rows={2}
        />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    );
  }
}

export default reduxForm({ Fields: 'comment' })(EventDetailedChatForm);
