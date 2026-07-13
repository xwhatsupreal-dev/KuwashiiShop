const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

const regexToReplace = /window\.dispatchEvent\(new Event\("sync-update"\)\);\s*showToast\(\`ใช้คูปองสำเร็จ! ได้รับ \$\{coupon\.amount\.toLocaleString\(\)\} เครดิต\`\, "success"\); sendDiscordTopupEmbed\(activeUsername, coupon\.amount, "coupon", newBalance, true\);\s*setTopupSuccessMessage\(/;

const fixedCode = `window.dispatchEvent(new Event("sync-update"));
      showToast(isMaintenanceMode ? "เปิดร้านแล้ว!" : "ปิดร้าน (โหมดซ่อมบำรุง) แล้ว!", "success");
    }
  };

  const showToast = (
    text: string,
    type: "success" | "info" | "error" = "success",
  ) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [{ id, text, type }, ...prev].slice(0, 3));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleTopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tosAccepted) {
      showToast("กรุณายอมรับข้อกำหนดในการให้บริการก่อนดำเนินการต่อ", "error");
      return;
    }
    if (topupModalStep === "coupon" && !topupCode.trim()) {
      showToast("กรุณากรอกข้อมูลเพื่อเติมเงิน", "error");
      return;
    }
    if ((topupModalStep === "bank" || topupModalStep === "angpao") && !slipFile) {
      showToast("กรุณาอัปโหลดรูปภาพสลิปโอนเงิน", "error");
      return;
    }

    if (!currentUser?.username) {
      showToast("กรุณาเข้าสู่ระบบก่อน", "error");
      return;
    }

    setIsProcessingTopup(true);

    const activeUsername = currentUser.username.trim();
    const handleTopupError = (errMessage: string, channel: string) => {
      showToast(errMessage, "error");
      sendDiscordTopupEmbed(activeUsername, 0, channel, 0, false, errMessage);
      setIsProcessingTopup(false);
    };

    const liveUser = await fetchUser(activeUsername);
    if (!liveUser) {
      showToast("เกิดข้อผิดพลาดในการโหลดข้อมูลลูกค้า โปรดลองอีกครั้ง", "error");
      setIsProcessingTopup(false);
      return;
    }

    if (topupModalStep === "coupon") {
      const { data: couponData, error: couponError } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", topupCode.trim())
        .maybeSingle();

      if (!couponData) {
        showToast("โค้ดไม่ถูกต้องหรือไม่มีในระบบ", "error");
        setIsProcessingTopup(false);
        return;
      }

      let coupon = {
        ...couponData,
        usedBy: typeof couponData.usedBy === 'string' ? JSON.parse(couponData.usedBy || '[]') : (couponData.usedBy || []),
      };

      if (coupon) {
        if (coupon.usedBy && coupon.usedBy.includes(activeUsername)) {
          showToast("คุณได้ใช้งานโค้ดนี้ไปแล้ว", "error");
          setIsProcessingTopup(false);
          return;
        }

        const balanceField = topupTarget;
        const newBalance = Number(liveUser[balanceField] || 0) + coupon.amount;
        
        await supabase
          .from("profiles")
          .update({ [balanceField]: newBalance })
          .eq("username", activeUsername);

        const { error: topupError } = await supabase.from("topups").insert([
          {
            username: activeUsername,
            amount: coupon.amount,
            method: \`Coupon: \${coupon.code}\`,
          },
        ]);

        if (topupError) {
          await supabase.from("topups").insert([
            {
              username: activeUsername,
              amount: coupon.amount,
              method: \`Coupon: \${coupon.code}\`,
            },
          ]);
        }
        
        await supabase
          .from("coupons")
          .update({
             usedBy: JSON.stringify([...coupon.usedBy, activeUsername])
          })
          .eq("id", coupon.id);
          
        window.dispatchEvent(new Event("sync-update"));
        showToast(\`ใช้คูปองสำเร็จ! ได้รับ \${coupon.amount.toLocaleString()} เครดิต\`, "success"); 
        sendDiscordTopupEmbed(activeUsername, coupon.amount, "coupon", newBalance, true);
        setTopupSuccessMessage(`;

if (regexToReplace.test(app)) {
  app = app.replace(regexToReplace, fixedCode);
  fs.writeFileSync('src/App.tsx', app);
  console.log("Recovery successful.");
} else {
  console.log("Regex did not match.");
}
