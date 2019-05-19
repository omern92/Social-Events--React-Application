/*global google */
import React, { Component } from 'react'
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';
import { 
  composeValidators, combineValidators, isRequired, hasLengthGreaterThan 
} from 'revalidate';
import { createEvent, updateEvent, cancelToggle } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

const mapStatetoProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  if (eventId && state.firestore.ordered.events) {
    event = state.firestore.ordered.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event,
    event
  };
}

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
}

class EventForm extends Component {
  state = {
    cityLatLng: '',
    venueLatLng: '',
    scriptLoaded: false,
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  handleScriptLoad = () => {
    this.setState({ 
      scriptLoaded: true,
    });
  }

  handleCitySelect = (city) => {
    geocodeByAddress(city)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ cityLatLng: latLng }))
      .then(() => {
        this.props.change('city', city)
      })
      .catch(error => console.error('Error', error));
  };

  handleVenueSelect = (venue) => {
    geocodeByAddress(venue)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ venueLatLng: latLng }))
      .then(() => {
        this.props.change('venue', venue)
      })
      .catch(error => console.error('Error', error));
  };

  onFormSubmit = (values) => {
    if (this.state.venueLatLng) {
      values.venueLatLng = this.state.venueLatLng;
    }
    if (this.props.initialValues.id) {
        this.props.updateEvent(values);
        this.props.history.goBack();
    } else {
        this.props.createEvent(values);
        this.props.history.push('/events');
    }
  }

  render() {
    const { handleSubmit, pristine, invalid, submitting, event, cancelToggle } = this.props;

    return (
      <Grid>
        <Script 
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCRd16D0tBrm-3i7nd7OTiwZ2nU730uxOU&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                component={TextInput}
                type="text"
                placeholder="Event Title"
              />
              <Field
                name="category"
                component={SelectInput}
                options={category}
                type="text"
                placeholder="Event Category"
              />
              <Field
                name="description"
                component={TextArea}
                rows='3'
                type="text"
                placeholder="Event Description"
              />

              <Header sub color="teal" content="Event Locations Details" />
              <Field
                name="city"
                component={PlaceInput}
                searchOptions={{types: ['(cities)']}}
                onSelect={this.handleCitySelect}
                type="text"
                placeholder="Event City ..."
              />
              {/* // Check if the script was loaded */}
              {this.state.scriptLoaded && 
              <Field
                name="venue"
                component={PlaceInput}
                searchOptions={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 2000,
                  types: ['establishment']
                }}
                onSelect={this.handleVenueSelect}
                type="text"
                placeholder="Event Venue ..."
              />
              }
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="MMMM Do YYYY, h:mm a"
                timeformat="HH:mm"
                timeCaption="time"
                showTimeSelect
                placeholder="Date and Time of event"
              />
              <Button positive type="submit"
                disabled={invalid || submitting || pristine}>
                Submit
              </Button>
              <Button type="button" onClick={this.props.history.goBack}>
                Cancel
              </Button>
              <Button 
                onClick={() => cancelToggle(!event.cancelled, event.id)}
                type="button"
                color={event.cancelled ? 'green': 'red'}
                floated="right"
                content={event.cancelled ? 'Reactivate event' : 'Cancel Event'}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'Please provide a category'}),
  description: composeValidators(
    isRequired({ message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({ message: 'Description must be at least 5 characters'}),
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
});

const createReduxForm = reduxForm({ 
  form: 'eventForm', enableReinitialize: true, validate 
});

export default withFirestore(connect(mapStatetoProps, actions)(createReduxForm(EventForm)));