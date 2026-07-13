const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  /await supabase[\s\S]*?\.from\("system_config"\)[\s\S]*?\.update\(updatePayload\)[\s\S]*?\.eq\("id", "main"\)[\s\S]*?\.catch\(err => console\.warn\("Failed to update global sales", err\)\);/,
  `try { await supabase.from("system_config").update(updatePayload).eq("id", "main"); } catch (err) { console.warn("Failed to update global sales", err); }`
);

app = app.replace(
  /const handleDeleteItem = async \(id: string\) => \{/,
  `const playChime = (type: "success" | "warning" | "info") => {
    try {
      const audio = new Audio(\`/sounds/\${type}.mp3\`);
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch(e) {}
  };

  const saveItemsToStorage = async (newItems: StockItem[]) => {
    setItems(newItems);
    try {
      await fetch('/api/items/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItems)
      });
      window.dispatchEvent(new Event("sync-update"));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteItem = async (id: string) => {`
);

fs.writeFileSync('src/App.tsx', app);
console.log("Lint fixes applied.");
