async function test() {
  try {
    const res = await fetch('https://www.wondd.com/game/garena/index.php');
    const text = await res.text();
    console.log("HTML length:", text.length);
    console.log("Excerpt:", text.slice(0, 1000));
  } catch (e) { console.error(e); }
}
test();
