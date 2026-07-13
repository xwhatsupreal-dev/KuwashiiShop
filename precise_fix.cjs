const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// Fix 1: The .catch error
const badSupabaseCatch = `.eq("id", "main")
        .catch(err => console.warn("Failed to update global sales", err));`;
if (app.includes(badSupabaseCatch)) {
    // wait, let's just replace the exact line
    app = app.replace(
        /await supabase\n\s*\.from\("system_config"\)\n\s*\.update\(updatePayload\)\n\s*\.eq\("id", "main"\)\n\s*\.catch\(err => console\.warn\("Failed to update global sales", err\)\);/,
        `try { await supabase.from("system_config").update(updatePayload).eq("id", "main"); } catch (err) { console.warn("Failed to update global sales", err); }`
    );
    
    // Check if it didn't work because of indentation
    if (app.includes('.catch(err => console.warn("Failed to update global sales", err));')) {
      app = app.replace(
        /await supabase[\s\S]{1,100}\.update\(updatePayload\)[\s\S]{1,100}\.catch\(err => console\.warn\("Failed to update global sales", err\)\);/,
        `try { await supabase.from("system_config").update(updatePayload).eq("id", "main"); } catch (err) { console.warn("Failed to update global sales", err); }`
      );
    }
}

// Fix 2 & 3: Inject the missing functions right before handleDeleteItem
const functionsToInject = `const playChime = (type: "success" | "warning" | "info") => {
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

  const handleDeleteItem`;

app = app.replace("const handleDeleteItem", functionsToInject);

fs.writeFileSync('src/App.tsx', app);
console.log("Fixes applied successfully.");
