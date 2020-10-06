const http = require('http')
const url = require('url')
const qs = require('querystring')
const handles = require('./handles')


const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' +
'    <body>' +
'       <p>Hello, my name is hugo and i am 23 years old!</p>' +
'    </body>' +
'</html>'

const serverHandle = function(req,res){
  const route = url.parse(req.url)
  const path = route.pathname
  const params = qs.parse(route.query)

  if(path==='/hello' && 'name' in params)
  {
    if(params['name']==='hugo')
    {
      res.writeHead(200, {'Content-type': 'text/html'});
      res.write(content)
    }
    else
    {
      res.writeHead(200, {'Content-type': 'text/plain'});
      res.write('Hello ' + params['name'])
    }
  }
  else
  {
    res.writeHead(404)
    res.write('ERROR 404 : Page not defined');
  }

  res.end();
}

const server = http.createServer(serverHandle);

server.listen(3000);
