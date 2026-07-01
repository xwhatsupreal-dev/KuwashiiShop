async function test() {
  const games = ["freefire", "undawn", "deltaforce", "codm", "haikyu", "pubgm", "mlbb", "valorant", "heartopia"];
  for (const game of games) {
    try {
      const res = await fetch(`https://www.wondd.com/member/bot-game-packlist.php?game=${game}`);
      const text = await res.text();
      console.log(`--- ${game} ---`);
      console.log("TEXT:", text.slice(0, 150));
    } catch (e) { console.error(e); }
  }
}
test();
