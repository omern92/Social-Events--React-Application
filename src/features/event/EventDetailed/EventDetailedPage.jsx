import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedChat from './EventDetailedChat';
import { objectToArray, createDataTree } from '../../../app/common/util/helpers';
import { joinEvent, cancelJoinEvent } from '../../user/userActions';
import { addEventComment } from '../eventActions';

const mapStatetoProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};
  if (eventId && state.firestore.ordered.events) {
    event = state.firestore.ordered.events.filter(event => event.id === eventId)[0];
  }
  return {
    auth: state.firebase.auth,
    event,
    eventChat: !isEmpty(state.firebase.data.event_chat) && objectToArray(state.firebase.data.event_chat[eventId]),
  };
}

const actions = {
  joinEvent,
  cancelJoinEvent,
  addEventComment,
};

class EventDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const { event, auth, joinEvent, cancelJoinEvent, addEventComment, eventChat } = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);
    const isHost = auth.uid === event && event.hostUid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            isHost={isHost}
            isGoing={isGoing}
            event={event}
            joinEvent={joinEvent}
            cancelJoinEvent={cancelJoinEvent}
          />
          <EventDetailedInfo event={event} />
          <EventDetailedChat eventChat={chatTree} addEventComment={addEventComment} eventId={event && event.id} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}



export default compose(
  withFirestore,
  connect(mapStatetoProps, actions),
  firebaseConnect((props) => ([`event_chat/${props.match.params.id}`])),
  )(EventDetailedPage);
