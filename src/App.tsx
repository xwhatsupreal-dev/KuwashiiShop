import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Turnstile } from "@marsidev/react-turnstile";
import { motion, AnimatePresence } from "motion/react";
import { parseUTCDate, formatThaiDate, formatThaiTime } from "./utils/date";
import {
  Shield,
  ShieldCheck,
  Search,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  Coins,
  Package,
  Layers,
  Sparkles,
  Lock,
  Unlock,
  AlertTriangle,
  ChevronDown,
  X,
  FileDown,
  FileUp,
  ExternalLink,
  Github,
  TrendingUp,
  Inbox,
  CheckCircle,
  Check,
  Copy,
  Clock,
  MessageCircle,
  Flame,
  Bell,
  BellRing,
  BellOff,
  Volume2,
  VolumeX,
  Settings,
  Loader2,
  ChevronLeft,
  User,
  ShoppingCart,
  Database,
  ChevronRight,
  Menu,
  LogIn,
  UserPlus,
  Users,
  History,
  Wallet,
  Landmark,
  Ticket,
  Gift,
  Info,
  UploadCloud,
  Eye,
  EyeOff,
  Edit3,
  Star,
  LogOut,
  FolderPlus,
  Image as ImageIcon,
} from "lucide-react";

import {
  StockItem,
  CategoryFilter,
  SaleFormatFilter,
  StockStatusFilter,
} from "./types";
import { DEFAULT_PRESETS } from "./presets";
import { ItemCard } from "./components/ItemCard";
import { CategoryList } from "./components/CategoryList";
import { ItemCardSkeleton } from "./components/ItemCardSkeleton";
import { InquiryModal } from "./components/InquiryModal";
import { RandomBoxModal } from "./components/RandomBoxModal";
import { GachaResultModal } from "./components/GachaResultModal";
import { AdminModal } from "./components/AdminModal";
import { StockManagerModal } from "./components/StockManagerModal";
import { CustomerDatabaseModal } from "./components/CustomerDatabaseModal";
import { HistoryModal } from "./components/HistoryModal";
import { CouponManagerModal } from "./components/CouponManagerModal";
import { AnnouncementManagerModal } from "./components/AnnouncementManagerModal";
import { ImageSettingsModal } from "./components/ImageSettingsModal";
import { AnnouncementPopup } from "./components/AnnouncementPopup";
import { MarqueeAnnouncement } from "./components/MarqueeAnnouncement";
import { ShopHeader } from "./components/ShopHeader";
import { ShopBanner } from "./components/ShopBanner";
import { TopupPage } from "./components/TopupPage";
import { TopupTosModal } from "./components/TopupTosModal";
import { PaymentSettingsModal } from "./components/PaymentSettingsModal";
import { CategoryManagerModal } from "./components/CategoryManagerModal";
import { AuthPage } from "./components/AuthPage";
import { GlobalLoadingScreen } from "./components/GlobalLoadingScreen";
import { UserProfileDashboard } from "./components/UserProfileDashboard";
import jsQR from "jsqr";

const readQRFromImage = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          resolve(code.data);
        } else {
          resolve(null);
        }
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

import {
  sendDiscordTopupEmbed,
  sendDiscordPurchaseEmbed,
  sendDiscordStockUpdateEmbed,
} from "./discord";
import { LiveActivities, LiveActivity } from "./components/LiveActivities";
import { supabase } from "./supabase";
import { fetchItems, fetchUser, getSystemConfig } from "./queries";

import { SalesChart } from "./components/SalesChart";
import { MobileDrawer } from "./components/MobileDrawer";
import { SearchOverlay } from "./components/SearchOverlay";
import { AIChatWidget } from "./components/AIChatWidget";
import { ShootingStars } from "./components/ShootingStars";

export const addLiveActivity = async (
  activity: Omit<LiveActivity, "id" | "timestamp">,
) => {
  try {
    const { error } = await supabase.from("activities").insert([
      {
        type: activity.type,
        username: activity.username,
        item_name: activity.itemName,
        quantity: activity.quantity,
        price: activity.price,
        remaining_stock: activity.remainingStock,
        game: activity.game,
        gacha_drops: activity.gachaDrops,
        timestamp: new Date().toISOString(),
      },
    ]);

    // Clean up old activities (older than 72 hours to match recent purchases, or 7 hours?)
    const cutoff = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString();
    await supabase.from("activities").delete().lt("timestamp", cutoff);

    if (!error) {
      window.dispatchEvent(new Event("sync-update"));
    }
  } catch (e) {}
};

const DiscordBanner = () => (
  <section className="mt-16 sm:mt-24 max-w-sm mx-auto mb-10">
    <iframe
      src="https://discord.com/widget?id=1510845435751829565&theme=dark"
      width="100%"
      height="500"
      frameBorder="0"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      className="rounded-2xl shadow-xl w-full"
    />
  </section>
);

import { RecentPurchases } from "./components/RecentPurchases";

