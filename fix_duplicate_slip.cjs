const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// For angpao topup
app = app.replace(
  /const receiverStr = JSON\.stringify\(slipData\.receiver \|\| slipData\)\.replace\(\/\[\- \]\/g\, \'\'\);/,
  `const transactionId = slipData.transRef || slipData.transactionId || slipData.rawSlip?.transactionId || slipData.rawSlip?.transRef || null;
                  
                  if (!transactionId) {
                      handleTopupError("ไม่พบเลขอ้างอิงในสลิป ไม่สามารถดำเนินการได้", "angpao"); return;
                  }

                  const { data: existingSlip } = await supabase.from("topups").select("id").eq("ref_id", transactionId).maybeSingle();
                  if (existingSlip) {
                      handleTopupError("สลิปนี้ถูกใช้งานไปแล้ว!", "angpao"); return;
                  }
                  
                  const receiverStr = JSON.stringify(slipData.receiver || slipData).replace(/[- ]/g, '');`
);

app = app.replace(
  /ref_id: slipData\.rawSlip\?\.transactionId \|\| 'wallet-' \+ Date\.now\(\)\,/,
  `ref_id: transactionId,`
);

// For bank topup
app = app.replace(
  /const receiverStr = JSON\.stringify\(slipData\.receiver \|\| slipData\.rawSlip\?\.receiver \|\| slipData\)\.replace\(\/\[\- \]\/g\, \'\'\);/,
  `const transactionId = slipData.transRef || slipData.transactionId || slipData.rawSlip?.transactionId || slipData.rawSlip?.transRef || null;
                  
                  if (!transactionId) {
                      handleTopupError("ไม่พบเลขอ้างอิงในสลิป ไม่สามารถดำเนินการได้", "bank"); return;
                  }

                  const { data: existingSlip } = await supabase.from("topups").select("id").eq("ref_id", transactionId).maybeSingle();
                  if (existingSlip) {
                      handleTopupError("สลิปนี้ถูกใช้งานไปแล้ว!", "bank"); return;
                  }
                  
                  const receiverStr = JSON.stringify(slipData.receiver || slipData.rawSlip?.receiver || slipData).replace(/[- ]/g, '');`
);

app = app.replace(
  /ref_id: slipData\.rawSlip\?\.transRef \|\| 'bank-' \+ Date\.now\(\)\,/,
  `ref_id: transactionId,`
);

fs.writeFileSync('src/App.tsx', app);
console.log("Duplicate slip check added.");
