const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster) {
  console.log(`Master 进程 ${process.pid} 正在进行`);

  for(let i=0; i<numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => { console.log(`Worker ${worker.process.pid} 已退出`) })

} else {
  http.createServer((req, res) => res.end(`123456 ${process.pid}`)).listen(8000)
  console.log(`Worker 进程 ${process.pid} 已启动`);
}