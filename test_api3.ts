async function test() {
  try {
    const res = await fetch('https://www.wondd.com/game/garena/index.php');
    const text = await res.text();
    // find pack names, prices etc. Let's look for something like ROV or Free Fire packs
    const lines = text.split('\n');
    let matchLines = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('packcode') || lines[i].includes('ROV') || lines[i].includes('บาท') || lines[i].includes('คูปอง') || lines[i].includes('เพชร') || lines[i].includes('price') || lines[i].includes('value')) {
             matchLines.push(lines[i].trim());
        }
    }
    console.log("Matches:", matchLines.join('\n').slice(0, 3000));
  } catch (e) { console.error(e); }
}
test();
