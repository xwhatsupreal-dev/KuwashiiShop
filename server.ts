import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import nodemailer from "nodemailer";

dotenv.config({ override: true });

const app = express();
app.set("trust proxy", true);
const PORT = 3000;

// Fast Vercel Body hack - if req.body is already an object, prevent body-parser from wiping it
app.use((req: any, _res, next) => {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body) && Object.keys(req.body).length > 0) {
    req._body = true; 
  }
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


const APP_VERSION = process.env.K_REVISION || (() => {
  try {
    const stats = fs.statSync(path.join(process.cwd(), "dist", "index.html"));
    return stats.mtimeMs.toString();
  } catch (e) {
    try {
      const stats = fs.statSync(__filename);
      return stats.mtimeMs.toString();
    } catch (e2) {
      return "1.0.0";
    }
  }
})();

app.get("/api/version", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.json({ version: APP_VERSION });
});

// --- Seed Data representing Premium Items from AOT Revolution ---
const SEED_ITEMS = [
  {
    id: "yeager_bloodline",
    name: "Yeager Bloodline (สายเลือดเยเกอร์)",
    category: "Bloodline",
    rarity: "Mythic",
    quantity: 3,
    initialQuantity: 5,
    price: 15000,
    description: "สายเลือดผู้สืบทอดพลังไททันจู่โจมและไททันบรรพบุรุษ มอบความแข็งแกร่งสูงสุด ความเร็วการเคลื่อนที่เร่งโมเมนตัม และสกิลกู้ชีพฟื้นฟูบาดแผลตัวเองอัตโนมัติเมื่อหัวใจวาย!",
    isPinned: true,
    isPopular: true,
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80",
    updatedAt: new Date().toISOString()
  },
  {
    id: "ackerman_bloodline",
    name: "Ackerman Bloodline (สายเลือดอัคเคอร์แมน)",
    category: "Bloodline",
    rarity: "Mythic",
    quantity: 5,
    initialQuantity: 10,
    price: 12500,
    description: "สายเลือดสุดยอดมนุษย์ดัดแปลง เพิกเฉยสถานะควบคุม หลบการโจมตีกะทันหันอัตโนมัติ และสะสมแถบโมโหเพื่อเปิดขีดจำกัดความเร็วเดธสปินสับคอพายุน้ำแข็ง!",
    isPinned: true,
    isPopular: true,
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    updatedAt: new Date().toISOString()
  },
  {
    id: "reiss_bloodline",
    name: "Reiss Bloodline (สายเลือดไรส์)",
    category: "Bloodline",
    rarity: "Legendary",
    quantity: 8,
    initialQuantity: 15,
    price: 6500,
    description: "สายเลือดแห่งราชวงศ์ที่แท้จริง บลูแปรพลังงานช่วยปลดล็อคโหมดไททันไร้ขีดจำกัด เพิ่มโบนัสทองที่ได้จากการเคลียร์ด่านเพิ่มขึ้นทันที 30% ให้กับทุกคนในตี้!",
    isPinned: false,
    isPopular: false,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    updatedAt: new Date().toISOString()
  },
  {
    id: "attack_serum",
    name: "Attack Titan Serum (เซรั่มไททันจู่โจม)",
    category: "Serum",
    rarity: "Legendary",
    quantity: 12,
    initialQuantity: 20,
    price: 4500,
    description: "เซรั่มชีวภาพสำหรับปลดพลังไททันจู่โจม มอบพลังโกรธทลายเกราะ ร้องขู่คำรามเพิ่มพลังโจมตีประชิด เหมาะสำหรับเร่งดาเมจฟาร์มบอสและการถล่มเขตป้อมค่าย!",
    isPinned: false,
    isPopular: true,
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80",
    updatedAt: new Date().toISOString()
  },
  {
    id: "armored_serum",
    name: "Armored Titan Serum (เซรั่มไททันเกราะ)",
    category: "Serum",
    rarity: "Legendary",
    quantity: 6,
    initialQuantity: 12,
    price: 5200,
    description: "เซรั่มเปลี่ยนรูปไททันเกราะ ปรับแต่งเกล็ดหนาพิเศษทำให้ผู้ใช้ทนรับความเสียหายจากสิ่งกระตุ้นได้ถึง 90% ดันเจี้ยนหดหู่ไม่ระคายเคือง เหมาะสำหรับเล่นสายแท็กนิกพุ่งชนกวาดลาน!",
    isPinned: false,
    isPopular: false,
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80",
    updatedAt: new Date().toISOString()
  },
  {
    id: "colossal_serum",
    name: "Colossal Titan Serum (เซรั่มไททันมหึมา)",
    category: "Serum",
    rarity: "Legendary",
    quantity: 4,
    initialQuantity: 6,
    price: 8000,
    description: "เซรั่มกลั่นบริสุทธิ์สูงระดับสูงเพื่อแปรรูปเป็นไททันยักษ์ขนาดใหญ่ ป้อนคลื่นช็อกระเบิดความร้อนมหาศาลเพื่อทำลายล้างผู้สั่นสะเทือนทางอากาศทั้งหมดในจังหวะแปลงพลังงาน!",
    isPinned: false,
    isPopular: true,
    imageUrl: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&q=80",
    updatedAt: new Date().toISOString()
  },
  {
    id: "dual_blade_carbon_core",
    name: "Dual Blade Carbon Core (สกินดาบคาร์บอนแดงดำ)",
    category: "Skin",
    rarity: "Legendary",
    quantity: 15,
    initialQuantity: 25,
    price: 2500,
    description: "สกินยอดพรีเมียมจากคลังร้าน มีประกายความร้อนไฟสีแดงระเบิดสไลด์ทุกครั้งที่ฟันคอไททันเป็นรอยแผล ผลิตจากเหล็กอบความดันคาร์บอนสูงสุด ไม่เปราะ หักยากที่สุด!",
    isPinned: false,
    isPopular: false,
    imageUrl: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=400&q=85",
    updatedAt: new Date().toISOString()
  },
  {
    id: "odg_neo_steampunk",
    name: "ODG - Neo Steampunk (ตัวแก๊สเหล็กทองไอน้ำ)",
    category: "Skin",
    rarity: "Epic",
    quantity: 22,
    initialQuantity: 30,
    price: 1800,
    description: "สกินตัวถังเติมแก๊ส ODM Gear ดีไซน์แนวศตวรรษอุตสาหกรรมย้อนยุค สปินด้วยท่อไอน้ำสีทองวาววับและมลทินกลุ่มควันพ่นทองเหลืองแผ่ซ่านสุดวินเทจโดดเด่นสะทุดตากลางอากาศ!",
    isPinned: false,
    isPopular: false,
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=80",
    updatedAt: new Date().toISOString()
  },
  {
    id: "titan_heart",
    name: "Titan Heart Core (แกนหัวใจไททันแท้)",
    category: "Artifact",
    rarity: "Mythic",
    quantity: 2,
    initialQuantity: 5,
    price: 18000,
    description: "หัวใจโบราณขนาดเล็กที่ยังขยับเต้น มีพลังพิเศษช่วยลดการใช้ค่าแก๊ซ ODM Gear ลง 20% และแร่งอัตราการคืนค่าสปินความเร็วเหนือมนุษย์ในพริบตาเดียว ดรอปยากแรร์สุดขีด!",
    isPinned: false,
    isPopular: true,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    updatedAt: new Date().toISOString()
  },
  {
    id: "ancient_scroll",
    name: "Ancient Rune Scroll (คัมภีร์อักษรรูนสว่าง)",
    category: "Scroll/Key",
    rarity: "Legendary",
    quantity: 14,
    initialQuantity: 20,
    price: 3500,
    description: "ม้วนหนังสือสลักอักษรแสงสีรุ้งโบราณ ใช้ในเมนูการอัปเกรดความลึกลับเพื่อปลดขีดจำกัดเพิร์คสล๊อตด่านหลัก ช่วยเพิ่มค่าพลังกายสูงสุดและอัตราคิติคอล 7% ติดถาวร!",
    isPinned: false,
    isPopular: false,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    updatedAt: new Date().toISOString()
  },
  {
    id: "raid_key_shiganshina",
    name: "Shiganshina Raid Key (คีย์ลับเรดชิกันชิน่า)",
    category: "Scroll/Key",
    rarity: "Rare",
    quantity: 50,
    initialQuantity: 100,
    price: 500,
    description: "กุญแจทองคำใช้สำหรับไขประตูลับด่านเข้าศึกชิงเขตชิกันชิน่า (Raid Battle) ร่วมมือกับผู้เล่นอื่นเพื่อล่าอาวุธระดับตำนาน คุมคลัง และเก็บเหรียญดวงดาวทองคำ!",
    isPinned: false,
    isPopular: false,
    imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&q=80",
    updatedAt: new Date().toISOString()
  },
  {
    id: "relentless_fury",
    name: "Relentless Fury Perk (ขวดเพิร์กเดือดดาลต่อเนื่อง)",
    category: "Perk",
    rarity: "Legendary",
    quantity: 30,
    initialQuantity: 50,
    price: 1200,
    description: "น้ำยาเร่งประสาทสัมผัสเดือดดาล เมื่อเปิดใช้งานจะทำให้เพิร์กดาเมจเพิ่ิมระดับดาเมจไฟ 5% ต่อทุกๆ ฮิตที่ฟันสำเร็จ สะสมพายุคอมโบได้สูงสุด 10 ขั้นอย่างไม่จำกัดพลัง!",
    isPinned: false,
    isPopular: false,
    imageUrl: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=400&q=80",
    updatedAt: new Date().toISOString()
  }
];

