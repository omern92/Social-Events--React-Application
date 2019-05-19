import React, { Component } from 'react'
import { Grid, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import EventList from '../EventList/EventList'
import { getEventsForDashboard } from '../eventActions';
import Loading from '../../../app/layout/LoadingComp';
import EventActivity from '../EventActivity/EventActivity';

const mapStateToProps = (state) => ({
  events: state.events,
  loading: state.async.loading,
});

const actions = {
  getEventsForDashboard,
};

class EventDashBoard extends Component {
  
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    console.log('next', next);

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false,
      });
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.events !== this.props.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...this.props.events]
      });
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length -1];
    let next = await this.props.getEventsForDashboard(lastEvent);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false,
      });
    } 
  }

  render() {
    const { loading } = this.props;
    const { loadedEvents, moreEvents } = this.state;

    if (this.state.loadingInitial) return <Loading inverted={true} />;

    // if (events && events.length === 0) return <div><h1>No events to display.</h1></div>
    // if (!isLoaded(events) || isEmpty(events)) return <Loading inverted={true} />
    
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={loadedEvents}
            getNextEvents={this.getNextEvents}
            moreEvents={moreEvents}
            loading={loading}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>

    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(firestoreConnect([{ collection: "events" }])(EventDashBoard));