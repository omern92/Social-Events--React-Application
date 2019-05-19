import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../modals/modalsActions';

class TestComp extends React.Component {

  render() {
    const { openModal } = this.props;

    return (
      <Button onClick={() => openModal('TestModal', {data: 43})} color="teal" content="open Modal" />
    );
  }
}

const actions = {
  openModal,
};

export default connect(null, actions)(TestComp);