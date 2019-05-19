import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';


class PlaceInput extends Component {
  state = {
    scriptLoaded: false,
  }

  handleScriptLoad = () => {
    this.setState({ 
      scriptLoaded: true 
    });
  }

  handleOnChange = (event) => {
    console.log(event);
  }

  render() {
    const { input, placeholder, width, onSelect, searchOptions, meta: {touched, error}} = this.props;
    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script 
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCRd16D0tBrm-3i7nd7OTiwZ2nU730uxOU&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        {this.state.scriptLoaded && 
          <PlacesAutocomplete
            onChange={input.onChange}
            value={input.value}
            searchOptions={searchOptions}
            onSelect={onSelect}
          >

          {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
            <div>
            <input
              {...getInputProps({ placeholder })}      
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const style = suggestion.active
                  ? { backgroundColor: '#aaaffa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            </div>
          )}

          </PlacesAutocomplete>        
        }

        {touched && error && <Label basic color='red'>{error}</Label>}
      </Form.Field>

    );
  }
}

export default PlaceInput;
