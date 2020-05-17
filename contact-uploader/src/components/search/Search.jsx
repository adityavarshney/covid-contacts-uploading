import React, { Component } from 'react';
// import ReactSearchBox from 'react-search-box';
import SelectSearch from 'react-select-search';

export default class Search extends Component {

  render() {
    console.log('searchbox', this.props.contacts);
    if (this.props.contacts) {
      return (
        <SelectSearch 
          className="select-search" 
          options={this.props.contacts} 
          defaultValue="contactsSearch" 
          multiple={true} 
          search={true}
          printOptions={"always"} 
          placeholder="Select Contacts" />
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