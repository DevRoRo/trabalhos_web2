import http from 'http';

const data = {
    "banned": [
        "casino",
        "bet",
        "azar",
        "violence",
    ]
};

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET' && (req.url === '/banned' || req.url === '/')) {
        console.log(`[MockServer] Received request from ${req.socket.remoteAddress}`);
        res.writeHead(200);
        res.end(JSON.stringify(data));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Not Found" }));
    }
});

server.listen(3001, () => {
    console.log('------------------------------------------------');
    console.log('External Exclusion API running on Port 3001');
    console.log('URL: http://localhost:3001/banned');
    console.log('------------------------------------------------');
});