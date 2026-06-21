import http from 'http';

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/d1',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', data));
});

req.write(JSON.stringify({
  sql: "SELECT count(*) FROM items",
  params: []
}));
req.end();
