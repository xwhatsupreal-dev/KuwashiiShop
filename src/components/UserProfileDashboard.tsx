import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Settings,
  Package,
  DollarSign,
  Wallet,
  ShieldCheck,
  Copy,
  Check,
  Eye,
  EyeOff,
  Save,
  Lock,
  ArrowLeft,
  Search,
  Sparkles,
  ChevronDown,
  Key,
  Mail,
  Zap,
  ShoppingCart,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  Gift,
  Award
} from "lucide-react";
import { supabase } from "../supabase";
import { PurchaseRecord, TopupRecord } from "../types";
import { fetchUserPurchases, fetchUserTopups } from "../queries";
import { formatThaiDate, formatThaiTime } from "../utils/date";

interface UserProfileDashboardProps {
  currentUser: any;
  setAppScreen: (screen: string) => void;
  onChangePassword: (newPass: string) => void;
  onChangeUsername: (newUsername: string) => Promise<boolean>;
  onChangeEmail: (newEmail: string) => Promise<boolean>;
  items?: any[];
}

export const UserProfileDashboard: React.FC<UserProfileDashboardProps> = ({
  currentUser,
  setAppScreen,
  onChangePassword,
  onChangeUsername,
  onChangeEmail,
  items: globalItems = [],
}) => {
  const [activeTab, setActiveTab] = useState<"profile" | "purchases" | "topups">("profile");

  // History state
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [topups, setTopups] = useState<TopupRecord[]>([]);
  const items = globalItems;
  const [expandedPurchases, setExpandedPurchases] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Settings state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [userEmail, setUserEmail] = useState("-");

  // UI Toast & Action state
  const [copiedId, setCopiedId] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const [isSavingEmail, setIsSavingEmail] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setEditUsername(currentUser.username || "");
      supabase
        .from("profiles")
        .select("email")
        .eq("username", currentUser.username)
        .single()
        .then(({ data }) => {
          if (data && data.email) {
            setUserEmail(data.email || "-");
            setEditEmail(data.email || "");
          } else {
            setUserEmail("-");
            setEditEmail("");
          }
        });

      const loadData = () => {
        fetchUserPurchases(currentUser.username).then((data) => {
          if (data) setPurchases(data);
        });
        fetchUserTopups(currentUser.username).then((data) => {
          if (data) setTopups(data);
        });
      };

      loadData();
      const handleSync = () => loadData();
      window.addEventListener("sync-update", handleSync);
      return () => window.removeEventListener("sync-update", handleSync);
    }
  }, [currentUser]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setSaveStatus({ type, message });
    setTimeout(() => {
      setSaveStatus(null);
    }, 3500);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleCopyMemberId = () => {
    if (currentUser?.member_id) {
      navigator.clipboard.writeText(String(currentUser.member_id));
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleSavePassword = async () => {
    if (!newPassword) return;
    if (newPassword !== confirmPassword) {
      showToast('error', 'รหัสผ่านใหม่และรหัสผ่านยืนยันไม่ตรงกัน');
      return;
    }
    if (newPassword.length < 6) {
      showToast('error', 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    setIsSavingPassword(true);
    try {
      await onChangePassword(newPassword);
      setNewPassword("");
      setConfirmPassword("");
      showToast('success', 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว');
    } catch {
      showToast('error', 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน');
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleSaveUsername = async () => {
    if (!editUsername.trim() || editUsername === currentUser?.username) return;
    setIsSavingUsername(true);
    try {
      const success = await onChangeUsername(editUsername.trim());
      if (success) {
        showToast('success', 'เปลี่ยนชื่อผู้ใช้สำเร็จแล้ว');
      } else {
        setEditUsername(currentUser?.username || "");
        showToast('error', 'ไม่สามารถเปลี่ยนชื่อผู้ใช้ได้ (อาจมีผู้ใช้นี้แล้ว)');
      }
    } catch {
      showToast('error', 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSavingUsername(false);
    }
  };

  const handleSaveEmail = async () => {
    if (!editEmail.trim() || editEmail === userEmail) return;
    setIsSavingEmail(true);
    try {
      const success = await onChangeEmail(editEmail.trim());
      if (success) {
        setUserEmail(editEmail.trim());
        showToast('success', 'อัปเดตอีเมลเรียบร้อยแล้ว');
      } else {
        setEditEmail(userEmail);
        showToast('error', 'ไม่สามารถบันทึกอีเมลได้');
      }
    } catch {
      showToast('error', 'เกิดข้อผิดพลาดในการบันทึกอีเมล');
    } finally {
      setIsSavingEmail(false);
    }
  };

  const sortedPurchases = [...purchases].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedTopups = [...topups].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const filteredPurchases = sortedPurchases.filter(
    (p) =>
      !searchTerm ||
      p.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSpent = sortedPurchases.reduce((sum, item) => sum + (item.price || 0), 0);
  const totalTopup = sortedTopups.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 w-full space-y-6 font-sans text-white pb-20"
    >
      {/* Toast Notification Floating Alert */}
      <AnimatePresence>
        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-5 right-5 z-[200] max-w-sm px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs font-bold ${
              saveStatus.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/90 border-rose-500/40 text-rose-200'
            }`}
          >
            {saveStatus.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{saveStatus.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Navigation Bar */}
      <div className="flex items-center justify-between gap-4 bg-zinc-900/60 p-3 sm:p-4 rounded-3xl border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAppScreen("SHOP")}
            className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all group shrink-0"
            title="กลับหน้าร้านค้า"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
              ศูนย์จัดการบัญชี
              <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
                PROFILE
              </span>
            </h1>
            <p className="text-xs text-zinc-400 hidden sm:block">
              จัดการข้อมูลส่วนตัว ความปลอดภัย และเรียกดูประวัติการทำรายการ
            </p>
          </div>
        </div>

        <button
          onClick={() => setAppScreen("SHOP")}
          className="px-4 py-2 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-2 transition-all shrink-0"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">ไปหน้าร้านค้า</span>
        </button>
      </div>

      {/* Hero Profile Banner Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950/80 via-zinc-900/90 to-purple-950/70 border border-white/10 p-5 sm:p-7 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* User Info Avatar & Identity */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 w-full md:w-auto">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-[2.5px] shadow-xl shadow-indigo-500/20">
                <div className="w-full h-full rounded-[22px] bg-zinc-950 flex items-center justify-center overflow-hidden border-2 border-zinc-900">
                  {currentUser?.avatar_url || currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar_url || currentUser.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-indigo-400" />
                  )}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full border-2 border-zinc-950 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-950" />
              </span>
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide truncate max-w-[220px] sm:max-w-xs">
                  {currentUser?.username || "ผู้ใช้งาน"}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-black flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  สมาชิก VIP
                </span>
              </div>

              <p className="text-xs text-zinc-400 truncate max-w-xs">
                {userEmail !== "-" ? userEmail : "ยังไม่ได้ระบุอีเมล"}
              </p>

              {currentUser?.member_id && (
                <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
                  <button
                    onClick={handleCopyMemberId}
                    className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors group"
                  >
                    <span>ID: {currentUser.member_id}</span>
                    {copiedId ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                    )}
                  </button>
                  {copiedId && (
                    <span className="text-[11px] text-emerald-400 font-bold animate-pulse">
                      คัดลอก ID แล้ว!
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Balance & Action Widget */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-lg flex-1 min-w-[220px]">
              <div className="flex items-center justify-between gap-3 text-xs text-zinc-400 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  ยอดเงินคงเหลือ
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  พร้อมใช้งาน
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-1">
                <span className="text-emerald-400 text-lg">฿</span>
                {(currentUser?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <button
              onClick={() => setAppScreen("TOPUP")}
              className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Zap className="w-4 h-4" />
              เติมเงินเข้าบัญชี
            </button>
          </div>
        </div>

        {/* Quick Metrics Grid Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">สั่งซื้อทั้งหมด</div>
              <div className="text-sm font-extrabold text-white font-mono">{sortedPurchases.length} รายการ</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">การเติมเงิน</div>
              <div className="text-sm font-extrabold text-white font-mono">{sortedTopups.length} รายการ</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">แต้มสะสม</div>
              <div className="text-sm font-extrabold text-white font-mono">{(currentUser?.topupCount || 0).toLocaleString()} แต้ม</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">สถานะบัญชี</div>
              <div className="text-xs font-extrabold text-cyan-400">ปลอดภัย / ยืนยันแล้ว</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Switcher Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-zinc-900/90 border border-white/10 rounded-2xl backdrop-blur-md overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("profile")}
          className={`relative flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "profile"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>ตั้งค่าบัญชี</span>
        </button>

        <button
          onClick={() => setActiveTab("purchases")}
          className={`relative flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "purchases"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>ประวัติสั่งซื้อ ({sortedPurchases.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("topups")}
          className={`relative flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "topups"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>ประวัติเติมเงิน ({sortedTopups.length})</span>
        </button>
      </div>

      {/* Tab Panels Container */}
      <div className="min-h-[400px]">
        {/* TAB 1: Account Profile & Security Settings */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Box 1: Personal Information */}
            <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/10 space-y-5 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">ข้อมูลส่วนตัว</h3>
                  <p className="text-xs text-zinc-400">จัดการชื่อผู้ใช้และอีเมลสำหรับติดต่อ</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Username Input */}
                <div>
                  <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                    ชื่อผู้ใช้ (Username)
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value)}
                        placeholder="ระบุชื่อผู้ใช้..."
                        className="w-full bg-zinc-950 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <button
                      onClick={handleSaveUsername}
                      disabled={isSavingUsername || !editUsername.trim() || editUsername === currentUser?.username}
                      className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-indigo-600/20"
                    >
                      {isSavingUsername ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>บันทึก</span>
                    </button>
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                    อีเมล (Email Address)
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder={userEmail !== "-" ? userEmail : "ระบุอีเมลของคุณ..."}
                        className="w-full bg-zinc-950 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <button
                      onClick={handleSaveEmail}
                      disabled={isSavingEmail || !editEmail.trim() || editEmail === userEmail || !editEmail.includes("@")}
                      className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-indigo-600/20"
                    >
                      {isSavingEmail ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>บันทึก</span>
                    </button>
                  </div>
                </div>

                {/* Account Member Reference ID */}
                <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-zinc-500 font-bold block">รหัสสมาชิก (Member ID)</span>
                    <span className="text-xs text-indigo-400 font-mono font-bold">{currentUser?.member_id || '-'}</span>
                  </div>
                  <button
                    onClick={handleCopyMemberId}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>คัดลอก ID</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Box 2: Password & Security Settings */}
            <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/10 space-y-5 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">เปลี่ยนรหัสผ่าน</h3>
                  <p className="text-xs text-zinc-400">อัปเดตรหัสผ่านใหม่เพื่อความปลอดภัยของบัญชี</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* New Password */}
                <div>
                  <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                    รหัสผ่านใหม่
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="ป้อนรหัสผ่านใหม่..."
                      className="w-full bg-zinc-950 border border-white/10 text-white pl-10 pr-10 py-3 rounded-xl text-sm focus:outline-none focus:border-purple-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                    ยืนยันรหัสผ่านใหม่
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="ป้อนรหัสผ่านใหม่อีกครั้ง..."
                      className="w-full bg-zinc-950 border border-white/10 text-white pl-10 pr-10 py-3 rounded-xl text-sm focus:outline-none focus:border-purple-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Password Strength Status Bar */}
                {newPassword.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-zinc-400">ความแข็งแกร่งรหัสผ่าน:</span>
                      <span className={
                        newPassword.length >= 8
                          ? "text-emerald-400"
                          : newPassword.length >= 6
                          ? "text-amber-400"
                          : "text-rose-400"
                      }>
                        {newPassword.length >= 8 ? "แข็งแกร่ง" : newPassword.length >= 6 ? "ปานกลาง" : "รหัสผ่านสั้นเกินไป"}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-zinc-950 overflow-hidden flex gap-1">
                      <div className={`h-full flex-1 rounded-full ${newPassword.length >= 1 ? (newPassword.length >= 6 ? "bg-amber-500" : "bg-rose-500") : "bg-zinc-800"}`} />
                      <div className={`h-full flex-1 rounded-full ${newPassword.length >= 6 ? (newPassword.length >= 8 ? "bg-emerald-500" : "bg-amber-500") : "bg-zinc-800"}`} />
                      <div className={`h-full flex-1 rounded-full ${newPassword.length >= 8 ? "bg-emerald-500" : "bg-zinc-800"}`} />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSavePassword}
                  disabled={
                    isSavingPassword ||
                    !newPassword ||
                    newPassword !== confirmPassword ||
                    newPassword.length < 6
                  }
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {isSavingPassword ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Key className="w-4 h-4" />
                  )}
                  <span>ยืนยันการเปลี่ยนรหัสผ่าน</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: Order & Purchase History */}
        {activeTab === "purchases" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Search and Action Bar */}
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ค้นหาสินค้าที่เคยซื้อ..."
                  className="w-full bg-zinc-950 border border-white/10 text-white pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => {
                    const texts = filteredPurchases.map(p => p.credentialData).filter(Boolean);
                    if (texts.length) {
                      navigator.clipboard.writeText(texts.join('\n\n'));
                      showToast('success', `คัดลอกข้อมูลสินค้า ${texts.length} รายการแล้ว`);
                    }
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>คัดลอกข้อมูลทั้งหมด</span>
                </button>
              </div>
            </div>

            {/* List of Purchases */}
            {filteredPurchases.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-zinc-900/50 border border-white/10 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-zinc-800/80 border border-white/5 flex items-center justify-center mx-auto text-zinc-500 shadow-inner">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">ยังไม่มีประวัติการสั่งซื้อ</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  เมื่อคุณทำรายการสั่งซื้อสินค้า ข้อมูลสินค้า รหัสบัญชี และไฟล์ดาวน์โหลดจะปรากฏที่นี่
                </p>
                <button
                  onClick={() => setAppScreen("SHOP")}
                  className="mt-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                >
                  เลือกซื้อสินค้า
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPurchases.map((purchase) => {
                  const date = formatThaiDate(purchase.date);
                  const time = formatThaiTime(purchase.date);
                  const hasGachaDrops = purchase.gachaDrops && purchase.gachaDrops.length > 0;
                  const hasCredentialData = !!purchase.credentialData;
                  const canExpand = hasGachaDrops || hasCredentialData;
                  const isExpanded = expandedPurchases.includes(purchase.id);

                  const matchedItem = items.find(
                    (i) => String(i.id) === String(purchase.itemId) || i.name === purchase.itemName
                  );
                  const itemImg = matchedItem?.imageUrls?.[0] || matchedItem?.imageUrl || (purchase as any).imageUrl || "https://img2.pic.in.th/pic/Screenshot_20241029_163939_Facebook.jpg";

                  return (
                    <div
                      key={purchase.id}
                      className="rounded-2xl bg-zinc-900/90 border border-white/10 overflow-hidden shadow-lg transition-all hover:border-white/20"
                    >
                      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 flex-1 min-w-0">
                          <img
                            src={itemImg}
                            alt=""
                            className="w-14 h-14 rounded-2xl object-cover border border-white/10 shrink-0 shadow-md"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white truncate mb-1">
                              {purchase.itemName}
                            </h4>
                            <div className="flex items-center gap-2 flex-wrap text-xs">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1 text-[11px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                จัดส่งสำเร็จ
                              </span>
                              <span className="text-zinc-500 font-medium">
                                {date} &middot; {time}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-white/5">
                          <div className="text-left sm:text-right">
                            <span className="text-[10px] text-zinc-500 font-bold block">ยอดชำระ</span>
                            <span className="text-sm font-black text-emerald-400 font-mono">
                              ฿{(purchase.price || 0).toLocaleString()}
                            </span>
                          </div>

                          {canExpand && (
                            <button
                              onClick={() => {
                                setExpandedPurchases((prev) =>
                                  prev.includes(purchase.id)
                                    ? prev.filter((id) => id !== purchase.id)
                                    : [...prev, purchase.id]
                                );
                              }}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                isExpanded
                                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                                  : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
                              }`}
                            >
                              <span>{isExpanded ? "ซ่อนข้อมูล" : "ดูรหัส / ข้อมูล"}</span>
                              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expandable Credential/Data Area */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-white/10 bg-zinc-950/80 p-4 space-y-3"
                          >
                            {hasCredentialData && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Key className="w-3.5 h-3.5" />
                                    ข้อมูลรหัสสินค้า / ลิ้งค์ดาวน์โหลด
                                  </span>
                                  <button
                                    onClick={() => handleCopy(purchase.credentialData!, purchase.id)}
                                    className="text-[11px] font-semibold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                                  >
                                    {copiedText === purchase.id ? (
                                      <span className="text-emerald-400 font-bold">คัดลอกแล้ว!</span>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>คัดลอกทั้งหมด</span>
                                      </>
                                    )}
                                  </button>
                                </div>

                                <div className="space-y-2">
                                  {purchase.credentialData!.split('\n').map((cred, idx) => {
                                    if (cred.includes('ลิ้งค์ดาวน์โหลด:')) {
                                      const [linkPart, passPart] = cred.split(' | รหัสผ่านเข้าถึงลิ้งค์:');
                                      const link = linkPart.replace('ลิ้งค์ดาวน์โหลด: ', '').trim();
                                      const pass = passPart ? passPart.trim() : '';
                                      return (
                                        <div key={idx} className="p-3 rounded-xl bg-zinc-900 border border-white/10 font-mono text-xs space-y-2">
                                          <div className="flex items-center justify-between gap-2">
                                            <span className="text-zinc-400">ลิ้งค์ดาวน์โหลด:</span>
                                            <a
                                              href={link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-indigo-400 hover:underline flex items-center gap-1 truncate max-w-[200px] sm:max-w-xs"
                                            >
                                              <span className="truncate">{link}</span>
                                              <ExternalLink className="w-3 h-3 shrink-0" />
                                            </a>
                                          </div>
                                          {pass && (
                                            <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                                              <span className="text-zinc-400">รหัสผ่าน:</span>
                                              <span className="text-amber-400 font-bold select-all">{pass}</span>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }
                                    return (
                                      <div
                                        key={idx}
                                        className="p-3 rounded-xl bg-zinc-900 border border-white/10 font-mono text-xs text-emerald-300 flex items-center justify-between gap-3 select-all"
                                      >
                                        <span className="break-all">{cred}</span>
                                        <button
                                          onClick={() => handleCopy(cred, `${purchase.id}-${idx}`)}
                                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors shrink-0"
                                          title="คัดลอกบรรทัดนี้"
                                        >
                                          {copiedText === `${purchase.id}-${idx}` ? (
                                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                                          ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                          )}
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {hasGachaDrops && (
                              <div className="space-y-2 pt-2">
                                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  รางวัลที่ได้รับจากสุ่มกล่อง
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {Object.values(
                                    purchase.gachaDrops!.reduce((acc: any, drop) => {
                                      const key = drop.name;
                                      if (!acc[key]) acc[key] = { ...drop, count: 0 };
                                      acc[key].count++;
                                      return acc;
                                    }, {})
                                  ).map((drop: any, idx) => (
                                    <div
                                      key={idx}
                                      className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 flex items-center gap-2.5"
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 font-bold">
                                        ✨
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-xs font-bold text-white truncate">{drop.name}</div>
                                        <div className="text-[10px] text-zinc-500 font-mono">จำนวน x{drop.count}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: Topup History */}
        {activeTab === "topups" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {sortedTopups.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-zinc-900/50 border border-white/10 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-zinc-800/80 border border-white/5 flex items-center justify-center mx-auto text-zinc-500 shadow-inner">
                  <DollarSign className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">ยังไม่มีประวัติการเติมเงิน</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  รายการเติมเงินผ่าน TrueMoney, PromptPay สแกนสลิป หรือซองของขวัญจะบันทึกอัตโนมัติที่นี่
                </p>
                <button
                  onClick={() => setAppScreen("TOPUP")}
                  className="mt-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
                >
                  เติมเงินตอนนี้
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedTopups.map((topup) => {
                  const date = formatThaiDate(topup.date);
                  const time = formatThaiTime(topup.date);

                  return (
                    <div
                      key={topup.id}
                      className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10 flex items-center justify-between gap-4 shadow-lg hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
                          <DollarSign className="w-6 h-6" />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">
                            การเติมเงินผ่าน {topup.method || "ระบบอัตโนมัติ"}
                          </h4>
                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1 text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              เติมเงินสำเร็จ
                            </span>
                            <span className="text-zinc-500 font-medium">
                              {date} &middot; {time}
                            </span>
                          </div>
                          {topup.refCode && (
                            <p className="text-[10px] text-zinc-500 font-mono truncate">
                              รหัสอ้างอิง: {topup.refCode}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">
                          +{topup.amount?.toLocaleString()} ฿
                        </div>
                        <span className="text-[10px] text-zinc-500 font-bold block">เพิ่มเครดิตแล้ว</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
