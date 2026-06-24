const http = require('http');

const sql = `SELECT announcement_settings FROM system_config WHERE id = ?`;
const params = ['main'];

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
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const result = JSON.parse(data);
    let settingsStr = result.data[0].announcement_settings;
    let settings = {};
    try {
      settings = JSON.parse(settingsStr || '{}');
    } catch(e) {}
    
    settings.topup_bank_qr_image = "https://img2.pic.in.th/1000111512.jpg";
    settings.rov_topup_bank_qr_image = "https://img2.pic.in.th/1000111512.jpg";

    const updateSql = `UPDATE system_config SET announcement_settings = ? WHERE id = ?`;
    const updateParams = [JSON.stringify(settings), 'main'];
    
    const updateReq = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/d1',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (res2) => {
      let data2 = '';
      res2.on('data', chunk => data2 += chunk);
      res2.on('end', () => {
        console.log("Updated successfully:", data2);
      });
    });
    updateReq.write(JSON.stringify({ sql: updateSql, params: updateParams }));
    updateReq.end();
  });
});

req.write(JSON.stringify({ sql, params }));
req.end();
