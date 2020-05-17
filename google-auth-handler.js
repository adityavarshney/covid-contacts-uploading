function auth() {
    var config = {
        'client_id': '773394140660-0i7c36bp68h6ia9qu7vugrpeoti1b8n1.apps.googleusercontent.com',
        'scope': 'https://www.google.com/m8/feeds'
    };
    gapi.auth.authorize(config, function() {
        fetch(gapi.auth.getToken());
    });
}

/* 
Each data.feed.entry object has the following structure
-category: UNK
-gd$email: email, primary, rel
-id: id of item in API response
-link: UNK
-title: $t (presumably the name that the user has set for themselves), type
-updated: $t (last time this record was updated -- internal to Google?)

change nresults 
*/
function fetch(token) {
    var nresults = 1000
    token['g-oauth-window'] = null;
    $.ajax({
        url: 'https://www.google.com/m8/feeds/contacts/default/full?alt=json&max-results=' + nresults,
        dataType: 'json',
        data: token
    }).done(function(data) {
        console.log(data.feed.entry.length)
        data.feed.entry.sort((a,b) => a.updated.$t.localeCompare(b.updated.$t));
        data.feed.entry.forEach(function(e) {
            var payload = "Updated at: " + e.updated.$t;
            if (e.title)
                payload += " Name: " + e.title.$t;
            if (e.gd$email)
                payload += " Email: " + e.gd$email[0].address;
            console.log(payload);
        });
    });
}