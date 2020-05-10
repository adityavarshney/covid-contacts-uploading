# covid-contacts-uploading

# Setup 

Create Google Cloud Login

Login and access the [Google Developer's Console](https://console.developers.google.com)

Follow this [guide](https://developers.google.com/identity/sign-in/web/sign-in) to configure your app and set origins. To run locally, include http://localhost:3000 (or preferred port) in the origin. You can update this value under OAuth 2.0 in APIs & Services > Credentials. Must be done in order for the sign in to work.

Enable the Google Contacts API for your project.

# Usage

To run locally, start a server running with the port specified on the credentials page. One way to do this is to run `python -m http.server 3000` (or your chosen port) from the main folder of this repo. Navigate to http://localhost:3000 and click on the `test-covid-contacts.html` file. 

Click the "GET GOOGLE CONTACTS FEED" and enable the app to have access 

Open console via Inspect

The console should be populated with up to 1000 emails from the user's contacts list. It's unclear what order this list is returned in. 