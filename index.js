const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer(function(req,res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello Node!');
  res.write('From Pierre CAMUGLI and Hugo NAVILLOD');
  res.end();
})

server.listen(port, function(error){
  if(error)
  {
    console.log("Error", error)
  } else {
    console.log('Server is listening on port ' + port)
  }
})
