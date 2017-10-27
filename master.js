const cluster = require('cluster');
const CPUCount = 2


cluster.on('disconnect', (worker, code, signal) => {
    console.log(`Worker ${worker.id} died`);
    cluster.fork();
});

cluster.on('online', (worker) => {
    console.log(`Worker ${worker.id} running`);
});

for(var i = 0; i < CPUCount; ++i)
{
    cluster.fork();
}