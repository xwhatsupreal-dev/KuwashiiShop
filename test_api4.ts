async function test() {
  try {
    const res = await fetch('https://www.wondd.com/member/bot-game-packlist.php?game=rov');
    const text = await res.text();
    console.log("TEXT:", text);
  } catch (e) { console.error(e); }
}
test();
