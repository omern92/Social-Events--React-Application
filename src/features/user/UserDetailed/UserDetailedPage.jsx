import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDesc from './UserDetailedDesc';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import Loading from '../../../app/layout/LoadingComp';
import { getUserEvents } from '../userActions';

const query = ({ userUid }) => {
  return [
    {
      collection: 'users',
      doc: userUid,
      subcollections: [{collection: 'photos'}],
      storeAs: 'photos',
    },
    {
      collection: 'users',
      doc: userUid,
      storeAs: 'user'
    }
  ]
};

const mapState = (state, ownProps) => {
  const userUid = ownProps.match.params.id;
  let user = {};

  user = !isEmpty(state.firestore.ordered.user) && state.firestore.ordered.user[0];
  return (
    {
      userUid,
      user,
      events: state.events,
      eventsLoading: state.async.loading,
      auth: state.firebase.auth,
      photos: state.firestore.ordered.photos,
      requesting: state.firestore.status.requesting,
    });
};

const actions = {
  getUserEvents,
};

class UserDetailedPage extends Component {

  async componentDidMount() {
    await this.props.getUserEvents(this.props.userUid);
  }

  handleTabChange = (e, data) => {
    console.log('activeIndex', data.activeIndex);
    this.props.getUserEvents(this.props.userUid, data.activeIndex);
  }

  render() {
    const { user, events, eventsLoading, photos, auth, match, requesting } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);
    
    // TODO: Change it to getBack and display a toastr.
    if (!user) return (<div><h1>No user found</h1></div>);
    if (loading) return <Loading inverted={true} />
    return (
      <Grid>
        <UserDetailedHeader user={user} />
        <UserDetailedDesc user={user} />
        <UserDetailedSidebar isCurrentUser={isCurrentUser} />
        <UserDetailedPhotos photos={photos} />
        <UserDetailedEvents events={events} eventsLoading={eventsLoading} handleTabChange={this.handleTabChange} />
      </Grid>
    );
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect(props => query(props))
)(UserDetailedPage);
