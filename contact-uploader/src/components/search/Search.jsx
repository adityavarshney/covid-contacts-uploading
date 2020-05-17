import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedValues: [],
    }
    this.uploadContacts = this.uploadContacts.bind(this);
  }

  uploadContacts = () => {
    console.log(this.state.selectedValues.map((e) => e.value));
    alert('Contacts uploaded!');
  }

  optionChanged = value => {
    console.log(value);
    this.setState({
      selectedValues: value
    });
  }

  render() {
    console.log('searchbox', this.props.contacts);
    if (this.props.contacts && this.state.selectedValues) {
      return (
        <div>
          <Select
            className="select-search-contacts"
            isMulti
            closeMenuOnSelect={false}
            value={this.state.selectedValues}
            onChange={this.optionChanged}
            components={animatedComponents}
            name="contacts" 
            options={this.props.contacts} />
          <button onClick={this.uploadContacts}>Upload Contacts</button>
        </div>        
      );
    } else {
      console.log('no props');
      return (
        <div>
          <h1>No props</h1>
        </div>
      );
    }
  }
}