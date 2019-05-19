import React, { Component } from 'react'
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import Map from './EventDetailedMap';

class EventDetailedInfo extends Component {
  state = {
    isMapOpen: false,
    zoom: 11,
  };

  componentWillUnmount() {
    this.setState({
      isMapOpen: false,
    });
  };

  toggleMap = () => {
    this.setState(prevState => ({
      isMapOpen: !prevState.isMapOpen,
    }));
  };

  render() {
    const { event } = this.props;
    const { isMapOpen } = this.state;
    let eventDate;
    if (event.date) {
      eventDate = event.date.toDate();
    }  

    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{event.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>
                {format(eventDate, "dddd, Do MMMM")} at{" "}
                {format(eventDate, "h:mm A")}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={12}>
              <span>{event.venue}</span>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button
                color="teal"
                size="tiny"
                content={isMapOpen ? "Hide Map" : "Show Map"}
                onClick={this.toggleMap}
              />
            </Grid.Column>
            {isMapOpen && <Map lat={event.venueLatLng.lat} lng={event.venueLatLng.lng} />}
          </Grid>
        </Segment>
      </Segment.Group>
    );
  } 

}
export default EventDetailedInfo
