import React, { Component } from 'react';
import { gapi } from 'gapi-script';
const $ = window.$;

export default class SignIn extends Component {

  constructor(props) {
    super(props);
    this.auth = this.auth.bind(this);
  }

  auth() {
    console.log('calling auth')
    var config = {
      'client_id': '773394140660-0i7c36bp68h6ia9qu7vugrpeoti1b8n1.apps.googleusercontent.com',
      'scope': 'https://www.google.com/m8/feeds'
    };
    gapi.load('auth2', () => {
      gapi.auth.authorize(config, async () => {
        let token = gapi.auth.getToken()
        if (token)
          this.getContacts(token);
      });
    });    
  }

  // signOut() {
  //   gapi.load('auth2', () => {
  //     var auth2 = gapi.auth2.getAuthInstance();
  //     auth2.signOut().then(function () {
  //       console.log('User signed out.');
  //     });
  //   });
  // }

  /* 
  Each data.feed.entry object has the following structure
  -category: UNK
  -gd$email: email, primary, rel
  -id: id of item in API response
  -link: UNK
  -title: $t (presumably the name that the user has set for themselves), type
  -updated: $t (last time this record was updated -- internal to Google?)
  
  Change nresults 
  */
  async getContacts(token) {
    var nresults = 1000
    token['g-oauth-window'] = null;
    // return this.fetch('https://www.google.com/m8/feeds/contacts/default/full?alt=json&max-results=' + nresults)
    return new Promise((resolve, reject) => {
      return $.ajax({
        url: 'https://www.google.com/m8/feeds/contacts/default/full?alt=json&max-results=' + nresults,
        dataType: 'json',
        data: token,
        success: (data) => {
          console.log('signin - ajax success');
          console.log(data.feed.entry.length)
          data.feed.entry.sort((a, b) => -a.updated.$t.localeCompare(b.updated.$t)); // order by most recently updated
          let result = data.feed.entry.map(function (e) {
            if (e.gd$email && e.title.$t && e.updated.$t) {
              var email = e.gd$email[0].address;
              var name = e.title.$t;
              var last_updated = e.updated.$t;
              let obj = {
                'label': name + " " + email, // Search.jsx requires this structure
                'value': name + " " + email + " " + last_updated,
              }
              return obj;
            }
            return null;
          }).filter((e) => e);
          console.log(result.length);
          console.log(result);
          return this.props.parentCallback(result);
        },
        fail: () => {
          console.log('signin - ajax failed');
        }
      });
    }).catch( error => console.log(error));
  }

  render() {
    return (
      <div className="signin-div">
        <button className="signin-button" onClick={this.auth}>Sign In</button>
        <button className="signout-button" onClick={this.signOut}>Sign Out</button>
      </div>
    );
  }
}