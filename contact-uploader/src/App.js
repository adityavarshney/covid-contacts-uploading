import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/auth/SignIn';
import Search from './components/search/Search';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      contactsList: null,
    };
    this.contactsCallback = this.contactsCallback.bind(this);
  }
  
  contactsCallback = (feedData) => {
    console.log('app - setting state');
    console.log(feedData);
    this.setState({
      contactsList: feedData,
    });
  }

  render(){ 
    return (
      <div className="App">
        {/* Google Auth Handler */}
        <SignIn parentCallback={this.contactsCallback}/>
        {/* Maybe React-Router? */}
        {/* Search Bar Using Contacts Data */}
        <Search contacts={this.state.contactsList}/>
      </div>
    );
  }
}
