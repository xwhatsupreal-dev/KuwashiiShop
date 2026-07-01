const fetch = require('node-fetch');
async function test() {
  try {
    const res = await fetch('https://www.wondd.com/member/bot-game.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'method=packlist&servicecode=rov'
    });
    const text = await res.text();
    console.log("TEXT:", text);
  } catch (e) { console.error(e); }
}
test();