// Helpers for encoding/decoding extra properties within description to bypass schema restrictions without altering Supabase table
function packExtraData(item: any): any {
  const packed = { ...item };
  const extra: any = {};
  
  if (packed.gachaPool !== undefined) { extra.gachaPool = packed.gachaPool; delete packed.gachaPool; }
  if (packed.game !== undefined) { extra.game = packed.game; delete packed.game; }
  if (packed.accountCredentials !== undefined) { extra.accountCredentials = packed.accountCredentials; delete packed.accountCredentials; }
  
  // Clean up any old markers
  if (packed.description) {
    packed.description = packed.description.replace(/<!--gachaPool:.*?-->/g, '').replace(/<!--extraData:.*?-->/g, '');
  }

  if (Object.keys(extra).length > 0) {
    packed.description = `${packed.description || ''}<!--extraData:${JSON.stringify(extra)}-->`;
  }
  
  return packed;
}

function unpackExtraData(item: any): any {
  if (!item.description) return item;
  
  const unpacked = { ...item };
  
  const oldMatch = unpacked.description.match(/<!--gachaPool:(.*?)-->/);
  if (oldMatch) {
    try {
      unpacked.gachaPool = JSON.parse(oldMatch[1]);
      unpacked.description = unpacked.description.replace(oldMatch[0], '');
    } catch { }
  }

  const match = unpacked.description.match(/<!--extraData:(.*?)-->/);
  if (match) {
    try {
      const extra = JSON.parse(match[1]);
      Object.assign(unpacked, extra);
      unpacked.description = unpacked.description.replace(match[0], '');
    } catch { }
  }
  
  return unpacked;
}

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not defined in the settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// AI Assistant Chat API
app.post("/api/chat", async (req: express.Request, res: express.Response) => {
  try {
    const { message, history, items, sharedItem, imageBase64 } = req.body;

    if (!message && !imageBase64) {
       res.status(400).json({ error: "Message or image is required" });
       return;
    }

    const ai = getGeminiClient();

    // Context formatting
    const formattedItems = (items || [])
      .map(
        (item: any) =>
          `- ID: ${item.id}\n  ชื่อ: ${item.name}\n  หมวดหมู่: ${item.category}\n  คงเหลือ: ${item.quantity} ชิ้น\n  ราคา: ฿${item.price.toLocaleString()}\n  คำอธิบาย: ${item.description || "ไม่มี"}\n  ยอดนิยม: ${item.isPopular ? "ใช่" : "ไม่ใช่"}`
      )
      .join("\n\n");

    let systemInstruction = `คุณคือ "Kuwashii AI Shop Assistant" ผู้ช่วยคอยให้คำแนะนำเกี่ยวกับไอเทมเกมในร้าน Kuwashii
คุณมีหน้ารายละเอียดคลังสินค้าทั้งหมดของทางร้านเพื่อให้ข้อมูลที่ถูกต้องแม่นยำ

กฎและวิธีตอบคำตอบของคุณ:
1. ตอบคำถามให้สั้น กระชับ แม่นยำ และเข้าใจง่าย ไม่ต้องตอบยาวเกินความจำเป็น
2. อ้างอิงราคา จำนวน หรือรายละเอียดสินค้าจากคลังสินค้าด้านล่างเสมอ ห้ามเดาหรือหลอนข้อมูลขึ้นมาเอง
3. หากมีรูปภาพแนบมาด้วย ให้วิเคราะห์ภาพและตอบคำถามอย่างสอดคล้องกัน
4. ห้ามเปิดเผยรหัสสินค้าหรือข้อมูลที่ซ่อนอยู่หลังบ้านเด็ดขาด

--- ข้อมูลสินค้าทั้งหมดในคลังร้านปัจจุบัน: ---
${formattedItems || "ขณะนี้ไม่มีข้อมูลสินค้าในระบบคลัง"}
`;

    if (sharedItem) {
      systemInstruction += `\n\n--- พิเศษ: ลูกค้าได้กด "แชร์สินค้าเฉพาะตัว" นี้เข้ามาเพื่อให้คุณดูโดยตรง: ---
ชื่อสินค้า: ${sharedItem.name}
หมวดหมู่: ${sharedItem.category}
ราคาในคลัง: ฿${sharedItem.price.toLocaleString()}
จำนวนคงเหลือ: ${sharedItem.quantity} ชิ้น
คำอธิบายสินค้า: ${sharedItem.description || "ไม่มี"}`;
    }

    const formattedHistory = (history || []).map((h: any) => {
      return {
        role: h.role === "user" ? "user" : "model",
        parts: h.parts.map((p: any) => {
          if (p.inlineData) {
            const rawData = p.inlineData.data;
            if (typeof rawData === 'string' && rawData.startsWith('data:')) {
              const mimeMatch = rawData.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
              const mType = mimeMatch ? mimeMatch[1] : "image/jpeg";
              const b64Data = rawData.split(',')[1] || rawData;
              return {
                inlineData: {
                  data: b64Data,
                  mimeType: mType
                }
              };
            }
            return p;
          }
          return { text: p.text || "" };
        })
      };
    });

    const activeChat = ai.chats.create({
      model: "gemini-3.5-flash",
      history: formattedHistory,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    let messagePayload: any = message;
    if (imageBase64) {
      // imageBase64 should be like "data:image/jpeg;base64,....."
      const mimeTypeMatch = imageBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : "image/jpeg";
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      
      messagePayload = [];
      if (message) messagePayload.push({ text: message });
      messagePayload.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      });
    }

    const response = await activeChat.sendMessage({ message: messagePayload });
    const answer = response.text || "ขออภัยด้วยครับ มีปัญหาระบบอัจฉริยะขัดข้อง กรุณาลองถามใหม่อีกครั้ง";

    res.json({ answer });
  } catch (err: any) {
    console.error("Gemini API error in express:", err);
    res.status(500).json({ error: err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อระบบอัจฉริยะ" });
  }
});


app.get("/api/admin/check-api-status", async (req, res) => {
  try {
    const results = { angpao: 'offline', checkslip: 'offline' };
    
    
        // Check Thunder API
    try {
        const response = await fetch('https://api.thunder.in.th/v2/info', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.THUNDER_API_KEY}`
            }
        });
        if (response.ok) {
            results.angpao = 'online';
            results.checkslip = 'online';
        } else {
            results.angpao = 'offline';
            results.checkslip = 'offline';
        }
    } catch(e) {
        results.angpao = 'offline';
        results.checkslip = 'offline';
    }

    
    res.json(results);
  } catch(e) {
    res.status(500).json({ error: 'Failed to check status' });
  }
});


// True Wallet Topup Proxy
app.post("/api/topup/true-wallet", async (req: express.Request, res: express.Response) => {
  try {
    const { base64 } = req.body;
    
    const response = await fetch('https://api.thunder.in.th/v2/verify/truewallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.THUNDER_API_KEY}`
      },
      body: JSON.stringify({ base64, matchAccount: true, checkDuplicate: true })
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Wallet Check API Error:', error);
    res.status(500).json({ status: "error", message: "API Error" });
  }
});

// Bank Slip Proxy
app.post("/api/topup/bank", async (req: express.Request, res: express.Response) => {
  try {
    const { base64, qrcode_text } = req.body;
    
    let payload: any = { matchAccount: true, checkDuplicate: true };
    if (base64) {
        payload.base64 = base64;
    } else if (qrcode_text) {
        payload.payload = qrcode_text;
    }
    
    const response = await fetch('https://api.thunder.in.th/v2/verify/bank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.THUNDER_API_KEY}`
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Bank Check API Error:', error);
    res.status(500).json({ status: "error", message: "API Error" });
  }
});
app.get("/api/check-register-lock", (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown') as string;
  const clientIp = ip.split(',')[0].trim();
  const lockTime = ipLocks.get(clientIp);
  
  if (lockTime && Date.now() < lockTime) {
    const remainingMinutes = Math.ceil((lockTime - Date.now()) / 60000);
    res.json({ locked: true, remaining: remainingMinutes });
  } else {
    res.json({ locked: false });
  }
});

app.post("/api/set-register-lock", (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown') as string;
  const clientIp = ip.split(',')[0].trim();
  
  // Lock for 60 minutes
  ipLocks.set(clientIp, Date.now() + 60 * 60 * 1000);
  
  // Cleanup old locks roughly
  if (ipLocks.size > 1000) {
    const now = Date.now();
    for (const [key, time] of ipLocks.entries()) {
      if (now > time) ipLocks.delete(key);
    }
  }
  
  res.json({ success: true });
});

app.post("/api/send-otp", async (req: express.Request, res: express.Response) => {
  try {
    const { toEmail, otp, type, subject: customSubject } = req.body;
    
    if (!toEmail || !otp) {
       res.status(400).json({ error: "Email and OTP are required" });
       return;
    }
    
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      // If environment variables are missing, simulate success for development
      console.warn("SMTP credentials not set. Simulating OTP email send to " + toEmail);
      res.json({ success: true, simulated: true });
      return;
    }

    if (process.env.SMTP_USER === 'your_email@gmail.com' || process.env.SMTP_PASS === 'your_app_password') {
       res.status(500).json({ error: "โปรดตั้งค่า SMTP_USER และ SMTP_PASS ด้วยอีเมลและ 'App Password' ของจริง (ไม่ใช่รหัสของคุณ) ในเมนูตั้งค่า" });
       return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "465", 10),
      secure: parseInt(process.env.SMTP_PORT || "465", 10) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fromName = process.env.SMTP_FROM_NAME || "Kuwashii Shop";
    const mailSubject = customSubject || (type === 'verify_email' ? "รหัส OTP สำหรับยืนยันอีเมล Kuwashii Shop" : "รหัส OTP สำหรับรีเซ็ตรหัสผ่าน Kuwashii Shop");
    const mailTitle = type === 'verify_email' ? "คุณได้ทำการขอยืนยันอีเมลสำหรับบัญชีของคุณ" : "คุณได้ทำการขอรีเซ็ตรหัสผ่าน";
    
    const mailOptions = {
      from: `"${fromName}" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: mailSubject,
      text: `รหัส OTP ของคุณคือ: ${otp}\nรหัสนี้จะหมดอายุใน 15 นาที`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #333;">Kuwashii Shop</h2>
          <p>${mailTitle}</p>
          <p>รหัส OTP ของคุณคือ: <strong style="font-size: 24px; color: #4f46e5;">${otp}</strong></p>
          <p style="color: #666; font-size: 14px;">รหัสนี้จะหมดอายุใน 15 นาที</p>
          <br>
          <p style="color: #999; font-size: 12px;">หากคุณไม่ได้ทำรายการนี้ กรุณาเพิกเฉยต่ออีเมลฉบับนี้</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err: any) {
    console.error("Error sending OTP email:", err);
    if (err.message && err.message.includes('535') && err.message.includes('Username and Password not accepted')) {
       res.status(500).json({ error: "เข้าสู่ระบบอีเมลไม่สำเร็จ คุณต้องใช้ Gmail 'App Password' (รหัสผ่านแอป 16 หลัก) ไม่ใช่รหัสผ่านอีเมลปกติ" });
    } else {
       res.status(500).json({ error: "เกิดข้อผิดพลาดในการส่งอีเมล: " + err.message });
    }
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/d1/init", async (req: express.Request, res: express.Response) => {
  console.log("HIT /api/d1/init endpoint!");
  try {
    const rawAccountId = process.env.CF_ACCOUNT_ID || process.env.VITE_CF_ACCOUNT_ID;
    const accountId = rawAccountId?.trim();
    let dbIdRaw = process.env.CF_DATABASE_ID || process.env.VITE_CF_DATABASE_ID;
    dbIdRaw = dbIdRaw?.trim();
    let dbId = dbIdRaw;
    if (dbIdRaw && dbIdRaw.includes("dash.cloudflare.com")) {
      const match = dbIdRaw.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
      if (match) dbId = match[0];
    }
    let token = process.env.CF_API_TOKEN || process.env.VITE_CF_API_TOKEN;
    token = token?.trim();
    if (token?.startsWith('Bearer ')) token = token.substring(7).trim();

    if (!accountId || !dbId || !token) {
      return res.status(400).json({ error: "Cloudflare D1 credentials not configured.", envCheck: { accountId: !!accountId, dbId: !!dbId, token: !!token } });
    }

    // UUID validation for Cloudflare D1
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(dbId)) {
       return res.status(400).json({ error: "Invalid CF_DATABASE_ID format. It must be a UUID.", dbId_provided: dbId });
    }

    const schemaStr = `
      CREATE TABLE IF NOT EXISTS profiles (
        username TEXT PRIMARY KEY,
        password TEXT NOT NULL,
        balance INTEGER DEFAULT 0,
        balance_rov INTEGER DEFAULT 0,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        email TEXT,
        avatar_url TEXT,
        discord_id TEXT
      );
      CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        type TEXT,
        username TEXT,
        item_name TEXT,
        quantity INTEGER,
        price INTEGER,
        remaining_stock INTEGER,
        game TEXT,
        gacha_drops TEXT
      );
      CREATE TABLE IF NOT EXISTS purchases (
        id TEXT PRIMARY KEY,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        username TEXT,
        item_name TEXT,
        quantity INTEGER,
        price INTEGER,
        game TEXT
      );
      CREATE TABLE IF NOT EXISTS topups (
        id TEXT PRIMARY KEY,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        username TEXT,
        amount INTEGER,
        method TEXT,
        status TEXT
      );
      CREATE TABLE IF NOT EXISTS coupons (
        code TEXT PRIMARY KEY,
        amount INTEGER,
        maxUses INTEGER,
        usedBy TEXT,
        expiresAt TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT,
        rarity TEXT,
        quantity INTEGER DEFAULT 0,
        initial_quantity INTEGER DEFAULT 0,
        price INTEGER DEFAULT 0,
        description TEXT,
        is_pinned BOOLEAN DEFAULT FALSE,
        popular BOOLEAN DEFAULT FALSE,
        image TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        gacha_pool TEXT,
        credentials TEXT,
        game TEXT DEFAULT 'ASTD',
        sale_format TEXT DEFAULT 'DIRECT'
      );
      CREATE TABLE IF NOT EXISTS system_config (
        id TEXT PRIMARY KEY,
        global_sales_astd INTEGER DEFAULT 0,
        global_sales_rov INTEGER DEFAULT 0,
        global_rev_astd INTEGER DEFAULT 0,
        global_rev_rov INTEGER DEFAULT 0,
        global_free_astd INTEGER DEFAULT 0,
        global_free_rov INTEGER DEFAULT 0,
        global_revenue_aotr INTEGER DEFAULT 0,
        global_free_aotr INTEGER DEFAULT 0,
        shop_status TEXT DEFAULT 'open',
        ai_status TEXT DEFAULT 'online',
        maintenance_mode BOOLEAN DEFAULT 0,
        announcement_settings TEXT,
        last_cleanup_timestamp DATETIME
      );
      INSERT OR IGNORE INTO system_config (id) VALUES ('main');
      INSERT OR IGNORE INTO profiles (username, password, is_admin) VALUES ('Kuwashii_admin', 'S4e0P9', 1);
    `;

    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sql: schemaStr })
    });

    // Run silent migrations to add new columns if they don't exist
    const migrationSql = `
      ALTER TABLE system_config ADD COLUMN global_sales_aotr INTEGER DEFAULT 0;
      ALTER TABLE system_config ADD COLUMN all_time_sales_count INTEGER DEFAULT 0;
    `;
    await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sql: "ALTER TABLE system_config ADD COLUMN global_sales_aotr INTEGER DEFAULT 0;" })
    }).catch(() => {});
    
    await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sql: "ALTER TABLE system_config ADD COLUMN all_time_sales_count INTEGER DEFAULT 0;" })
    }).catch(() => {});

    await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sql: "ALTER TABLE profiles ADD COLUMN member_id TEXT;" })
    }).catch(() => {});
    
    // Assign random 6 digit ID to existing users
    await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sql: "UPDATE profiles SET member_id = CAST(ABS(RANDOM()) % 900000 + 100000 AS TEXT) WHERE member_id IS NULL;" })
    }).catch(() => {});


    const data = await response.json();
    if (!data.success) {
       console.error("Init Error:", data.errors, { accountId, dbId, tokenLen: token?.length });
       if (data.errors && data.errors.some((e: any) => e.code === 10000)) {
         return res.status(401).json({ error: [{ message: "Cloudflare D1 Authentication Error: Invalid CF_API_TOKEN. Please check your API token in AI Studio settings." }] });
       }
       return res.status(400).json({ error: data.errors });
    }

    res.json({ success: true, message: "D1 Initialized" });
  } catch (err: any) {
    console.error("Init Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/d1", async (req: express.Request, res: express.Response) => {
  try {
    const { sql, params } = req.body;
    const rawAccountId = process.env.CF_ACCOUNT_ID || process.env.VITE_CF_ACCOUNT_ID;
    const accountId = rawAccountId?.trim();
    let dbIdRaw = process.env.CF_DATABASE_ID || process.env.VITE_CF_DATABASE_ID;
    dbIdRaw = dbIdRaw?.trim();
    let dbId = dbIdRaw;
    if (dbIdRaw && dbIdRaw.includes("dash.cloudflare.com")) {
      const match = dbIdRaw.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
      if (match) dbId = match[0];
    }
    let token = process.env.CF_API_TOKEN || process.env.VITE_CF_API_TOKEN;
    token = token?.trim();
    if (token?.startsWith('Bearer ')) token = token.substring(7).trim();

    if (!accountId || !dbId || !token) {
      console.warn("D1 Query Failed: Missing CF credentials", { accountId: !!accountId, dbId: !!dbId, token: !!token });
      return res.status(400).json({ error: "Cloudflare D1 credentials not configured.", envCheck: { accountId: !!accountId, dbId: !!dbId, token: !!token } });
    }

    // UUID validation for Cloudflare D1
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(dbId)) {
       return res.status(400).json({ error: "Invalid CF_DATABASE_ID format. It must be a UUID (e.g. 12345678-abcd-1234-abcd-1234567890ab), not the database name.", dbId_provided: dbId });
    }

    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sql, params: params || [] })
    });

    const data = await response.json();
    if (!data.success) {
      if (data.errors && data.errors.some((e: any) => e.code === 10000)) {
         return res.status(401).json({ error: [{ message: "Cloudflare D1 Authentication Error: Invalid CF_API_TOKEN. Please check your API token in AI Studio settings." }] });
      }
      console.error("D1 Error response:", data.errors, "AccountID matched:", accountId === rawAccountId?.trim(), "DB_ID_LEN:", dbId?.length);
      return res.status(400).json({ error: data.errors });
    }
    
    // Convert D1 format to Supabase-like format { data: [...] }
    const resultArr = data.result && data.result[0] ? data.result[0].results : [];
    res.json({ data: resultArr });
  } catch (err: any) {
    console.error("D1 Proxy Error:", err);
    res.status(500).json({ error: err.message });
  }
});

let lastCheckedCleanStorage = 0;

async function runCleanStorage(force = false) {
  try {
    const rawAccountId = process.env.CF_ACCOUNT_ID || process.env.VITE_CF_ACCOUNT_ID;
    const accountId = rawAccountId?.trim();
    let dbIdRaw = process.env.CF_DATABASE_ID || process.env.VITE_CF_DATABASE_ID;
    dbIdRaw = dbIdRaw?.trim();
    let dbId = dbIdRaw;
    if (dbIdRaw && dbIdRaw.includes("dash.cloudflare.com")) {
      const match = dbIdRaw.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
      if (match) dbId = match[0];
    }
    const rawToken = process.env.CF_API_TOKEN || process.env.VITE_CF_API_TOKEN;
    let token = rawToken?.trim();
    if (token?.startsWith('Bearer ')) token = token.substring(7).trim();

    

    const fetchQuery = async (query: string, params: any[]) => {
      const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sql: query, params: params || [] })
      });
      return await response.json();
    };

    const now = Date.now();
    // Guard: Only check the DB at most once every 30 minutes per server instance
    if (!force && now - lastCheckedCleanStorage < 30 * 60 * 1000) {
      return;
    }
    lastCheckedCleanStorage = now;

    // Check DB for last cleanup
    // Use try-catch in case column doesn't exist yet
    let lastCleanupTimestamp = 0;
    try {
       const configRes = await fetchQuery("SELECT last_cleanup_timestamp FROM system_config WHERE id = 'main'", []);
       if (configRes?.result?.[0]?.results?.[0]?.last_cleanup_timestamp) {
         lastCleanupTimestamp = new Date(configRes.result[0].results[0].last_cleanup_timestamp).getTime();
       }
    } catch (_) { }

    // If less than 24 hours ago and not forced, abort
    if (!force && now - lastCleanupTimestamp < 24 * 60 * 60 * 1000) {
      return; // Already cleaned recently
    }

    // Clean up older items logic removed to preserve history.
    
    // Delete items with missing/invalid game
    await fetchQuery("DELETE FROM items WHERE game IS NULL OR game = '' OR game NOT IN ('AOTR', 'ASTD', 'ROV')", []);

    // Update timestamp in DB
    const currentISO = new Date(now).toISOString();
    await fetchQuery("UPDATE system_config SET last_cleanup_timestamp = ? WHERE id = 'main'", [currentISO]);

    console.log("Clean storage completed successfully (from auto worker/db timecheck)");
  } catch (err: any) {
    if (force) console.error("Automatic Clean Storage Error:", err);
  }
}

// Background hook on all API requests (lazy run, doesn't block request)
app.use((req, res, next) => {
  if (req.method === 'GET' && req.path.startsWith('/api/')) {
    runCleanStorage(false).catch(() => {});
  }
  next();
});

app.post("/api/admin/clean_storage", async (req: express.Request, res: express.Response) => {
  try {
    await runCleanStorage(true);
    res.json({ success: true });
  } catch (err: any) {
    console.error("Clean Storage Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/discord/login', (req, res) => {
  const host = req.headers['x-forwarded-host'] || req.get('host');
  const resolvedHost = (host && host.includes('vercel.app')) ? host : 'kuwashii-shopv1.vercel.app';
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const redirectUri = process.env.DISCORD_REDIRECT_URI || process.env.VITE_DISCORD_REDIRECT_URI || `https://${resolvedHost}/api/auth/discord/callback`;
  console.log("Discord OAuth Redirect URI:", redirectUri);

  const clientId = process.env.DISCORD_CLIENT_ID || process.env.VITE_DISCORD_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send("DISCORD_CLIENT_ID not configured in Settings -> Secrets.");
  }

  const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20email`;
  res.redirect(oauthUrl);
});

app.get('/api/auth/discord/url', (req, res) => {
  const host = req.headers['x-forwarded-host'] || req.get('host');
  const resolvedHost = (host && host.includes('vercel.app')) ? host : 'kuwashii-shopv1.vercel.app';
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const redirectUri = process.env.DISCORD_REDIRECT_URI || process.env.VITE_DISCORD_REDIRECT_URI || `https://${resolvedHost}/api/auth/discord/callback`;

  const clientId = process.env.DISCORD_CLIENT_ID || process.env.VITE_DISCORD_CLIENT_ID;
  if (!clientId) {
    return res.status(500).json({ error: "DISCORD_CLIENT_ID not configured in Settings -> Secrets." });
  }

  const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20email`;
  res.json({ url: oauthUrl });
});

app.get('/api/auth/discord/callback', async (req, res) => {
  const code = req.query.code as string;
  if (!code) return res.send("No code provided.");

  const host = req.headers['x-forwarded-host'] || req.get('host');
  const resolvedHost = (host && host.includes('vercel.app')) ? host : 'kuwashii-shopv1.vercel.app';
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const redirectUri = process.env.DISCORD_REDIRECT_URI || process.env.VITE_DISCORD_REDIRECT_URI || `https://${resolvedHost}/api/auth/discord/callback`;

  const clientId = process.env.DISCORD_CLIENT_ID || process.env.VITE_DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET || process.env.VITE_DISCORD_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) return res.status(500).send("Discord credentials not configured.");
  
  const rawAccountId = process.env.CF_ACCOUNT_ID || process.env.VITE_CF_ACCOUNT_ID;
  const accountId = rawAccountId?.trim();
  let dbIdRaw = process.env.CF_DATABASE_ID || process.env.VITE_CF_DATABASE_ID;
  let dbId = dbIdRaw?.trim();
  if (dbId && dbId.includes("dash.cloudflare.com")) {
    const match = dbId.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
    if (match) dbId = match[0];
  }
  const rawToken = process.env.CF_API_TOKEN || process.env.VITE_CF_API_TOKEN;
  let token = rawToken?.trim();
  if (token?.startsWith('Bearer ')) token = token.substring(7).trim();

  try {
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
      }).toString()
    });
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) return res.send(`Token Error: ${JSON.stringify(tokenData)}`);

    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const userData = await userRes.json();
    if (!userRes.ok) return res.send(`User Error: ${JSON.stringify(userData)}`);

    const avatarUrl = userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : '';
    const email = userData.email || '';
    let username = userData.username || `Discord_${userData.id}`;
    const discordId = userData.id;

    if (accountId && dbId && token) {
      // Upsert into D1 using standard REST
      const fetchQuery = async (query: string, params: any[]) => {
        return fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ sql: query, params })
        }).then(r => r.json());
      };

      // Check if user exists by Discord ID first
      const byDiscordId = await fetchQuery("SELECT username, discord_id FROM profiles WHERE discord_id = ? LIMIT 1", [discordId]);
      
      if (byDiscordId.result && byDiscordId.result[0] && byDiscordId.result[0].results.length > 0) {
        // User already exists via Discord ID
        const targetUsername = byDiscordId.result[0].results[0].username;
        username = targetUsername; // Keep original username
        await fetchQuery("UPDATE profiles SET email = ?, avatar_url = ? WHERE username = ?", [email, avatarUrl, username]);
      } else {
        // User not found by Discord ID. Check if username is already taken
        const byUsername = await fetchQuery("SELECT username FROM profiles WHERE username = ? LIMIT 1", [username]);
        if (byUsername.result && byUsername.result[0] && byUsername.result[0].results.length > 0) {
           // Username is taken by someone else! Append discord ID to make it unique.
           username = `${userData.username}_${userData.id}`;
        }
        
        // Insert user
        await fetchQuery("INSERT INTO profiles (username, password, email, avatar_url, discord_id, balance, is_admin) VALUES (?, ?, ?, ?, ?, 0, false)", 
          [username, "discord_oauth", email, avatarUrl, discordId]);
      }
    }

    const payload = JSON.stringify({
      username: username,
      email: email,
      avatar: avatarUrl
    });

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'OAUTH_AUTH_SUCCESS',
                payload: ${payload}
              }, '*');
              window.close();
            } else {
              window.location.href = 'https://${resolvedHost}/?discord_login=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&avatar=${encodeURIComponent(avatarUrl)}';
            }
          </script>
          <p>Authentication successful. If this window does not close automatically, please <a href="https://${resolvedHost}/?discord_login=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&avatar=${encodeURIComponent(avatarUrl)}">click here</a> to return to the app.</p>
        </body>
      </html>
    `);
  } catch (err) {
    res.send("Internal error: " + err);
  }
});

app.get("/api/proxy-image", async (req: express.Request, res: express.Response) => {
  try {
    const url = req.query.url as string;
    if (!url) return res.status(400).send("No url provided");
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch image");
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", response.headers.get("content-type") || "image/jpeg");
    res.send(Buffer.from(buffer));
  } catch (e: any) {
    res.status(500).send("Error proxying image");
  }
});


app.get('/download-source', (req, res) => {
  const file = path.join(process.cwd(), 'public', 'KuwashiiShop.zip');
  res.download(file);
});

// Configure Vite integration or static file serving
const setupServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vitePkg = "vite";
    const { createServer: createViteServer } = await import(vitePkg);
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
};

setupServer();

export default app;