export default function App() {
  const [globalStats, setGlobalStats] = useState<any>({
    global_sales_astd: 0,
    global_rev_astd: 0,
    global_free_astd: 0,
    maintenance_mode: false,
  });
  const [currentUserData, setCurrentUserData] = useState<any>(null);

  const isUnderMaintenance = globalStats?.maintenance_mode;

  const getInitialState = () => {
    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    let initAppScreen = "SHOP";
    let initSelectedCategory = "all";

    if (path === "/login") {
      initAppScreen = "LOGIN";
    } else if (path === "/topup") {
      initAppScreen = "TOPUP";
    } else if (path === "/profile") {
      initAppScreen = "PROFILE";
    } else if (path.startsWith("/categories/")) {
      initSelectedCategory = decodeURIComponent(
        path.replace("/categories/", ""),
      );
    }

    return { initAppScreen, initSelectedCategory };
  };

  const initialState = getInitialState();

  // --- Global Hub State ---
  const [appScreen, setAppScreen] = useState<string>(
    initialState.initAppScreen,
  );

  // Route handlers for Discord Auth redirection parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const discordLogin = params.get("discord_login");
    const discordEmail = params.get("email");
    const discordAvatar = params.get("avatar");

    if (discordLogin) {
      const userPayload = {
        username: discordLogin,
        discord_email: discordEmail,
        avatar: discordAvatar,
      };
      setCurrentUser(userPayload);
      localStorage.setItem(
        "KUWASHII_CURRENT_USER",
        JSON.stringify(userPayload),
      );
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Popup Message Listener for Discord Auth
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin is from AI Studio preview or localhost or vercel.app
      const origin = event.origin;
      if (
        !origin.endsWith(".run.app") &&
        !origin.includes("localhost") &&
        !origin.includes("studio.google.com") &&
        !origin.includes("vercel.app")
      ) {
        return;
      }
      if (event.data?.type === "OAUTH_AUTH_SUCCESS" && event.data.payload) {
        const payload = event.data.payload;
        const userPayload = {
          username: payload.username,
          discord_email: payload.email,
          avatar: payload.avatar,
        };
        setCurrentUser(userPayload);
        localStorage.setItem(
          "KUWASHII_CURRENT_USER",
          JSON.stringify(userPayload),
        );
        setAppScreen("SHOP"); // Go to shop screen after login
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // User & Admin Authentications
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(
    () => {
      const saved =
        localStorage.getItem("KUWASHII_CURRENT_USER") ||
        sessionStorage.getItem("KUWASHII_CURRENT_USER");
      if (saved) return JSON.parse(saved);
      return null;
    },
  );
  const [isAdmin, setIsAdmin] = useState(() => {
    return (
      localStorage.getItem("KUWASHII_IS_ADMIN") === "true" ||
      sessionStorage.getItem("KUWASHII_IS_ADMIN") === "true"
    );
  });

  const [loadingVariant, setLoadingVariant] = useState(1);
  const [isAstdMenuOpen, setIsAstdMenuOpen] = useState(false);

  const [gachaResult, setGachaResult] = useState<{
    drops: { name: string; color?: string }[];
    item: StockItem;
  } | null>(null);

  // --- States ---
  const [items, setItems] = useState<StockItem[]>([]);
  const [isLoadingStock, setIsLoadingStock] = useState(true);
  const [d1AuthError, setD1AuthError] = useState(false);
  const [isServerQuotaExceeded, setIsServerQuotaExceeded] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(
    initialState.initSelectedCategory,
  );
  const [selectedSaleFormat, setSelectedSaleFormat] =
    useState<SaleFormatFilter>("all");
  const [selectedStatus, setSelectedStatus] =
    useState<StockStatusFilter>("all");
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [syncCounter, setSyncCounter] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [appScreen, selectedCategory]);

  // Sync Engine Listener
  useEffect(() => {
    let activeSyncId = 0;

    const handleSync = async () => {
      const syncId = ++activeSyncId;

      try {
        const dbItems = await fetchItems();
        if (syncId !== activeSyncId) return;
        if (dbItems) setItems(dbItems);
        setD1AuthError(false);
      } catch(e: any) {
        if (e && e.message === "D1_AUTH_ERROR") setD1AuthError(true);
      }

      const config = await getSystemConfig();
      if (syncId !== activeSyncId) return;
      if (config) {
        try {
          const { count, error } = await supabase
            .from("profiles")
            .select("*", { count: "exact", head: true });
          if (!error && count !== null) {
            config.user_count = count;
          }
          const { count: purchaseCount, error: pError } = await supabase
            .from("purchases")
            .select("*", { count: "exact", head: true });
          if (!pError && purchaseCount !== null) {
            config.total_purchases = purchaseCount;
          }

          const { data: allTopups } = await supabase
            .from("topups")
            .select("amount");
          if (allTopups) {
            config.total_topups = allTopups.reduce(
              (acc, topup) => acc + (parseFloat(topup.amount) || 0),
              0,
            );
          }
        } catch (e) {}

        if (syncId !== activeSyncId) return;
        setGlobalStats(config);
        if (config.announcement_settings) {
          localStorage.setItem(
            "KUWASHII_ANNOUNCEMENT_SETTINGS",
            JSON.stringify(config.announcement_settings),
          );
          window.dispatchEvent(new Event("sync-announcement"));
        }
      }

      if (currentUser?.username) {
        const u = await fetchUser(currentUser.username);
        let totalTopups = 0;
        try {
          const { data: topupsData } = await supabase
            .from("topups")
            .select("amount")
            .eq("username", currentUser.username);
          if (topupsData) {
            totalTopups = topupsData.reduce(
              (acc, curr) => acc + (parseFloat(curr.amount) || 0),
              0,
            );
          }
        } catch (e) {}

        if (syncId !== activeSyncId) return;
        if (u) {
          setCurrentUserData({ ...u, topupCount: totalTopups });
        }
      }

      setSyncCounter((c) => c + 1);
    };

    // Initial fetch
    handleSync();

    const throttledHandleSync = () => {
      if ((window as any)._syncDebounce)
        clearTimeout((window as any)._syncDebounce);
      (window as any)._syncDebounce = setTimeout(() => {
        handleSync();
      }, 3000);
    };

    window.addEventListener("sync-update", handleSync);

    const realtimeChannel = supabase
      .channel("public-db-changes")
      .on("postgres_changes", { event: "*", schema: "public" }, () => {
        throttledHandleSync();
      })
      .subscribe();

    return () => {
      window.removeEventListener("sync-update", handleSync);
      supabase.removeChannel(realtimeChannel);
    };
  }, [currentUser]);

  // Modals controller
  // showAuthModal removed
  const [authMode, setAuthMode] = useState<
    "login" | "register" | "forgot" | "forgot_verify_otp"
  >("login");
  const [authUsername, setAuthUsername] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authOtpCode, setAuthOtpCode] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showAuthPassword, setShowAuthPassword] = useState(false);

  const [showAuthConfirmPassword, setShowAuthConfirmPassword] = useState(false);

  const [showMockEmailModal, setShowMockEmailModal] = useState(false);
  const [mockEmailModalData, setMockEmailModalData] = useState<{
    email: string;
    username: string;
    password: string;
  } | null>(null);
  const [rememberAuth, setRememberAuth] = useState(false);

  // --- Top Up State ---
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [currentView, setCurrentView] = useState<"store" | "topup">("store");

  const [topupModalStep, setTopupModalStep] = useState<
    "select" | "angpao" | "bank" | "coupon" | "success"
  >("select");
  const [topupSuccessMessage, setTopupSuccessMessage] = useState("");
  const [topupError, setTopupError] = useState("");
  const [topupCode, setTopupCode] = useState("");
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [tosAccepted, setTosAccepted] = useState(false);
  const [showTopupTos, setShowTopupTos] = useState(false);
  const [selectedTopupChannel, setSelectedTopupChannel] = useState<
    "angpao" | "bank" | "coupon" | null
  >(null);

  const [isProcessingTopup, setIsProcessingTopup] = useState(false);
  const [isProcessingPurchase, setIsProcessingPurchase] = useState(false);
  const isProcessingPurchaseRef = useRef(false);

  // Modals controller
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isStockManagerOpen, setIsStockManagerOpen] = useState(false);
  const [isCustomerDbOpen, setIsCustomerDbOpen] = useState(false);
  const [isCouponManagerOpen, setIsCouponManagerOpen] = useState(false);
  const [isPaymentConfigOpen, setIsPaymentConfigOpen] = useState(false);
  const [isImageSettingsOpen, setIsImageSettingsOpen] = useState(false);
  const [isAnnouncementManagerOpen, setIsAnnouncementManagerOpen] =
    useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyTab, setHistoryTab] = useState<"purchases" | "topups">(
    "purchases",
  );

  const openHistoryModal = (tab: "purchases" | "topups") => {
    setHistoryTab(tab);
    setShowHistoryModal(true);
  };
  const [viewingUserHistory, setViewingUserHistory] = useState<string | null>(
    null,
  );
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [inquiringItem, setInquiringItem] = useState<StockItem | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isNavigating = useRef(false);
  const isInitialMount = useRef(true);

  // Sync state to URL
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isNavigating.current) {
      isNavigating.current = false;
      return;
    }
    let newPath = "/";
    if (appScreen === "LOGIN") {
      newPath = "/login";
    } else if (appScreen === "TOPUP") {
      newPath = "/topup";
    } else if (appScreen === "PROFILE") {
      newPath = "/profile";
    } else if (inquiringItem) {
      newPath = `/products/${inquiringItem.id}`;
    } else if (selectedCategory && selectedCategory !== "all") {
      newPath = `/categories/${encodeURIComponent(selectedCategory)}`;
    }

    if (location.pathname !== newPath) {
      isNavigating.current = true;
      navigate(newPath);
    }
  }, [appScreen, selectedCategory, inquiringItem?.id]);

  // Sync URL to state
  useEffect(() => {
    if (isNavigating.current) {
      isNavigating.current = false;
      return;
    }

    const path = location.pathname;
    let newAppScreen = appScreen;
    let newSelectedCategory = selectedCategory;
    let newInquiringItem = inquiringItem;

    if (path === "/login") {
      newAppScreen = "LOGIN";
      newInquiringItem = null;
    } else if (path === "/topup") {
      newAppScreen = "TOPUP";
      newInquiringItem = null;
    } else if (path === "/profile") {
      newAppScreen = "PROFILE";
      newInquiringItem = null;
    } else if (path.startsWith("/categories/")) {
      newAppScreen = "SHOP";
      newSelectedCategory = decodeURIComponent(
        path.replace("/categories/", ""),
      );
      newInquiringItem = null;
    } else if (path.startsWith("/products/")) {
      newAppScreen = "SHOP";
      const productId = path.replace("/products/", "");
      const item = items.find((i) => i.id === productId);
      if (item) {
        newInquiringItem = item;
      }
    } else if (path === "/" || path === "") {
      newAppScreen = "SHOP";
      newSelectedCategory = "all";
      newInquiringItem = null;
    }

    let changed = false;
    if (newAppScreen !== appScreen) {
      setAppScreen(newAppScreen);
      changed = true;
    }
    if (newSelectedCategory !== selectedCategory) {
      setSelectedCategory(newSelectedCategory);
      changed = true;
    }
    if (newInquiringItem !== inquiringItem) {
      setInquiringItem(newInquiringItem);
      changed = true;
    }

    if (changed) {
      isNavigating.current = true;
    }
  }, [location.pathname, items]);

  const [hideGlobalStats, setHideGlobalStats] = useState(() => {
    return localStorage.getItem("KUWASHII_HIDE_STATS") === "true";
  });

  const toggleHideGlobalStats = () => {
    const newState = !hideGlobalStats;
    setHideGlobalStats(newState);
    localStorage.setItem("KUWASHII_HIDE_STATS", String(newState));
  };

  const toggleMaintenanceMode = async () => {
    if (
      confirm(
        `คุณต้องการ${globalStats?.maintenance_mode ? "เปิด" : "ปิด"}เว็บไซต์ใช่หรือไม่?`,
      )
    ) {
      await supabase
        .from("system_config")
        .update({
          maintenance_mode: !globalStats?.maintenance_mode,
        })
        .eq("id", "main");
      window.dispatchEvent(new Event("sync-update"));
      showToast(
        globalStats?.maintenance_mode
          ? "เปิดเว็บไซต์เรียบร้อยแล้ว"
          : "ปิดเว็บไซต์เรียบร้อยแล้ว",
        "info",
      );
    }
  };

  // Floating notifications/toast
  const [toasts, setToasts] = useState<{
    id: string;
    text: string;
    type: "success" | "info" | "error";
  }[]>([]);

  // Sound chime utility generator
  const playChime = (type: "success" | "warning" | "info") => {
    try {
      const ctx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const freqs = { success: 523.25, warning: 329.63, info: 440.0 };
      osc.frequency.setValueAtTime(freqs[type] || 440, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch (e) {
      console.warn("Audio Context beep error:", e);
    }
  };

  // --- AI Chat Assistant States & Handlers ---
  // Chat feature removed

  // Cleanup logic (7 days retention)
  useEffect(() => {
    async function cleanupOldData() {
      try {
        const sevenDaysAgo = new Date(
          Date.now() - 7 * 24 * 60 * 60 * 1000,
        ).toISOString();
        await supabase.from("topups").delete().lt("created_at", sevenDaysAgo);
        await supabase
          .from("purchases")
          .delete()
          .lt("created_at", sevenDaysAgo);
      } catch (e) {
        console.warn("Error cleaning up old histories", e);
      }
    }
    cleanupOldData();
  }, []);

  // Load and save localStorage / Server
  useEffect(() => {
    async function initStock() {
      // Helper to map obsolete "Equipment" category to new "Skin" category
      const migrateItems = (itemsList: any[]): StockItem[] => {
        return itemsList.map((item) => {
          if (item && item.category === "Equipment") {
            return { ...item, category: "Skin" };
          }
          return item as StockItem;
        });
      };

      try {
        const dbItems = await fetchItems();
        if (dbItems && dbItems.length > 0) {
          setItems(migrateItems(dbItems));
        } else {
          setItems([]);
        }
        setIsServerQuotaExceeded(false);
        setD1AuthError(false);
      } catch (e: any) {
        console.warn("Error loading items from Database", e);
        if (e && e.message === "D1_AUTH_ERROR") {
          setD1AuthError(true);
        }
        setItems([]);
      } finally {
        setIsLoadingStock(false);
      }
    }
    initStock();
  }, [syncCounter]);

  const saveItemsToStorage = async (newItems: StockItem[]) => {
    setItems(newItems);

    // Save to Supabase (chunked to avoid D1 100 param limit)
    try {
      const updates = newItems.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        image: item.imageUrls ? JSON.stringify(item.imageUrls) : item.imageUrl,
        game: item.game,
        category: item.category,
        rarity: item.saleFormat,
        popular: item.isPopular,
        gacha_pool: {
          pool: item.gachaPool || null,
          saleFormat: item.saleFormat, // securely save format here
          initialQuantity: item.initialQuantity,
          piecesPerUnit: item.piecesPerUnit,
          accountCredentials: item.accountCredentials || null,
          isPinned: item.isPinned || false,
          originalPrice: item.originalPrice,
        },
        created_at: item.updatedAt || new Date().toISOString(),
      }));

      // Cloudflare D1 / SQLite parameter limit per query is often 100 max. Each item has 12 fields = max 8 items per chunk
      const chunkSize = 8;
      for (let i = 0; i < updates.length; i += chunkSize) {
        const chunk = updates.slice(i, i + chunkSize);
        await supabase.from("items").upsert(chunk);
      }
    } catch (e) {
      console.error("Error saving items", e);
    }

    window.dispatchEvent(new Event("sync-update"));
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
    if (topupModalStep !== "bank" && !topupCode.trim()) {
      showToast("กรุณากรอกข้อมูลเพื่อเติมเงิน", "error");
      return;
    }
    if (topupModalStep === "bank" && !slipFile) {
      showToast("กรุณาอัปโหลดรูปภาพสลิปโอนเงิน", "error");
      return;
    }

    if (!currentUser?.username) {
      showToast("กรุณาเข้าสู่ระบบก่อน", "error");
      return;
    }

    setIsProcessingTopup(true);

    const activeUsername = currentUser.username.trim();
    const liveUser = await fetchUser(activeUsername);
    if (!liveUser) {
      showToast("เกิดข้อผิดพลาดในการโหลดข้อมูลลูกค้า โปรดลองอีกครั้ง", "error");
      setIsProcessingTopup(false);
      return;
    }

    if (topupModalStep === "coupon") {
      const savedCoupons = localStorage.getItem("KUWASHII_COUPONS");
      let coupons: any[] = savedCoupons ? JSON.parse(savedCoupons) : [];
      let coupon = coupons.find(
        (c) => c.code.toLowerCase() === topupCode.trim().toLowerCase(),
      );

      if (coupon) {
        if (coupon.usedBy && coupon.usedBy.includes(activeUsername)) {
          showToast("คุณได้ใช้งานโค้ดนี้ไปแล้ว", "error");
          setIsProcessingTopup(false);
          return;
        }
        if (coupon.usedBy && coupon.usedBy.length >= coupon.maxUses) {
          showToast("โค้ดอ้างอิงนี้ถูกใช้งานจนครบกำหนดแล้ว", "error");
          setIsProcessingTopup(false);
          return;
        }
        if (
          coupon.expiresAt &&
          new Date(coupon.expiresAt).getTime() < Date.now()
        ) {
          showToast("โค้ดนี้หมดอายุการใช้งานแล้ว", "error");
          setIsProcessingTopup(false);
          return;
        }

        if (!coupon.usedBy) coupon.usedBy = [];
        coupon.usedBy.push(activeUsername);
        localStorage.setItem("KUWASHII_COUPONS", JSON.stringify(coupons));

        const configData = await getSystemConfig();
        const currentFree = configData
          ? Number(configData.global_free_astd || 0)
          : 0;
        await supabase
          .from("system_config")
          .update({
            global_free_astd: currentFree + coupon.amount,
          })
          .eq("id", "main");

        const balanceField = "balance";
        const userBalance = Number(liveUser[balanceField] || 0);
        const newBalance = userBalance + coupon.amount;
        await supabase
          .from("profiles")
          .update({ [balanceField]: newBalance })
          .eq("username", activeUsername);
        const { error: topupError } = await supabase.from("topups").insert([
          {
            username: activeUsername,
            amount: coupon.amount,
            method: `Coupon: ${coupon.code}`,
          },
        ]);
        if (topupError) {
          await supabase.from("topups").insert([
            {
              username: activeUsername,
              amount: coupon.amount,
              method: `Coupon: ${coupon.code}`,
            },
          ]);
        }

        window.dispatchEvent(new Event("sync-update"));

        showToast(
          `ใช้คูปองสำเร็จ! ได้รับ ${coupon.amount.toLocaleString()} เครดิต`,
          "success",
        );
        setTopupSuccessMessage(
          `ใช้คูปองสำเร็จ! ได้รับ ${coupon.amount.toLocaleString()} เครดิต`,
        );
        setTopupModalStep("success");
        setTopupCode("");
        if (currentUser) setCurrentUser({ ...currentUser });
      } else {
        showToast("ไม่พบโค้ดคูปองนี้ในระบบ", "error");
      }
      setIsProcessingTopup(false);
      return;
    }

    // Angpao topup
    if (topupModalStep === "angpao") {
      const receiveAngpao = async () => {
        try {
          setTopupError(""); // Clear earlier errors
          const res = await fetch("/api/topup/true-wallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              gift_link: topupCode.trim(),
              game: appScreen,
            }),
          });

          const data = await res.json();
          if (data.status === "success") {
            const rawAmount = parseFloat(data.amount) || 0;
            const fee = Number((rawAmount * 0.029).toFixed(2));
            const amount = Number((rawAmount - fee).toFixed(2));
            const ownerName = data.owner_profile || "ไม่ทราบชื่อ";

            const configData = await getSystemConfig();
            if (appScreen === "SHOP") {
              const currentRev = configData
                ? Number(configData.global_rev_astd || 0)
                : 0;
              await supabase
                .from("system_config")
                .update({ global_rev_astd: currentRev + amount })
                .eq("id", "main");
            } else if (false) {
              const currentRev = configData
                ? Number(configData.global_revenue_aotr || 0)
                : 0;
              await supabase
                .from("system_config")
                .update({
                  global_revenue_aotr: currentRev + amount,
                })
                .eq("id", "main");
            }

            const balanceField = "balance";
            const userBalance = Number(liveUser[balanceField] || 0);
            const newBalance = userBalance + amount;
            await supabase
              .from("profiles")
              .update({ [balanceField]: newBalance })
              .eq("username", activeUsername);
            const { error: topupError } = await supabase.from("topups").insert([
              {
                username: activeUsername,
                amount: amount,
                method: `TrueMoney (Angpao) - ${topupCode.trim()}`,
              },
            ]);
            if (topupError) {
              await supabase.from("topups").insert([
                {
                  username: activeUsername,
                  amount: amount,
                  method: `TrueMoney (Angpao) - ${topupCode.trim()}`,
                },
              ]);
            }

            window.dispatchEvent(new Event("sync-update"));

            const msg = `เติมเงินสำเร็จ! จำนวน ${amount.toLocaleString()} บาท\n(หักค่าธรรมเนียม ${fee} บาท)`;
            showToast(`เติมเงินสำเร็จ ${amount} บาท`, "success");
            setTopupSuccessMessage(msg);
            setTopupModalStep("success");
            setTopupCode("");
            if (currentUser) setCurrentUser({ ...currentUser });
            sendDiscordTopupEmbed(
              activeUsername,
              amount,
              "angpao",
              newBalance,
              true,
              appScreen,
            );

            // รอ 2 วินาทีแล้วโหลดกลับหน้าหลัก
            setTimeout(() => {
              setTopupModalStep("select");
              setAppScreen("SHOP");
            }, 2000);
          } else {
            let errorMsg = String(
              data.message || "ซองของขวัญไม่ถูกต้องหรือถูกใช้งานไปแล้ว",
            );
            if (errorMsg.includes("ติดต่อผู้ดูแลระบบ")) {
              errorMsg += " ";
            }
            if (errorMsg.includes("http")) {
              errorMsg = errorMsg.replace(
                /https:\/\/discord\.gg\/[a-zA-Z0-9]+/g,
                "https://discord.gg/AQKtJpvyva",
              );
            }
            setTopupError(`API แจ้งเตือน: ${errorMsg}`);
            showToast(errorMsg, "error");
            sendDiscordTopupEmbed(
              activeUsername,
              0,
              "angpao",
              liveUser.balance || 0,
              false,
              appScreen,
            );
          }
        } catch (error: any) {
          console.error("Topup error:", error);
          const catchErr = "ระบบเครือข่ายมีปัญหา หรือเรียกใช้ API ไม่ได้";
          setTopupError(catchErr);
          showToast(catchErr, "error");
        } finally {
          setIsProcessingTopup(false);
        }
      };
      receiveAngpao();
      return;
    }

    if (topupModalStep === "bank") {
      if (!slipFile) {
        showToast("กรุณาแนบสลิปการโอนเงิน", "error");
        setIsProcessingTopup(false);
        return;
      }

      const processBankSlip = async () => {
        try {
          setTopupError("");

          const qrcode_text = await readQRFromImage(slipFile);
          if (!qrcode_text) {
            showToast(
              "สลิปการโอนเงินไม่ถูกต้อง คิวอาร์โค้ดไม่สมบูรณ์ หรือไม่มีข้อมูล",
              "error",
            );
            setIsProcessingTopup(false);
            return;
          }

          const checkRes = await fetch("/api/topup/bank", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              qrcode_text,
            }),
          });
          const data = await checkRes.json();
          if (
            data.status === "success" ||
            data.code === 200 ||
            data.message === "เช็คสลิปสำเร็จ"
          ) {
            const slipData = data.data || data;
            const amount =
              parseFloat(
                slipData.amount?.amount || slipData.amount || data.amount,
              ) || 0;
            const receiverName =
              slipData.receiver?.name ||
              slipData.receiver?.account_name ||
              slipData.receiver_name ||
              data.receiver_name ||
              "ไม่ทราบชื่อ";
            const senderName =
              slipData.sender?.name ||
              slipData.sender?.account_name ||
              slipData.sender_name ||
              data.sender_name ||
              "ไม่ทราบชื่อ";
            const transRef =
              slipData.transRef ||
              slipData.ref1 ||
              data.transRef ||
              data.ref1 ||
              `UNKNOWN-${Date.now()}`;

            if (amount <= 0) {
              setTopupError("ไม่พบยอดเงินในสลิป หรือสลิปไม่สมบูรณ์");
              showToast("ไม่พบยอดเงินในสลิป หรือสลิปไม่สมบูรณ์", "error");
              setIsProcessingTopup(false);
              return;
            }

            // Check receiver name if configured
            let configName = "";
            let settingsObj = globalStats?.announcement_settings || {};
            if (typeof settingsObj === "string") {
              try {
                settingsObj = JSON.parse(settingsObj);
              } catch (e) {}
            }
            configName = (settingsObj.topup_qrcode_name || "").trim();

            if (configName && receiverName !== "ไม่ทราบชื่อ") {
              const cleanReceiver = receiverName
                .toLowerCase()
                .replace(/\s/g, "");
              const cleanConfig = configName.toLowerCase().replace(/\s/g, "");
              // Allow fallback for the specific name requested
              const hardcodeName1 = "ด.ช.ธีรสิทธิ์สุวรรณศรี";
              const hardcodeName2 = "ด.ช.ธีรสิทธิ์ส";

              if (
                !cleanReceiver.includes(cleanConfig) &&
                !cleanConfig.includes(cleanReceiver) &&
                !cleanReceiver.includes(hardcodeName1) &&
                !cleanReceiver.includes(hardcodeName2) &&
                !hardcodeName1.includes(cleanReceiver)
              ) {
                setTopupError(
                  `ชื่อบัญชีผู้รับไม่ถูกต้อง (ต้องเป็น: ${configName})`,
                );
                showToast(`สลิปนี้ถูกโอนไปยัง: ${receiverName}`, "error");
                setIsProcessingTopup(false);
                return;
              }
            }

            const { data: existingTopup } = await supabase
              .from("topups")
              .select("id")
              .eq("method", `Slip: ${transRef}`)
              .single();

            if (existingTopup) {
              const errMsg = "สลิปนี้ถูกใช้งานไปแล้ว";
              setTopupError(errMsg);
              showToast(errMsg, "error");
              setIsProcessingTopup(false);
              sendDiscordTopupEmbed(
                activeUsername,
                0,
                "bank",
                liveUser.balance || 0,
                false,
                appScreen,
              );
              return;
            }

            const configData = await getSystemConfig();
            if (appScreen === "SHOP") {
              const currentRev = configData
                ? Number(configData.global_rev_astd || 0)
                : 0;
              await supabase
                .from("system_config")
                .update({ global_rev_astd: currentRev + amount })
                .eq("id", "main");
            } else if (false) {
              const currentRev = configData
                ? Number(configData.global_revenue_aotr || 0)
                : 0;
              await supabase
                .from("system_config")
                .update({
                  global_revenue_aotr: currentRev + amount,
                })
                .eq("id", "main");
            }
            // If ROV, we do nothing to system_config because we don't track global_revenue_rov currently.

            const balanceField = "balance";
            const userBalance = Number(liveUser[balanceField] || 0);
            const newBalance = userBalance + amount;
            await supabase
              .from("profiles")
              .update({ [balanceField]: newBalance })
              .eq("username", activeUsername);

            const { error: topupError } = await supabase.from("topups").insert([
              {
                username: activeUsername,
                amount: amount,
                method: `Slip: ${transRef}`,
              },
            ]);
            if (topupError) {
              await supabase.from("topups").insert([
                {
                  username: activeUsername,
                  amount: amount,
                  method: `Slip: ${transRef}`,
                },
              ]);
            }

            window.dispatchEvent(new Event("sync-update"));

            const bankMsg = `เติมเงินด้วยสลิปสำเร็จ! จำนวน ${amount.toLocaleString()} บาท`;
            showToast(bankMsg, "success");
            setTopupSuccessMessage(bankMsg);
            setTopupModalStep("success");
            setSlipFile(null);
            if (currentUser) setCurrentUser({ ...currentUser });
            sendDiscordTopupEmbed(
              activeUsername,
              amount,
              "bank",
              newBalance,
              true,
              appScreen,
            );

            // รอ 2 วินาทีแล้วโหลดกลับหน้าหลัก
            setTimeout(() => {
              setTopupModalStep("select");
              setAppScreen("SHOP");
            }, 2000);
          } else {
            let finalErr = String(
              data.message || "ข้อมูลสลิปไม่ถูกต้อง หรือเช็คไม่ได้",
            );
            if (finalErr.includes("ติดต่อผู้ดูแลระบบ")) {
              finalErr += " ";
            }
            if (finalErr.includes("http")) {
              finalErr = finalErr.replace(
                /https:\/\/discord\.gg\/[a-zA-Z0-9]+/g,
                "https://discord.gg/AQKtJpvyva",
              );
            }
            setTopupError(`API แจ้งเตือน: ${finalErr}`);
            showToast(finalErr, "error");
            sendDiscordTopupEmbed(
              activeUsername,
              0,
              "bank",
              liveUser.balance || 0,
              false,
              appScreen,
            );
          }
        } catch (error: any) {
          console.error("Bank check error:", error);
          const catchErr = "ระบบเครือข่ายมีปัญหา หรือเรียกใช้ API ไม่ได้";
          setTopupError(catchErr);
          showToast(catchErr, "error");
        } finally {
          setIsProcessingTopup(false);
        }
      };
      processBankSlip();
      return;
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      setAuthError("เกิดข้อผิดพลาด กรุณายืนยัน Turnstile");
      return;
    }
    if (isAuthLoading) return;
    setIsAuthLoading(true);
    setAuthError("");

    try {
      if (authMode === "forgot") {
        if (!authEmail.trim()) {
          setAuthError("กรุณากรอกอีเมลให้ครบถ้วน");
          return;
        }
      } else if (authMode === "forgot_verify_otp") {
        if (!authEmail.trim() || !authOtpCode.trim() || !authPassword.trim()) {
          setAuthError("กรุณากรอกอีเมล รหัส OTP และรหัสผ่านใหม่ ให้ครบถ้วน");
          return;
        }
      } else {
        if (
          !authUsername.trim() ||
          !authPassword.trim() ||
          (authMode === "register" &&
            (!authEmail.trim() || !authConfirmPassword.trim()))
        ) {
          setAuthError(
            authMode === "register"
              ? "กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง"
              : "กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน",
          );
          return;
        }
        if (authMode === "register" && authPassword !== authConfirmPassword) {
          setAuthError("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
          return;
        }
      }

      if (authMode === "login") {
        const storage = rememberAuth ? localStorage : sessionStorage;
        localStorage.removeItem("KUWASHII_CURRENT_USER");
        sessionStorage.removeItem("KUWASHII_CURRENT_USER");
        localStorage.removeItem("KUWASHII_IS_ADMIN");
        sessionStorage.removeItem("KUWASHII_IS_ADMIN");

        if (
          authUsername.trim() === "Kuwashii_admin" &&
          authPassword === "ZAZACI09"
        ) {
          setIsAdmin(true);
          setCurrentUser({ username: "Kuwashii_admin" });
          storage.setItem("KUWASHII_IS_ADMIN", "true");
          storage.setItem(
            "KUWASHII_CURRENT_USER",
            JSON.stringify({ username: "Kuwashii_admin" }),
          );
          setAppScreen("SHOP");
          setAuthUsername("");
          setAuthEmail("");
          setAuthPassword("");
          setAuthConfirmPassword("");
          setAuthError("");
          showToast("เข้าสู่ระบบผู้ดูแลเรียบร้อยแล้ว!", "success");
          return;
        }

        const usernameTrimmed = authUsername.trim();
        let user = await fetchUser(usernameTrimmed);

        if (!user && usernameTrimmed.includes("@")) {
          try {
            const { data } = await supabase
              .from("profiles")
              .select("*")
              .eq("email", usernameTrimmed)
              .limit(1)
              .single();
            if (data) user = data;
          } catch (e) {}
        }

        if (user && user.password === authPassword) {
          setCurrentUser({ username: user.username });
          storage.setItem(
            "KUWASHII_CURRENT_USER",
            JSON.stringify({ username: user.username }),
          );
          storage.setItem("KUWASHII_IS_ADMIN", "false");

          setAppScreen("SHOP");
          setAuthUsername("");
          setAuthEmail("");
          setAuthPassword("");
          setAuthConfirmPassword("");
          setAuthError("");
          showToast("เข้าสู่ระบบสำเร็จ!", "success");
        } else {
          setAuthError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!");
        }
      } else if (authMode === "forgot") {
        if (!authEmail.includes("@")) {
          setAuthError("รูปแบบอีเมลไม่ถูกต้อง");
          return;
        }

        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", authEmail.trim())
          .limit(1)
          .single();

        if (!data) {
          setAuthError("ไม่พบบัญชีที่ผูกกับอีเมลนี้");
          return;
        }

        // Generate OTP and expire 15 mins
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expire = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        await supabase
          .from("profiles")
          .update({ otp_code: otp, otp_expires_at: expire })
          .eq("username", data.username);

        try {
          const response = await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ toEmail: authEmail.trim(), otp }),
          });
          const resData = await response.json();
          if (resData.error) {
            throw new Error(resData.error);
          }
        } catch (err: any) {
          console.error("Failed to send OTP:", err);
          setAuthError(
            err.message || "เกิดข้อผิดพลาดในการส่งอีเมล กรุณาลองใหม่อีกครั้ง",
          );
          return;
        }

        setAuthMode("forgot_verify_otp");
        setAuthError("");
        showToast("รหัส OTP ถูกส่งไปยังอีเมลของคุณแล้ว", "success");
      } else if (authMode === "forgot_verify_otp") {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", authEmail.trim())
          .limit(1)
          .single();
        if (!data) {
          setAuthError("ไม่พบบัญชีที่ผูกกับอีเมลนี้");
          return;
        }
        if (data.otp_code !== authOtpCode.trim()) {
          setAuthError("รหัส OTP ไม่ถูกต้อง");
          return;
        }
        if (new Date(data.otp_expires_at) < new Date()) {
          setAuthError("รหัส OTP หมดอายุแล้ว");
          return;
        }

        await supabase
          .from("profiles")
          .update({
            password: authPassword,
            otp_code: null,
            otp_expires_at: null,
          })
          .eq("username", data.username);

        setAuthMode("login");
        setAuthPassword("");
        setAuthOtpCode("");
        setAuthEmail("");
        setAuthError("");
        showToast("ตั้งรหัสผ่านใหม่สำเร็จแล้ว กรุณาเข้าสู่ระบบ", "success");
      } else {
        // Register Mode
        try {
          const lockRes = await fetch("/api/check-register-lock");
          const lockData = await lockRes.json();
          if (lockData.locked) {
            setAuthError(
              `กรุณารอ ${lockData.remaining} นาที ก่อนสมัครสมาชิกใหม่เพื่อป้องกันสแปม (ล็อค IP)`,
            );
            return;
          }
        } catch (e) {
          console.error("Lock check error", e);
        }

        if (!authEmail.includes("@")) {
          setAuthError("รูปแบบอีเมลไม่ถูกต้อง");
          return;
        }

        const targetUsername = authUsername.trim();

        if (targetUsername.toLowerCase() === "kuwashii_admin") {
          setAuthError("ไม่สามารถใช้ชื่อผู้ดูแลนี้ได้");
          return;
        }

        const existing = await fetchUser(targetUsername);

        if (existing) {
          setAuthError("ชื่อผู้ใช้งานนี้มีอยู่ในระบบแล้ว!");
          return;
        }

        try {
          const { data: existingEmail } = await supabase
            .from("profiles")
            .select("username")
            .eq("email", authEmail.trim())
            .limit(1)
            .single();
          if (existingEmail) {
            setAuthError("อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น!");
            return;
          }
        } catch (e) {
          // Table might not have email column yet or other error, ignore and let insert fail if it's unique
        }

        let insertRes = await supabase.from("profiles").insert([
          {
            username: targetUsername,
            email: authEmail.trim(),
            password: authPassword,
            balance: 0,
          },
        ]);

        if (insertRes.error && insertRes.error.message.includes("email")) {
          // Fallback for older schema without email column
          insertRes = await supabase.from("profiles").insert([
            {
              username: targetUsername,
              password: authPassword,
              balance: 0,
            },
          ]);
        }

        if (insertRes.error) {
          setAuthError("เกิดข้อผิดพลาดในการสมัครสมาชิก โปรดลองอีกครั้ง");
          return;
        }

        const storage = rememberAuth ? localStorage : sessionStorage;
        localStorage.removeItem("KUWASHII_CURRENT_USER");
        sessionStorage.removeItem("KUWASHII_CURRENT_USER");
        localStorage.removeItem("KUWASHII_IS_ADMIN");
        sessionStorage.removeItem("KUWASHII_IS_ADMIN");

        setCurrentUser({ username: authUsername.trim() });
        storage.setItem(
          "KUWASHII_CURRENT_USER",
          JSON.stringify({ username: authUsername.trim() }),
        );
        storage.setItem("KUWASHII_IS_ADMIN", "false");

        setAppScreen("SHOP");
        setAuthUsername("");
        setAuthEmail("");
        setAuthPassword("");
        setAuthConfirmPassword("");
        setAuthError("");

        addLiveActivity({
          type: "signup",
          username: authUsername.trim(),
          game: appScreen,
        });

        try {
          await fetch("/api/set-register-lock", { method: "POST" });
        } catch (e) {}
        showToast("สมัครสมาชิกและเข้าสู่ระบบสำเร็จ!", "success");
      }
    } catch (err) {
      console.error(err);
      setAuthError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentUser(null);
    setCurrentUserData(null);
    setIsCaptchaVerified(false);
    localStorage.removeItem("KUWASHII_IS_ADMIN");
    localStorage.removeItem("KUWASHII_CURRENT_USER");
    sessionStorage.removeItem("KUWASHII_IS_ADMIN");
    sessionStorage.removeItem("KUWASHII_CURRENT_USER");
    setAppScreen("SHOP");
    showToast("ออกจากระบบแล้ว", "info");
  };

  const handleChangePassword = async (newPass: string) => {
    if (!currentUser) return;
    const { error } = await supabase
      .from("profiles")
      .update({ password: newPass })
      .eq("username", currentUser.username);
    if (!error) {
      showToast("เปลี่ยนรหัสผ่านสำเร็จ", "success");
    } else {
      showToast("เกิดข้อผิดพลาดเปลี่ยนรหัสผ่านไม่ได้", "error");
    }
  };

  const handleChangeUsername = async (newUsername: string) => {
    if (!currentUser) return false;
    const trimmedNew = newUsername.trim();
    if (trimmedNew.length < 3) {
      showToast("ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร", "error");
      return false;
    }

    const { data: existing } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", trimmedNew)
      .limit(1)
      .maybeSingle();
    if (existing) {
      showToast("ชื่อผู้ใช้นี้ถูกใช้งานแล้ว", "error");
      return false;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("username_last_changed")
      .eq("username", currentUser.username)
      .single();
    if (profile && profile.username_last_changed) {
      const lastChanged = new Date(profile.username_last_changed);
      const now = new Date();
      const diffDays =
        (now.getTime() - lastChanged.getTime()) / (1000 * 3600 * 24);
      if (diffDays < 7) {
        showToast(
          `เปลี่ยนชื่อได้อีกครั้งในอีก ${Math.ceil(7 - diffDays)} วัน`,
          "error",
        );
        return false;
      }
    }

    const oldUsername = currentUser.username;
    const { error } = await supabase
      .from("profiles")
      .update({
        username: trimmedNew,
        username_last_changed: new Date().toISOString(),
      })
      .eq("username", oldUsername);

    if (error) {
      showToast("เกิดข้อผิดพลาดในการเปลี่ยนชื่อ", "error");
      return false;
    }

    await Promise.all([
      supabase
        .from("purchases")
        .update({ username: trimmedNew })
        .eq("username", oldUsername),
      supabase
        .from("topups")
        .update({ username: trimmedNew })
        .eq("username", oldUsername),
      supabase
        .from("activities")
        .update({ username: trimmedNew })
        .eq("username", oldUsername),
      supabase
        .from("claimed_jackpots")
        .update({ username: trimmedNew })
        .eq("username", oldUsername),
    ]);

    const updatedUser = { ...currentUser, username: trimmedNew };
    setCurrentUser(updatedUser);
    localStorage.setItem("KUWASHII_CURRENT_USER", JSON.stringify(updatedUser));
    showToast("เปลี่ยนชื่อผู้ใช้สำเร็จ", "success");
    return true;
  };

  const handleChangeEmail = async (newEmail: string) => {
    if (!currentUser) return false;
    const trimmedEmail = newEmail.trim();
    if (!trimmedEmail.includes("@")) {
      showToast("รูปแบบอีเมลไม่ถูกต้อง", "error");
      return false;
    }
    const { error } = await supabase
      .from("profiles")
      .update({ email: trimmedEmail })
      .eq("username", currentUser.username);
    if (error) {
      showToast("เกิดข้อผิดพลาดในการเปลี่ยนอีเมล", "error");
      return false;
    }
    showToast("เปลี่ยนอีเมลสำเร็จ", "success");
    return true;
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;
    const username = currentUser.username;

    await supabase.from("profiles").delete().eq("username", username);
    await supabase.from("topups").delete().eq("username", username);
    await supabase.from("purchases").delete().eq("username", username);

    handleLogout();
    showToast("ลบบัญชีและข้อมูลทั้งหมดเรียบร้อยแล้ว", "info");
  };

  // --- Add/Edit/Delete controllers ---
  const handleSaveItem = async (
    itemData: Omit<StockItem, "updatedAt">,
    notifyDiscord?: boolean,
    webhookUrl?: string,
  ) => {
    const timestamp = new Date().toISOString();

    // Fetch latest to prevent race condition
    let currentItems = (await fetchItems()) || items;

    const existingIndex = currentItems.findIndex((it) => it.id === itemData.id);

    let finalItem: StockItem;
    let addedQty = 0;

    if (existingIndex >= 0) {
      const oldItem = currentItems[existingIndex];
      const newQ = Number(itemData.quantity) || 0;
      const oldQ = Number(oldItem.quantity) || 0;
      addedQty = newQ - oldQ;
      finalItem = {
        ...oldItem,
        ...itemData,
        quantity: newQ,
        updatedAt: timestamp,
      } as StockItem;
      showToast(`บันทึกไอเทม ${itemData.name} สำเร็จ!`);
    } else {
      const newQ = Number(itemData.quantity) || 0;
      addedQty = newQ;
      finalItem = {
        ...itemData,
        quantity: newQ,
        updatedAt: timestamp,
      } as StockItem;
      showToast(`เพิ่มไอเทม ${itemData.name} ลงระบบเรียบร้อย`);
    }

    if (notifyDiscord && webhookUrl && addedQty > 0) {
      sendDiscordStockUpdateEmbed(
        webhookUrl,
        itemData.name,
        addedQty,
        finalItem.quantity,
        itemData.imageUrl,
        itemData.game,
      );
    }

    // Update state to render instantly
    const updatedList =
      existingIndex >= 0
        ? currentItems.map((it) => (it.id === itemData.id ? finalItem : it))
        : [finalItem, ...currentItems];

    setItems(updatedList);

    try {
      const updates = [
        {
          id: finalItem.id,
          name: finalItem.name,
          description: finalItem.description,
          price: finalItem.price,
          quantity: finalItem.quantity,
          image: finalItem.imageUrls
            ? JSON.stringify(finalItem.imageUrls)
            : finalItem.imageUrl,
          game: finalItem.game,
          category: finalItem.category,
          rarity: finalItem.saleFormat,
          popular: finalItem.isPopular,
          gacha_pool: {
            pool: finalItem.gachaPool || null,
            saleFormat: finalItem.saleFormat,
            initialQuantity: finalItem.initialQuantity,
            piecesPerUnit: finalItem.piecesPerUnit,
            accountCredentials: finalItem.accountCredentials || null,
            fileLink: finalItem.fileLink || null,
            filePassword: finalItem.filePassword || null,
            isPinned: finalItem.isPinned || false,
            originalPrice: finalItem.originalPrice,
          },
          created_at: finalItem.updatedAt || new Date().toISOString(),
        },
      ];
      await supabase.from("items").upsert(updates);
    } catch (e) {
      console.error("Error saving item", e);
    }

    window.dispatchEvent(new Event("sync-update"));
    setEditingItem(null);
  };

  const handleDeleteItem = async (id: string) => {
    // Fetch latest to prevent race condition
    let currentItems = (await fetchItems()) || items;

    const itemToDelete = currentItems.find((it) => it.id === id);
    if (!itemToDelete) return;

    if (
      confirm(
        `คุณมั่นใจหรือไม่ที่จะลบ "${itemToDelete.name}" ออกจากคลังสต๊อกสินค้า?`,
      )
    ) {
      const remainingItems = currentItems.filter((it) => it.id !== id);

      try {
        await supabase.from("items").delete().eq("id", id);
        setItems(remainingItems);
        window.dispatchEvent(new Event("sync-update"));
      } catch (e) {
        console.error("Error deleting item:", e);
      }

      // Cleanup Claimed Jackpots
      try {
        const stored = localStorage.getItem("KUWASHII_CLAIMED_JACKPOTS");
        if (stored) {
          const parsed = JSON.parse(stored);
          const filtered = parsed.filter((c: any) => c.itemId !== id);
          localStorage.setItem(
            "KUWASHII_CLAIMED_JACKPOTS",
            JSON.stringify(filtered),
          );
        }
      } catch (e) {}

      showToast("ลบสินค้าออกจากระบบและฐานข้อมูลเรียบร้อย", "info");
    }
  };

  const handleBuyItem = async (item: StockItem, purchaseQty: number = 1) => {
    if (isProcessingPurchase || isProcessingPurchaseRef.current) return;

    if (!currentUser) {
      showToast("กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ!", "error");
      setAppScreen("LOGIN");
      setAuthMode("login");
      setInquiringItem(null);
      return;
    }
    if (isAdmin) {
      showToast("ผู้ดูแลระบบไม่สามารถสั่งซื้อสินค้าตัวเองได้", "info");
      return;
    }

    isProcessingPurchaseRef.current = true;
    setIsProcessingPurchase(true);

    const user = await fetchUser(currentUser.username);

    if (!user) {
      showToast(
        "ไม่พบบัญชีส่วนตัวในฐานข้อมูล V2 (โปรดออกจากระบบและเข้าใหม่)",
        "error",
      );
      setIsProcessingPurchase(false);
      isProcessingPurchaseRef.current = false;
      return;
    }

    if (purchaseQty > item.quantity) {
      showToast("ขออภัย สินค้าในสต๊อกมีไม่เพียงพอ", "error");
      setIsProcessingPurchase(false);
      isProcessingPurchaseRef.current = false;
      return;
    }

    const totalPrice = item.price * purchaseQty;
    const balanceField = "balance";
    const userBalance = Number(user[balanceField] || 0);
    if (userBalance < totalPrice) {
      showToast(
        `ยอดเครดิตในระบบไม่เพียงพอ! (ขาดอีก ${totalPrice - userBalance} ฿)`,
        "error",
      );
      setIsProcessingPurchase(false);
      isProcessingPurchaseRef.current = false;
      return;
    }

    try {
      // Re-fetch users to prevent race conditions during the delay
      const liveUser = await fetchUser(currentUser.username);

      const liveUserBalance = Number(liveUser[balanceField] || 0);
      if (!liveUser || liveUserBalance < totalPrice) {
        showToast("ยอดเงินไม่เพียงพอ หรือข้อมูลไม่ถูกต้อง", "error");
        setIsProcessingPurchase(false);
        isProcessingPurchaseRef.current = false;
        return;
      }

      // Read LIVE items to ensure stock is still enough and accurately evaluate gacha drops
      const { data: dbItem } = await supabase
        .from("items")
        .select("quantity")
        .eq("id", item.id)
        .single();
      let liveItemQty = item.quantity;
      if (dbItem) {
        liveItemQty = dbItem.quantity;
      }

      if (purchaseQty > liveItemQty) {
        showToast(
          "ขออภัย สินค้าในสต๊อกถูกซื้อไปหมดหรือมีไม่เพียงพอแล้ว",
          "error",
        );
        setIsProcessingPurchase(false);
        isProcessingPurchaseRef.current = false;
        return;
      }

      // Load claimed jackpots to prevent duplicate giving of the exact same stock trigger
      let claimedJackpots: any[] = [];
      let usingDbClaims = false;
      try {
        const { data: dbClaims, error: claimsErr } = await supabase
          .from("claimed_jackpots")
          .select("*")
          .eq("item_id", item.id);
        if (!claimsErr && dbClaims) {
          claimedJackpots = dbClaims.map((c: any) => ({
            itemId: c.item_id,
            stockTrigger: c.stock_trigger,
          }));
          usingDbClaims = true;
        } else {
          throw new Error("Fallback to local");
        }
      } catch (e) {
        try {
          const storedClaims = localStorage.getItem(
            "KUWASHII_CLAIMED_JACKPOTS",
          );
          if (storedClaims) {
            const parsed = JSON.parse(storedClaims);
            const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
            claimedJackpots = parsed.filter(
              (c: any) => new Date(c.timestamp).getTime() > threeDaysAgo,
            );
          }
        } catch (e) {}
      }

      // Perform Gacha Roll based on CURRENT LIVE stock
      let drops: { name: string; color?: string; isSalt?: boolean }[] = [];
      if (item.gachaPool && item.gachaPool.length > 0) {
        for (let i = 0; i < purchaseQty; i++) {
          const currentOpenStock = liveItemQty - i;

          let dropped = null;

          const guaranteedReward = item.gachaPool.find(
            (r) =>
              (r.guaranteedAtStock !== undefined &&
                r.guaranteedAtStock === currentOpenStock) ||
              (r.guaranteedAtStocks &&
                r.guaranteedAtStocks.includes(currentOpenStock)),
          );

          if (guaranteedReward) {
            // Check if ANYONE already claimed this specific stock trigger for this item
            const isClaimed = claimedJackpots.some(
              (c) =>
                c.itemId === item.id && c.stockTrigger === currentOpenStock,
            );
            if (!isClaimed) {
              dropped = guaranteedReward;
              if (usingDbClaims) {
                // Perform atomic insert FIRST
                const { error: claimErr } = await supabase
                  .from("claimed_jackpots")
                  .insert([
                    {
                      item_id: item.id,
                      stock_trigger: currentOpenStock,
                      reward_name: dropped.name,
                      username: currentUser.username,
                    },
                  ]);

                if (
                  claimErr &&
                  (claimErr.code === "23505" ||
                    (claimErr.message && claimErr.message.includes("UNIQUE")))
                ) {
                  // UNIQUE constraint violation
                  // Someone else beat us to this jackpot!
                  dropped = null; // Turn to salt
                } else {
                  const newClaim = {
                    itemId: item.id,
                    rewardName: dropped.name,
                    stockTrigger: currentOpenStock,
                    username: currentUser.username,
                    timestamp: new Date().toISOString(),
                  };
                  claimedJackpots.push(newClaim);
                }
              } else {
                const newClaim = {
                  itemId: item.id,
                  rewardName: dropped.name,
                  stockTrigger: currentOpenStock,
                  username: currentUser.username,
                  timestamp: new Date().toISOString(),
                };
                claimedJackpots.push(newClaim);
              }
            }
          }

          if (dropped) {
            drops.push({ name: dropped.name, color: dropped.color });
          } else {
            drops.push({ name: "เกลือ", color: "#6b7280", isSalt: true });
          }
        }
      }

      if (!usingDbClaims) {
        // Update Claimed Jackpots Local Cache
        localStorage.setItem(
          "KUWASHII_CLAIMED_JACKPOTS",
          JSON.stringify(claimedJackpots),
        );
      }

      // Process Purchase
      const newBalance = liveUserBalance - totalPrice;
      await supabase
        .from("profiles")
        .update({ [balanceField]: newBalance })
        .eq("username", currentUser.username);

      let extractCreds: string[] | undefined = undefined;
      let nextAccCreds = item.accountCredentials;

      if (item.saleFormat === "ไฟล์ตัวรัน") {
        const productInfo = `ลิ้งค์ดาวน์โหลด: ${item.fileLink || "-"} | รหัสผ่านเข้าถึงลิ้งค์: ${item.filePassword || "-"}`;
        extractCreds = Array(purchaseQty).fill(productInfo);
        handleQuickQuantityChange(item.id, -purchaseQty, true);
      } else if (
        item.accountCredentials &&
        item.accountCredentials.length > 0
      ) {
        extractCreds = item.accountCredentials.slice(0, purchaseQty);
        nextAccCreds = item.accountCredentials.slice(purchaseQty);
        await supabase
          .from("items")
          .update({
            quantity: liveItemQty - purchaseQty,
            gacha_pool: {
              pool: item.gachaPool || null,
              saleFormat: item.saleFormat || "ขายรหัส",
              initialQuantity: item.initialQuantity,
              piecesPerUnit: item.piecesPerUnit,
              accountCredentials: nextAccCreds,
              fileLink: item.fileLink || null,
              filePassword: item.filePassword || null,
              isPinned: item.isPinned || false,
            },
          })
          .eq("id", item.id);

        // Also update local immediately
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? {
                  ...it,
                  quantity: liveItemQty - purchaseQty,
                  accountCredentials: nextAccCreds,
                }
              : it,
          ),
        );
      } else {
        handleQuickQuantityChange(item.id, -purchaseQty, true);
      }

      const { error: purchaseError } = await supabase.from("purchases").insert([
        {
          username: currentUser.username,
          item_id: item.id,
          item_name: item.name,
          price: totalPrice,
          quantity: purchaseQty,
          gacha_drops: drops.length > 0 ? drops : null,
          credential_data: extractCreds ? extractCreds.join("\n") : null,
          game: item.game || appScreen,
        },
      ]);
      if (purchaseError) {
        console.error("Error inserting purchase:", purchaseError);

        // Retry with basic schema if the new columns don't exist
        const { error: fallbackError } = await supabase
          .from("purchases")
          .insert([
            {
              username: currentUser.username,
              item_id: item.id,
              item_name: item.name,
              price: totalPrice,
              quantity: purchaseQty,
            },
          ]);
        if (fallbackError) {
          console.error("Fallback purchase insert also failed:", fallbackError);
        }
      }

      if (item.game === "ASTD") {
        const configData = await getSystemConfig();
        const currentSales = configData
          ? Number(configData.global_sales_astd || 0)
          : 0;
        await supabase
          .from("system_config")
          .update({
            global_sales_astd: currentSales + purchaseQty,
          })
          .eq("id", "main");
      } else if (item.game === "ROV") {
        const configData = await getSystemConfig();
        const currentSales = configData
          ? Number(configData.global_sales_rov || 0)
          : 0;
        const { error } = await supabase
          .from("system_config")
          .update({
            global_sales_rov: currentSales + purchaseQty,
          })
          .eq("id", "main");
        // Error will pop up in console if column doesn't exist, but won't crash user app thanks to no strict throw.
        if (error)
          console.warn(
            "Database update for ROV sales failed (likely missing column global_sales_rov)",
            error,
          );
      }

      // Reduce Stock natively handled earlier for creds or via fallback

      const hasGuaranteed = drops.some((d) => !d.isSalt);
      if (!(isAdmin && hasGuaranteed)) {
        addLiveActivity({
          type: "purchase",
          username: currentUser.username,
          itemName: item.name,
          quantity: purchaseQty,
          price: totalPrice,
          remainingStock: liveItemQty - purchaseQty,
          game: item.game || "ASTD",
          gachaDrops: drops.length > 0 ? drops : undefined,
        });
      }

      const webhookDrops =
        drops.length > 0
          ? drops
          : [{ name: `${item.name} x${purchaseQty}`, isSalt: false }];
      sendDiscordPurchaseEmbed(
        currentUser.username,
        item.name,
        purchaseQty,
        liveItemQty - purchaseQty,
        webhookDrops,
        appScreen,
      );

      setInquiringItem(null);
      setIsProcessingPurchase(false);
      isProcessingPurchaseRef.current = false;
      window.dispatchEvent(new Event("sync-update"));

      if (item.gachaPool && item.gachaPool.length > 0 && drops.length > 0) {
        // Direct purchase, go straight to history to view credential/product
        setShowHistoryModal(true);
      } else {
        // Direct purchase, go straight to history to view credential/product
        setShowHistoryModal(true);
      }
    } catch (err) {
      console.error(err);
      setIsProcessingPurchase(false);
      isProcessingPurchaseRef.current = false;
      showToast("เกิดข้อผิดพลาดในการซื้อสินค้า", "error");
    }
  };

  const handleQuickQuantityChange = async (
    id: string,
    delta: number,
    silent: boolean = false,
  ) => {
    const { data: dbItem } = await supabase
      .from("items")
      .select("quantity")
      .eq("id", id)
      .single();
    if (!dbItem) return;

    const nextQty = Math.max(0, dbItem.quantity + delta);
    const nowIso = new Date().toISOString();

    const { error } = await supabase
      .from("items")
      .update({ quantity: nextQty, created_at: nowIso })
      .eq("id", id);
    if (!error) {
      setItems(
        items.map((it) =>
          it.id === id ? { ...it, quantity: nextQty, updatedAt: nowIso } : it,
        ),
      );
      window.dispatchEvent(new Event("sync-update"));

      if (!silent) {
        showToast("อัปเดตจำนวนสต็อกเรียบร้อย!", "success");
        if (nextQty <= 5 && nextQty < dbItem.quantity) {
          playChime("warning");
        } else if (nextQty > dbItem.quantity) {
          playChime("success");
        } else {
          playChime("info");
        }
      }
    } else {
      showToast("เกิดข้อผิดพลาดในการอัปเดตจำนวนสต็อก", "error");
    }
  };

  const handleTogglePin = async (id: string) => {
    const target = items.find((it) => it.id === id);
    if (!target) return;

    const updated: StockItem = {
      ...target,
      isPinned: !target.isPinned,
      updatedAt: new Date().toISOString(),
    };

    const newItems = items.map((it) => (it.id === id ? updated : it));
    setItems(newItems);

    try {
      const updates = [
        {
          id: updated.id,
          name: updated.name,
          description: updated.description,
          price: updated.price,
          quantity: updated.quantity,
          image: updated.imageUrls
            ? JSON.stringify(updated.imageUrls)
            : updated.imageUrl,
          game: updated.game,
          category: updated.category,
          rarity: updated.saleFormat,
          popular: updated.isPopular,
          gacha_pool: {
            pool: updated.gachaPool || null,
            saleFormat: updated.saleFormat,
            initialQuantity: updated.initialQuantity,
            piecesPerUnit: updated.piecesPerUnit,
            accountCredentials: updated.accountCredentials || null,
            fileLink: updated.fileLink || null,
            filePassword: updated.filePassword || null,
            isPinned: updated.isPinned || false,
            originalPrice: updated.originalPrice,
          },
          created_at: updated.updatedAt || new Date().toISOString(),
        },
      ];
      await supabase.from("items").upsert(updates);
    } catch (e) {
      console.error("Error pinning item", e);
    }

    window.dispatchEvent(new Event("sync-update"));

    if (updated.isPinned) {
      showToast(`ปักหมุดไอเทม ${updated.name} แล้ว!`, "success");
    } else {
      showToast(`ยกเลิกการปักหมุดไอเทม ${updated.name} แล้ว`, "info");
    }
  };

  const handleResetPresets = async () => {
    if (
      confirm(
        `คุณต้องการรีเซ็ตสินค้าในสต๊อกกลับไปเป็นค่าเริ่มต้นจากเกม ${appScreen} หรือไม่? (ข้อมูลที่แก้ไขจะหายไป)`,
      )
    ) {
      saveItemsToStorage(DEFAULT_PRESETS);
      showToast("คืนค่าสต๊อคเริ่มต้นในระบบเรียบร้อย!", "info");
    }
  };

  const handleClearStockToZero = async () => {
    if (
      confirm(
        "⚠️ คุณแน่ใจหรือไม่ที่จะรีเซ็ตทุกไอเทมในคลังสินค้าปัจจุบันให้เหลือจำนวนสต๊อกเป็น 0 ชิ้น? (ข้อมูลราคาและไอเทมจะอยู่ครบ แต่สต๊อกจะกลายเป็น 0 ทั้งหมด)",
      )
    ) {
      const updatedList = items.map((it) => ({
        ...it,
        quantity: 0,
        updatedAt: new Date().toISOString(),
      }));
      saveItemsToStorage(updatedList);
      showToast(
        "เซ็ตจำนวนสินค้าในสต๊อกทั้งหมดเหลือ 0 ชิ้น เรียบร้อย!",
        "success",
      );
    }
  };

  const handleDeleteAllProducts = async () => {
    if (
      confirm(
        "⚠️⚠️⚠️ คุณแน่ใจหรือไม่ที่จะลบสินค้าทั้งหมดออกจากระบบร้านค้าและคลาวด์เซิร์ฟเวอร์? (ข้อมูลสินค้าทั้งหมดและรูปภาพจะถูกล้างออกและแสดงผลเป็นหน้าว่างเปล่า มีสินค้า 0 รายการ)",
      )
    ) {
      saveItemsToStorage([]);
      showToast("ลบข้อมูลสินค้าทั้งหมดเรียบร้อยแล้ว!", "info");
    }
  };

  const getLatestUpdatedRelativeTime = (list: StockItem[]): string => {
    if (!list || list.length === 0) return "ไม่มีบันทึกข้อมูล";
    try {
      const timestamps = list
        .map((it) => parseUTCDate(it.updatedAt).getTime())
        .filter((t) => !isNaN(t));
      if (timestamps.length === 0) return "ไม่มีบันทึกข้อมูล";
      const latestTime = Math.max(...timestamps);
      const date = new Date(latestTime);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHr = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHr / 24);

      if (diffSec < 15) return "เมื่อสักครู่นี้";
      if (diffSec < 60) return "เมื่อไม่กี่วินาทีก่อน";
      if (diffMin < 60) return `${diffMin} นาทีที่แล้ว`;
      if (diffHr < 24) return `${diffHr} ชั่วโมงที่แล้ว`;
      if (diffDays === 1) return "เมื่อวานนี้";
      if (diffDays < 7) return `${diffDays} วันที่แล้ว`;

      return formatThaiDate(date);
    } catch (e) {
      return "ไม่ระบุเวลา";
    }
  };

  // Import / Export database functions
  const handleExportJSON = () => {
    try {
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(items, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `aotr_stock_export_${new Date().toISOString().split("T")[0]}.json`,
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("ส่งออกไฟล์ข้อมูลเรียบร้อยแล้ว", "success");
    } catch (e) {
      showToast("ส่งออกผิดพลาด", "error");
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedData)) {
          const isValid = importedData.every(
            (it) => it.id && it.name && typeof it.price === "number",
          );
          if (isValid) {
            saveItemsToStorage(importedData as StockItem[]);
            showToast("นำเข้าคลังสต๊อกสำเร็จและอัปเดตระบบแล้ว!", "success");
          } else {
            showToast("ฟอร์แมตข้อมูลในไฟล์ JSON ไม่ถูกต้อง", "error");
          }
        }
      } catch (err) {
        showToast("อ่านไฟล์ JSON ล้มเหลว", "error");
      }
    };
    reader.readAsText(file);
  };

  // --- Filtering & Sorting Compute ---
  const filteredItems = items.filter((item) => {
    const searchStr = (search || "").toLowerCase().trim();
    const matchesSearch =
      !searchStr ||
      (item.name || "").toLowerCase().includes(searchStr) ||
      (item.category || "").toLowerCase().includes(searchStr) ||
      (item.description || "").toLowerCase().includes(searchStr);

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSaleFormat =
      selectedSaleFormat === "all" || item.saleFormat === selectedSaleFormat;

    let matchesStatus = true;
    if (selectedStatus === "in-stock") {
      matchesStatus = item.quantity > 5;
    } else if (selectedStatus === "low-stock") {
      matchesStatus = item.quantity > 0 && item.quantity <= 5;
    } else if (selectedStatus === "out-of-stock") {
      matchesStatus = item.quantity === 0;
    }

    const matchesPopular = !showPopularOnly || !!item.isPopular;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesSaleFormat &&
      matchesStatus &&
      matchesPopular
    );
  });

  // Overload latest stock from LiveActivities (Plan 2) to prevent out-of-sync UI
  const getPatchedStockItems = () => {
    const liveActivitiesStr =
      localStorage.getItem("KUWASHII_LIVE_ACTIVITY") || "[]";
    const latestStockMap: Record<string, { qty: number; ts: number }> = {};
    try {
      const liveActivities = JSON.parse(liveActivitiesStr);
      liveActivities.forEach((a: any) => {
        if (
          a.type === "purchase" &&
          a.itemName &&
          a.remainingStock !== undefined
        ) {
          const aTime = new Date(a.timestamp).getTime();
          // Keep the absolutely most recent purchase activity for this item
          if (
            latestStockMap[a.itemName] === undefined ||
            aTime > latestStockMap[a.itemName].ts
          ) {
            latestStockMap[a.itemName] = { qty: a.remainingStock, ts: aTime };
          }
        }
      });
    } catch (e) {}

    return filteredItems.map((item) => {
      const patch = latestStockMap[item.name];
      if (patch) {
        const itemUpdateTs = item.updatedAt
          ? new Date(item.updatedAt).getTime()
          : 0;
        // If the purchase happened AFTER the last time the admin edited the item, use the patched stock
        if (patch.ts > itemUpdateTs && patch.qty < item.quantity) {
          return { ...item, quantity: patch.qty };
        }
      }
      return item;
    });
  };

  const patchedItems = getPatchedStockItems();

  const sortedItems = [...patchedItems].sort((a, b) => {
    // 1. Stock Status Prioritization: In-stock items (quantity > 0) go up, Out-of-stock items (quantity === 0) go down
    const aHasStock = a.quantity > 0 ? 1 : 0;
    const bHasStock = b.quantity > 0 ? 1 : 0;
    if (aHasStock !== bHasStock) {
      return bHasStock - aHasStock; // 1 comes before 0 (in-stock first)
    }

    // 2. Pin Status: Pinned items (isPinned === true) go up, Unpinned items go down
    const aPinned = a.isPinned ? 1 : 0;
    const bPinned = b.isPinned ? 1 : 0;
    if (aPinned !== bPinned) {
      return bPinned - aPinned; // 1 comes before 0 (pinned first)
    }

    // 2.5 Category Grouping: When viewing 'All' categories, group items of the same category together
    if (selectedCategory === "all") {
      const categoryOrder = true
        ? [
            "Grow A Garden 2",
            "ALL STAR",
            "Coming Soon",
            "Other services",
            "VIP Codes",
          ]
        : false
          ? ["รหัส ROV"]
          : [
              "Serum",
              "Bloodline",
              "Skin",
              "Artifact",
              "Scroll/Key",
              "Perk",
              "Other",
            ];
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);
      if (indexA !== -1 && indexB !== -1 && indexA !== indexB) {
        return indexA - indexB; // Keeps category order unified
      }
    }

    // 3. User sub-sort criteria
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "stock-desc":
        return b.quantity - a.quantity;
      case "stock-asc":
        return a.quantity - b.quantity;
      default: {
        const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const fallbackB = isNaN(timeB) ? 0 : timeB;
        const fallbackA = isNaN(timeA) ? 0 : timeA;
        return fallbackB - fallbackA;
      }
    }
  });

  const renderModals = () => (
    <>
      {/* Processing Purchase / Topup Overlay */}
      <AnimatePresence>
        {(isProcessingPurchase || isProcessingTopup) && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900 "
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative bg-[#050505]/95 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] flex flex-col items-center overflow-hidden min-w-[320px]"
            >
              {/* Decorative Background Gradients */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] pointer-events-none rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0ea5e9]/10 blur-[50px] pointer-events-none rounded-full" />

              <div className="relative mb-6 w-20 h-20 flex items-center justify-center">
                <motion.div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full" />
                <motion.div
                  className="absolute inset-0 border-4 border-emerald-400 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white tracking-wide mb-2 font-display">
                ระบบกำลังทำรายการ...
              </h3>
              <p className="text-[11px] text-zinc-500 font-mono tracking-[0.2em] font-medium uppercase mt-1">
                Please wait • Do not close
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gacha Result Modal */}
      <GachaResultModal
        isOpen={!!gachaResult}
        onClose={() => {
          setGachaResult(null);
          setShowHistoryModal(true);
        }}
        result={gachaResult}
      />

      {/* Admin modal for Adding/Editing stock items */}
      <AdminModal
        isOpen={isFormOpen}
        globalStats={globalStats}
        onClose={() => {
          setIsFormOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        editingItem={editingItem}
        currentGame={appScreen as any}
      />

      <StockManagerModal
        isOpen={isStockManagerOpen}
        onClose={() => setIsStockManagerOpen(false)}
        items={items.filter((it) => it.game === appScreen)}
        onEdit={(item) => {
          setEditingItem(item);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteItem}
        onAddNew={() => {
          setEditingItem(null);
          setIsFormOpen(true);
        }}
      />

      <CustomerDatabaseModal
        isOpen={isCustomerDbOpen}
        onClose={() => setIsCustomerDbOpen(false)}
        appScreen={appScreen}
        onViewUserHistory={(username) => {
          setViewingUserHistory(username);
        }}
      />

      <CouponManagerModal
        isOpen={isCouponManagerOpen}
        onClose={() => setIsCouponManagerOpen(false)}
      />

      <AnnouncementManagerModal
        isOpen={isAnnouncementManagerOpen}
        onClose={() => setIsAnnouncementManagerOpen(false)}
      />

      <ImageSettingsModal
        isOpen={isImageSettingsOpen}
        onClose={() => setIsImageSettingsOpen(false)}
      />

      {(currentUser || viewingUserHistory) && (
        <HistoryModal
          isOpen={showHistoryModal || !!viewingUserHistory}
          initialTab={historyTab}
          onClose={() => {
            setShowHistoryModal(false);
            setViewingUserHistory(null);
          }}
          username={viewingUserHistory || currentUser?.username || ""}
          items={items}
        />
      )}

      <TopupTosModal
        isOpen={showTopupTos}
        onClose={() => setShowTopupTos(false)}
      />

      <PaymentSettingsModal
        isOpen={isPaymentConfigOpen}
        onClose={() => setIsPaymentConfigOpen(false)}
        globalStats={globalStats}
        setGlobalStats={setGlobalStats}
      />

      <CategoryManagerModal
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
        globalStats={globalStats}
        setGlobalStats={setGlobalStats}
      />
    </>
  );

  // Calculate high-level stats based on current game context
  const currentContextItems = items.filter((it) => it.game === appScreen);

  const totalStockItems = currentContextItems.length;
  const inStockCount = currentContextItems.filter(
    (it) => it.quantity > 0,
  ).length;
  const totalStockUnits = currentContextItems.reduce(
    (acc, curr) => acc + curr.quantity,
    0,
  );
  const totalStockValue = currentContextItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  const renderAppScreen = () => {
    if (
      isUnderMaintenance &&
      !isAdmin &&
      appScreen !== "LOADING" &&
      appScreen !== "TRANSITION"
    ) {
      return (
        <motion.div
          key="maintenance"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] bg-zinc-900 flex flex-col items-center justify-center p-6 text-center select-none text-zinc-100 font-display tracking-tight"
        >
          <div className="max-w-md w-full bg-zinc-900 shadow-sm border border-zinc-800 p-8 rounded-3xl border border-amber-500/30 shadow-2xl  relative">
            <div className="w-20 h-20 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <svg
                className="w-10 h-10 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-display font-medium tracking-tighter glowing-text mb-3">
              ระบบอยู่ระหว่างการปรับปรุง 🛠️
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              ขณะนี้เว็บไซต์กำลังอยู่ในช่วงปรับปรุงระบบชั่วคราว
              กรุณาอดทนรอและระบบจะเปิดให้ใช้งานอีกครั้งโดยอัตโนมัติเมื่อเสร็จสิ้น!
              ขออภัยในความไม่สะดวกครับ
            </p>
            <button
              onClick={() => {
                setAuthMode("login");
                setAppScreen("LOGIN");
              }}
              className="mt-4 px-4 py-2 text-xs font-bold bg-zinc-800 text-zinc-400 rounded-lg border border-zinc-700 hover:text-white"
            >
              สำหรับแอดมิน
            </button>
            <div className="flex justify-center space-x-2 pb-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setAppScreen("LOGIN");
                setAuthMode("login");
              }}
              className="mt-6 text-[12px] font-bold text-zinc-600 hover:text-zinc-300 transition-colors bg-zinc-800/50 hover:bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700/50"
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                เข้าสู่ระบบผู้ดูแลระบบ
              </span>
            </motion.button>
          </div>
          {renderModals()}
        </motion.div>
      );
    }

    if (["SHOP", "TOPUP", "LOGIN", "PROFILE"].includes(appScreen)) {
      return (
        <motion.div
          key={appScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="min-h-[100vh] min-h-[100dvh] flex flex-col bg-transparent text-zinc-200 font-display tracking-tight selection:bg-indigo-500 selection:text-zinc-100 relative w-full"
        >
          <ShopHeader
            globalStats={globalStats}
            toggleSidebar={() => setIsAstdMenuOpen(true)}
            onSearchToggle={() => setIsSearchOpen(true)}
            currentUser={currentUserData || currentUser}
            onLoginClick={() => {
              setAppScreen("LOGIN");
              setAuthMode("login");
            }}
            onLogout={handleLogout}
            setAppScreen={setAppScreen}
            currentScreen={appScreen}
            onLogoClick={() => {
              setIsLoadingStock(true);
              setTimeout(() => {
                window.location.href = "/";
              }, 800);
            }}
          />
          {appScreen === "SHOP" && (
            <>
              <AnnouncementPopup
                appScreen={appScreen}
                isLoadingData={isLoadingStock}
              />
            </>
          )}

          {/* Dynamic Floating Toast Notification */}
          <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center pointer-events-none w-full max-w-[340px] px-4">
            <AnimatePresence mode="popLayout">
              {toasts.map((toast, index) => {
                // Stack effect calculations
                // Index 0 is the newest (top). Index 1 is behind it, etc.
                const scale = 1 - index * 0.05;
                const yOffset = index * 8;
                const opacity = 1 - index * 0.2;
                
                return (
                  <motion.div
                    key={toast.id}
                    layout
                    initial={{ opacity: 0, y: -50, scale: 0.9, filter: "blur(8px)" }}
                    animate={{ opacity: opacity, y: yOffset, scale: scale, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)", transition: { duration: 0.2, ease: "easeOut" } }}
                    transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                    style={{ zIndex: 100 - index }}
                    className={`absolute top-0 w-full bg-[#1c1c1e]/90 backdrop-blur-xl px-3 py-3 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 flex items-start gap-3 pointer-events-auto`}
                  >
                    <div className="flex-shrink-0 relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 border border-white/10 shadow-sm">
                        {globalStats?.announcement_settings?.shopLogoUrl ? (
                          <img src={globalStats.announcement_settings.shopLogoUrl} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-indigo-500/20 text-indigo-400">
                            <span className="font-bold text-lg">K</span>
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 p-[2px] bg-[#1c1c1e] rounded-full">
                        {toast.type === "success" ? (
                          <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </div>
                        ) : toast.type === "error" ? (
                          <div className="w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Info className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-[13px] text-zinc-100 truncate tracking-wide">
                          {globalStats?.announcement_settings?.shopName || 'Kuwashii'}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-medium">ตอนนี้</span>
                      </div>
                      <p className="text-[13px] text-zinc-300 leading-snug line-clamp-2">
                        {toast.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Hero Header Section */}
          {!inquiringItem &&
            appScreen !== "TOPUP" &&
            appScreen !== "LOGIN" &&
            appScreen !== "PROFILE" &&
            selectedCategory === "all" &&
            !search && <ShopBanner globalStats={globalStats} items={items} />}

          {/* Main Container */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex-grow w-full">
            {d1AuthError && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-4 text-red-400 max-w-2xl mx-auto">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-red-300">Database Connection Error</h3>
                  <p className="text-sm mt-1">Failed to connect to Cloudflare D1. The provided API Token is invalid or has expired.</p>
                  <p className="text-xs mt-2 opacity-80">Please update <code className="bg-red-950/50 px-1 py-0.5 rounded">CF_API_TOKEN</code> in your AI Studio settings.</p>
                </div>
              </div>
            )}
            
            {inquiringItem ? (
              inquiringItem.gachaPool && inquiringItem.gachaPool.length > 0 ? (
                <RandomBoxModal
                  key="random-box-modal"
                  item={inquiringItem}
                  onClose={() => setInquiringItem(null)}
                  onBuy={handleBuyItem}
                  isProcessing={isProcessingPurchase}
                />
              ) : (
                <InquiryModal
                  key="inquiry-modal"
                  item={inquiringItem}
                  onClose={() => setInquiringItem(null)}
                  onBuy={handleBuyItem}
                  isProcessing={isProcessingPurchase}
                />
              )
            ) : appScreen === "LOGIN" ? (
              <AuthPage
                authMode={authMode}
                setAuthMode={setAuthMode}
                authUsername={authUsername}
                setAuthUsername={setAuthUsername}
                authEmail={authEmail}
                setAuthEmail={setAuthEmail}
                authPassword={authPassword}
                setAuthPassword={setAuthPassword}
                authConfirmPassword={authConfirmPassword}
                setAuthConfirmPassword={setAuthConfirmPassword}
                showAuthPassword={showAuthPassword}
                setShowAuthPassword={setShowAuthPassword}
                showAuthConfirmPassword={showAuthConfirmPassword}
                setShowAuthConfirmPassword={setShowAuthConfirmPassword}
                authOtpCode={authOtpCode}
                setAuthOtpCode={setAuthOtpCode}
                rememberAuth={rememberAuth}
                setRememberAuth={setRememberAuth}
                authError={authError}
                setAuthError={setAuthError}
                handleAuthSubmit={handleAuthSubmit}
                isProcessing={isAuthLoading}
                isCaptchaVerified={isCaptchaVerified}
                setIsCaptchaVerified={setIsCaptchaVerified}
              />
            ) : appScreen === "PROFILE" ? (
              <UserProfileDashboard
                currentUser={currentUserData || currentUser}
                setAppScreen={setAppScreen}
                onChangePassword={handleChangePassword}
                onChangeUsername={handleChangeUsername}
                onChangeEmail={handleChangeEmail}
              />
            ) : appScreen === "TOPUP" ? (
              <TopupPage
                tosAccepted={tosAccepted}
                setTosAccepted={setTosAccepted}
                topupModalStep={topupModalStep}
                setTopupModalStep={setTopupModalStep}
                angpaoCode={topupCode}
                setAngpaoCode={setTopupCode}
                slipFile={slipFile}
                setSlipFile={setSlipFile}
                setShowTopupTos={setShowTopupTos}
                isProcessingTopup={isProcessingTopup}
                handleTopup={handleTopupSubmit}
                setAppScreen={setAppScreen}
                globalStats={globalStats}
                successMessage={topupSuccessMessage}
              />
            ) : (
              <>
                {/* Category Cards Section */}
                {selectedCategory === "all" && !search ? (
                  <>
                    <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                      {!currentUser && globalStats?.announcement_settings?.loginBannerUrl && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setAppScreen("LOGIN")}
                          className="cursor-pointer rounded-2xl overflow-hidden border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] group"
                        >
                          <img 
                            src={globalStats.announcement_settings.loginBannerUrl} 
                            alt="Login" 
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity aspect-[2/1]"
                          />
                        </motion.div>
                      )}
                      
                      {globalStats?.announcement_settings?.productsBannerUrl && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedCategory("all")}
                          className="cursor-pointer rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] group"
                        >
                          <img 
                            src={globalStats.announcement_settings.productsBannerUrl} 
                            alt="All Products" 
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity aspect-[2/1]"
                          />
                        </motion.div>
                      )}

                      {globalStats?.announcement_settings?.topupBannerUrl && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setAppScreen("TOPUP")}
                          className="cursor-pointer rounded-2xl overflow-hidden border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] group"
                        >
                          <img 
                            src={globalStats.announcement_settings.topupBannerUrl} 
                            alt="Topup" 
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity aspect-[2/1]"
                          />
                        </motion.div>
                      )}

                      {globalStats?.announcement_settings?.contactBannerUrl && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.open("https://discord.gg/AQKtJpvyva", "_blank")}
                          className="cursor-pointer rounded-2xl overflow-hidden border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)] group"
                        >
                          <img 
                            src={globalStats.announcement_settings.contactBannerUrl} 
                            alt="Contact Admin" 
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity aspect-[2/1]"
                          />
                        </motion.div>
                      )}
                    </div>
                    <RecentPurchases appScreen={appScreen} items={items} />
                    <CategoryList
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      globalStats={globalStats}
                    />
                  </>
                ) : (
                  !search && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-7xl mx-auto mb-6 w-full flex flex-col gap-2 mt-2"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 mb-1">
                        <button
                          onClick={() => setSelectedCategory("all")}
                          className="hover:text-[#0ea5e9] transition-colors cursor-pointer text-[#0ea5e9]"
                        >
                          รายการหมวดหมู่
                        </button>
                        <span className="text-zinc-600">&gt;</span>
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-white uppercase"
                        >
                          {selectedCategory}
                        </motion.span>
                      </div>

                      <div className="flex flex-row justify-between items-center gap-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelectedCategory("all")}
                            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer flex-shrink-0"
                            title="ย้อนกลับ"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <motion.h2
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 0.15,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="text-2xl md:text-3xl font-black text-[#0ea5e9] tracking-tight uppercase leading-tight font-display line-clamp-1"
                          >
                            {selectedCategory}
                          </motion.h2>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                          }}
                          className="flex items-center justify-center gap-1 bg-[#002f5d] border border-[#0ea5e9]/30 rounded-full px-2.5 py-1 shadow-md shadow-[#0ea5e9]/10 whitespace-nowrap shrink-0"
                        >
                          <Star className="w-3 h-3 fill-[#0ea5e9] text-[#0ea5e9]" />
                          <span className="text-[#0ea5e9] text-[10px] font-bold">
                            แนะนำ
                          </span>
                        </motion.div>
                      </div>

                      <div className="flex items-center justify-between pt-1 mt-1">
                        <h3 className="text-sm font-bold text-[#0ea5e9]">
                          สินค้าในหมวดหมู่นี้
                        </h3>
                        <div className="text-zinc-300 font-bold text-xs">
                          ทั้งหมด{" "}
                          {
                            items.filter(
                              (i) => (i.category || "") === selectedCategory,
                            ).length
                          }{" "}
                          สินค้า
                        </div>
                      </div>
                    </motion.div>
                  )
                )}

                {/* Admin Tools ASTD */}
                {isAdmin && (
                  <section className="bg-zinc-900 shadow-sm border border-zinc-800 border border-indigo-500/20 p-5 rounded-2xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none -z-10" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0 animate-pulse">
                          <SlidersHorizontal className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">
                            แผงจัดการสต๊อก
                          </h3>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            จัดการเพิ่ม หรือแก้ไขฐานข้อมูลคลังสินค้าได้แบบ
                            Real-time
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsCustomerDbOpen(true)}
                          className="py-2 px-4 rounded-2xl bg-purple-500/20 text-purple-400 hover:text-zinc-100 border border-purple-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-500/10"
                        >
                          <Users className="w-4 h-4" /> ระบบฐานลูกค้า (Customer
                          DB)
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleMaintenanceMode}
                          className={`py-2 px-4 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg ${globalStats?.maintenance_mode ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"}`}
                        >
                          <AlertTriangle className="w-4 h-4" />{" "}
                          {globalStats?.maintenance_mode
                            ? "เปิดเว็บ"
                            : "ปิดเว็บซ่อมปรุง"}
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsCouponManagerOpen(true)}
                          className="py-2 px-4 rounded-2xl bg-emerald-500/20 text-emerald-400 hover:text-zinc-100 border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
                        >
                          <Gift className="w-4 h-4" /> จัดการโค้ดคูปอง
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsAnnouncementManagerOpen(true)}
                          className="py-2 px-4 rounded-2xl bg-amber-500/20 text-amber-400 hover:text-zinc-100 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
                        >
                          <Bell className="w-4 h-4" /> จัดการแจ้งเตือนต่างๆ
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsImageSettingsOpen(true)}
                          className="py-2 px-4 rounded-2xl bg-fuchsia-500/20 text-fuchsia-400 hover:text-zinc-100 border border-fuchsia-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-fuchsia-500/10"
                        >
                          <ImageIcon className="w-4 h-4" /> จัดการรูปภาพร้านค้า
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsPaymentConfigOpen(true)}
                          className="py-2 px-4 rounded-2xl bg-blue-500/20 text-blue-400 hover:text-zinc-100 border border-blue-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10"
                        >
                          <Wallet className="w-4 h-4" /> จัดการช่องทางชำระเงิน
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsCategoryManagerOpen(true)}
                          className="py-2 px-4 rounded-2xl bg-rose-500/20 text-rose-400 hover:text-zinc-100 border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-500/10"
                        >
                          <FolderPlus className="w-4 h-4" /> จัดการหมวดหมู่
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsStockManagerOpen(true)}
                          className="py-2 px-4 rounded-2xl bg-indigo-500/20 text-indigo-400 hover:text-zinc-100 border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Package className="w-4 h-4" /> ระบบผู้ดูแลสต๊อก
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsFormOpen(true)}
                          className="py-2 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-zinc-100 text-xs font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" /> เพิ่มสินค้า
                        </motion.button>
                      </div>
                    </div>
                  </section>
                )}

                {/* Recommended Products Header */}
                <div className="flex items-center justify-between mb-4 mt-8">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-zinc-100">
                      {search ? `ผลการค้นหา: "${search}"` : "สินค้าแนะนำ"}
                    </h2>
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 transition-colors"
                      >
                        ยกเลิกการค้นหา
                      </button>
                    )}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium border border-zinc-800 rounded-full text-zinc-300 hover:bg-zinc-800"
                  >
                    ดูเพิ่มเติม{" "}
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </motion.button>
                </div>

                {/* Item Grid */}
                {isLoadingStock ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <ItemCardSkeleton key={`astd-skel-${idx}`} />
                    ))}
                  </div>
                ) : sortedItems.length === 0 ? (
                  <div className="text-center py-24 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <Inbox className="w-16 h-16 text-indigo-500/50 mx-auto mb-6" />
                    <h2 className="text-lg font-black text-zinc-100 mb-2 uppercase tracking-wide">
                      {search ? `ไม่พบสินค้าสำหรับ "${search}"` : "ไม่พบสินค้าในสต๊อก"}
                    </h2>
                    <p className="text-zinc-500 text-sm">
                      {search ? "ลองค้นหาด้วยคำอื่น หรือกลับไปดูสินค้าทั้งหมด" : "ขณะนี้ยังไม่มีสินค้าวางจำหน่ายในหมวดหมู่นี้"}
                    </p>
                  </div>
                ) : (
                  <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4"
                  >
                    <AnimatePresence>
                      {sortedItems.map((item) => (
                        <ItemCard
                          appScreen={appScreen}
                          key={item.id}
                          item={item}
                          isAdmin={isAdmin}
                          onEdit={(it) => {
                            setEditingItem(it);
                            setIsFormOpen(true);
                          }}
                          onDelete={handleDeleteItem}
                          onQuickQuantityChange={handleQuickQuantityChange}
                          onInquire={() => setInquiringItem(item)}
                          onBuy={handleBuyItem}
                          onTogglePin={handleTogglePin}
                          onCategoryClick={(cat) => {
                            setSelectedCategory(cat);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}

                <DiscordBanner />
              </>
            )}
          </main>

          {/* Custom Footer */}
          <footer className="mt-auto pt-4 pb-2 sm:pt-6 sm:pb-4 relative z-10 border-t border-zinc-800/60 bg-transparent w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-center">
                <p className="text-zinc-400 tracking-wide text-center flex items-center gap-1.5 text-xs sm:text-sm">
                  Powered by <span className="font-semibold text-zinc-200">Vercel</span> &middot; Code by <span className="font-semibold text-zinc-200">dis.cord01</span>
                </p>
              </div>
            </div>
          </footer>

          <MobileDrawer
            isOpen={isAstdMenuOpen}
            onClose={() => setIsAstdMenuOpen(false)}
            currentUser={currentUserData || currentUser}
            onLoginClick={() => {
              setAppScreen("LOGIN");
              setAuthMode("login");
            }}
            onLogoutClick={handleLogout}
            setPage={setAppScreen}
            setShowTopupModal={setShowTopupModal}
            openHistoryModal={openHistoryModal}
          />
          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            initialSearch={search}
            onSearchSubmit={setSearch}
            items={items}
            onItemClick={(item) => {
              setIsSearchOpen(false);
              setInquiringItem(item);
            }}
          />

          {renderModals()}
        </motion.div>
      );
    }

    return null;
  }; // end renderAppScreen

  return (
    <>
      <ShootingStars />
      <GlobalLoadingScreen isLoading={isLoadingStock} />
      <AnimatePresence mode="wait">{renderAppScreen()}</AnimatePresence>
      {!isLoadingStock && <AIChatWidget items={items} shopLogoUrl={globalStats?.announcement_settings?.shopLogoUrl} currentUser={currentUser} onLoginClick={() => setAppScreen("LOGIN")} aiStatus={globalStats?.ai_status} />}
    </>
  );
}
