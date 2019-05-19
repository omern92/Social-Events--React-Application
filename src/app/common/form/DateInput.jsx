import React from 'react'
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DateInput = ({ input: {value, onChange, onBlur, ...inputProps}, width, placeholder, meta: {touched, error}, ...props}) => {
  if (value) {
    value = moment(value, 'X')
  }

  return (
  <Form.Field error={touched && !!error} width={width}>
    <DatePicker
      {...props}
      placeholderText={placeholder}
      selected={value ? moment(value) : null}
      onChange={onChange}
      autoComplete="off"
      {...inputProps}
    />
    {touched && error && <Label basic color='red'>{error}</Label>}
  </Form.Field>
  )
};


export default DateInput
