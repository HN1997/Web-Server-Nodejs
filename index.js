const http = require('http');
const port = 3000;


var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req,res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello Web Server with Nodejs!\n');

  var fullurl = req.url;
  var q = url.parse('http://localhost:3000' + fullurl + "\n");
  res.write('Host : ' + q.host + "\n");
  res.write('Path name : ' + q.pathname + "\n");
  res.write('Search : ' + q.search + "\n");

  if(q.pathname == '/HelloWorld')
  {
    res.write("Hello world ! \n");
  }
  else {
    res.write("I don't know this page, sorry!\n");
  }

  if(q.search == '?country=France')
  {
    res.write("We are in France at ECE Paris!\n");
  }


  res.end();
})

server.listen(port, function(error){
  if(error)
  {
    console.log("Error", error);
  } else {
    console.log('Server is listening on port ' + port);
  }
})
