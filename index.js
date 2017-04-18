var express = require('express');
var app = express();
var client = require('redis').createClient(process.env.REDIS_URL);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  client.get("meow", function(err, reply) {
      // reply is null when the key is missing
      response.send(reply);
  });
});

app.post('/', function(request, response) {
  client.get("meow", function(err, reply) {
      // reply is null when the key is missing
      var increment = 0;
      if(reply) {
        increment = parseInt(reply) + 1;
      }
      client.set("meow", increment.toString());
      response.send("worked");
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
