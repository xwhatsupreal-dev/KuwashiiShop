import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Gamepad2, ShoppingCart, CheckCircle, AlertTriangle, Send } from "lucide-react";
import { supabase } from "../supabase";

interface Pack {
  packcode: string;
  name: string;
  point: number;
  amount: string;
  discount: string;
  netpricedealer: string;
}

interface GameTopupPageProps {
  onBack: () => void;
  currentUser: any;
  showToast: (msg: string, type: "success" | "error" | "info") => void;
  fetchUser: (username: string) => Promise<any>;
}

export function GameTopupPage({ onBack, currentUser, showToast, fetchUser }: GameTopupPageProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loadingPacks, setLoadingPacks] = useState(false);
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [gameId, setGameId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const games = [
    { id: "rov", name: "ROV", color: "from-blue-600 to-indigo-600" },
    { id: "freefire", name: "Free Fire", color: "from-orange-500 to-red-600" },
    { id: "undawn", name: "Undawn", color: "from-emerald-500 to-teal-600" },
    { id: "deltaforce", name: "Delta Force : Mobile", color: "from-slate-600 to-zinc-800" },
    { id: "codm", name: "Call of Duty : Mobile", color: "from-stone-600 to-zinc-900" },
    { id: "haikyu", name: "Haikyu!! FLY HIGH", color: "from-orange-400 to-amber-600" },
    { id: "pubgm", name: "PUBG Mobile", color: "from-yellow-600 to-amber-800" },
    { id: "mlbb", name: "Mobile Legends (MLBB)", color: "from-indigo-600 to-blue-800" },
    { id: "valorant", name: "Valorant (VAL)", color: "from-red-500 to-rose-700" },
    { id: "heartopia", name: "Heartopia (เพชร)", color: "from-pink-500 to-rose-400" },
  ];

  useEffect(() => {
    if (selectedGame) {
      fetchPacks(selectedGame);
    }
  }, [selectedGame]);

  const fetchPacks = async (game: string) => {
    setLoadingPacks(true);
    setPacks([]);
    setSelectedPack(null);
    try {
      const res = await fetch(`/api/topup/game/packlist?game=${game}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setPacks(data);
      } else {
        showToast("ไม่สามารถดึงข้อมูลแพ็กเกจได้", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("เกิดข้อผิดพลาดในการดึงข้อมูลแพ็กเกจ", "error");
    } finally {
      setLoadingPacks(false);
    }
  };

  const handleTopup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPack || !selectedGame) return;
    if (!gameId.trim()) {
      showToast("กรุณากรอก Game ID / Player ID", "error");
      return;
    }
    if (!currentUser) {
      showToast("กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ!", "error");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Check user balance
      const user = await fetchUser(currentUser.username);
      if (!user) {
        showToast("ไม่พบบัญชีผู้ใช้", "error");
        setIsProcessing(false);
        return;
      }

      const retailPrice = Number(selectedPack.amount);
      const userBalance = Number(user.balance || 0);

      if (userBalance < retailPrice) {
        showToast(`ยอดเงินไม่เพียงพอ (ขาดอีก ${retailPrice - userBalance} บาท)`, "error");
        setIsProcessing(false);
        return;
      }

      // 2. Call WONDD Topup API
      const res = await fetch("/api/topup/game/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          servicecode: selectedGame,
          packcode: selectedPack.packcode,
          gameid: gameId.trim()
        }),
      });

      const data = await res.json();

      if (data.status === 0 && data.errorcode === "00") {
        // Success
        
        // 3. Deduct balance from user
        const newBalance = userBalance - retailPrice;
        await supabase
          .from("profiles")
          .update({ balance: newBalance })
          .eq("username", currentUser.username);

        // 4. Record purchase
        await supabase.from("purchases").insert([
          {
            username: currentUser.username,
            item_id: `game_${selectedGame}_${selectedPack.packcode}`,
            item_name: `เติมเกม ${selectedGame.toUpperCase()} - ${selectedPack.name}`,
            price: retailPrice,
            quantity: 1,
            game: "GAMETOPUP"
          }
        ]);

        showToast("เติมเกมสำเร็จ!", "success");
        setGameId("");
        setSelectedPack(null);
      } else {
        // Error from API
        showToast(`ผิดพลาด: ${data.errordetail || "ไม่สามารถเติมเกมได้"}`, "error");
      }
    } catch (err) {
      console.error(err);
      showToast("เกิดข้อผิดพลาดในการเติมเกม", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 relative"
      >
        <button 
          onClick={onBack}
          className="absolute left-0 top-1 text-zinc-400 hover:text-white flex items-center justify-center p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-display">บริการรับเติมเกม</h2>
        <p className="text-zinc-500 text-xs sm:text-sm font-sans">เลือเกมที่คุณต้องการเติม สะดวก รวดเร็ว อัตโนมัติ 24 ชม.</p>
      </motion.div>

      {!selectedGame ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map(game => (
            <motion.button
              key={game.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedGame(game.id)}
              className={`relative overflow-hidden rounded-2xl p-6 text-left border border-white/10 bg-gradient-to-br ${game.color} group shadow-lg`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
                <Gamepad2 className="w-12 h-12 text-white/90" />
                <span className="text-xl font-bold text-white text-center">{game.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Gamepad2 className="text-cyan-400 w-6 h-6" />
              เติมเกม {games.find(g => g.id === selectedGame)?.name}
            </h3>
            <button onClick={() => setSelectedGame(null)} className="text-sm text-zinc-400 hover:text-white underline">
              เปลี่ยนเกม
            </button>
          </div>

          <form onSubmit={handleTopup}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">Game ID / Player ID</label>
              <input
                type="text"
                required
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                placeholder="กรอก UID ของคุณ..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-3">เลือกแพ็กเกจ</label>
              {loadingPacks ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                </div>
              ) : packs.length === 0 ? (
                <div className="text-center text-zinc-500 py-8 bg-black/30 rounded-xl border border-zinc-800">
                  ไม่พบแพ็กเกจสำหรับเกมนี้ หรือ API ขัดข้อง
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {packs.map(pack => (
                    <div 
                      key={pack.packcode}
                      onClick={() => setSelectedPack(pack)}
                      className={`cursor-pointer rounded-xl border p-4 flex flex-col transition-all ${
                        selectedPack?.packcode === pack.packcode 
                          ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                          : 'bg-black/40 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      <div className="text-sm font-bold text-white mb-2 line-clamp-2">{pack.name}</div>
                      <div className="mt-auto flex items-end justify-between">
                        <div className="text-xs text-zinc-400">
                          {pack.point} Points
                        </div>
                        <div className="text-lg font-bold text-cyan-400">
                          ฿{Number(pack.amount).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!selectedPack || isProcessing}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all ${
                !selectedPack || isProcessing
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/25"
              }`}
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" /> 
                  {selectedPack ? `ชำระเงิน ฿${Number(selectedPack.amount).toFixed(2)}` : "กรุณาเลือกแพ็กเกจ"}
                </>
              )}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
