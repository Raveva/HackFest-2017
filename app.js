var http = require('http');
var express = require('express');
var api = require('instagram-node').instagram();
var app = express();

var latestpostlikes = require('./latestpostlikes.json');

<<<<<<< HEAD

=======
/*
console.log(data.posts[0].id);
>>>>>>> a077417d5ebb4d92b0c831fd49a3711419764ec4

console.log(latestpostlikes.posts[0].id);

app.get('/latestpostlikes', function(req, res) {
  res.send(latestpostlikes);
});

//fetch("http://localhost:3000/data").then(res => res.json()).then(res => console.log(res));

<<<<<<< HEAD


/*get best time

app.get('/besttime', function(req,res){

}
*/

//get latest likes



=======
<<<<<<< HEAD
*/
>>>>>>> a077417d5ebb4d92b0c831fd49a3711419764ec4
app.use(express.static("views"));

api.use({
  client_id: '2baab622a9d44a9d962742f3ba2ae74d',
  client_secret: 'd5145e8c983745f0bef2263a20f9d9bc'
});

app.set("view engine", "ejs");

var redirect_uri = 'http://127.0.0.1:3000/handleauth';

var authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes', 'follower_list'], state: 'a state' }));
};

var handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log("Connection succeeded. Access token is"  + result.access_token);
      api.use({
        access_token: result.access_token
      });

      api.user_self_media_recent(function(err, medias, pagination, remaining, limit) {
        console.log(err);
        console.log(medias);
        console.log(medias[0].id);
        console.log(medias[0].user.id);
        console.log(pagination);
        console.log(remaining);
        console.log(limit);

        api.user_followers(medias[0].user.id, function(err, users, pagination, remaining, limit) {
          console.log(err);
          console.log(users);

<<<<<<< HEAD
          
          var followers = users;
=======

          var followers = users; //.length?
>>>>>>> a077417d5ebb4d92b0c831fd49a3711419764ec4
          var likes = medias[0].likes;
          var comments = medias[0].comments;
          var tags = medias[0].tags;


          var top5 = JSON.parse(JSON.stringify(medias));
          top5.sort(function(a, b) {
            return b.likes.count - a.likes.count;
          });
          top5 = top5.slice(0, 5);

          var totalLikes = medias.reduce(function(sum, value) {
            return sum + value.likes.count;
          }, 0);

          var totalComments = medias.reduce(function(sum, value) {
            return sum + value.comments.count;
          }, 0);

          var variables = {medias, followers, likes, comments, tags, top5, totalLikes, totalComments};

          res.render("index.html.ejs", variables);
        });

      });

    }
  });
};

// This is where you would initially send users to authorize
app.get('/authorize_user', authorize_user);
// This is your redirect URI
app.get('/handleauth', handleauth);

app.get('/', function(req, res) {
  res.redirect('/authorize_user');
});


app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
