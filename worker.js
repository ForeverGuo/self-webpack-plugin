const http = require('http');
http.createServer((req, res) => {
  res.end('i am worker, pid:' + process.pid + ',ppid: ' + process.ppid);
})

let worker;
process.title = "node-worker";
process.on('message', function(message, sendHandle) {
  console.log(message)
  if(message == 'server') {
    worker = sendHandle;
    worker.on('connection', function(socket) {
      console.log(socket)
      server.emit('connection', socket);
    })
  }
})