const getTimestamp = () => {
    const now = new Date();
    return `[${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.toTimeString().split(' ')[0]}]`;
};

const logger = (req, res, next) => {
    const start = process.hrtime();
    
    const timestamp = getTimestamp();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip;
    const payload = (req.body === undefined) ? 'no payload in request' : req.body;
    
    console.log(`====================================================\nTimestamp: ${timestamp} | IP:${ip}`)
    if(payload) {
        console.log('=========PAYLOAD==========')
    }
    console.dir(payload)
    if(payload) {
        console.log('==========================')
    }
    console.log(`-> ${method} ${url}`);

    res.on('finish', () => {
        const end = process.hrtime(start);
        const durationInMs = (end[0] * 1000) + (end[1] / 1000000);
        
        const statusCode = res.statusCode;
        console.log(`${timestamp} <- ${method} ${url} | Status: ${statusCode} | Latency: ${durationInMs.toFixed(3)}ms`);
        console.log('====================================================')
    });

    next();

};

export default logger;