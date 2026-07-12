const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the handleTopupSubmit body for angpao and bank
// Let's find the Angpao logic

const angpaoLogic = `    // Angpao topup
    if (topupModalStep === "angpao") {
      if (!slipFile) {
        showToast("กรุณาอัปโหลดสลิป TrueMoney Wallet", "error");
        setIsProcessingTopup(false);
        return;
      }
      const processAngpaoSlip = async () => {
        try {
          setTopupError("");
          
          const reader = new FileReader();
          reader.readAsDataURL(slipFile);
          reader.onload = async () => {
            const base64 = reader.result;
            try {
                const checkRes = await fetch("/api/topup/true-wallet", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ base64 })
                });
                const data = await checkRes.json();
                
                if (data.status === "success" || data.success) {
                  const slipData = data.data || data;
                  const amount = parseFloat(slipData.amountInSlip || slipData.amount || data.amount) || 0;
                  
                  const configData = await getSystemConfig();
                  const currentRev = configData ? Number(configData.global_rev_astd || 0) : 0;
                  await supabase.from("system_config").update({ global_rev_astd: currentRev + amount }).eq("id", "main");
                  
                  const balanceField = topupTarget;
                  const userBalance = Number(liveUser[balanceField] || 0);
                  await supabase.from("users").update({ [balanceField]: userBalance + amount }).eq("username", activeUsername);
                  
                  await supabase.from("topup_history").insert([{
                    username: activeUsername,
                    amount: amount,
                    method: 'truewallet_slip',
                    ref_id: slipData.rawSlip?.transactionId || 'wallet-' + Date.now(),
                    date: new Date().toISOString()
                  }]);
                  
                  setTopupSuccessMessage(\`เติมเงินสำเร็จ \${amount.toFixed(2)} บาท\`);
                  fetchUser(activeUsername);
                  setTopupCode("");
                  setSlipFile(null);
                  setTimeout(() => {
                    setTopupSuccessMessage("");
                    setTopupModalStep("select");
                    setAppScreen("SHOP");
                  }, 2000);
                } else {
                  setTopupError(data.message || data.error?.message || "สลิปไม่ถูกต้อง หรือเช็คไม่ได้");
                }
            } catch(e) {
                setTopupError("การเชื่อมต่อมีปัญหา กรุณาลองใหม่");
            } finally {
                setIsProcessingTopup(false);
            }
          };
        } catch (error: any) {
          showToast("ระบบขัดข้อง กรุณาลองใหม่", "error");
          setIsProcessingTopup(false);
        }
      };
      processAngpaoSlip();
      return;
    }`;

content = content.replace(/if \(topupModalStep === "angpao"\) \{[\s\S]*?if \(topupModalStep === "bank"\) \{/, `${angpaoLogic}\n\n    if (topupModalStep === "bank") {`);


const bankLogic = `    if (topupModalStep === "bank") {
      if (!slipFile) {
        showToast("กรุณาแนบสลิปการโอนเงิน", "error");
        setIsProcessingTopup(false);
        return;
      }

      const processBankSlip = async () => {
        try {
          setTopupError("");
          
          const reader = new FileReader();
          reader.readAsDataURL(slipFile);
          reader.onload = async () => {
            const base64 = reader.result;
            try {
                const checkRes = await fetch("/api/topup/bank", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ base64 })
                });
                
                const data = await checkRes.json();
                
                if (data.status === "success" || data.success) {
                  const slipData = data.data || data;
                  let amount = parseFloat(slipData.amount?.amount || slipData.amount || data.amount) || 0;
                  
                  // Handle Thunder Solution specific response format
                  if (slipData.rawSlip && slipData.rawSlip.amount) {
                      amount = parseFloat(slipData.rawSlip.amount.amount || slipData.rawSlip.amount) || amount;
                  }
                  
                  const configData = await getSystemConfig();
                  const currentRev = configData ? Number(configData.global_rev_astd || 0) : 0;
                  await supabase.from("system_config").update({ global_rev_astd: currentRev + amount }).eq("id", "main");
                  
                  const balanceField = topupTarget;
                  const userBalance = Number(liveUser[balanceField] || 0);
                  await supabase.from("users").update({ [balanceField]: userBalance + amount }).eq("username", activeUsername);
                  
                  await supabase.from("topup_history").insert([{
                    username: activeUsername,
                    amount: amount,
                    method: 'bank_slip',
                    ref_id: slipData.rawSlip?.transRef || 'bank-' + Date.now(),
                    date: new Date().toISOString()
                  }]);
                  
                  setTopupSuccessMessage(\`เติมเงินสำเร็จ \${amount.toFixed(2)} บาท\`);
                  fetchUser(activeUsername);
                  setTopupCode("");
                  setSlipFile(null);
                  setTimeout(() => {
                    setTopupSuccessMessage("");
                    setTopupModalStep("select");
                    setAppScreen("SHOP");
                  }, 2000);
                } else {
                  setTopupError(data.message || data.error?.message || "ข้อมูลสลิปไม่ถูกต้อง หรือเช็คไม่ได้");
                }
            } catch(e) {
                setTopupError("การเชื่อมต่อมีปัญหา กรุณาลองใหม่");
            } finally {
                setIsProcessingTopup(false);
            }
          };
        } catch (error: any) {
          showToast("ระบบขัดข้อง กรุณาลองใหม่", "error");
          setIsProcessingTopup(false);
        }
      };
      processBankSlip();
      return;
    }`;

content = content.replace(/if \(topupModalStep === "bank"\) \{[\s\S]*?return;\n    \}/, bankLogic);

fs.writeFileSync('src/App.tsx', content);
