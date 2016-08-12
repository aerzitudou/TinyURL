var http = require('http');

http.createServer(function (req, res) {
    console.log("inside create server");
    res.writeHead(200, {"Content-Type": "text-plain"});
    var html = fs.readFileSync(__dirname + '/index.html');//TODO: check why index.html is not showing
    res.end(html);

}).listen(3000);

