const http = require('http');
const port = 3000;


var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req,res) {



  var fullurl = req.url;


  var q = url.parse('http://localhost:3000' + fullurl + "\n");




  if(q.pathname == '/channel')
  {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    res.write('Hello Web Server with Nodejs!\n');
    res.write('Host : ' + q.host + "\n");
    res.write('Path name : ' + q.pathname + "\n");
    res.write('Search : ' + (q.search).replace("?","/") + "\n");
    res.write("You are in the channel page ! \n\n");
    res.write("You are in the channel : " + (q.search).replace("?","/") +"\n");



  }
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Error 404 : Page not found');
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
