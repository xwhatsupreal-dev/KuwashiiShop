import.meta.env = {"BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false, "VITE_CF_API_TOKEN": "cfut_iLQ6P7ycYrURTEU057VkHby1C1DWOusMnhnoJyFK2c29c41f", "VITE_TURNSTILE_SITE_KEY": "0x4AAAAAADoOeua1DFnoL15G"};import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=ee75e0c3"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=ee75e0c3"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"];
import { useLocation, useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=ee75e0c3";
import { motion, AnimatePresence } from "/node_modules/.vite/deps/motion_react.js?v=ee75e0c3";
import { parseUTCDate, formatThaiDate } from "/src/utils/date.ts";
import {
  Plus,
  SlidersHorizontal,
  Package,
  AlertTriangle,
  Inbox,
  CheckCircle,
  Bell,
  ChevronLeft,
  ChevronRight,
  Users,
  Wallet,
  Gift,
  Info,
  Star,
  FolderPlus,
  Image as ImageIcon,
  RefreshCw,
  Gamepad2
} from "/node_modules/.vite/deps/lucide-react.js?v=ee75e0c3";
import { DEFAULT_PRESETS } from "/src/presets.ts";
import { ItemCard } from "/src/components/ItemCard.tsx";
import { CategoryList } from "/src/components/CategoryList.tsx";
import { ItemCardSkeleton } from "/src/components/ItemCardSkeleton.tsx";
import { InquiryModal } from "/src/components/InquiryModal.tsx";
import { RandomBoxModal } from "/src/components/RandomBoxModal.tsx";
import { GachaResultModal } from "/src/components/GachaResultModal.tsx";
import { AdminModal } from "/src/components/AdminModal.tsx";
import { ApiStatusWidget } from "/src/components/ApiStatusWidget.tsx";
import { StockManagerModal } from "/src/components/StockManagerModal.tsx";
import { CustomerDatabaseModal } from "/src/components/CustomerDatabaseModal.tsx";
import { HistoryModal } from "/src/components/HistoryModal.tsx";
import { CouponManagerModal } from "/src/components/CouponManagerModal.tsx";
import { AnnouncementManagerModal } from "/src/components/AnnouncementManagerModal.tsx";
import { ImageSettingsModal } from "/src/components/ImageSettingsModal.tsx";
import { AnnouncementPopup } from "/src/components/AnnouncementPopup.tsx";
import { ShopHeader } from "/src/components/ShopHeader.tsx";
import { ShopBanner } from "/src/components/ShopBanner.tsx";
import { TopupPage } from "/src/components/TopupPage.tsx";
import { TopupTosModal } from "/src/components/TopupTosModal.tsx";
import { PaymentSettingsModal } from "/src/components/PaymentSettingsModal.tsx";
import { ApiStatusModal } from "/src/components/ApiStatusModal.tsx";
import { CategoryManagerModal } from "/src/components/CategoryManagerModal.tsx";
import { AuthPage } from "/src/components/AuthPage.tsx";
import { GameTopupPage } from "/src/components/GameTopupPage.tsx";
import { GlobalLoadingScreen } from "/src/components/GlobalLoadingScreen.tsx";
import { UserProfileDashboard } from "/src/components/UserProfileDashboard.tsx";
import __vite__cjsImport33_jsqr from "/node_modules/.vite/deps/jsqr.js?v=ee75e0c3"; const jsQR = __vite__cjsImport33_jsqr.__esModule ? __vite__cjsImport33_jsqr.default : __vite__cjsImport33_jsqr;
const readQRFromImage = (file) => {
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
      img.src = e.target?.result;
    };
    reader.readAsDataURL(file);
  });
};
import {
  sendDiscordTopupEmbed,
  sendDiscordPurchaseEmbed,
  sendDiscordStockUpdateEmbed
} from "/src/discord.ts";
import { supabase } from "/src/supabase.ts";
import { fetchItems, fetchUser, getSystemConfig } from "/src/queries.ts";
import { MobileDrawer } from "/src/components/MobileDrawer.tsx";
import { SearchOverlay } from "/src/components/SearchOverlay.tsx";
import { AIChatWidget } from "/src/components/AIChatWidget.tsx";
import { ShootingStars } from "/src/components/ShootingStars.tsx";
export const addLiveActivity = async (activity) => {
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
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    ]);
    if (!error) {
      window.dispatchEvent(new Event("sync-update"));
    }
  } catch (e) {
  }
};
const DiscordBanner = () => /* @__PURE__ */ jsxDEV("section", { className: "mt-16 sm:mt-24 max-w-sm mx-auto mb-10", children: /* @__PURE__ */ jsxDEV(
  "iframe",
  {
    src: "https://discord.com/widget?id=1510845435751829565&theme=dark",
    width: "100%",
    height: "500",
    frameBorder: "0",
    sandbox: "allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts",
    className: "rounded-2xl shadow-xl w-full"
  },
  void 0,
  false,
  {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 173,
    columnNumber: 5
  },
  this
) }, void 0, false, {
  fileName: "/app/applet/src/App.tsx",
  lineNumber: 172,
  columnNumber: 3
}, this);
import { RecentPurchases } from "/src/components/RecentPurchases.tsx";
export default function App() {
  const [showUpdateOverlay, setShowUpdateOverlay] = useState(false);
  useEffect(() => {
    let initialVersion = null;
    const checkVersion = async () => {
      try {
        const res = await fetch("/api/version");
        const data = await res.json();
        if (data.version) {
          if (!initialVersion) {
            initialVersion = data.version;
          } else if (initialVersion !== data.version) {
            setShowUpdateOverlay(true);
          }
        }
      } catch (e) {
      }
    };
    checkVersion();
    const interval = setInterval(checkVersion, 3e4);
    return () => clearInterval(interval);
  }, []);
  const [globalStats, setGlobalStats] = useState({
    global_sales_astd: 0,
    global_rev_astd: 0,
    global_free_astd: 0,
    maintenance_mode: false
  });
  const [currentUserData, setCurrentUserData] = useState(null);
  const isMaintenanceMode = globalStats?.maintenance_mode === "true" || globalStats?.maintenance_mode === true || globalStats?.maintenance_mode === 1 || globalStats?.maintenance_mode === "1";
  const isUnderMaintenance = isMaintenanceMode;
  const getInitialState = () => {
    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    let initAppScreen = "SHOP";
    let initSelectedCategory = "all";
    if (path === "/login") {
      initAppScreen = "LOGIN";
    } else if (path === "/topup") {
      initAppScreen = "TOPUP";
    } else if (path === "/game-topup") {
      initAppScreen = "GAMETOPUP";
    } else if (path === "/profile") {
      initAppScreen = "PROFILE";
    } else if (path.startsWith("/categories/")) {
      initSelectedCategory = decodeURIComponent(
        path.replace("/categories/", "")
      );
    }
    return { initAppScreen, initSelectedCategory };
  };
  const initialState = getInitialState();
  const [appScreen, setAppScreen] = useState(
    initialState.initAppScreen
  );
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const discordLogin = params.get("discord_login");
    const discordEmail = params.get("email");
    const discordAvatar = params.get("avatar");
    if (discordLogin) {
      const userPayload = {
        username: discordLogin,
        discord_email: discordEmail,
        avatar: discordAvatar
      };
      setCurrentUser(userPayload);
      localStorage.setItem(
        "KUWASHII_CURRENT_USER",
        JSON.stringify(userPayload)
      );
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  useEffect(() => {
    const handleMessage = (event) => {
      const origin = event.origin;
      if (!origin.endsWith(".run.app") && !origin.includes("localhost") && !origin.includes("studio.google.com") && !origin.includes("vercel.app")) {
        return;
      }
      if (event.data?.type === "OAUTH_AUTH_SUCCESS" && event.data.payload) {
        const payload = event.data.payload;
        const userPayload = {
          username: payload.username,
          discord_email: payload.email,
          avatar: payload.avatar
        };
        setCurrentUser(userPayload);
        localStorage.setItem(
          "KUWASHII_CURRENT_USER",
          JSON.stringify(userPayload)
        );
        setAppScreen("SHOP");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  const [currentUser, setCurrentUser] = useState(
    () => {
      const saved = localStorage.getItem("KUWASHII_CURRENT_USER") || sessionStorage.getItem("KUWASHII_CURRENT_USER");
      if (saved) return JSON.parse(saved);
      return null;
    }
  );
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("KUWASHII_IS_ADMIN") === "true" || sessionStorage.getItem("KUWASHII_IS_ADMIN") === "true";
  });
  const [loadingVariant, setLoadingVariant] = useState(1);
  const [isAstdMenuOpen, setIsAstdMenuOpen] = useState(false);
  const [gachaResult, setGachaResult] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoadingStock, setIsLoadingStock] = useState(true);
  const [d1AuthError, setD1AuthError] = useState(false);
  const [isServerQuotaExceeded, setIsServerQuotaExceeded] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    initialState.initSelectedCategory
  );
  const [selectedSaleFormat, setSelectedSaleFormat] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [syncCounter, setSyncCounter] = useState(0);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [appScreen, selectedCategory]);
  useEffect(() => {
    let activeSyncId = 0;
    const handleSync = async () => {
      const syncId = ++activeSyncId;
      const migrateItems = (itemsList) => {
        return itemsList.map((item) => {
          if (item && item.category === "Equipment") {
            return { ...item, category: "Skin" };
          }
          return item;
        });
      };
      try {
        const dbItems = await fetchItems();
        if (syncId !== activeSyncId) return;
        if (dbItems && dbItems.length > 0) {
          setItems(migrateItems(dbItems));
        } else {
          setItems([]);
        }
        setIsServerQuotaExceeded(false);
        setD1AuthError(false);
      } catch (e) {
        if (e && e.message === "D1_AUTH_ERROR") {
          setD1AuthError(true);
        }
        setItems([]);
      }
      const config = await getSystemConfig();
      if (syncId !== activeSyncId) return;
      if (config) {
        try {
          const { count, error } = await supabase.from("profiles").select("*", { count: "exact", head: true });
          if (!error && count !== null) {
            config.user_count = count;
          }
          const legacyGlobalSum = (Number(config.global_sales_astd) || 0) + (Number(config.global_sales_rov) || 0) + (Number(config.global_sales_aotr) || 0);
          const trackedSalesCount = Number(config.all_time_sales_count) || 0;
          config.total_purchases = Math.max(legacyGlobalSum, trackedSalesCount);
          const { data: allTopups } = await supabase.from("topups").select("amount");
          if (allTopups) {
            config.total_topups = allTopups.reduce(
              (acc, topup) => acc + (parseFloat(topup.amount) || 0),
              0
            );
          }
        } catch (e) {
        }
        if (syncId !== activeSyncId) return;
        setGlobalStats(config);
        if (config.announcement_settings) {
          localStorage.setItem(
            "KUWASHII_ANNOUNCEMENT_SETTINGS",
            JSON.stringify(config.announcement_settings)
          );
          window.dispatchEvent(new Event("sync-announcement"));
        }
      }
      if (currentUser?.username) {
        const u = await fetchUser(currentUser.username);
        let totalTopups = 0;
        try {
          const { data: topupsData } = await supabase.from("topups").select("amount").eq("username", currentUser.username);
          if (topupsData) {
            totalTopups = topupsData.reduce(
              (acc, curr) => acc + (parseFloat(curr.amount) || 0),
              0
            );
          }
        } catch (e) {
        }
        if (syncId !== activeSyncId) return;
        if (u) {
          setCurrentUserData({ ...u, topupCount: totalTopups });
        }
      }
      setIsLoadingStock(false);
      setSyncCounter((c) => c + 1);
    };
    handleSync();
    const throttledHandleSync = () => {
      if (window._syncDebounce)
        clearTimeout(window._syncDebounce);
      window._syncDebounce = setTimeout(() => {
        handleSync();
      }, 3e3);
    };
    window.addEventListener("sync-update", handleSync);
    const realtimeChannel = supabase.channel("public-db-changes").on("postgres_changes", { event: "*", schema: "public" }, () => {
      throttledHandleSync();
    }).subscribe();
    return () => {
      window.removeEventListener("sync-update", handleSync);
      supabase.removeChannel(realtimeChannel);
    };
  }, [currentUser]);
  const [authMode, setAuthMode] = useState("login");
  const [authUsername, setAuthUsername] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authOtpCode, setAuthOtpCode] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(!import.meta.env.VITE_TURNSTILE_SITE_KEY || import.meta.env.VITE_TURNSTILE_SITE_KEY === "1x00000000000000000000AA");
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [showAuthConfirmPassword, setShowAuthConfirmPassword] = useState(false);
  const [showMockEmailModal, setShowMockEmailModal] = useState(false);
  const [mockEmailModalData, setMockEmailModalData] = useState(null);
  const [rememberAuth, setRememberAuth] = useState(true);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [topupTarget, setTopupTarget] = useState("balance");
  const [currentView, setCurrentView] = useState("store");
  const [topupModalStep, setTopupModalStep] = useState("select");
  useEffect(() => {
    setTopupModalStep("select");
    setTopupCode("");
    setSlipFile(null);
  }, [appScreen, topupTarget]);
  const [topupSuccessMessage, setTopupSuccessMessage] = useState("");
  const [topupCode, setTopupCode] = useState("");
  const [slipFile, setSlipFile] = useState(null);
  const [tosAccepted, setTosAccepted] = useState(false);
  const [showTopupTos, setShowTopupTos] = useState(false);
  const [selectedTopupChannel, setSelectedTopupChannel] = useState(null);
  const [isProcessingTopup, setIsProcessingTopup] = useState(false);
  const [isProcessingPurchase, setIsProcessingPurchase] = useState(false);
  const isProcessingPurchaseRef = useRef(false);
  const [toasts, setToasts] = useState([]);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isStockManagerOpen, setIsStockManagerOpen] = useState(false);
  const [isCustomerDbOpen, setIsCustomerDbOpen] = useState(false);
  const [isCouponManagerOpen, setIsCouponManagerOpen] = useState(false);
  const [isPaymentConfigOpen, setIsPaymentConfigOpen] = useState(false);
  const [isApiStatusOpen, setIsApiStatusOpen] = useState(false);
  const [isImageSettingsOpen, setIsImageSettingsOpen] = useState(false);
  const [isAnnouncementManagerOpen, setIsAnnouncementManagerOpen] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyTab, setHistoryTab] = useState(
    "purchases"
  );
  const openHistoryModal = (tab) => {
    setHistoryTab(tab);
    setShowHistoryModal(true);
  };
  const [viewingUserHistory, setViewingUserHistory] = useState(
    null
  );
  const [editingItem, setEditingItem] = useState(null);
  const [inquiringItem, setInquiringItem] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isNavigating = useRef(false);
  const isInitialMount = useRef(true);
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
    } else if (appScreen === "GAMETOPUP") {
      newPath = "/game-topup";
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
    } else if (path === "/game-topup") {
      newAppScreen = "GAMETOPUP";
      newInquiringItem = null;
    } else if (path === "/profile") {
      newAppScreen = "PROFILE";
      newInquiringItem = null;
    } else if (path.startsWith("/categories/")) {
      newAppScreen = "SHOP";
      newSelectedCategory = decodeURIComponent(
        path.replace("/categories/", "")
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
    if (confirm(
      `คุณต้องการ${isMaintenanceMode ? "เปิด" : "ปิด"}เว็บไซต์ใช่หรือไม่?`
    )) {
      await supabase.from("system_config").update({
        maintenance_mode: !isMaintenanceMode
      }).eq("id", "main");
      window.dispatchEvent(new Event("sync-update"));
      showToast(isMaintenanceMode ? "เปิดร้านแล้ว!" : "ปิดร้าน (โหมดซ่อมบำรุง) แล้ว!", "success");
    }
  };
  const showToast = (text, type = "success") => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [{ id, text, type }, ...prev].slice(0, 3));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3e3);
  };
  const handleTopupSubmit = async (e) => {
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
    const handleTopupError = (errMessage, channel) => {
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
      const { data: couponData, error: couponError } = await supabase.from("coupons").select("*").eq("code", topupCode.trim()).maybeSingle();
      if (!couponData) {
        handleTopupError("โค้ดไม่ถูกต้องหรือไม่มีในระบบ", "coupon");
        return;
      }
      let coupon = {
        ...couponData,
        usedBy: typeof couponData.usedBy === "string" ? JSON.parse(couponData.usedBy || "[]") : couponData.usedBy || []
      };
      if (coupon) {
        if (coupon.usedBy && coupon.usedBy.includes(activeUsername)) {
          handleTopupError("คุณได้ใช้งานโค้ดนี้ไปแล้ว", "coupon");
          return;
        }
        const balanceField = topupTarget;
        const newBalance = Number(liveUser[balanceField] || 0) + coupon.amount;
        await supabase.from("profiles").update({ [balanceField]: newBalance }).eq("username", activeUsername);
        const { error: topupError } = await supabase.from("topups").insert([
          {
            username: activeUsername,
            amount: coupon.amount,
            method: `Coupon: ${coupon.code}`
          }
        ]);
        if (topupError) {
          await supabase.from("topups").insert([
            {
              username: activeUsername,
              amount: coupon.amount,
              method: `Coupon: ${coupon.code}`
            }
          ]);
        }
        await supabase.from("coupons").update({
          usedBy: JSON.stringify([...coupon.usedBy, activeUsername])
        }).eq("id", coupon.id);
        window.dispatchEvent(new Event("sync-update"));
        showToast(`ใช้คูปองสำเร็จ! ได้รับ ${coupon.amount.toLocaleString()} เครดิต`, "success");
        sendDiscordTopupEmbed(activeUsername, coupon.amount, "coupon", newBalance, true);
        setTopupSuccessMessage(
          `ใช้คูปองสำเร็จ! ได้รับ ${coupon.amount.toLocaleString()} เครดิต`
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
    if (topupModalStep === "angpao") {
      if (!slipFile) {
        showToast("กรุณาอัปโหลดสลิป TrueMoney Wallet", "error");
        setIsProcessingTopup(false);
        return;
      }
      const processAngpaoSlip = async () => {
        try {
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
                const transactionId = slipData.transRef || slipData.transactionId || slipData.rawSlip?.transactionId || slipData.rawSlip?.transRef || null;
                if (!transactionId) {
                  handleTopupError("ไม่พบเลขอ้างอิงในสลิป ไม่สามารถดำเนินการได้", "angpao");
                  return;
                }
                const { data: existingSlip } = await supabase.from("topups").select("id").eq("ref_id", transactionId).maybeSingle();
                if (existingSlip) {
                  handleTopupError("สลิปนี้ถูกใช้งานไปแล้ว!", "angpao");
                  return;
                }
                const receiverStr = JSON.stringify(slipData.receiver || slipData).replace(/[- ]/g, "");
                if (!receiverStr.includes("0928886584") && !receiverStr.includes("886584") && !receiverStr.includes("6584")) {
                  handleTopupError("สลิปนี้ไม่ได้โอนเงินเข้าเบอร์ 092-888-6584 ของร้านครับ", "angpao");
                  return;
                }
                const amount = parseFloat(slipData.amountInSlip || slipData.amount || data.amount) || 0;
                const configData = await getSystemConfig();
                const currentRev = configData ? Number(configData.global_rev_astd || 0) : 0;
                await supabase.from("system_config").update({ global_rev_astd: currentRev + amount }).eq("id", "main");
                const balanceField = topupTarget;
                const userBalance = Number(liveUser[balanceField] || 0);
                await supabase.from("profiles").update({ [balanceField]: userBalance + amount }).eq("username", activeUsername);
                await supabase.from("topups").insert([{
                  username: activeUsername,
                  amount,
                  method: "truewallet_slip",
                  ref_id: transactionId,
                  date: (/* @__PURE__ */ new Date()).toISOString()
                }]);
                setTopupSuccessMessage(`เติมเงินสำเร็จ ${amount.toFixed(2)} บาท`);
                showToast(`เติมเงินสำเร็จ ${amount.toFixed(2)} บาท`, "success");
                sendDiscordTopupEmbed(activeUsername, amount, topupModalStep, userBalance + amount, true);
                window.dispatchEvent(new Event("sync-update"));
                fetchUser(activeUsername);
                setTopupCode("");
                setSlipFile(null);
                setTimeout(() => {
                  setTopupSuccessMessage("");
                  setTopupModalStep("select");
                  setAppScreen("SHOP");
                }, 2e3);
              } else {
                handleTopupError(data.message || data.error?.message || "สลิปไม่ถูกต้อง หรือเช็คไม่ได้", "angpao");
              }
            } catch (e2) {
              handleTopupError("การเชื่อมต่อมีปัญหา กรุณาลองใหม่", "angpao");
            } finally {
              setIsProcessingTopup(false);
            }
          };
        } catch (error) {
          showToast("ระบบขัดข้อง กรุณาลองใหม่", "error");
          setIsProcessingTopup(false);
        }
      };
      processAngpaoSlip();
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
                const transactionId = slipData.transRef || slipData.transactionId || slipData.rawSlip?.transactionId || slipData.rawSlip?.transRef || null;
                if (!transactionId) {
                  handleTopupError("ไม่พบเลขอ้างอิงในสลิป ไม่สามารถดำเนินการได้", "bank");
                  return;
                }
                const { data: existingSlip } = await supabase.from("topups").select("id").eq("ref_id", transactionId).maybeSingle();
                if (existingSlip) {
                  handleTopupError("สลิปนี้ถูกใช้งานไปแล้ว!", "bank");
                  return;
                }
                const receiverStr = JSON.stringify(slipData.receiver || slipData.rawSlip?.receiver || slipData).replace(/[- ]/g, "");
                if (!receiverStr.includes("2133814461") && !receiverStr.includes("14461") && !receiverStr.includes("ธีรสิทธิ์")) {
                  handleTopupError("สลิปนี้ไม่ได้โอนเงินเข้าบัญชีของร้าน (ธีรสิทธิ์ สุวรรณศรี) ครับ", "bank");
                  return;
                }
                let amount = parseFloat(slipData.amount?.amount || slipData.amount || data.amount) || 0;
                if (slipData.rawSlip && slipData.rawSlip.amount) {
                  amount = parseFloat(slipData.rawSlip.amount.amount || slipData.rawSlip.amount) || amount;
                }
                const configData = await getSystemConfig();
                const currentRev = configData ? Number(configData.global_rev_astd || 0) : 0;
                await supabase.from("system_config").update({ global_rev_astd: currentRev + amount }).eq("id", "main");
                const balanceField = topupTarget;
                const userBalance = Number(liveUser[balanceField] || 0);
                await supabase.from("profiles").update({ [balanceField]: userBalance + amount }).eq("username", activeUsername);
                await supabase.from("topups").insert([{
                  username: activeUsername,
                  amount,
                  method: "bank_slip",
                  ref_id: transactionId,
                  date: (/* @__PURE__ */ new Date()).toISOString()
                }]);
                setTopupSuccessMessage(`เติมเงินสำเร็จ ${amount.toFixed(2)} บาท`);
                showToast(`เติมเงินสำเร็จ ${amount.toFixed(2)} บาท`, "success");
                sendDiscordTopupEmbed(activeUsername, amount, topupModalStep, userBalance + amount, true);
                window.dispatchEvent(new Event("sync-update"));
                fetchUser(activeUsername);
                setTopupCode("");
                setSlipFile(null);
                setTimeout(() => {
                  setTopupSuccessMessage("");
                  setTopupModalStep("select");
                  setAppScreen("SHOP");
                }, 2e3);
              } else {
                handleTopupError(data.message || data.error?.message || "ข้อมูลสลิปไม่ถูกต้อง หรือเช็คไม่ได้", "bank");
              }
            } catch (e2) {
              handleTopupError("การเชื่อมต่อมีปัญหา กรุณาลองใหม่", "bank");
            } finally {
              setIsProcessingTopup(false);
            }
          };
        } catch (error) {
          showToast("ระบบขัดข้อง กรุณาลองใหม่", "error");
          setIsProcessingTopup(false);
        }
      };
      processBankSlip();
      return;
    }
  };
  const handleAuthSubmit = async (e) => {
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
        if (!authUsername.trim() || !authPassword.trim() || authMode === "register" && (!authEmail.trim() || !authConfirmPassword.trim())) {
          setAuthError(
            authMode === "register" ? "กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง" : "กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน"
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
        if (authUsername.trim().toLowerCase() === "kuwashii_admin" && authPassword === "ZAZACI09") {
          setIsAdmin(true);
          setCurrentUser({ username: "Kuwashii_admin" });
          storage.setItem("KUWASHII_IS_ADMIN", "true");
          storage.setItem(
            "KUWASHII_CURRENT_USER",
            JSON.stringify({ username: "Kuwashii_admin" })
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
            const { data } = await supabase.from("profiles").select("*").eq("email", usernameTrimmed).limit(1).single();
            if (data) user = data;
          } catch (e2) {
          }
        }
        if (user && user.password === authPassword) {
          setCurrentUser({ username: user.username });
          storage.setItem(
            "KUWASHII_CURRENT_USER",
            JSON.stringify({ username: user.username })
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
        const { data } = await supabase.from("profiles").select("*").eq("email", authEmail.trim()).limit(1).single();
        if (!data) {
          setAuthError("ไม่พบบัญชีที่ผูกกับอีเมลนี้");
          return;
        }
        const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
        const expire = new Date(Date.now() + 15 * 60 * 1e3).toISOString();
        await supabase.from("profiles").update({ otp_code: otp, otp_expires_at: expire }).eq("username", data.username);
        try {
          const response = await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ toEmail: authEmail.trim(), otp })
          });
          const resData = await response.json();
          if (resData.error) {
            throw new Error(resData.error);
          }
        } catch (err) {
          console.error("Failed to send OTP:", err);
          setAuthError(
            err.message || "เกิดข้อผิดพลาดในการส่งอีเมล กรุณาลองใหม่อีกครั้ง"
          );
          return;
        }
        setAuthMode("forgot_verify_otp");
        setAuthError("");
        showToast("รหัส OTP ถูกส่งไปยังอีเมลของคุณแล้ว", "success");
      } else if (authMode === "forgot_verify_otp") {
        const { data } = await supabase.from("profiles").select("*").eq("email", authEmail.trim()).limit(1).single();
        if (!data) {
          setAuthError("ไม่พบบัญชีที่ผูกกับอีเมลนี้");
          return;
        }
        if (data.otp_code !== authOtpCode.trim()) {
          setAuthError("รหัส OTP ไม่ถูกต้อง");
          return;
        }
        if (new Date(data.otp_expires_at) < /* @__PURE__ */ new Date()) {
          setAuthError("รหัส OTP หมดอายุแล้ว");
          return;
        }
        await supabase.from("profiles").update({
          password: authPassword,
          otp_code: null,
          otp_expires_at: null
        }).eq("username", data.username);
        setAuthMode("login");
        setAuthPassword("");
        setAuthOtpCode("");
        setAuthEmail("");
        setAuthError("");
        showToast("ตั้งรหัสผ่านใหม่สำเร็จแล้ว กรุณาเข้าสู่ระบบ", "success");
      } else {
        try {
          const lockRes = await fetch("/api/check-register-lock");
          const lockData = await lockRes.json();
          if (lockData.locked) {
            setAuthError(
              `กรุณารอ ${lockData.remaining} นาที ก่อนสมัครสมาชิกใหม่เพื่อป้องกันสแปม (ล็อค IP)`
            );
            return;
          }
        } catch (e2) {
          console.error("Lock check error", e2);
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
          const { data: existingEmail } = await supabase.from("profiles").select("username").eq("email", authEmail.trim()).limit(1).single();
          if (existingEmail) {
            setAuthError("อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น!");
            return;
          }
        } catch (e2) {
        }
        let insertRes = await supabase.from("profiles").insert([
          {
            username: targetUsername,
            email: authEmail.trim(),
            password: authPassword,
            balance: 0
          }
        ]);
        if (insertRes.error && insertRes.error.message.includes("email")) {
          insertRes = await supabase.from("profiles").insert([
            {
              username: targetUsername,
              password: authPassword,
              balance: 0
            }
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
          JSON.stringify({ username: authUsername.trim() })
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
          game: appScreen
        });
        try {
          await fetch("/api/set-register-lock", { method: "POST" });
        } catch (e2) {
        }
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
  const handleChangePassword = async (newPass) => {
    if (!currentUser) return;
    const { error } = await supabase.from("profiles").update({ password: newPass }).eq("username", currentUser.username);
    if (!error) {
      showToast("เปลี่ยนรหัสผ่านสำเร็จ", "success");
    } else {
      showToast("เกิดข้อผิดพลาดเปลี่ยนรหัสผ่านไม่ได้", "error");
    }
  };
  const handleChangeUsername = async (newUsername) => {
    if (!currentUser) return false;
    const trimmedNew = newUsername.trim();
    if (trimmedNew.length < 3) {
      showToast("ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร", "error");
      return false;
    }
    const { data: existing } = await supabase.from("profiles").select("username").eq("username", trimmedNew).limit(1).maybeSingle();
    if (existing) {
      showToast("ชื่อผู้ใช้นี้ถูกใช้งานแล้ว", "error");
      return false;
    }
    const { data: profile } = await supabase.from("profiles").select("username_last_changed").eq("username", currentUser.username).single();
    if (profile && profile.username_last_changed) {
      const lastChanged = new Date(profile.username_last_changed);
      const now = /* @__PURE__ */ new Date();
      const diffDays = (now.getTime() - lastChanged.getTime()) / (1e3 * 3600 * 24);
      if (diffDays < 7) {
        showToast(
          `เปลี่ยนชื่อได้อีกครั้งในอีก ${Math.ceil(7 - diffDays)} วัน`,
          "error"
        );
        return false;
      }
    }
    const oldUsername = currentUser.username;
    const { error } = await supabase.from("profiles").update({
      username: trimmedNew,
      username_last_changed: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("username", oldUsername);
    if (error) {
      showToast("เกิดข้อผิดพลาดในการเปลี่ยนชื่อ", "error");
      return false;
    }
    await Promise.all([
      supabase.from("purchases").update({ username: trimmedNew }).eq("username", oldUsername),
      supabase.from("topups").update({ username: trimmedNew }).eq("username", oldUsername),
      supabase.from("activities").update({ username: trimmedNew }).eq("username", oldUsername),
      supabase.from("claimed_jackpots").update({ username: trimmedNew }).eq("username", oldUsername)
    ]);
    const updatedUser = { ...currentUser, username: trimmedNew };
    setCurrentUser(updatedUser);
    localStorage.setItem("KUWASHII_CURRENT_USER", JSON.stringify(updatedUser));
    showToast("เปลี่ยนชื่อผู้ใช้สำเร็จ", "success");
    return true;
  };
  const handleChangeEmail = async (newEmail) => {
    if (!currentUser) return false;
    const trimmedEmail = newEmail.trim();
    if (!trimmedEmail.includes("@")) {
      showToast("รูปแบบอีเมลไม่ถูกต้อง", "error");
      return false;
    }
    const { error } = await supabase.from("profiles").update({ email: trimmedEmail }).eq("username", currentUser.username);
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
  const handleSaveItem = async (itemData, notifyDiscord, webhookUrl) => {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    let currentItems = await fetchItems() || items;
    const existingIndex = currentItems.findIndex((it) => it.id === itemData.id);
    let finalItem;
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
        updatedAt: timestamp
      };
      showToast(`บันทึกไอเทม ${itemData.name} สำเร็จ!`);
    } else {
      const newQ = Number(itemData.quantity) || 0;
      addedQty = newQ;
      finalItem = {
        ...itemData,
        quantity: newQ,
        updatedAt: timestamp
      };
      showToast(`เพิ่มไอเทม ${itemData.name} ลงระบบเรียบร้อย`);
    }
    if (notifyDiscord && webhookUrl && addedQty > 0) {
      sendDiscordStockUpdateEmbed(
        webhookUrl,
        itemData.name,
        addedQty,
        finalItem.quantity,
        itemData.imageUrl,
        itemData.game
      );
    }
    const updatedList = existingIndex >= 0 ? currentItems.map((it) => it.id === itemData.id ? finalItem : it) : [finalItem, ...currentItems];
    setItems(updatedList);
    try {
      const updates = [
        {
          id: finalItem.id,
          name: finalItem.name,
          description: finalItem.description,
          price: finalItem.price,
          quantity: finalItem.quantity,
          image: finalItem.imageUrls ? JSON.stringify(finalItem.imageUrls) : finalItem.imageUrl,
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
            originalPrice: finalItem.originalPrice
          },
          created_at: finalItem.updatedAt || (/* @__PURE__ */ new Date()).toISOString()
        }
      ];
      await supabase.from("items").upsert(updates);
    } catch (e) {
      console.error("Error saving item", e);
    }
    window.dispatchEvent(new Event("sync-update"));
    setEditingItem(null);
  };
  const handleDeleteItem = async (id) => {
    let currentItems = await fetchItems() || items;
    const itemToDelete = currentItems.find((it) => it.id === id);
    if (!itemToDelete) return;
    if (confirm(
      `คุณมั่นใจหรือไม่ที่จะลบ "${itemToDelete.name}" ออกจากคลังสต๊อกสินค้า?`
    )) {
      const remainingItems = currentItems.filter((it) => it.id !== id);
      try {
        await supabase.from("items").delete().eq("id", id);
        setItems(remainingItems);
        window.dispatchEvent(new Event("sync-update"));
      } catch (e) {
        console.error("Error deleting item:", e);
      }
      try {
        const stored = localStorage.getItem("KUWASHII_CLAIMED_JACKPOTS");
        if (stored) {
          const parsed = JSON.parse(stored);
          const filtered = parsed.filter((c) => c.itemId !== id);
          localStorage.setItem(
            "KUWASHII_CLAIMED_JACKPOTS",
            JSON.stringify(filtered)
          );
        }
      } catch (e) {
      }
      showToast("ลบสินค้าออกจากระบบและฐานข้อมูลเรียบร้อย", "info");
    }
  };
  const handleBuyItem = async (item, purchaseQty = 1) => {
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
        "error"
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
    const balanceField = topupTarget;
    const userBalance = Number(user[balanceField] || 0);
    if (userBalance < totalPrice) {
      showToast(
        `ยอดเครดิตในระบบไม่เพียงพอ! (ขาดอีก ${totalPrice - userBalance} ฿)`,
        "error"
      );
      setIsProcessingPurchase(false);
      isProcessingPurchaseRef.current = false;
      return;
    }
    try {
      const liveUser = await fetchUser(currentUser.username);
      const liveUserBalance = Number(liveUser[balanceField] || 0);
      if (!liveUser || liveUserBalance < totalPrice) {
        showToast("ยอดเงินไม่เพียงพอ หรือข้อมูลไม่ถูกต้อง", "error");
        setIsProcessingPurchase(false);
        isProcessingPurchaseRef.current = false;
        return;
      }
      const { data: dbItem } = await supabase.from("items").select("quantity").eq("id", item.id).single();
      let liveItemQty = item.quantity;
      if (dbItem) {
        liveItemQty = dbItem.quantity;
      }
      if (purchaseQty > liveItemQty) {
        showToast(
          "ขออภัย สินค้าในสต๊อกถูกซื้อไปหมดหรือมีไม่เพียงพอแล้ว",
          "error"
        );
        setIsProcessingPurchase(false);
        isProcessingPurchaseRef.current = false;
        return;
      }
      let claimedJackpots = [];
      let usingDbClaims = false;
      try {
        const { data: dbClaims, error: claimsErr } = await supabase.from("claimed_jackpots").select("*").eq("item_id", item.id);
        if (!claimsErr && dbClaims) {
          claimedJackpots = dbClaims.map((c) => ({
            itemId: c.item_id,
            stockTrigger: c.stock_trigger
          }));
          usingDbClaims = true;
        } else {
          throw new Error("Fallback to local");
        }
      } catch (e) {
        try {
          const storedClaims = localStorage.getItem(
            "KUWASHII_CLAIMED_JACKPOTS"
          );
          if (storedClaims) {
            const parsed = JSON.parse(storedClaims);
            const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1e3;
            claimedJackpots = parsed.filter(
              (c) => new Date(c.timestamp).getTime() > threeDaysAgo
            );
          }
        } catch (e2) {
        }
      }
      let drops = [];
      if (item.gachaPool && item.gachaPool.length > 0) {
        for (let i = 0; i < purchaseQty; i++) {
          const currentOpenStock = liveItemQty - i;
          let dropped = null;
          const guaranteedReward = item.gachaPool.find(
            (r) => r.guaranteedAtStock !== void 0 && r.guaranteedAtStock === currentOpenStock || r.guaranteedAtStocks && r.guaranteedAtStocks.includes(currentOpenStock)
          );
          if (guaranteedReward) {
            const isClaimed = claimedJackpots.some(
              (c) => c.itemId === item.id && c.stockTrigger === currentOpenStock
            );
            if (!isClaimed) {
              dropped = guaranteedReward;
              if (usingDbClaims) {
                const { error: claimErr } = await supabase.from("claimed_jackpots").insert([
                  {
                    item_id: item.id,
                    stock_trigger: currentOpenStock,
                    reward_name: dropped.name,
                    username: currentUser.username
                  }
                ]);
                if (claimErr && (claimErr.code === "23505" || claimErr.message && claimErr.message.includes("UNIQUE"))) {
                  dropped = null;
                } else {
                  const newClaim = {
                    itemId: item.id,
                    rewardName: dropped.name,
                    stockTrigger: currentOpenStock,
                    username: currentUser.username,
                    timestamp: (/* @__PURE__ */ new Date()).toISOString()
                  };
                  claimedJackpots.push(newClaim);
                }
              } else {
                const newClaim = {
                  itemId: item.id,
                  rewardName: dropped.name,
                  stockTrigger: currentOpenStock,
                  username: currentUser.username,
                  timestamp: (/* @__PURE__ */ new Date()).toISOString()
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
        localStorage.setItem(
          "KUWASHII_CLAIMED_JACKPOTS",
          JSON.stringify(claimedJackpots)
        );
      }
      const newBalance = liveUserBalance - totalPrice;
      await supabase.from("profiles").update({ [balanceField]: newBalance }).eq("username", currentUser.username);
      let extractCreds = void 0;
      let nextAccCreds = item.accountCredentials;
      if (item.saleFormat === "ไฟล์ตัวรัน") {
        const productInfo = `ลิ้งค์ดาวน์โหลด: ${item.fileLink || "-"} | รหัสผ่านเข้าถึงลิ้งค์: ${item.filePassword || "-"}`;
        extractCreds = Array(purchaseQty).fill(productInfo);
        handleQuickQuantityChange(item.id, -purchaseQty, true);
      } else if (item.accountCredentials && item.accountCredentials.length > 0) {
        extractCreds = item.accountCredentials.slice(0, purchaseQty);
        nextAccCreds = item.accountCredentials.slice(purchaseQty);
        await supabase.from("items").update({
          quantity: liveItemQty - purchaseQty,
          gacha_pool: {
            pool: item.gachaPool || null,
            saleFormat: item.saleFormat || "ขายรหัส",
            initialQuantity: item.initialQuantity,
            piecesPerUnit: item.piecesPerUnit,
            accountCredentials: nextAccCreds,
            fileLink: item.fileLink || null,
            filePassword: item.filePassword || null,
            isPinned: item.isPinned || false
          }
        }).eq("id", item.id);
        setItems(
          (prev) => prev.map(
            (it) => it.id === item.id ? {
              ...it,
              quantity: liveItemQty - purchaseQty,
              accountCredentials: nextAccCreds
            } : it
          )
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
          game: item.game || appScreen
        }
      ]);
      if (purchaseError) {
        console.error("Error inserting purchase:", purchaseError);
        const { error: fallbackError } = await supabase.from("purchases").insert([
          {
            username: currentUser.username,
            item_id: item.id,
            item_name: item.name,
            price: totalPrice,
            quantity: purchaseQty
          }
        ]);
        if (fallbackError) {
          console.error("Fallback purchase insert also failed:", fallbackError);
        }
      }
      const configData = await getSystemConfig();
      const currentAllTime = configData ? Number(configData.all_time_sales_count || 0) : 0;
      const updatePayload = {
        all_time_sales_count: currentAllTime + purchaseQty
      };
      if (item.game === "ASTD") {
        const currentSales = configData ? Number(configData.global_sales_astd || 0) : 0;
        updatePayload.global_sales_astd = currentSales + purchaseQty;
      } else if (item.game === "ROV") {
        const currentSales = configData ? Number(configData.global_sales_rov || 0) : 0;
        updatePayload.global_sales_rov = currentSales + purchaseQty;
      } else if (item.game === "AOTR") {
        const currentSales = configData ? Number(configData.global_sales_aotr || 0) : 0;
        updatePayload.global_sales_aotr = currentSales + purchaseQty;
      }
      await supabase.from("system_config").update(updatePayload).eq("id", "main").catch((err) => console.warn("Failed to update global sales", err));
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
          gachaDrops: drops.length > 0 ? drops : void 0
        });
      }
      const webhookDrops = drops.length > 0 ? drops : [{ name: `${item.name} x${purchaseQty}`, isSalt: false }];
      sendDiscordPurchaseEmbed(
        currentUser.username,
        item.name,
        purchaseQty,
        liveItemQty - purchaseQty,
        webhookDrops,
        appScreen
      );
      setInquiringItem(null);
      setIsProcessingPurchase(false);
      isProcessingPurchaseRef.current = false;
      window.dispatchEvent(new Event("sync-update"));
      if (item.gachaPool && item.gachaPool.length > 0 && drops.length > 0) {
        setShowHistoryModal(true);
      } else {
        setShowHistoryModal(true);
      }
    } catch (err) {
      console.error(err);
      setIsProcessingPurchase(false);
      isProcessingPurchaseRef.current = false;
      showToast("เกิดข้อผิดพลาดในการซื้อสินค้า", "error");
    }
  };
  const handleQuickQuantityChange = async (id, delta, silent = false) => {
    const { data: dbItem } = await supabase.from("items").select("quantity").eq("id", id).single();
    if (!dbItem) return;
    const nextQty = Math.max(0, dbItem.quantity + delta);
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    const { error } = await supabase.from("items").update({ quantity: nextQty, created_at: nowIso }).eq("id", id);
    if (!error) {
      setItems(
        items.map(
          (it) => it.id === id ? { ...it, quantity: nextQty, updatedAt: nowIso } : it
        )
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
  const handleTogglePin = async (id) => {
    const target = items.find((it) => it.id === id);
    if (!target) return;
    const updated = {
      ...target,
      isPinned: !target.isPinned,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const newItems = items.map((it) => it.id === id ? updated : it);
    setItems(newItems);
    try {
      const updates = [
        {
          id: updated.id,
          name: updated.name,
          description: updated.description,
          price: updated.price,
          quantity: updated.quantity,
          image: updated.imageUrls ? JSON.stringify(updated.imageUrls) : updated.imageUrl,
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
            originalPrice: updated.originalPrice
          },
          created_at: updated.updatedAt || (/* @__PURE__ */ new Date()).toISOString()
        }
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
    if (confirm(
      `คุณต้องการรีเซ็ตสินค้าในสต๊อกกลับไปเป็นค่าเริ่มต้นจากเกม ${appScreen} หรือไม่? (ข้อมูลที่แก้ไขจะหายไป)`
    )) {
      saveItemsToStorage(DEFAULT_PRESETS);
      showToast("คืนค่าสต๊อคเริ่มต้นในระบบเรียบร้อย!", "info");
    }
  };
  const handleClearStockToZero = async () => {
    if (confirm(
      "⚠️ คุณแน่ใจหรือไม่ที่จะรีเซ็ตทุกไอเทมในคลังสินค้าปัจจุบันให้เหลือจำนวนสต๊อกเป็น 0 ชิ้น? (ข้อมูลราคาและไอเทมจะอยู่ครบ แต่สต๊อกจะกลายเป็น 0 ทั้งหมด)"
    )) {
      const updatedList = items.map((it) => ({
        ...it,
        quantity: 0,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }));
      saveItemsToStorage(updatedList);
      showToast(
        "เซ็ตจำนวนสินค้าในสต๊อกทั้งหมดเหลือ 0 ชิ้น เรียบร้อย!",
        "success"
      );
    }
  };
  const handleDeleteAllProducts = async () => {
    if (confirm(
      "⚠️⚠️⚠️ คุณแน่ใจหรือไม่ที่จะลบสินค้าทั้งหมดออกจากระบบร้านค้าและคลาวด์เซิร์ฟเวอร์? (ข้อมูลสินค้าทั้งหมดและรูปภาพจะถูกล้างออกและแสดงผลเป็นหน้าว่างเปล่า มีสินค้า 0 รายการ)"
    )) {
      saveItemsToStorage([]);
      showToast("ลบข้อมูลสินค้าทั้งหมดเรียบร้อยแล้ว!", "info");
    }
  };
  const getLatestUpdatedRelativeTime = (list) => {
    if (!list || list.length === 0) return "ไม่มีบันทึกข้อมูล";
    try {
      const timestamps = list.map((it) => parseUTCDate(it.updatedAt).getTime()).filter((t) => !isNaN(t));
      if (timestamps.length === 0) return "ไม่มีบันทึกข้อมูล";
      const latestTime = Math.max(...timestamps);
      const date = new Date(latestTime);
      const now = /* @__PURE__ */ new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSec = Math.floor(diffMs / 1e3);
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
  const handleExportJSON = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `aotr_stock_export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("ส่งออกไฟล์ข้อมูลเรียบร้อยแล้ว", "success");
    } catch (e) {
      showToast("ส่งออกผิดพลาด", "error");
    }
  };
  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedData = JSON.parse(event.target?.result);
        if (Array.isArray(importedData)) {
          const isValid = importedData.every(
            (it) => it.id && it.name && typeof it.price === "number"
          );
          if (isValid) {
            saveItemsToStorage(importedData);
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
  const filteredItems = items.filter((item) => {
    const searchStr = (search || "").toLowerCase().trim();
    const matchesSearch = !searchStr || (item.name || "").toLowerCase().includes(searchStr) || (item.category || "").toLowerCase().includes(searchStr) || (item.description || "").toLowerCase().includes(searchStr);
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSaleFormat = selectedSaleFormat === "all" || item.saleFormat === selectedSaleFormat;
    let matchesStatus = true;
    if (selectedStatus === "in-stock") {
      matchesStatus = item.quantity > 5;
    } else if (selectedStatus === "low-stock") {
      matchesStatus = item.quantity > 0 && item.quantity <= 5;
    } else if (selectedStatus === "out-of-stock") {
      matchesStatus = item.quantity === 0;
    }
    const matchesPopular = !showPopularOnly || !!item.isPopular;
    return matchesSearch && matchesCategory && matchesSaleFormat && matchesStatus && matchesPopular;
  });
  const getPatchedStockItems = () => {
    const liveActivitiesStr = localStorage.getItem("KUWASHII_LIVE_ACTIVITY") || "[]";
    const latestStockMap = {};
    try {
      const liveActivities = JSON.parse(liveActivitiesStr);
      liveActivities.forEach((a) => {
        if (a.type === "purchase" && a.itemName && a.remainingStock !== void 0) {
          const aTime = new Date(a.timestamp).getTime();
          if (latestStockMap[a.itemName] === void 0 || aTime > latestStockMap[a.itemName].ts) {
            latestStockMap[a.itemName] = { qty: a.remainingStock, ts: aTime };
          }
        }
      });
    } catch (e) {
    }
    return filteredItems.map((item) => {
      const patch = latestStockMap[item.name];
      if (patch) {
        const itemUpdateTs = item.updatedAt ? new Date(item.updatedAt).getTime() : 0;
        if (patch.ts > itemUpdateTs && patch.qty < item.quantity) {
          return { ...item, quantity: patch.qty };
        }
      }
      return item;
    });
  };
  const patchedItems = getPatchedStockItems();
  const sortedItems = [...patchedItems].sort((a, b) => {
    const aHasStock = a.quantity > 0 ? 1 : 0;
    const bHasStock = b.quantity > 0 ? 1 : 0;
    if (aHasStock !== bHasStock) {
      return bHasStock - aHasStock;
    }
    const aPinned = a.isPinned ? 1 : 0;
    const bPinned = b.isPinned ? 1 : 0;
    if (aPinned !== bPinned) {
      return bPinned - aPinned;
    }
    if (selectedCategory === "all") {
      const categoryOrder = true ? [
        "Grow A Garden 2",
        "ALL STAR",
        "Coming Soon",
        "Other services",
        "VIP Codes"
      ] : false ? ["รหัส ROV"] : [
        "Serum",
        "Bloodline",
        "Skin",
        "Artifact",
        "Scroll/Key",
        "Perk",
        "Other"
      ];
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);
      if (indexA !== -1 && indexB !== -1 && indexA !== indexB) {
        return indexA - indexB;
      }
    }
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
  const renderModals = () => /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: (isProcessingPurchase || isProcessingTopup) && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-[200] flex items-center justify-center", children: [
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "absolute inset-0 bg-zinc-900 "
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 2293,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9, y: 10 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.9, y: 10 },
          className: "relative bg-[#050505]/95 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] flex flex-col items-center overflow-hidden min-w-[320px]",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] pointer-events-none rounded-full" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2306,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 left-0 w-32 h-32 bg-[#0ea5e9]/10 blur-[50px] pointer-events-none rounded-full" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2307,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative mb-6 w-20 h-20 flex items-center justify-center", children: [
              /* @__PURE__ */ jsxDEV(motion.div, { className: "absolute inset-0 border-4 border-emerald-500/20 rounded-full" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2310,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  className: "absolute inset-0 border-4 border-emerald-400 border-t-transparent rounded-full",
                  animate: { rotate: 360 },
                  transition: {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "linear"
                  }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 2311,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]", children: /* @__PURE__ */ jsxDEV("div", { className: "w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2321,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2320,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2309,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white tracking-wide mb-2 font-display", children: "ระบบกำลังทำรายการ..." }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2325,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-zinc-500 font-mono tracking-[0.2em] font-medium uppercase mt-1", children: "Please wait • Do not close" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2328,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 2299,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 2292,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 2290,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      GachaResultModal,
      {
        isOpen: !!gachaResult,
        onClose: () => {
          setGachaResult(null);
          setShowHistoryModal(true);
        },
        result: gachaResult
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2337,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      AdminModal,
      {
        isOpen: isFormOpen,
        globalStats,
        onClose: () => {
          setIsFormOpen(false);
          setEditingItem(null);
        },
        onSave: handleSaveItem,
        editingItem,
        currentGame: appScreen
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2347,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      StockManagerModal,
      {
        isOpen: isStockManagerOpen,
        onClose: () => setIsStockManagerOpen(false),
        items: items.filter((it) => it.game === appScreen),
        onEdit: (item) => {
          setEditingItem(item);
          setIsFormOpen(true);
        },
        onDelete: handleDeleteItem,
        onAddNew: () => {
          setEditingItem(null);
          setIsFormOpen(true);
        }
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2359,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      CustomerDatabaseModal,
      {
        isOpen: isCustomerDbOpen,
        onClose: () => setIsCustomerDbOpen(false),
        appScreen,
        onViewUserHistory: (username) => {
          setViewingUserHistory(username);
        }
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2374,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      CouponManagerModal,
      {
        isOpen: isCouponManagerOpen,
        onClose: () => setIsCouponManagerOpen(false)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2383,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      AnnouncementManagerModal,
      {
        isOpen: isAnnouncementManagerOpen,
        onClose: () => setIsAnnouncementManagerOpen(false)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2388,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      ImageSettingsModal,
      {
        isOpen: isImageSettingsOpen,
        onClose: () => setIsImageSettingsOpen(false)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2393,
        columnNumber: 7
      },
      this
    ),
    (currentUser || viewingUserHistory) && /* @__PURE__ */ jsxDEV(
      HistoryModal,
      {
        isOpen: showHistoryModal || !!viewingUserHistory,
        initialTab: historyTab,
        onClose: () => {
          setShowHistoryModal(false);
          setViewingUserHistory(null);
        },
        username: viewingUserHistory || currentUser?.username || "",
        items
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2399,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      TopupTosModal,
      {
        isOpen: showTopupTos,
        onClose: () => setShowTopupTos(false)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2411,
        columnNumber: 7
      },
      this
    ),
    showUpdateOverlay && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-[99999] bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-zinc-900 border border-amber-500/30 p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-8 h-8 animate-spin" }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2420,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2419,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-white mb-2", children: "มีอัพเดทเวอร์ชั่นใหม่" }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2422,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-zinc-400 mb-6", children: "กรุณารีเฟรชเว็บไซต์เพื่อให้ระบบอัพเดทเป็นเวอร์ชั่นล่าสุดก่อนเข้าใช้งาน" }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2423,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => window.location.reload(),
          className: "w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2",
          children: [
            /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2428,
              columnNumber: 15
            }, this),
            " อัพเดทระบบ / รีเฟรช"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 2424,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 2418,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 2417,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      PaymentSettingsModal,
      {
        isOpen: isPaymentConfigOpen,
        onClose: () => setIsPaymentConfigOpen(false),
        globalStats,
        setGlobalStats
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2434,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      ApiStatusModal,
      {
        isOpen: isApiStatusOpen,
        onClose: () => setIsApiStatusOpen(false)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2440,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      CategoryManagerModal,
      {
        isOpen: isCategoryManagerOpen,
        onClose: () => setIsCategoryManagerOpen(false),
        globalStats,
        setGlobalStats
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 2445,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 2288,
    columnNumber: 5
  }, this);
  const currentContextItems = items.filter((it) => it.game === appScreen);
  const totalStockItems = currentContextItems.length;
  const inStockCount = currentContextItems.filter(
    (it) => it.quantity > 0
  ).length;
  const totalStockUnits = currentContextItems.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
  const totalStockValue = currentContextItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const renderAppScreen = () => {
    if (isMaintenanceMode && !isAdmin && appScreen !== "LOADING" && appScreen !== "TRANSITION" && appScreen !== "LOGIN" && appScreen !== "REGISTER") {
      return /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.3 },
          className: "fixed inset-0 z-[99999] bg-zinc-900 flex flex-col items-center justify-center p-6 text-center select-none text-zinc-100 font-display tracking-tight",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "max-w-md w-full bg-zinc-900 shadow-sm border border-zinc-800 p-8 rounded-3xl border border-amber-500/30 shadow-2xl  relative", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-20 h-20 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse", children: /* @__PURE__ */ jsxDEV(
                "svg",
                {
                  className: "w-10 h-10 text-amber-500",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ jsxDEV(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2497,
                      columnNumber: 17
                    },
                    this
                  )
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 2490,
                  columnNumber: 15
                },
                this
              ) }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2489,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-display font-medium tracking-tighter glowing-text mb-3", children: "ระบบอยู่ระหว่างการปรับปรุง 🛠️" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2505,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-500 text-sm leading-relaxed mb-6", children: "ขณะนี้เว็บไซต์กำลังอยู่ในช่วงปรับปรุงระบบชั่วคราว กรุณาอดทนรอและระบบจะเปิดให้ใช้งานอีกครั้งโดยอัตโนมัติเมื่อเสร็จสิ้น! ขออภัยในความไม่สะดวกครับ" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2508,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    setAuthMode("login");
                    setAppScreen("LOGIN");
                  },
                  className: "mt-4 px-4 py-2 text-xs font-bold bg-zinc-800 text-zinc-400 rounded-lg border border-zinc-700 hover:text-white",
                  children: "สำหรับแอดมิน"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 2513,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center space-x-2 pb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-2 h-2 bg-amber-500 rounded-full animate-bounce" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 2523,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    className: "w-2 h-2 bg-amber-500 rounded-full animate-bounce",
                    style: { animationDelay: "0.2s" }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 2524,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    className: "w-2 h-2 bg-amber-500 rounded-full animate-bounce",
                    style: { animationDelay: "0.4s" }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 2528,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2522,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(
                motion.button,
                {
                  whileTap: { scale: 0.95 },
                  onClick: () => {
                    setAppScreen("LOGIN");
                    setAuthMode("login");
                  },
                  className: "mt-6 text-[12px] font-bold text-zinc-600 hover:text-zinc-300 transition-colors bg-zinc-800/50 hover:bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700/50",
                  children: /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDEV(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: [
                          /* @__PURE__ */ jsxDEV("rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 2553,
                            columnNumber: 19
                          }, this),
                          /* @__PURE__ */ jsxDEV("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 2554,
                            columnNumber: 19
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2542,
                        columnNumber: 17
                      },
                      this
                    ),
                    "เข้าสู่ระบบผู้ดูแลระบบ"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 2541,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 2533,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2488,
              columnNumber: 11
            }, this),
            renderModals()
          ]
        },
        "maintenance",
        true,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 2480,
          columnNumber: 9
        },
        this
      );
    }
    if (["SHOP", "TOPUP", "GAMETOPUP", "LOGIN", "PROFILE"].includes(appScreen)) {
      return /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.15, ease: "easeOut" },
          className: "min-h-[100vh] min-h-[100dvh] flex flex-col bg-transparent text-zinc-200 font-display tracking-tight selection:bg-indigo-500 selection:text-zinc-100 relative w-full",
          children: [
            /* @__PURE__ */ jsxDEV(
              ShopHeader,
              {
                globalStats,
                toggleSidebar: () => setIsAstdMenuOpen(true),
                onSearchToggle: () => setIsSearchOpen(true),
                currentUser: currentUserData || currentUser,
                onLoginClick: () => {
                  setAppScreen("LOGIN");
                  setAuthMode("login");
                },
                onLogout: handleLogout,
                setAppScreen,
                currentScreen: appScreen,
                onLogoClick: () => {
                  setIsLoadingStock(true);
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 800);
                }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2575,
                columnNumber: 11
              },
              this
            ),
            appScreen === "SHOP" && /* @__PURE__ */ jsxDEV(Fragment, { children: /* @__PURE__ */ jsxDEV(
              AnnouncementPopup,
              {
                appScreen,
                isLoadingData: isLoadingStock
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2596,
                columnNumber: 15
              },
              this
            ) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2595,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "fixed top-2 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center pointer-events-none w-full max-w-[340px] px-4", children: /* @__PURE__ */ jsxDEV(AnimatePresence, { mode: "popLayout", children: toasts.map((toast, index) => {
              const scale = 1 - index * 0.05;
              const yOffset = index * 8;
              const opacity = 1 - index * 0.2;
              return /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  layout: true,
                  initial: { opacity: 0, y: -50, scale: 0.9, filter: "blur(8px)" },
                  animate: { opacity, y: yOffset, scale, filter: "blur(0px)" },
                  exit: { opacity: 0, scale: 0.9, filter: "blur(8px)", transition: { duration: 0.2, ease: "easeOut" } },
                  transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 },
                  style: { zIndex: 100 - index },
                  className: `absolute top-0 w-full bg-[#1c1c1e]/90 backdrop-blur-xl px-3 py-3 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 flex items-start gap-3 pointer-events-auto`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex-shrink-0 relative", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-full overflow-hidden bg-zinc-800 border border-white/10 shadow-sm", children: globalStats?.announcement_settings?.shopLogoUrl ? /* @__PURE__ */ jsxDEV("img", { src: globalStats.announcement_settings.shopLogoUrl, alt: "Logo", className: "w-full h-full object-cover" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2627,
                        columnNumber: 27
                      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full flex items-center justify-center bg-indigo-500/20 text-indigo-400", children: /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-lg", children: "K" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2630,
                        columnNumber: 29
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2629,
                        columnNumber: 27
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2625,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute -bottom-0.5 -right-0.5 p-[2px] bg-[#1c1c1e] rounded-full", children: toast.type === "success" ? /* @__PURE__ */ jsxDEV("div", { className: "w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-2.5 h-2.5 text-white", strokeWidth: 3 }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2637,
                        columnNumber: 29
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2636,
                        columnNumber: 27
                      }, this) : toast.type === "error" ? /* @__PURE__ */ jsxDEV("div", { className: "w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-2.5 h-2.5 text-white", strokeWidth: 3 }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2641,
                        columnNumber: 29
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2640,
                        columnNumber: 27
                      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Info, { className: "w-2.5 h-2.5 text-white", strokeWidth: 3 }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2645,
                        columnNumber: 29
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2644,
                        columnNumber: 27
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2634,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2624,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 pt-0.5", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-0.5", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-[13px] text-zinc-100 truncate tracking-wide", children: globalStats?.announcement_settings?.shopName || "Kuwashii" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 2653,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-500 font-medium", children: "ตอนนี้" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 2656,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2652,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-[13px] text-zinc-300 leading-snug line-clamp-2", children: toast.text }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2658,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2651,
                      columnNumber: 21
                    }, this)
                  ]
                },
                toast.id,
                true,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 2614,
                  columnNumber: 19
                },
                this
              );
            }) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2605,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2604,
              columnNumber: 11
            }, this),
            !inquiringItem && appScreen !== "TOPUP" && appScreen !== "GAMETOPUP" && appScreen !== "LOGIN" && appScreen !== "PROFILE" && selectedCategory === "all" && !search && /* @__PURE__ */ jsxDEV(ShopBanner, { globalStats, items }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2675,
              columnNumber: 24
            }, this),
            /* @__PURE__ */ jsxDEV("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex-grow w-full", children: inquiringItem ? inquiringItem.gachaPool && inquiringItem.gachaPool.length > 0 ? /* @__PURE__ */ jsxDEV(
              RandomBoxModal,
              {
                item: inquiringItem,
                onClose: () => setInquiringItem(null),
                onBuy: handleBuyItem,
                isProcessing: isProcessingPurchase
              },
              "random-box-modal",
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2683,
                columnNumber: 17
              },
              this
            ) : /* @__PURE__ */ jsxDEV(
              InquiryModal,
              {
                item: inquiringItem,
                onClose: () => setInquiringItem(null),
                onBuy: handleBuyItem,
                isProcessing: isProcessingPurchase
              },
              "inquiry-modal",
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2691,
                columnNumber: 17
              },
              this
            ) : appScreen === "LOGIN" ? /* @__PURE__ */ jsxDEV(
              AuthPage,
              {
                authMode,
                setAuthMode,
                authUsername,
                setAuthUsername,
                authEmail,
                setAuthEmail,
                authPassword,
                setAuthPassword,
                authConfirmPassword,
                setAuthConfirmPassword,
                showAuthPassword,
                setShowAuthPassword,
                showAuthConfirmPassword,
                setShowAuthConfirmPassword,
                authOtpCode,
                setAuthOtpCode,
                rememberAuth,
                setRememberAuth,
                authError,
                setAuthError,
                handleAuthSubmit,
                isProcessing: isAuthLoading,
                isCaptchaVerified,
                setIsCaptchaVerified
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2700,
                columnNumber: 15
              },
              this
            ) : appScreen === "GAMETOPUP" ? /* @__PURE__ */ jsxDEV(
              GameTopupPage,
              {
                onBack: () => setAppScreen("SHOP"),
                currentUser: currentUserData || currentUser,
                showToast,
                fetchUser
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2727,
                columnNumber: 15
              },
              this
            ) : appScreen === "PROFILE" ? /* @__PURE__ */ jsxDEV(
              UserProfileDashboard,
              {
                currentUser: currentUserData || currentUser,
                setAppScreen,
                onChangePassword: handleChangePassword,
                onChangeUsername: handleChangeUsername,
                onChangeEmail: handleChangeEmail,
                items
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2734,
                columnNumber: 15
              },
              this
            ) : appScreen === "TOPUP" ? /* @__PURE__ */ jsxDEV(
              TopupPage,
              {
                topupTarget,
                setTopupTarget,
                tosAccepted,
                setTosAccepted,
                topupModalStep,
                setTopupModalStep: (step) => {
                  setTopupSuccessMessage("");
                  setTopupModalStep(step);
                },
                angpaoCode: topupCode,
                setAngpaoCode: setTopupCode,
                slipFile,
                setSlipFile,
                setShowTopupTos,
                isProcessingTopup,
                handleTopup: handleTopupSubmit,
                setAppScreen,
                globalStats
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2743,
                columnNumber: 15
              },
              this
            ) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              selectedCategory === "all" && !search ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "mb-6", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-4", children: [
                    /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold text-zinc-100 flex items-center gap-2 whitespace-nowrap", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "bg-zinc-800/80 p-1.5 rounded-lg border border-zinc-700/50", children: "⭐" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2774,
                        columnNumber: 27
                      }, this),
                      " เมนูทั่วไป"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2773,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "h-px bg-gradient-to-r from-zinc-700/80 to-transparent flex-1" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2776,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 2772,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
                    !currentUser && globalStats?.announcement_settings?.loginBannerUrl && /* @__PURE__ */ jsxDEV(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.98 },
                        onClick: () => setAppScreen("LOGIN"),
                        className: "cursor-pointer rounded-2xl overflow-hidden border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] group",
                        children: /* @__PURE__ */ jsxDEV(
                          "img",
                          {
                            src: globalStats.announcement_settings.loginBannerUrl,
                            alt: "Login",
                            className: "w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity aspect-[2/1]"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 2788,
                            columnNumber: 29
                          },
                          this
                        )
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2780,
                        columnNumber: 27
                      },
                      this
                    ),
                    globalStats?.announcement_settings?.productsBannerUrl && /* @__PURE__ */ jsxDEV(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.1 },
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.98 },
                        onClick: () => setSelectedCategory("all"),
                        className: "cursor-pointer rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] group",
                        children: /* @__PURE__ */ jsxDEV(
                          "img",
                          {
                            src: globalStats.announcement_settings.productsBannerUrl,
                            alt: "All Products",
                            className: "w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity aspect-[2/1]"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 2806,
                            columnNumber: 29
                          },
                          this
                        )
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2797,
                        columnNumber: 27
                      },
                      this
                    ),
                    globalStats?.announcement_settings?.topupBannerUrl && /* @__PURE__ */ jsxDEV(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.2 },
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.98 },
                        onClick: () => setAppScreen("TOPUP"),
                        className: "cursor-pointer rounded-2xl overflow-hidden border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] group",
                        children: /* @__PURE__ */ jsxDEV(
                          "img",
                          {
                            src: globalStats.announcement_settings.topupBannerUrl,
                            alt: "Topup",
                            className: "w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity aspect-[2/1]"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 2824,
                            columnNumber: 29
                          },
                          this
                        )
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2815,
                        columnNumber: 27
                      },
                      this
                    ),
                    globalStats?.announcement_settings?.contactBannerUrl && /* @__PURE__ */ jsxDEV(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.3 },
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.98 },
                        onClick: () => window.open("https://discord.gg/AQKtJpvyva", "_blank"),
                        className: "cursor-pointer rounded-2xl overflow-hidden border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)] group",
                        children: /* @__PURE__ */ jsxDEV(
                          "img",
                          {
                            src: globalStats.announcement_settings.contactBannerUrl,
                            alt: "Contact Admin",
                            className: "w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity aspect-[2/1]"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 2842,
                            columnNumber: 29
                          },
                          this
                        )
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2833,
                        columnNumber: 27
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 2778,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-4 mt-8", children: [
                    /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold text-zinc-100 flex items-center gap-2 whitespace-nowrap", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "bg-zinc-800/80 p-1.5 rounded-lg border border-zinc-700/50", children: "🎮" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2853,
                        columnNumber: 27
                      }, this),
                      " เมนูเติมเกม"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2852,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "h-px bg-gradient-to-r from-zinc-700/80 to-transparent flex-1" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2855,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 2851,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: /* @__PURE__ */ jsxDEV(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.4 },
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.98 },
                      onClick: () => {
                        setAppScreen("GAMETOPUP");
                      },
                      className: "cursor-pointer rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] group bg-gradient-to-br from-cyan-600 to-blue-800 flex items-center justify-center aspect-[2/1]",
                      children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center gap-2 text-white p-4 text-center", children: [
                        /* @__PURE__ */ jsxDEV(Gamepad2, { className: "w-8 h-8 sm:w-10 sm:h-10 opacity-90 group-hover:scale-110 transition-transform" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 2870,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-sm sm:text-base", children: "บริการรับเติมเกม" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 2871,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2869,
                        columnNumber: 27
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2858,
                      columnNumber: 25
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 2857,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 2771,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(RecentPurchases, { appScreen, items }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 2876,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  CategoryList,
                  {
                    selectedCategory,
                    setSelectedCategory,
                    globalStats
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 2877,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2770,
                columnNumber: 19
              }, this) : !search && /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.3 },
                  className: "max-w-7xl mx-auto mb-6 w-full flex flex-col gap-2 mt-2",
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs font-bold text-zinc-400 mb-1", children: [
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: () => setSelectedCategory("all"),
                          className: "hover:text-[#0ea5e9] transition-colors cursor-pointer text-[#0ea5e9]",
                          children: "รายการหมวดหมู่"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 2892,
                          columnNumber: 25
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-600", children: ">" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2898,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        motion.span,
                        {
                          initial: { opacity: 0, x: -10 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: 0.1 },
                          className: "text-white uppercase",
                          children: selectedCategory
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 2899,
                          columnNumber: 25
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2891,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-row justify-between items-center gap-3", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            onClick: () => setSelectedCategory("all"),
                            className: "p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer flex-shrink-0",
                            title: "ย้อนกลับ",
                            children: /* @__PURE__ */ jsxDEV(ChevronLeft, { className: "w-5 h-5" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 2916,
                              columnNumber: 29
                            }, this)
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 2911,
                            columnNumber: 27
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV(
                          motion.h2,
                          {
                            initial: { opacity: 0, scale: 0.95 },
                            animate: { opacity: 1, scale: 1 },
                            transition: {
                              delay: 0.15,
                              type: "spring",
                              stiffness: 200
                            },
                            className: "text-2xl md:text-3xl font-black text-[#0ea5e9] tracking-tight uppercase leading-tight font-display line-clamp-1",
                            children: selectedCategory
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 2918,
                            columnNumber: 27
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2910,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        motion.div,
                        {
                          initial: { opacity: 0, scale: 0.8 },
                          animate: { opacity: 1, scale: 1 },
                          transition: {
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200
                          },
                          className: "flex items-center justify-center gap-1 bg-[#002f5d] border border-[#0ea5e9]/30 rounded-full px-2.5 py-1 shadow-md shadow-[#0ea5e9]/10 whitespace-nowrap shrink-0",
                          children: [
                            /* @__PURE__ */ jsxDEV(Star, { className: "w-3 h-3 fill-[#0ea5e9] text-[#0ea5e9]" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 2941,
                              columnNumber: 27
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { className: "text-[#0ea5e9] text-[10px] font-bold", children: "แนะนำ" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 2942,
                              columnNumber: 27
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 2931,
                          columnNumber: 25
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2909,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-1 mt-1", children: [
                      /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-[#0ea5e9]", children: "สินค้าในหมวดหมู่นี้" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2949,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-zinc-300 font-bold text-xs", children: [
                        "ทั้งหมด",
                        " ",
                        items.filter(
                          (i) => (i.category || "") === selectedCategory
                        ).length,
                        " ",
                        "สินค้า"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2952,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2948,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 2885,
                  columnNumber: 21
                },
                this
              ),
              isAdmin && /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV("section", { className: "bg-zinc-900 shadow-sm border border-zinc-800 border border-indigo-500/20 p-5 rounded-2xl mb-8 relative overflow-hidden", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none -z-10" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 2970,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0 animate-pulse", children: /* @__PURE__ */ jsxDEV(SlidersHorizontal, { className: "w-5 h-5" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2974,
                        columnNumber: 29
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2973,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("h3", { className: "text-xs font-bold text-zinc-100 uppercase tracking-wider", children: "แผงจัดการสต๊อก" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 2977,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-500 mt-0.5", children: "จัดการเพิ่ม หรือแก้ไขฐานข้อมูลคลังสินค้าได้แบบ Real-time" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 2980,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 2976,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2972,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2", children: [
                      /* @__PURE__ */ jsxDEV(
                        motion.button,
                        {
                          whileTap: { scale: 0.95 },
                          onClick: () => setIsCustomerDbOpen(true),
                          className: "py-2 px-4 rounded-2xl bg-purple-500/20 text-purple-400 hover:text-zinc-100 border border-purple-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-500/10",
                          children: [
                            /* @__PURE__ */ jsxDEV(Users, { className: "w-4 h-4" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 2992,
                              columnNumber: 29
                            }, this),
                            " ระบบฐานลูกค้า (Customer DB)"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 2987,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        motion.button,
                        {
                          whileTap: { scale: 0.95 },
                          onClick: toggleMaintenanceMode,
                          className: `py-2 px-4 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg ${isMaintenanceMode ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"}`,
                          children: [
                            /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-4 h-4" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 3e3,
                              columnNumber: 29
                            }, this),
                            " ",
                            isMaintenanceMode ? "เปิดเว็บ" : "ปิดเว็บซ่อมปรุง"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 2995,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        motion.button,
                        {
                          whileTap: { scale: 0.95 },
                          onClick: () => setIsCouponManagerOpen(true),
                          className: "py-2 px-4 rounded-2xl bg-emerald-500/20 text-emerald-400 hover:text-zinc-100 border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10",
                          children: [
                            /* @__PURE__ */ jsxDEV(Gift, { className: "w-4 h-4" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 3010,
                              columnNumber: 29
                            }, this),
                            " จัดการโค้ดคูปอง"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 3005,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        motion.button,
                        {
                          whileTap: { scale: 0.95 },
                          onClick: () => setIsAnnouncementManagerOpen(true),
                          className: "py-2 px-4 rounded-2xl bg-amber-500/20 text-amber-400 hover:text-zinc-100 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10",
                          children: [
                            /* @__PURE__ */ jsxDEV(Bell, { className: "w-4 h-4" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 3017,
                              columnNumber: 29
                            }, this),
                            " จัดการแจ้งเตือนต่างๆ"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 3012,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        motion.button,
                        {
                          whileTap: { scale: 0.95 },
                          onClick: () => setIsImageSettingsOpen(true),
                          className: "py-2 px-4 rounded-2xl bg-fuchsia-500/20 text-fuchsia-400 hover:text-zinc-100 border border-fuchsia-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-fuchsia-500/10",
                          children: [
                            /* @__PURE__ */ jsxDEV(ImageIcon, { className: "w-4 h-4" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 3024,
                              columnNumber: 29
                            }, this),
                            " จัดการรูปภาพร้านค้า"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 3019,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        motion.button,
                        {
                          whileTap: { scale: 0.95 },
                          onClick: () => setIsPaymentConfigOpen(true),
                          className: "py-2 px-4 rounded-2xl bg-blue-500/20 text-blue-400 hover:text-zinc-100 border border-blue-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10",
                          children: [
                            /* @__PURE__ */ jsxDEV(Wallet, { className: "w-4 h-4" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 3031,
                              columnNumber: 29
                            }, this),
                            " จัดการช่องทางชำระเงิน"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 3026,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        motion.button,
                        {
                          whileTap: { scale: 0.95 },
                          onClick: () => setIsApiStatusOpen(true),
                          className: "py-2 px-4 rounded-2xl bg-indigo-500/20 text-indigo-400 hover:text-zinc-100 border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/10",
                          children: [
                            /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 3038,
                              columnNumber: 29
                            }, this),
                            " เช็คสถานะ API"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 3033,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        motion.button,
                        {
                          whileTap: { scale: 0.95 },
                          onClick: () => setIsCategoryManagerOpen(true),
                          className: "py-2 px-4 rounded-2xl bg-rose-500/20 text-rose-400 hover:text-zinc-100 border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-500/10",
                          children: [
                            /* @__PURE__ */ jsxDEV(FolderPlus, { className: "w-4 h-4" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 3045,
                              columnNumber: 29
                            }, this),
                            " จัดการหมวดหมู่"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 3040,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        motion.button,
                        {
                          whileTap: { scale: 0.95 },
                          onClick: () => setIsStockManagerOpen(true),
                          className: "py-2 px-4 rounded-2xl bg-indigo-500/20 text-indigo-400 hover:text-zinc-100 border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer",
                          children: [
                            /* @__PURE__ */ jsxDEV(Package, { className: "w-4 h-4" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 3052,
                              columnNumber: 29
                            }, this),
                            " ระบบผู้ดูแลสต๊อก"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 3047,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        motion.button,
                        {
                          whileTap: { scale: 0.95 },
                          onClick: () => setIsFormOpen(true),
                          className: "py-2 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-zinc-100 text-xs font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2",
                          children: [
                            /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 3059,
                              columnNumber: 29
                            }, this),
                            " เพิ่มสินค้า"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 3054,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 2986,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 2971,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 2969,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "mb-8", children: /* @__PURE__ */ jsxDEV(ApiStatusWidget, {}, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 3065,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 3064,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 2968,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-4 mt-8", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold text-zinc-100", children: search ? `ผลการค้นหา: "${search}"` : "สินค้าแนะนำ" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 3073,
                    columnNumber: 21
                  }, this),
                  search && /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setSearch(""),
                      className: "text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 transition-colors",
                      children: "ยกเลิกการค้นหา"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 3077,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 3072,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(
                  motion.button,
                  {
                    whileTap: { scale: 0.95 },
                    className: "flex items-center gap-1 px-3 py-1 text-sm font-medium border border-zinc-800 rounded-full text-zinc-300 hover:bg-zinc-800",
                    children: [
                      "ดูเพิ่มเติม",
                      " ",
                      /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-4 h-4 text-zinc-500" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 3090,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 3085,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 3071,
                columnNumber: 17
              }, this),
              isLoadingStock ? /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4", children: Array.from({ length: 8 }).map((_, idx) => /* @__PURE__ */ jsxDEV(ItemCardSkeleton, {}, `astd-skel-${idx}`, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 3098,
                columnNumber: 23
              }, this)) }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 3096,
                columnNumber: 19
              }, this) : sortedItems.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-24 bg-zinc-900 border border-zinc-800 rounded-2xl", children: [
                /* @__PURE__ */ jsxDEV(Inbox, { className: "w-16 h-16 text-indigo-500/50 mx-auto mb-6" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 3103,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-black text-zinc-100 mb-2 uppercase tracking-wide", children: search ? `ไม่พบสินค้าสำหรับ "${search}"` : "ไม่พบสินค้าในสต๊อก" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 3104,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-500 text-sm", children: search ? "ลองค้นหาด้วยคำอื่น หรือกลับไปดูสินค้าทั้งหมด" : "ขณะนี้ยังไม่มีสินค้าวางจำหน่ายในหมวดหมู่นี้" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 3107,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 3102,
                columnNumber: 19
              }, this) : /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  layout: true,
                  className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4",
                  children: /* @__PURE__ */ jsxDEV(AnimatePresence, { children: sortedItems.map((item) => /* @__PURE__ */ jsxDEV(
                    ItemCard,
                    {
                      appScreen,
                      item,
                      isAdmin,
                      onEdit: (it) => {
                        setEditingItem(it);
                        setIsFormOpen(true);
                      },
                      onDelete: handleDeleteItem,
                      onQuickQuantityChange: handleQuickQuantityChange,
                      onInquire: () => setInquiringItem(item),
                      onBuy: handleBuyItem,
                      onTogglePin: handleTogglePin,
                      onCategoryClick: (cat) => {
                        setSelectedCategory(cat);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    },
                    item.id,
                    false,
                    {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 3118,
                      columnNumber: 25
                    },
                    this
                  )) }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 3116,
                    columnNumber: 21
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 3112,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(DiscordBanner, {}, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 3142,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2767,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 2678,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("footer", { className: "mt-auto pt-4 pb-2 sm:pt-6 sm:pb-4 relative z-10 border-t border-zinc-800/60 bg-transparent w-full", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-400 tracking-wide text-center flex items-center gap-1.5 text-xs sm:text-sm", children: [
              "Powered by ",
              /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-zinc-200", children: "Vercel" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 3152,
                columnNumber: 30
              }, this),
              " · Code by ",
              /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-zinc-200", children: "dis.cord01" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 3152,
                columnNumber: 107
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 3151,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 3150,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 3149,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 3148,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(
              MobileDrawer,
              {
                isOpen: isAstdMenuOpen,
                onClose: () => setIsAstdMenuOpen(false),
                currentUser: currentUserData || currentUser,
                onLoginClick: () => {
                  setAppScreen("LOGIN");
                  setAuthMode("login");
                },
                onLogoutClick: handleLogout,
                setPage: setAppScreen,
                setShowTopupModal,
                openHistoryModal
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 3158,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              SearchOverlay,
              {
                isOpen: isSearchOpen,
                onClose: () => setIsSearchOpen(false),
                initialSearch: search,
                onSearchSubmit: setSearch,
                items,
                onItemClick: (item) => {
                  setIsSearchOpen(false);
                  setInquiringItem(item);
                }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 3171,
                columnNumber: 11
              },
              this
            ),
            renderModals()
          ]
        },
        appScreen,
        true,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 2567,
          columnNumber: 9
        },
        this
      );
    }
    return null;
  };
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(ShootingStars, {}, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 3193,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(GlobalLoadingScreen, { isLoading: isLoadingStock }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 3194,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { mode: "wait", children: renderAppScreen() }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 3195,
      columnNumber: 7
    }, this),
    !isLoadingStock && /* @__PURE__ */ jsxDEV(AIChatWidget, { items, shopLogoUrl: globalStats?.announcement_settings?.shopLogoUrl, currentUser, onLoginClick: () => setAppScreen("LOGIN"), aiStatus: globalStats?.ai_status }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 3196,
      columnNumber: 27
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 3192,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24sIHVzZU5hdmlnYXRlIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcbmltcG9ydCB7IFR1cm5zdGlsZSB9IGZyb20gXCJAbWFyc2lkZXYvcmVhY3QtdHVybnN0aWxlXCI7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gXCJtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHBhcnNlVVRDRGF0ZSwgZm9ybWF0VGhhaURhdGUsIGZvcm1hdFRoYWlUaW1lIH0gZnJvbSBcIi4vdXRpbHMvZGF0ZVwiO1xuaW1wb3J0IHtcbiAgU2hpZWxkLFxuICBTaGllbGRDaGVjayxcbiAgU2VhcmNoLFxuICBQbHVzLFxuICBSb3RhdGVDY3csXG4gIFNsaWRlcnNIb3Jpem9udGFsLFxuICBDb2lucyxcbiAgUGFja2FnZSxcbiAgTGF5ZXJzLFxuICBTcGFya2xlcyxcbiAgTG9jayxcbiAgVW5sb2NrLFxuICBBbGVydFRyaWFuZ2xlLFxuICBDaGV2cm9uRG93bixcbiAgWCxcbiAgRmlsZURvd24sXG4gIEZpbGVVcCxcbiAgRXh0ZXJuYWxMaW5rLFxuICBHaXRodWIsXG4gIFRyZW5kaW5nVXAsXG4gIEluYm94LFxuICBDaGVja0NpcmNsZSxcbiAgQ2hlY2ssXG4gIENvcHksXG4gIENsb2NrLFxuICBNZXNzYWdlQ2lyY2xlLFxuICBGbGFtZSxcbiAgQmVsbCxcbiAgQmVsbFJpbmcsXG4gIEJlbGxPZmYsXG4gIFZvbHVtZTIsXG4gIFZvbHVtZVgsXG4gIFNldHRpbmdzLFxuICBMb2FkZXIyLFxuICBDaGV2cm9uTGVmdCxcbiAgVXNlcixcbiAgU2hvcHBpbmdDYXJ0LFxuICBEYXRhYmFzZSxcbiAgQ2hldnJvblJpZ2h0LFxuICBNZW51LFxuICBMb2dJbixcbiAgVXNlclBsdXMsXG4gIFVzZXJzLFxuICBIaXN0b3J5LFxuICBXYWxsZXQsXG4gIExhbmRtYXJrLFxuICBUaWNrZXQsXG4gIEdpZnQsXG4gIEluZm8sXG4gIFVwbG9hZENsb3VkLFxuICBFeWUsXG4gIEV5ZU9mZixcbiAgRWRpdDMsXG4gIFN0YXIsXG4gIExvZ091dCxcbiAgRm9sZGVyUGx1cyxcbiAgSW1hZ2UgYXMgSW1hZ2VJY29uLFxuICBSZWZyZXNoQ3csXG4gIEdhbWVwYWQyLFxufSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5cbmltcG9ydCB7XG4gIFN0b2NrSXRlbSxcbiAgQ2F0ZWdvcnlGaWx0ZXIsXG4gIFNhbGVGb3JtYXRGaWx0ZXIsXG4gIFN0b2NrU3RhdHVzRmlsdGVyLFxufSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgREVGQVVMVF9QUkVTRVRTIH0gZnJvbSBcIi4vcHJlc2V0c1wiO1xuaW1wb3J0IHsgSXRlbUNhcmQgfSBmcm9tIFwiLi9jb21wb25lbnRzL0l0ZW1DYXJkXCI7XG5pbXBvcnQgeyBDYXRlZ29yeUxpc3QgfSBmcm9tIFwiLi9jb21wb25lbnRzL0NhdGVnb3J5TGlzdFwiO1xuaW1wb3J0IHsgSXRlbUNhcmRTa2VsZXRvbiB9IGZyb20gXCIuL2NvbXBvbmVudHMvSXRlbUNhcmRTa2VsZXRvblwiO1xuaW1wb3J0IHsgSW5xdWlyeU1vZGFsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9JbnF1aXJ5TW9kYWxcIjtcbmltcG9ydCB7IFJhbmRvbUJveE1vZGFsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9SYW5kb21Cb3hNb2RhbFwiO1xuaW1wb3J0IHsgR2FjaGFSZXN1bHRNb2RhbCB9IGZyb20gXCIuL2NvbXBvbmVudHMvR2FjaGFSZXN1bHRNb2RhbFwiO1xuaW1wb3J0IHsgQWRtaW5Nb2RhbCB9IGZyb20gXCIuL2NvbXBvbmVudHMvQWRtaW5Nb2RhbFwiO1xuaW1wb3J0IHsgQXBpU3RhdHVzV2lkZ2V0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9BcGlTdGF0dXNXaWRnZXRcIjtcbmltcG9ydCB7IFN0b2NrTWFuYWdlck1vZGFsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9TdG9ja01hbmFnZXJNb2RhbFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJEYXRhYmFzZU1vZGFsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9DdXN0b21lckRhdGFiYXNlTW9kYWxcIjtcbmltcG9ydCB7IEhpc3RvcnlNb2RhbCB9IGZyb20gXCIuL2NvbXBvbmVudHMvSGlzdG9yeU1vZGFsXCI7XG5pbXBvcnQgeyBDb3Vwb25NYW5hZ2VyTW9kYWwgfSBmcm9tIFwiLi9jb21wb25lbnRzL0NvdXBvbk1hbmFnZXJNb2RhbFwiO1xuaW1wb3J0IHsgQW5ub3VuY2VtZW50TWFuYWdlck1vZGFsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9Bbm5vdW5jZW1lbnRNYW5hZ2VyTW9kYWxcIjtcbmltcG9ydCB7IEltYWdlU2V0dGluZ3NNb2RhbCB9IGZyb20gXCIuL2NvbXBvbmVudHMvSW1hZ2VTZXR0aW5nc01vZGFsXCI7XG5pbXBvcnQgeyBBbm5vdW5jZW1lbnRQb3B1cCB9IGZyb20gXCIuL2NvbXBvbmVudHMvQW5ub3VuY2VtZW50UG9wdXBcIjtcbmltcG9ydCB7IE1hcnF1ZWVBbm5vdW5jZW1lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL01hcnF1ZWVBbm5vdW5jZW1lbnRcIjtcbmltcG9ydCB7IFNob3BIZWFkZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL1Nob3BIZWFkZXJcIjtcbmltcG9ydCB7IFNob3BCYW5uZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL1Nob3BCYW5uZXJcIjtcbmltcG9ydCB7IFRvcHVwUGFnZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvVG9wdXBQYWdlXCI7XG5pbXBvcnQgeyBUb3B1cFRvc01vZGFsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9Ub3B1cFRvc01vZGFsXCI7XG5pbXBvcnQgeyBQYXltZW50U2V0dGluZ3NNb2RhbCB9IGZyb20gXCIuL2NvbXBvbmVudHMvUGF5bWVudFNldHRpbmdzTW9kYWxcIjtcbmltcG9ydCB7IEFwaVN0YXR1c01vZGFsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9BcGlTdGF0dXNNb2RhbFwiO1xuaW1wb3J0IHsgQ2F0ZWdvcnlNYW5hZ2VyTW9kYWwgfSBmcm9tIFwiLi9jb21wb25lbnRzL0NhdGVnb3J5TWFuYWdlck1vZGFsXCI7XG5pbXBvcnQgeyBBdXRoUGFnZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvQXV0aFBhZ2VcIjtcbmltcG9ydCB7IEdhbWVUb3B1cFBhZ2UgfSBmcm9tIFwiLi9jb21wb25lbnRzL0dhbWVUb3B1cFBhZ2VcIjtcbmltcG9ydCB7IEdsb2JhbExvYWRpbmdTY3JlZW4gfSBmcm9tIFwiLi9jb21wb25lbnRzL0dsb2JhbExvYWRpbmdTY3JlZW5cIjtcbmltcG9ydCB7IFVzZXJQcm9maWxlRGFzaGJvYXJkIH0gZnJvbSBcIi4vY29tcG9uZW50cy9Vc2VyUHJvZmlsZURhc2hib2FyZFwiO1xuaW1wb3J0IGpzUVIgZnJvbSBcImpzcXJcIjtcblxuY29uc3QgcmVhZFFSRnJvbUltYWdlID0gKGZpbGU6IEZpbGUpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICBjYW52YXMud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBpZiAoIWN0eCkgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjb25zdCBjb2RlID0ganNRUihpbWFnZURhdGEuZGF0YSwgaW1hZ2VEYXRhLndpZHRoLCBpbWFnZURhdGEuaGVpZ2h0KTtcbiAgICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgICByZXNvbHZlKGNvZGUuZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGltZy5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgaW1nLnNyYyA9IGUudGFyZ2V0Py5yZXN1bHQgYXMgc3RyaW5nO1xuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gIH0pO1xufTtcblxuaW1wb3J0IHtcbiAgc2VuZERpc2NvcmRUb3B1cEVtYmVkLFxuICBzZW5kRGlzY29yZFB1cmNoYXNlRW1iZWQsXG4gIHNlbmREaXNjb3JkU3RvY2tVcGRhdGVFbWJlZCxcbn0gZnJvbSBcIi4vZGlzY29yZFwiO1xuaW1wb3J0IHsgTGl2ZUFjdGl2aXRpZXMsIExpdmVBY3Rpdml0eSB9IGZyb20gXCIuL2NvbXBvbmVudHMvTGl2ZUFjdGl2aXRpZXNcIjtcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4vc3VwYWJhc2VcIjtcbmltcG9ydCB7IGZldGNoSXRlbXMsIGZldGNoVXNlciwgZ2V0U3lzdGVtQ29uZmlnIH0gZnJvbSBcIi4vcXVlcmllc1wiO1xuXG5pbXBvcnQgeyBTYWxlc0NoYXJ0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9TYWxlc0NoYXJ0XCI7XG5pbXBvcnQgeyBNb2JpbGVEcmF3ZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL01vYmlsZURyYXdlclwiO1xuaW1wb3J0IHsgU2VhcmNoT3ZlcmxheSB9IGZyb20gXCIuL2NvbXBvbmVudHMvU2VhcmNoT3ZlcmxheVwiO1xuaW1wb3J0IHsgQUlDaGF0V2lkZ2V0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9BSUNoYXRXaWRnZXRcIjtcbmltcG9ydCB7IFNob290aW5nU3RhcnMgfSBmcm9tIFwiLi9jb21wb25lbnRzL1Nob290aW5nU3RhcnNcIjtcblxuZXhwb3J0IGNvbnN0IGFkZExpdmVBY3Rpdml0eSA9IGFzeW5jIChcbiAgYWN0aXZpdHk6IE9taXQ8TGl2ZUFjdGl2aXR5LCBcImlkXCIgfCBcInRpbWVzdGFtcFwiPixcbikgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJhY3Rpdml0aWVzXCIpLmluc2VydChbXG4gICAgICB7XG4gICAgICAgIHR5cGU6IGFjdGl2aXR5LnR5cGUsXG4gICAgICAgIHVzZXJuYW1lOiBhY3Rpdml0eS51c2VybmFtZSxcbiAgICAgICAgaXRlbV9uYW1lOiBhY3Rpdml0eS5pdGVtTmFtZSxcbiAgICAgICAgcXVhbnRpdHk6IGFjdGl2aXR5LnF1YW50aXR5LFxuICAgICAgICBwcmljZTogYWN0aXZpdHkucHJpY2UsXG4gICAgICAgIHJlbWFpbmluZ19zdG9jazogYWN0aXZpdHkucmVtYWluaW5nU3RvY2ssXG4gICAgICAgIGdhbWU6IGFjdGl2aXR5LmdhbWUsXG4gICAgICAgIGdhY2hhX2Ryb3BzOiBhY3Rpdml0eS5nYWNoYURyb3BzLFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIH0sXG4gICAgXSk7XG5cbiAgICAvLyBObyBjbGVhbnVwXG4gICAgaWYgKCFlcnJvcikge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwic3luYy11cGRhdGVcIikpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cbn07XG5cbmNvbnN0IERpc2NvcmRCYW5uZXIgPSAoKSA9PiAoXG4gIDxzZWN0aW9uIGNsYXNzTmFtZT1cIm10LTE2IHNtOm10LTI0IG1heC13LXNtIG14LWF1dG8gbWItMTBcIj5cbiAgICA8aWZyYW1lXG4gICAgICBzcmM9XCJodHRwczovL2Rpc2NvcmQuY29tL3dpZGdldD9pZD0xNTEwODQ1NDM1NzUxODI5NTY1JnRoZW1lPWRhcmtcIlxuICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgIGhlaWdodD1cIjUwMFwiXG4gICAgICBmcmFtZUJvcmRlcj1cIjBcIlxuICAgICAgc2FuZGJveD1cImFsbG93LXBvcHVwcyBhbGxvdy1wb3B1cHMtdG8tZXNjYXBlLXNhbmRib3ggYWxsb3ctc2FtZS1vcmlnaW4gYWxsb3ctc2NyaXB0c1wiXG4gICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLTJ4bCBzaGFkb3cteGwgdy1mdWxsXCJcbiAgICAvPlxuICA8L3NlY3Rpb24+XG4pO1xuXG5pbXBvcnQgeyBSZWNlbnRQdXJjaGFzZXMgfSBmcm9tIFwiLi9jb21wb25lbnRzL1JlY2VudFB1cmNoYXNlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IFtzaG93VXBkYXRlT3ZlcmxheSwgc2V0U2hvd1VwZGF0ZU92ZXJsYXldID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFZlcnNpb24gY2hlY2tpbmdcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgaW5pdGlhbFZlcnNpb246IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGNoZWNrVmVyc2lvbiA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFwiL2FwaS92ZXJzaW9uXCIpO1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgICAgaWYgKGRhdGEudmVyc2lvbikge1xuICAgICAgICAgIGlmICghaW5pdGlhbFZlcnNpb24pIHtcbiAgICAgICAgICAgIGluaXRpYWxWZXJzaW9uID0gZGF0YS52ZXJzaW9uO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaW5pdGlhbFZlcnNpb24gIT09IGRhdGEudmVyc2lvbikge1xuICAgICAgICAgICAgc2V0U2hvd1VwZGF0ZU92ZXJsYXkodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH07XG5cbiAgICBjaGVja1ZlcnNpb24oKTtcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGNoZWNrVmVyc2lvbiwgMzAwMDApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IFtnbG9iYWxTdGF0cywgc2V0R2xvYmFsU3RhdHNdID0gdXNlU3RhdGU8YW55Pih7XG4gICAgZ2xvYmFsX3NhbGVzX2FzdGQ6IDAsXG4gICAgZ2xvYmFsX3Jldl9hc3RkOiAwLFxuICAgIGdsb2JhbF9mcmVlX2FzdGQ6IDAsXG4gICAgbWFpbnRlbmFuY2VfbW9kZTogZmFsc2UsXG4gIH0pO1xuICBjb25zdCBbY3VycmVudFVzZXJEYXRhLCBzZXRDdXJyZW50VXNlckRhdGFdID0gdXNlU3RhdGU8YW55PihudWxsKTtcblxuICBjb25zdCBpc01haW50ZW5hbmNlTW9kZSA9IGdsb2JhbFN0YXRzPy5tYWludGVuYW5jZV9tb2RlID09PSBcInRydWVcIiB8fCBnbG9iYWxTdGF0cz8ubWFpbnRlbmFuY2VfbW9kZSA9PT0gdHJ1ZSB8fCBnbG9iYWxTdGF0cz8ubWFpbnRlbmFuY2VfbW9kZSA9PT0gMSB8fCBnbG9iYWxTdGF0cz8ubWFpbnRlbmFuY2VfbW9kZSA9PT0gXCIxXCI7XG4gIGNvbnN0IGlzVW5kZXJNYWludGVuYW5jZSA9IGlzTWFpbnRlbmFuY2VNb2RlO1xuXG4gIGNvbnN0IGdldEluaXRpYWxTdGF0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBwYXRoID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA6IFwiL1wiO1xuICAgIGxldCBpbml0QXBwU2NyZWVuID0gXCJTSE9QXCI7XG4gICAgbGV0IGluaXRTZWxlY3RlZENhdGVnb3J5ID0gXCJhbGxcIjtcblxuICAgIGlmIChwYXRoID09PSBcIi9sb2dpblwiKSB7XG4gICAgICBpbml0QXBwU2NyZWVuID0gXCJMT0dJTlwiO1xuICAgIH0gZWxzZSBpZiAocGF0aCA9PT0gXCIvdG9wdXBcIikge1xuICAgICAgaW5pdEFwcFNjcmVlbiA9IFwiVE9QVVBcIjtcbiAgICB9IGVsc2UgaWYgKHBhdGggPT09IFwiL2dhbWUtdG9wdXBcIikge1xuICAgICAgaW5pdEFwcFNjcmVlbiA9IFwiR0FNRVRPUFVQXCI7XG4gICAgfSBlbHNlIGlmIChwYXRoID09PSBcIi9wcm9maWxlXCIpIHtcbiAgICAgIGluaXRBcHBTY3JlZW4gPSBcIlBST0ZJTEVcIjtcbiAgICB9IGVsc2UgaWYgKHBhdGguc3RhcnRzV2l0aChcIi9jYXRlZ29yaWVzL1wiKSkge1xuICAgICAgaW5pdFNlbGVjdGVkQ2F0ZWdvcnkgPSBkZWNvZGVVUklDb21wb25lbnQoXG4gICAgICAgIHBhdGgucmVwbGFjZShcIi9jYXRlZ29yaWVzL1wiLCBcIlwiKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgaW5pdEFwcFNjcmVlbiwgaW5pdFNlbGVjdGVkQ2F0ZWdvcnkgfTtcbiAgfTtcblxuICBjb25zdCBpbml0aWFsU3RhdGUgPSBnZXRJbml0aWFsU3RhdGUoKTtcblxuICAvLyAtLS0gR2xvYmFsIEh1YiBTdGF0ZSAtLS1cbiAgY29uc3QgW2FwcFNjcmVlbiwgc2V0QXBwU2NyZWVuXSA9IHVzZVN0YXRlPHN0cmluZz4oXG4gICAgaW5pdGlhbFN0YXRlLmluaXRBcHBTY3JlZW4sXG4gICk7XG5cbiAgLy8gUm91dGUgaGFuZGxlcnMgZm9yIERpc2NvcmQgQXV0aCByZWRpcmVjdGlvbiBwYXJhbWV0ZXJzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBjb25zdCBkaXNjb3JkTG9naW4gPSBwYXJhbXMuZ2V0KFwiZGlzY29yZF9sb2dpblwiKTtcbiAgICBjb25zdCBkaXNjb3JkRW1haWwgPSBwYXJhbXMuZ2V0KFwiZW1haWxcIik7XG4gICAgY29uc3QgZGlzY29yZEF2YXRhciA9IHBhcmFtcy5nZXQoXCJhdmF0YXJcIik7XG5cbiAgICBpZiAoZGlzY29yZExvZ2luKSB7XG4gICAgICBjb25zdCB1c2VyUGF5bG9hZCA9IHtcbiAgICAgICAgdXNlcm5hbWU6IGRpc2NvcmRMb2dpbixcbiAgICAgICAgZGlzY29yZF9lbWFpbDogZGlzY29yZEVtYWlsLFxuICAgICAgICBhdmF0YXI6IGRpc2NvcmRBdmF0YXIsXG4gICAgICB9O1xuICAgICAgc2V0Q3VycmVudFVzZXIodXNlclBheWxvYWQpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgIFwiS1VXQVNISUlfQ1VSUkVOVF9VU0VSXCIsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHVzZXJQYXlsb2FkKSxcbiAgICAgICk7XG4gICAgICAvLyBDbGVhbiB1cCBVUkxcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgLy8gUG9wdXAgTWVzc2FnZSBMaXN0ZW5lciBmb3IgRGlzY29yZCBBdXRoXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlTWVzc2FnZSA9IChldmVudDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICAvLyBWYWxpZGF0ZSBvcmlnaW4gaXMgZnJvbSBBSSBTdHVkaW8gcHJldmlldyBvciBsb2NhbGhvc3Qgb3IgdmVyY2VsLmFwcFxuICAgICAgY29uc3Qgb3JpZ2luID0gZXZlbnQub3JpZ2luO1xuICAgICAgaWYgKFxuICAgICAgICAhb3JpZ2luLmVuZHNXaXRoKFwiLnJ1bi5hcHBcIikgJiZcbiAgICAgICAgIW9yaWdpbi5pbmNsdWRlcyhcImxvY2FsaG9zdFwiKSAmJlxuICAgICAgICAhb3JpZ2luLmluY2x1ZGVzKFwic3R1ZGlvLmdvb2dsZS5jb21cIikgJiZcbiAgICAgICAgIW9yaWdpbi5pbmNsdWRlcyhcInZlcmNlbC5hcHBcIilcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQuZGF0YT8udHlwZSA9PT0gXCJPQVVUSF9BVVRIX1NVQ0NFU1NcIiAmJiBldmVudC5kYXRhLnBheWxvYWQpIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGV2ZW50LmRhdGEucGF5bG9hZDtcbiAgICAgICAgY29uc3QgdXNlclBheWxvYWQgPSB7XG4gICAgICAgICAgdXNlcm5hbWU6IHBheWxvYWQudXNlcm5hbWUsXG4gICAgICAgICAgZGlzY29yZF9lbWFpbDogcGF5bG9hZC5lbWFpbCxcbiAgICAgICAgICBhdmF0YXI6IHBheWxvYWQuYXZhdGFyLFxuICAgICAgICB9O1xuICAgICAgICBzZXRDdXJyZW50VXNlcih1c2VyUGF5bG9hZCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgIFwiS1VXQVNISUlfQ1VSUkVOVF9VU0VSXCIsXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkodXNlclBheWxvYWQpLFxuICAgICAgICApO1xuICAgICAgICBzZXRBcHBTY3JlZW4oXCJTSE9QXCIpOyAvLyBHbyB0byBzaG9wIHNjcmVlbiBhZnRlciBsb2dpblxuICAgICAgfVxuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGhhbmRsZU1lc3NhZ2UpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgaGFuZGxlTWVzc2FnZSk7XG4gIH0sIFtdKTtcblxuICAvLyBVc2VyICYgQWRtaW4gQXV0aGVudGljYXRpb25zXG4gIGNvbnN0IFtjdXJyZW50VXNlciwgc2V0Q3VycmVudFVzZXJdID0gdXNlU3RhdGU8eyB1c2VybmFtZTogc3RyaW5nIH0gfCBudWxsPihcbiAgICAoKSA9PiB7XG4gICAgICBjb25zdCBzYXZlZCA9XG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiS1VXQVNISUlfQ1VSUkVOVF9VU0VSXCIpIHx8XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJLVVdBU0hJSV9DVVJSRU5UX1VTRVJcIik7XG4gICAgICBpZiAoc2F2ZWQpIHJldHVybiBKU09OLnBhcnNlKHNhdmVkKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICk7XG4gIGNvbnN0IFtpc0FkbWluLCBzZXRJc0FkbWluXSA9IHVzZVN0YXRlKCgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJLVVdBU0hJSV9JU19BRE1JTlwiKSA9PT0gXCJ0cnVlXCIgfHxcbiAgICAgIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJLVVdBU0hJSV9JU19BRE1JTlwiKSA9PT0gXCJ0cnVlXCJcbiAgICApO1xuICB9KTtcblxuICBjb25zdCBbbG9hZGluZ1ZhcmlhbnQsIHNldExvYWRpbmdWYXJpYW50XSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaXNBc3RkTWVudU9wZW4sIHNldElzQXN0ZE1lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBbZ2FjaGFSZXN1bHQsIHNldEdhY2hhUmVzdWx0XSA9IHVzZVN0YXRlPHtcbiAgICBkcm9wczogeyBuYW1lOiBzdHJpbmc7IGNvbG9yPzogc3RyaW5nIH1bXTtcbiAgICBpdGVtOiBTdG9ja0l0ZW07XG4gIH0gfCBudWxsPihudWxsKTtcblxuICAvLyAtLS0gU3RhdGVzIC0tLVxuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlPFN0b2NrSXRlbVtdPihbXSk7XG4gIGNvbnN0IFtpc0xvYWRpbmdTdG9jaywgc2V0SXNMb2FkaW5nU3RvY2tdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtkMUF1dGhFcnJvciwgc2V0RDFBdXRoRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNTZXJ2ZXJRdW90YUV4Y2VlZGVkLCBzZXRJc1NlcnZlclF1b3RhRXhjZWVkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc1NlYXJjaE9wZW4sIHNldElzU2VhcmNoT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZWxlY3RlZENhdGVnb3J5LCBzZXRTZWxlY3RlZENhdGVnb3J5XSA9IHVzZVN0YXRlPENhdGVnb3J5RmlsdGVyPihcbiAgICBpbml0aWFsU3RhdGUuaW5pdFNlbGVjdGVkQ2F0ZWdvcnksXG4gICk7XG4gIGNvbnN0IFtzZWxlY3RlZFNhbGVGb3JtYXQsIHNldFNlbGVjdGVkU2FsZUZvcm1hdF0gPVxuICAgIHVzZVN0YXRlPFNhbGVGb3JtYXRGaWx0ZXI+KFwiYWxsXCIpO1xuICBjb25zdCBbc2VsZWN0ZWRTdGF0dXMsIHNldFNlbGVjdGVkU3RhdHVzXSA9XG4gICAgdXNlU3RhdGU8U3RvY2tTdGF0dXNGaWx0ZXI+KFwiYWxsXCIpO1xuICBjb25zdCBbc2hvd1BvcHVsYXJPbmx5LCBzZXRTaG93UG9wdWxhck9ubHldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc29ydEJ5LCBzZXRTb3J0QnldID0gdXNlU3RhdGU8c3RyaW5nPihcIm5ld2VzdFwiKTtcbiAgY29uc3QgW3N5bmNDb3VudGVyLCBzZXRTeW5jQ291bnRlcl0gPSB1c2VTdGF0ZSgwKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gIH0sIFthcHBTY3JlZW4sIHNlbGVjdGVkQ2F0ZWdvcnldKTtcblxuICBcblxuICAvLyBTeW5jIEVuZ2luZSBMaXN0ZW5lclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBhY3RpdmVTeW5jSWQgPSAwO1xuXG4gICAgY29uc3QgaGFuZGxlU3luYyA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHN5bmNJZCA9ICsrYWN0aXZlU3luY0lkO1xuXG4gICAgICBjb25zdCBtaWdyYXRlSXRlbXMgPSAoaXRlbXNMaXN0OiBhbnlbXSk6IFN0b2NrSXRlbVtdID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zTGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLmNhdGVnb3J5ID09PSBcIkVxdWlwbWVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5pdGVtLCBjYXRlZ29yeTogXCJTa2luXCIgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGl0ZW0gYXMgU3RvY2tJdGVtO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRiSXRlbXMgPSBhd2FpdCBmZXRjaEl0ZW1zKCk7XG4gICAgICAgIGlmIChzeW5jSWQgIT09IGFjdGl2ZVN5bmNJZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZGJJdGVtcyAmJiBkYkl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzZXRJdGVtcyhtaWdyYXRlSXRlbXMoZGJJdGVtcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRJc1NlcnZlclF1b3RhRXhjZWVkZWQoZmFsc2UpO1xuICAgICAgICBzZXREMUF1dGhFcnJvcihmYWxzZSk7XG4gICAgICB9IGNhdGNoKGU6IGFueSkge1xuICAgICAgICBpZiAoZSAmJiBlLm1lc3NhZ2UgPT09IFwiRDFfQVVUSF9FUlJPUlwiKSB7XG4gICAgICAgICAgc2V0RDFBdXRoRXJyb3IodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25maWcgPSBhd2FpdCBnZXRTeXN0ZW1Db25maWcoKTtcbiAgICAgIGlmIChzeW5jSWQgIT09IGFjdGl2ZVN5bmNJZCkgcmV0dXJuO1xuICAgICAgaWYgKGNvbmZpZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHsgY291bnQsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgICAgLmZyb20oXCJwcm9maWxlc1wiKVxuICAgICAgICAgICAgLnNlbGVjdChcIipcIiwgeyBjb3VudDogXCJleGFjdFwiLCBoZWFkOiB0cnVlIH0pO1xuICAgICAgICAgIGlmICghZXJyb3IgJiYgY291bnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy51c2VyX2NvdW50ID0gY291bnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGxlZ2FjeUdsb2JhbFN1bSA9IChOdW1iZXIoY29uZmlnLmdsb2JhbF9zYWxlc19hc3RkKSB8fCAwKSArIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChOdW1iZXIoY29uZmlnLmdsb2JhbF9zYWxlc19yb3YpIHx8IDApICsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKE51bWJlcihjb25maWcuZ2xvYmFsX3NhbGVzX2FvdHIpIHx8IDApO1xuICAgICAgICAgIGNvbnN0IHRyYWNrZWRTYWxlc0NvdW50ID0gTnVtYmVyKGNvbmZpZy5hbGxfdGltZV9zYWxlc19jb3VudCkgfHwgMDtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25maWcudG90YWxfcHVyY2hhc2VzID0gTWF0aC5tYXgobGVnYWN5R2xvYmFsU3VtLCB0cmFja2VkU2FsZXNDb3VudCk7XG5cbiAgICAgICAgICBjb25zdCB7IGRhdGE6IGFsbFRvcHVwcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAgIC5mcm9tKFwidG9wdXBzXCIpXG4gICAgICAgICAgICAuc2VsZWN0KFwiYW1vdW50XCIpO1xuICAgICAgICAgIGlmIChhbGxUb3B1cHMpIHtcbiAgICAgICAgICAgIGNvbmZpZy50b3RhbF90b3B1cHMgPSBhbGxUb3B1cHMucmVkdWNlKFxuICAgICAgICAgICAgICAoYWNjLCB0b3B1cCkgPT4gYWNjICsgKHBhcnNlRmxvYXQodG9wdXAuYW1vdW50KSB8fCAwKSxcbiAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgIGlmIChzeW5jSWQgIT09IGFjdGl2ZVN5bmNJZCkgcmV0dXJuO1xuICAgICAgICBzZXRHbG9iYWxTdGF0cyhjb25maWcpO1xuICAgICAgICBpZiAoY29uZmlnLmFubm91bmNlbWVudF9zZXR0aW5ncykge1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgXCJLVVdBU0hJSV9BTk5PVU5DRU1FTlRfU0VUVElOR1NcIixcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGNvbmZpZy5hbm5vdW5jZW1lbnRfc2V0dGluZ3MpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwic3luYy1hbm5vdW5jZW1lbnRcIikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50VXNlcj8udXNlcm5hbWUpIHtcbiAgICAgICAgY29uc3QgdSA9IGF3YWl0IGZldGNoVXNlcihjdXJyZW50VXNlci51c2VybmFtZSk7XG4gICAgICAgIGxldCB0b3RhbFRvcHVwcyA9IDA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgeyBkYXRhOiB0b3B1cHNEYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgICAgLmZyb20oXCJ0b3B1cHNcIilcbiAgICAgICAgICAgIC5zZWxlY3QoXCJhbW91bnRcIilcbiAgICAgICAgICAgIC5lcShcInVzZXJuYW1lXCIsIGN1cnJlbnRVc2VyLnVzZXJuYW1lKTtcbiAgICAgICAgICBpZiAodG9wdXBzRGF0YSkge1xuICAgICAgICAgICAgdG90YWxUb3B1cHMgPSB0b3B1cHNEYXRhLnJlZHVjZShcbiAgICAgICAgICAgICAgKGFjYywgY3VycikgPT4gYWNjICsgKHBhcnNlRmxvYXQoY3Vyci5hbW91bnQpIHx8IDApLFxuICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgaWYgKHN5bmNJZCAhPT0gYWN0aXZlU3luY0lkKSByZXR1cm47XG4gICAgICAgIGlmICh1KSB7XG4gICAgICAgICAgc2V0Q3VycmVudFVzZXJEYXRhKHsgLi4udSwgdG9wdXBDb3VudDogdG90YWxUb3B1cHMgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2V0SXNMb2FkaW5nU3RvY2soZmFsc2UpO1xuICAgICAgc2V0U3luY0NvdW50ZXIoKGMpID0+IGMgKyAxKTtcbiAgICB9O1xuXG4gICAgLy8gSW5pdGlhbCBmZXRjaFxuICAgIGhhbmRsZVN5bmMoKTtcblxuICAgIGNvbnN0IHRocm90dGxlZEhhbmRsZVN5bmMgPSAoKSA9PiB7XG4gICAgICBpZiAoKHdpbmRvdyBhcyBhbnkpLl9zeW5jRGVib3VuY2UpXG4gICAgICAgIGNsZWFyVGltZW91dCgod2luZG93IGFzIGFueSkuX3N5bmNEZWJvdW5jZSk7XG4gICAgICAod2luZG93IGFzIGFueSkuX3N5bmNEZWJvdW5jZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBoYW5kbGVTeW5jKCk7XG4gICAgICB9LCAzMDAwKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzeW5jLXVwZGF0ZVwiLCBoYW5kbGVTeW5jKTtcblxuICAgIGNvbnN0IHJlYWx0aW1lQ2hhbm5lbCA9IHN1cGFiYXNlXG4gICAgICAuY2hhbm5lbChcInB1YmxpYy1kYi1jaGFuZ2VzXCIpXG4gICAgICAub24oXCJwb3N0Z3Jlc19jaGFuZ2VzXCIsIHsgZXZlbnQ6IFwiKlwiLCBzY2hlbWE6IFwicHVibGljXCIgfSwgKCkgPT4ge1xuICAgICAgICB0aHJvdHRsZWRIYW5kbGVTeW5jKCk7XG4gICAgICB9KVxuICAgICAgLnN1YnNjcmliZSgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic3luYy11cGRhdGVcIiwgaGFuZGxlU3luYyk7XG4gICAgICBzdXBhYmFzZS5yZW1vdmVDaGFubmVsKHJlYWx0aW1lQ2hhbm5lbCk7XG4gICAgfTtcbiAgfSwgW2N1cnJlbnRVc2VyXSk7XG5cbiAgLy8gTW9kYWxzIGNvbnRyb2xsZXJcbiAgLy8gc2hvd0F1dGhNb2RhbCByZW1vdmVkXG4gIGNvbnN0IFthdXRoTW9kZSwgc2V0QXV0aE1vZGVdID0gdXNlU3RhdGU8XG4gICAgXCJsb2dpblwiIHwgXCJyZWdpc3RlclwiIHwgXCJmb3Jnb3RcIiB8IFwiZm9yZ290X3ZlcmlmeV9vdHBcIlxuICA+KFwibG9naW5cIik7XG4gIGNvbnN0IFthdXRoVXNlcm5hbWUsIHNldEF1dGhVc2VybmFtZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2F1dGhFbWFpbCwgc2V0QXV0aEVtYWlsXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYXV0aFBhc3N3b3JkLCBzZXRBdXRoUGFzc3dvcmRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFthdXRoQ29uZmlybVBhc3N3b3JkLCBzZXRBdXRoQ29uZmlybVBhc3N3b3JkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYXV0aE90cENvZGUsIHNldEF1dGhPdHBDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYXV0aEVycm9yLCBzZXRBdXRoRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0F1dGhMb2FkaW5nLCBzZXRJc0F1dGhMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzQ2FwdGNoYVZlcmlmaWVkLCBzZXRJc0NhcHRjaGFWZXJpZmllZF0gPSB1c2VTdGF0ZSghaW1wb3J0Lm1ldGEuZW52LlZJVEVfVFVSTlNUSUxFX1NJVEVfS0VZIHx8IGltcG9ydC5tZXRhLmVudi5WSVRFX1RVUk5TVElMRV9TSVRFX0tFWSA9PT0gXCIxeDAwMDAwMDAwMDAwMDAwMDAwMDAwQUFcIik7XG4gIGNvbnN0IFtzaG93QXV0aFBhc3N3b3JkLCBzZXRTaG93QXV0aFBhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBbc2hvd0F1dGhDb25maXJtUGFzc3dvcmQsIHNldFNob3dBdXRoQ29uZmlybVBhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBbc2hvd01vY2tFbWFpbE1vZGFsLCBzZXRTaG93TW9ja0VtYWlsTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9ja0VtYWlsTW9kYWxEYXRhLCBzZXRNb2NrRW1haWxNb2RhbERhdGFdID0gdXNlU3RhdGU8e1xuICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgdXNlcm5hbWU6IHN0cmluZztcbiAgICBwYXNzd29yZDogc3RyaW5nO1xuICB9IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtyZW1lbWJlckF1dGgsIHNldFJlbWVtYmVyQXV0aF0gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICAvLyAtLS0gVG9wIFVwIFN0YXRlIC0tLVxuICBjb25zdCBbc2hvd1RvcHVwTW9kYWwsIHNldFNob3dUb3B1cE1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3RvcHVwVGFyZ2V0LCBzZXRUb3B1cFRhcmdldF0gPSB1c2VTdGF0ZTxcImJhbGFuY2VcIiB8IFwiYmFsYW5jZV9yb3ZcIj4oXCJiYWxhbmNlXCIpO1xuICBjb25zdCBbY3VycmVudFZpZXcsIHNldEN1cnJlbnRWaWV3XSA9IHVzZVN0YXRlPFwic3RvcmVcIiB8IFwidG9wdXBcIj4oXCJzdG9yZVwiKTtcblxuICBjb25zdCBbdG9wdXBNb2RhbFN0ZXAsIHNldFRvcHVwTW9kYWxTdGVwXSA9IHVzZVN0YXRlPFxuICAgIFwic2VsZWN0XCIgfCBcImFuZ3Bhb1wiIHwgXCJiYW5rXCIgfCBcImNvdXBvblwiIHwgXCJzdWNjZXNzXCJcbiAgPihcInNlbGVjdFwiKTtcbiAgXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0VG9wdXBNb2RhbFN0ZXAoXCJzZWxlY3RcIik7XG4gICAgc2V0VG9wdXBDb2RlKFwiXCIpO1xuICAgIHNldFNsaXBGaWxlKG51bGwpO1xuICB9LCBbYXBwU2NyZWVuLCB0b3B1cFRhcmdldF0pO1xuICBcbiAgY29uc3QgW3RvcHVwU3VjY2Vzc01lc3NhZ2UsIHNldFRvcHVwU3VjY2Vzc01lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIFxuICBjb25zdCBbdG9wdXBDb2RlLCBzZXRUb3B1cENvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzbGlwRmlsZSwgc2V0U2xpcEZpbGVdID0gdXNlU3RhdGU8RmlsZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbdG9zQWNjZXB0ZWQsIHNldFRvc0FjY2VwdGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dUb3B1cFRvcywgc2V0U2hvd1RvcHVwVG9zXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NlbGVjdGVkVG9wdXBDaGFubmVsLCBzZXRTZWxlY3RlZFRvcHVwQ2hhbm5lbF0gPSB1c2VTdGF0ZTxcbiAgICBcImFuZ3Bhb1wiIHwgXCJiYW5rXCIgfCBcImNvdXBvblwiIHwgbnVsbFxuICA+KG51bGwpO1xuXG4gIGNvbnN0IFtpc1Byb2Nlc3NpbmdUb3B1cCwgc2V0SXNQcm9jZXNzaW5nVG9wdXBdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNQcm9jZXNzaW5nUHVyY2hhc2UsIHNldElzUHJvY2Vzc2luZ1B1cmNoYXNlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgaXNQcm9jZXNzaW5nUHVyY2hhc2VSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIGNvbnN0IFt0b2FzdHMsIHNldFRvYXN0c10gPSB1c2VTdGF0ZTx7IGlkOiBzdHJpbmc7IHRleHQ6IHN0cmluZzsgdHlwZTogXCJzdWNjZXNzXCIgfCBcImluZm9cIiB8IFwiZXJyb3JcIiB9W10+KFtdKTtcblxuICAvLyBNb2RhbHMgY29udHJvbGxlclxuICBjb25zdCBbaXNDYXRlZ29yeU1hbmFnZXJPcGVuLCBzZXRJc0NhdGVnb3J5TWFuYWdlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNGb3JtT3Blbiwgc2V0SXNGb3JtT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc1N0b2NrTWFuYWdlck9wZW4sIHNldElzU3RvY2tNYW5hZ2VyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0N1c3RvbWVyRGJPcGVuLCBzZXRJc0N1c3RvbWVyRGJPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzQ291cG9uTWFuYWdlck9wZW4sIHNldElzQ291cG9uTWFuYWdlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNQYXltZW50Q29uZmlnT3Blbiwgc2V0SXNQYXltZW50Q29uZmlnT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0FwaVN0YXR1c09wZW4sIHNldElzQXBpU3RhdHVzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0ltYWdlU2V0dGluZ3NPcGVuLCBzZXRJc0ltYWdlU2V0dGluZ3NPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzQW5ub3VuY2VtZW50TWFuYWdlck9wZW4sIHNldElzQW5ub3VuY2VtZW50TWFuYWdlck9wZW5dID1cbiAgICB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93SGlzdG9yeU1vZGFsLCBzZXRTaG93SGlzdG9yeU1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2hpc3RvcnlUYWIsIHNldEhpc3RvcnlUYWJdID0gdXNlU3RhdGU8XCJwdXJjaGFzZXNcIiB8IFwidG9wdXBzXCI+KFxuICAgIFwicHVyY2hhc2VzXCIsXG4gICk7XG5cbiAgY29uc3Qgb3Blbkhpc3RvcnlNb2RhbCA9ICh0YWI6IFwicHVyY2hhc2VzXCIgfCBcInRvcHVwc1wiKSA9PiB7XG4gICAgc2V0SGlzdG9yeVRhYih0YWIpO1xuICAgIHNldFNob3dIaXN0b3J5TW9kYWwodHJ1ZSk7XG4gIH07XG4gIGNvbnN0IFt2aWV3aW5nVXNlckhpc3RvcnksIHNldFZpZXdpbmdVc2VySGlzdG9yeV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihcbiAgICBudWxsLFxuICApO1xuICBjb25zdCBbZWRpdGluZ0l0ZW0sIHNldEVkaXRpbmdJdGVtXSA9IHVzZVN0YXRlPFN0b2NrSXRlbSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaW5xdWlyaW5nSXRlbSwgc2V0SW5xdWlyaW5nSXRlbV0gPSB1c2VTdGF0ZTxTdG9ja0l0ZW0gfCBudWxsPihudWxsKTtcblxuICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgaXNOYXZpZ2F0aW5nID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgaXNJbml0aWFsTW91bnQgPSB1c2VSZWYodHJ1ZSk7XG5cbiAgLy8gU3luYyBzdGF0ZSB0byBVUkxcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNJbml0aWFsTW91bnQuY3VycmVudCkge1xuICAgICAgaXNJbml0aWFsTW91bnQuY3VycmVudCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc05hdmlnYXRpbmcuY3VycmVudCkge1xuICAgICAgaXNOYXZpZ2F0aW5nLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IG5ld1BhdGggPSBcIi9cIjtcbiAgICBpZiAoYXBwU2NyZWVuID09PSBcIkxPR0lOXCIpIHtcbiAgICAgIG5ld1BhdGggPSBcIi9sb2dpblwiO1xuICAgIH0gZWxzZSBpZiAoYXBwU2NyZWVuID09PSBcIlRPUFVQXCIpIHtcbiAgICAgIG5ld1BhdGggPSBcIi90b3B1cFwiO1xuICAgIH0gZWxzZSBpZiAoYXBwU2NyZWVuID09PSBcIkdBTUVUT1BVUFwiKSB7XG4gICAgICBuZXdQYXRoID0gXCIvZ2FtZS10b3B1cFwiO1xuICAgIH0gZWxzZSBpZiAoYXBwU2NyZWVuID09PSBcIlBST0ZJTEVcIikge1xuICAgICAgbmV3UGF0aCA9IFwiL3Byb2ZpbGVcIjtcbiAgICB9IGVsc2UgaWYgKGlucXVpcmluZ0l0ZW0pIHtcbiAgICAgIG5ld1BhdGggPSBgL3Byb2R1Y3RzLyR7aW5xdWlyaW5nSXRlbS5pZH1gO1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRDYXRlZ29yeSAmJiBzZWxlY3RlZENhdGVnb3J5ICE9PSBcImFsbFwiKSB7XG4gICAgICBuZXdQYXRoID0gYC9jYXRlZ29yaWVzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KHNlbGVjdGVkQ2F0ZWdvcnkpfWA7XG4gICAgfVxuXG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lICE9PSBuZXdQYXRoKSB7XG4gICAgICBpc05hdmlnYXRpbmcuY3VycmVudCA9IHRydWU7XG4gICAgICBuYXZpZ2F0ZShuZXdQYXRoKTtcbiAgICB9XG4gIH0sIFthcHBTY3JlZW4sIHNlbGVjdGVkQ2F0ZWdvcnksIGlucXVpcmluZ0l0ZW0/LmlkXSk7XG5cbiAgLy8gU3luYyBVUkwgdG8gc3RhdGVcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNOYXZpZ2F0aW5nLmN1cnJlbnQpIHtcbiAgICAgIGlzTmF2aWdhdGluZy5jdXJyZW50ID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGF0aCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIGxldCBuZXdBcHBTY3JlZW4gPSBhcHBTY3JlZW47XG4gICAgbGV0IG5ld1NlbGVjdGVkQ2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5O1xuICAgIGxldCBuZXdJbnF1aXJpbmdJdGVtID0gaW5xdWlyaW5nSXRlbTtcblxuICAgIGlmIChwYXRoID09PSBcIi9sb2dpblwiKSB7XG4gICAgICBuZXdBcHBTY3JlZW4gPSBcIkxPR0lOXCI7XG4gICAgICBuZXdJbnF1aXJpbmdJdGVtID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHBhdGggPT09IFwiL3RvcHVwXCIpIHtcbiAgICAgIG5ld0FwcFNjcmVlbiA9IFwiVE9QVVBcIjtcbiAgICAgIG5ld0lucXVpcmluZ0l0ZW0gPSBudWxsO1xuICAgIH0gZWxzZSBpZiAocGF0aCA9PT0gXCIvZ2FtZS10b3B1cFwiKSB7XG4gICAgICBuZXdBcHBTY3JlZW4gPSBcIkdBTUVUT1BVUFwiO1xuICAgICAgbmV3SW5xdWlyaW5nSXRlbSA9IG51bGw7XG4gICAgfSBlbHNlIGlmIChwYXRoID09PSBcIi9wcm9maWxlXCIpIHtcbiAgICAgIG5ld0FwcFNjcmVlbiA9IFwiUFJPRklMRVwiO1xuICAgICAgbmV3SW5xdWlyaW5nSXRlbSA9IG51bGw7XG4gICAgfSBlbHNlIGlmIChwYXRoLnN0YXJ0c1dpdGgoXCIvY2F0ZWdvcmllcy9cIikpIHtcbiAgICAgIG5ld0FwcFNjcmVlbiA9IFwiU0hPUFwiO1xuICAgICAgbmV3U2VsZWN0ZWRDYXRlZ29yeSA9IGRlY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgcGF0aC5yZXBsYWNlKFwiL2NhdGVnb3JpZXMvXCIsIFwiXCIpLFxuICAgICAgKTtcbiAgICAgIG5ld0lucXVpcmluZ0l0ZW0gPSBudWxsO1xuICAgIH0gZWxzZSBpZiAocGF0aC5zdGFydHNXaXRoKFwiL3Byb2R1Y3RzL1wiKSkge1xuICAgICAgbmV3QXBwU2NyZWVuID0gXCJTSE9QXCI7XG4gICAgICBjb25zdCBwcm9kdWN0SWQgPSBwYXRoLnJlcGxhY2UoXCIvcHJvZHVjdHMvXCIsIFwiXCIpO1xuICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zLmZpbmQoKGkpID0+IGkuaWQgPT09IHByb2R1Y3RJZCk7XG4gICAgICBpZiAoaXRlbSkge1xuICAgICAgICBuZXdJbnF1aXJpbmdJdGVtID0gaXRlbTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBhdGggPT09IFwiL1wiIHx8IHBhdGggPT09IFwiXCIpIHtcbiAgICAgIG5ld0FwcFNjcmVlbiA9IFwiU0hPUFwiO1xuICAgICAgbmV3U2VsZWN0ZWRDYXRlZ29yeSA9IFwiYWxsXCI7XG4gICAgICBuZXdJbnF1aXJpbmdJdGVtID0gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgIGlmIChuZXdBcHBTY3JlZW4gIT09IGFwcFNjcmVlbikge1xuICAgICAgc2V0QXBwU2NyZWVuKG5ld0FwcFNjcmVlbik7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG5ld1NlbGVjdGVkQ2F0ZWdvcnkgIT09IHNlbGVjdGVkQ2F0ZWdvcnkpIHtcbiAgICAgIHNldFNlbGVjdGVkQ2F0ZWdvcnkobmV3U2VsZWN0ZWRDYXRlZ29yeSk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG5ld0lucXVpcmluZ0l0ZW0gIT09IGlucXVpcmluZ0l0ZW0pIHtcbiAgICAgIHNldElucXVpcmluZ0l0ZW0obmV3SW5xdWlyaW5nSXRlbSk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgaXNOYXZpZ2F0aW5nLmN1cnJlbnQgPSB0cnVlO1xuICAgIH1cbiAgfSwgW2xvY2F0aW9uLnBhdGhuYW1lLCBpdGVtc10pO1xuXG4gIGNvbnN0IFtoaWRlR2xvYmFsU3RhdHMsIHNldEhpZGVHbG9iYWxTdGF0c10gPSB1c2VTdGF0ZSgoKSA9PiB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiS1VXQVNISUlfSElERV9TVEFUU1wiKSA9PT0gXCJ0cnVlXCI7XG4gIH0pO1xuXG4gIGNvbnN0IHRvZ2dsZUhpZGVHbG9iYWxTdGF0cyA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdTdGF0ZSA9ICFoaWRlR2xvYmFsU3RhdHM7XG4gICAgc2V0SGlkZUdsb2JhbFN0YXRzKG5ld1N0YXRlKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIktVV0FTSElJX0hJREVfU1RBVFNcIiwgU3RyaW5nKG5ld1N0YXRlKSk7XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlTWFpbnRlbmFuY2VNb2RlID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIGNvbmZpcm0oXG4gICAgICAgIGDguITguLjguJPguJXguYnguK3guIfguIHguLLguKMke2lzTWFpbnRlbmFuY2VNb2RlID8gXCLguYDguJvguLTguJRcIiA6IFwi4Lib4Li04LiUXCJ94LmA4Lin4LmH4Lia4LmE4LiL4LiV4LmM4LmD4LiK4LmI4Lir4Lij4Li34Lit4LmE4Lih4LmIP2AsXG4gICAgICApXG4gICAgKSB7XG4gICAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInN5c3RlbV9jb25maWdcIilcbiAgICAgICAgLnVwZGF0ZSh7XG4gICAgICAgICAgbWFpbnRlbmFuY2VfbW9kZTogIWlzTWFpbnRlbmFuY2VNb2RlLFxuICAgICAgICB9KVxuICAgICAgICAuZXEoXCJpZFwiLCBcIm1haW5cIik7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJzeW5jLXVwZGF0ZVwiKSk7XG4gICAgICBzaG93VG9hc3QoaXNNYWludGVuYW5jZU1vZGUgPyBcIuC5gOC4m+C4tOC4lOC4o+C5ieC4suC4meC5geC4peC5ieC4pyFcIiA6IFwi4Lib4Li04LiU4Lij4LmJ4Liy4LiZICjguYLguKvguKHguJTguIvguYjguK3guKHguJrguLPguKPguLjguIcpIOC5geC4peC5ieC4pyFcIiwgXCJzdWNjZXNzXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzaG93VG9hc3QgPSAoXG4gICAgdGV4dDogc3RyaW5nLFxuICAgIHR5cGU6IFwic3VjY2Vzc1wiIHwgXCJpbmZvXCIgfCBcImVycm9yXCIgPSBcInN1Y2Nlc3NcIixcbiAgKSA9PiB7XG4gICAgY29uc3QgaWQgPSBEYXRlLm5vdygpLnRvU3RyaW5nKCkgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCk7XG4gICAgc2V0VG9hc3RzKChwcmV2KSA9PiBbeyBpZCwgdGV4dCwgdHlwZSB9LCAuLi5wcmV2XS5zbGljZSgwLCAzKSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRUb2FzdHMoKHByZXYpID0+IHByZXYuZmlsdGVyKCh0KSA9PiB0LmlkICE9PSBpZCkpO1xuICAgIH0sIDMwMDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRvcHVwU3VibWl0ID0gYXN5bmMgKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXRvc0FjY2VwdGVkKSB7XG4gICAgICBzaG93VG9hc3QoXCLguIHguKPguLjguJPguLLguKLguK3guKHguKPguLHguJrguILguYnguK3guIHguLPguKvguJnguJTguYPguJnguIHguLLguKPguYPguKvguYnguJrguKPguLTguIHguLLguKPguIHguYjguK3guJnguJTguLPguYDguJnguLTguJnguIHguLLguKPguJXguYjguK1cIiwgXCJlcnJvclwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRvcHVwTW9kYWxTdGVwID09PSBcImNvdXBvblwiICYmICF0b3B1cENvZGUudHJpbSgpKSB7XG4gICAgICBzaG93VG9hc3QoXCLguIHguKPguLjguJPguLLguIHguKPguK3guIHguILguYnguK3guKHguLnguKXguYDguJ7guLfguYjguK3guYDguJXguLTguKHguYDguIfguLTguJlcIiwgXCJlcnJvclwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCh0b3B1cE1vZGFsU3RlcCA9PT0gXCJiYW5rXCIgfHwgdG9wdXBNb2RhbFN0ZXAgPT09IFwiYW5ncGFvXCIpICYmICFzbGlwRmlsZSkge1xuICAgICAgc2hvd1RvYXN0KFwi4LiB4Lij4Li44LiT4Liy4Lit4Lix4Lib4LmC4Lir4Lil4LiU4Lij4Li54Lib4Lig4Liy4Lie4Liq4Lil4Li04Lib4LmC4Lit4LiZ4LmA4LiH4Li04LiZXCIsIFwiZXJyb3JcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjdXJyZW50VXNlcj8udXNlcm5hbWUpIHtcbiAgICAgIHNob3dUb2FzdChcIuC4geC4o+C4uOC4k+C4suC5gOC4guC5ieC4suC4quC4ueC5iOC4o+C4sOC4muC4muC4geC5iOC4reC4mVwiLCBcImVycm9yXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldElzUHJvY2Vzc2luZ1RvcHVwKHRydWUpO1xuXG4gICAgY29uc3QgYWN0aXZlVXNlcm5hbWUgPSBjdXJyZW50VXNlci51c2VybmFtZS50cmltKCk7XG4gICAgY29uc3QgaGFuZGxlVG9wdXBFcnJvciA9IChlcnJNZXNzYWdlOiBzdHJpbmcsIGNoYW5uZWw6IHN0cmluZykgPT4ge1xuICAgICAgc2hvd1RvYXN0KGVyck1lc3NhZ2UsIFwiZXJyb3JcIik7XG4gICAgICBzZW5kRGlzY29yZFRvcHVwRW1iZWQoYWN0aXZlVXNlcm5hbWUsIDAsIGNoYW5uZWwsIDAsIGZhbHNlLCBlcnJNZXNzYWdlKTtcbiAgICAgIHNldElzUHJvY2Vzc2luZ1RvcHVwKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgbGl2ZVVzZXIgPSBhd2FpdCBmZXRjaFVzZXIoYWN0aXZlVXNlcm5hbWUpO1xuICAgIGlmICghbGl2ZVVzZXIpIHtcbiAgICAgIHNob3dUb2FzdChcIuC5gOC4geC4tOC4lOC4guC5ieC4reC4nOC4tOC4lOC4nuC4peC4suC4lOC5g+C4meC4geC4suC4o+C5guC4q+C4peC4lOC4guC5ieC4reC4oeC4ueC4peC4peC4ueC4geC4hOC5ieC4siDguYLguJvguKPguJTguKXguK3guIfguK3guLXguIHguITguKPguLHguYnguIdcIiwgXCJlcnJvclwiKTtcbiAgICAgIHNldElzUHJvY2Vzc2luZ1RvcHVwKGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodG9wdXBNb2RhbFN0ZXAgPT09IFwiY291cG9uXCIpIHtcbiAgICAgIGNvbnN0IHsgZGF0YTogY291cG9uRGF0YSwgZXJyb3I6IGNvdXBvbkVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcImNvdXBvbnNcIilcbiAgICAgICAgLnNlbGVjdChcIipcIilcbiAgICAgICAgLmVxKFwiY29kZVwiLCB0b3B1cENvZGUudHJpbSgpKVxuICAgICAgICAubWF5YmVTaW5nbGUoKTtcblxuICAgICAgaWYgKCFjb3Vwb25EYXRhKSB7XG4gICAgICAgIGhhbmRsZVRvcHVwRXJyb3IoXCLguYLguITguYnguJTguYTguKHguYjguJbguLnguIHguJXguYnguK3guIfguKvguKPguLfguK3guYTguKHguYjguKHguLXguYPguJnguKPguLDguJrguJpcIiwgXCJjb3Vwb25cIik7IHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IGNvdXBvbiA9IHtcbiAgICAgICAgLi4uY291cG9uRGF0YSxcbiAgICAgICAgdXNlZEJ5OiB0eXBlb2YgY291cG9uRGF0YS51c2VkQnkgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShjb3Vwb25EYXRhLnVzZWRCeSB8fCAnW10nKSA6IChjb3Vwb25EYXRhLnVzZWRCeSB8fCBbXSksXG4gICAgICB9O1xuXG4gICAgICBpZiAoY291cG9uKSB7XG4gICAgICAgIGlmIChjb3Vwb24udXNlZEJ5ICYmIGNvdXBvbi51c2VkQnkuaW5jbHVkZXMoYWN0aXZlVXNlcm5hbWUpKSB7XG4gICAgICAgICAgaGFuZGxlVG9wdXBFcnJvcihcIuC4hOC4uOC4k+C5hOC4lOC5ieC5g+C4iuC5ieC4h+C4suC4meC5guC4hOC5ieC4lOC4meC4teC5ieC5hOC4m+C5geC4peC5ieC4p1wiLCBcImNvdXBvblwiKTsgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmFsYW5jZUZpZWxkID0gdG9wdXBUYXJnZXQ7XG4gICAgICAgIGNvbnN0IG5ld0JhbGFuY2UgPSBOdW1iZXIobGl2ZVVzZXJbYmFsYW5jZUZpZWxkXSB8fCAwKSArIGNvdXBvbi5hbW91bnQ7XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwicHJvZmlsZXNcIilcbiAgICAgICAgICAudXBkYXRlKHsgW2JhbGFuY2VGaWVsZF06IG5ld0JhbGFuY2UgfSlcbiAgICAgICAgICAuZXEoXCJ1c2VybmFtZVwiLCBhY3RpdmVVc2VybmFtZSk7XG5cbiAgICAgICAgY29uc3QgeyBlcnJvcjogdG9wdXBFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcInRvcHVwc1wiKS5pbnNlcnQoW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiBhY3RpdmVVc2VybmFtZSxcbiAgICAgICAgICAgIGFtb3VudDogY291cG9uLmFtb3VudCxcbiAgICAgICAgICAgIG1ldGhvZDogYENvdXBvbjogJHtjb3Vwb24uY29kZX1gLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGlmICh0b3B1cEVycm9yKSB7XG4gICAgICAgICAgYXdhaXQgc3VwYWJhc2UuZnJvbShcInRvcHVwc1wiKS5pbnNlcnQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB1c2VybmFtZTogYWN0aXZlVXNlcm5hbWUsXG4gICAgICAgICAgICAgIGFtb3VudDogY291cG9uLmFtb3VudCxcbiAgICAgICAgICAgICAgbWV0aG9kOiBgQ291cG9uOiAke2NvdXBvbi5jb2RlfWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwiY291cG9uc1wiKVxuICAgICAgICAgIC51cGRhdGUoe1xuICAgICAgICAgICAgIHVzZWRCeTogSlNPTi5zdHJpbmdpZnkoWy4uLmNvdXBvbi51c2VkQnksIGFjdGl2ZVVzZXJuYW1lXSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcShcImlkXCIsIGNvdXBvbi5pZCk7XG4gICAgICAgICAgXG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInN5bmMtdXBkYXRlXCIpKTtcbiAgICAgICAgc2hvd1RvYXN0KGDguYPguIrguYnguITguLnguJvguK3guIfguKrguLPguYDguKPguYfguIghIOC5hOC4lOC5ieC4o+C4seC4miAke2NvdXBvbi5hbW91bnQudG9Mb2NhbGVTdHJpbmcoKX0g4LmA4LiE4Lij4LiU4Li04LiVYCwgXCJzdWNjZXNzXCIpOyBcbiAgICAgICAgc2VuZERpc2NvcmRUb3B1cEVtYmVkKGFjdGl2ZVVzZXJuYW1lLCBjb3Vwb24uYW1vdW50LCBcImNvdXBvblwiLCBuZXdCYWxhbmNlLCB0cnVlKTtcbiAgICAgICAgc2V0VG9wdXBTdWNjZXNzTWVzc2FnZShcbiAgICAgICAgICBg4LmD4LiK4LmJ4LiE4Li54Lib4Lit4LiH4Liq4Liz4LmA4Lij4LmH4LiIISDguYTguJTguYnguKPguLHguJogJHtjb3Vwb24uYW1vdW50LnRvTG9jYWxlU3RyaW5nKCl9IOC5gOC4hOC4o+C4lOC4tOC4lWAsXG4gICAgICAgICk7XG4gICAgICAgIHNldFRvcHVwTW9kYWxTdGVwKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgc2V0VG9wdXBDb2RlKFwiXCIpO1xuICAgICAgICBpZiAoY3VycmVudFVzZXIpIHNldEN1cnJlbnRVc2VyKHsgLi4uY3VycmVudFVzZXIgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaG93VG9hc3QoXCLguYTguKHguYjguJ7guJrguYLguITguYnguJTguITguLnguJvguK3guIfguJnguLXguYnguYPguJnguKPguLDguJrguJpcIiwgXCJlcnJvclwiKTtcbiAgICAgIH1cbiAgICAgIHNldElzUHJvY2Vzc2luZ1RvcHVwKGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBbmdwYW8gdG9wdXBcbiAgICAgICAgLy8gQW5ncGFvIHRvcHVwXG4gICAgaWYgKHRvcHVwTW9kYWxTdGVwID09PSBcImFuZ3Bhb1wiKSB7XG4gICAgICBpZiAoIXNsaXBGaWxlKSB7XG4gICAgICAgIHNob3dUb2FzdChcIuC4geC4o+C4uOC4k+C4suC4reC4seC4m+C5guC4q+C4peC4lOC4quC4peC4tOC4myBUcnVlTW9uZXkgV2FsbGV0XCIsIFwiZXJyb3JcIik7XG4gICAgICAgIHNldElzUHJvY2Vzc2luZ1RvcHVwKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgcHJvY2Vzc0FuZ3Bhb1NsaXAgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgXG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChzbGlwRmlsZSk7XG4gICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJhc2U2NCA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrUmVzID0gYXdhaXQgZmV0Y2goXCIvYXBpL3RvcHVwL3RydWUtd2FsbGV0XCIsIHtcbiAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGJhc2U2NCB9KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjaGVja1Jlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSBcInN1Y2Nlc3NcIiB8fCBkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpcERhdGEgPSBkYXRhLmRhdGEgfHwgZGF0YTtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgLy8gUmVjZWl2ZXIgVmFsaWRhdGlvbiBmb3IgVHJ1ZU1vbmV5XG4gICAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbklkID0gc2xpcERhdGEudHJhbnNSZWYgfHwgc2xpcERhdGEudHJhbnNhY3Rpb25JZCB8fCBzbGlwRGF0YS5yYXdTbGlwPy50cmFuc2FjdGlvbklkIHx8IHNsaXBEYXRhLnJhd1NsaXA/LnRyYW5zUmVmIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIGlmICghdHJhbnNhY3Rpb25JZCkge1xuICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVRvcHVwRXJyb3IoXCLguYTguKHguYjguJ7guJrguYDguKXguILguK3guYnguLLguIfguK3guLTguIfguYPguJnguKrguKXguLTguJsg4LmE4Lih4LmI4Liq4Liy4Lih4Liy4Lij4LiW4LiU4Liz4LmA4LiZ4Li04LiZ4LiB4Liy4Lij4LmE4LiU4LmJXCIsIFwiYW5ncGFvXCIpOyByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTbGlwIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwidG9wdXBzXCIpLnNlbGVjdChcImlkXCIpLmVxKFwicmVmX2lkXCIsIHRyYW5zYWN0aW9uSWQpLm1heWJlU2luZ2xlKCk7XG4gICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdTbGlwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaGFuZGxlVG9wdXBFcnJvcihcIuC4quC4peC4tOC4m+C4meC4teC5ieC4luC4ueC4geC5g+C4iuC5ieC4h+C4suC4meC5hOC4m+C5geC4peC5ieC4pyFcIiwgXCJhbmdwYW9cIik7IHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgY29uc3QgcmVjZWl2ZXJTdHIgPSBKU09OLnN0cmluZ2lmeShzbGlwRGF0YS5yZWNlaXZlciB8fCBzbGlwRGF0YSkucmVwbGFjZSgvWy0gXS9nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2xpcCdzIHJlY2VpdmVyIG1hdGNoZXMgdGhlIHBob25lIG51bWJlclxuICAgICAgICAgICAgICAgICAgaWYgKCFyZWNlaXZlclN0ci5pbmNsdWRlcyhcIjA5Mjg4ODY1ODRcIikgJiYgIXJlY2VpdmVyU3RyLmluY2x1ZGVzKFwiODg2NTg0XCIpICYmICFyZWNlaXZlclN0ci5pbmNsdWRlcyhcIjY1ODRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgaGFuZGxlVG9wdXBFcnJvcihcIuC4quC4peC4tOC4m+C4meC4teC5ieC5hOC4oeC5iOC5hOC4lOC5ieC5guC4reC4meC5gOC4h+C4tOC4meC5gOC4guC5ieC4suC5gOC4muC4reC4o+C5jCAwOTItODg4LTY1ODQg4LiC4Lit4LiH4Lij4LmJ4Liy4LiZ4LiE4Lij4Lix4LiaXCIsIFwiYW5ncGFvXCIpOyByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGFtb3VudCA9IHBhcnNlRmxvYXQoc2xpcERhdGEuYW1vdW50SW5TbGlwIHx8IHNsaXBEYXRhLmFtb3VudCB8fCBkYXRhLmFtb3VudCkgfHwgMDtcblxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBjb25zdCBjb25maWdEYXRhID0gYXdhaXQgZ2V0U3lzdGVtQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50UmV2ID0gY29uZmlnRGF0YSA/IE51bWJlcihjb25maWdEYXRhLmdsb2JhbF9yZXZfYXN0ZCB8fCAwKSA6IDA7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwic3lzdGVtX2NvbmZpZ1wiKS51cGRhdGUoeyBnbG9iYWxfcmV2X2FzdGQ6IGN1cnJlbnRSZXYgKyBhbW91bnQgfSkuZXEoXCJpZFwiLCBcIm1haW5cIik7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGJhbGFuY2VGaWVsZCA9IHRvcHVwVGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgY29uc3QgdXNlckJhbGFuY2UgPSBOdW1iZXIobGl2ZVVzZXJbYmFsYW5jZUZpZWxkXSB8fCAwKTtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJwcm9maWxlc1wiKS51cGRhdGUoeyBbYmFsYW5jZUZpZWxkXTogdXNlckJhbGFuY2UgKyBhbW91bnQgfSkuZXEoXCJ1c2VybmFtZVwiLCBhY3RpdmVVc2VybmFtZSk7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJ0b3B1cHNcIikuaW5zZXJ0KFt7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBhY3RpdmVVc2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ3RydWV3YWxsZXRfc2xpcCcsXG4gICAgICAgICAgICAgICAgICAgIHJlZl9pZDogdHJhbnNhY3Rpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHNldFRvcHVwU3VjY2Vzc01lc3NhZ2UoYOC5gOC4leC4tOC4oeC5gOC4h+C4tOC4meC4quC4s+C5gOC4o+C5h+C4iCAke2Ftb3VudC50b0ZpeGVkKDIpfSDguJrguLLguJdgKTtcbiAgICAgICAgICAgICAgICAgIHNob3dUb2FzdChg4LmA4LiV4Li04Lih4LmA4LiH4Li04LiZ4Liq4Liz4LmA4Lij4LmH4LiIICR7YW1vdW50LnRvRml4ZWQoMil9IOC4muC4suC4l2AsIFwic3VjY2Vzc1wiKTsgc2VuZERpc2NvcmRUb3B1cEVtYmVkKGFjdGl2ZVVzZXJuYW1lLCBhbW91bnQsIHRvcHVwTW9kYWxTdGVwLCB1c2VyQmFsYW5jZSArIGFtb3VudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJzeW5jLXVwZGF0ZVwiKSk7XG4gICAgICAgICAgICAgICAgICBmZXRjaFVzZXIoYWN0aXZlVXNlcm5hbWUpO1xuICAgICAgICAgICAgICAgICAgc2V0VG9wdXBDb2RlKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgc2V0U2xpcEZpbGUobnVsbCk7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VG9wdXBTdWNjZXNzTWVzc2FnZShcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VG9wdXBNb2RhbFN0ZXAoXCJzZWxlY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIHNldEFwcFNjcmVlbihcIlNIT1BcIik7XG4gICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBoYW5kbGVUb3B1cEVycm9yKGRhdGEubWVzc2FnZSB8fCBkYXRhLmVycm9yPy5tZXNzYWdlIHx8IFwi4Liq4Lil4Li04Lib4LmE4Lih4LmI4LiW4Li54LiB4LiV4LmJ4Lit4LiHIOC4q+C4o+C4t+C4reC5gOC4iuC5h+C4hOC5hOC4oeC5iOC5hOC4lOC5iVwiLCBcImFuZ3Bhb1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBoYW5kbGVUb3B1cEVycm9yKFwi4LiB4Liy4Lij4LmA4LiK4Li34LmI4Lit4Lih4LiV4LmI4Lit4Lih4Li14Lib4Lix4LiN4Lir4LiyIOC4geC4o+C4uOC4k+C4suC4peC4reC4h+C5g+C4q+C4oeC5iFwiLCBcImFuZ3Bhb1wiKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgc2V0SXNQcm9jZXNzaW5nVG9wdXAoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgICBzaG93VG9hc3QoXCLguKPguLDguJrguJrguILguLHguJTguILguYnguK3guIcg4LiB4Lij4Li44LiT4Liy4Lil4Lit4LiH4LmD4Lir4Lih4LmIXCIsIFwiZXJyb3JcIik7XG4gICAgICAgICAgc2V0SXNQcm9jZXNzaW5nVG9wdXAoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcHJvY2Vzc0FuZ3Bhb1NsaXAoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAgICAgaWYgKHRvcHVwTW9kYWxTdGVwID09PSBcImJhbmtcIikge1xuICAgICAgaWYgKCFzbGlwRmlsZSkge1xuICAgICAgICBzaG93VG9hc3QoXCLguIHguKPguLjguJPguLLguYHguJnguJrguKrguKXguLTguJvguIHguLLguKPguYLguK3guJnguYDguIfguLTguJlcIiwgXCJlcnJvclwiKTtcbiAgICAgICAgc2V0SXNQcm9jZXNzaW5nVG9wdXAoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb2Nlc3NCYW5rU2xpcCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKHNsaXBGaWxlKTtcbiAgICAgICAgICByZWFkZXIub25sb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tSZXMgPSBhd2FpdCBmZXRjaChcIi9hcGkvdG9wdXAvYmFua1wiLCB7XG4gICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBiYXNlNjQgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgY2hlY2tSZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIgfHwgZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaXBEYXRhID0gZGF0YS5kYXRhIHx8IGRhdGE7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vIFJlY2VpdmVyIFZhbGlkYXRpb24gZm9yIEJhbmtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uSWQgPSBzbGlwRGF0YS50cmFuc1JlZiB8fCBzbGlwRGF0YS50cmFuc2FjdGlvbklkIHx8IHNsaXBEYXRhLnJhd1NsaXA/LnRyYW5zYWN0aW9uSWQgfHwgc2xpcERhdGEucmF3U2xpcD8udHJhbnNSZWYgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc2FjdGlvbklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaGFuZGxlVG9wdXBFcnJvcihcIuC5hOC4oeC5iOC4nuC4muC5gOC4peC4guC4reC5ieC4suC4h+C4reC4tOC4h+C5g+C4meC4quC4peC4tOC4myDguYTguKHguYjguKrguLLguKHguLLguKPguJbguJTguLPguYDguJnguLTguJnguIHguLLguKPguYTguJTguYlcIiwgXCJiYW5rXCIpOyByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTbGlwIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwidG9wdXBzXCIpLnNlbGVjdChcImlkXCIpLmVxKFwicmVmX2lkXCIsIHRyYW5zYWN0aW9uSWQpLm1heWJlU2luZ2xlKCk7XG4gICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdTbGlwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaGFuZGxlVG9wdXBFcnJvcihcIuC4quC4peC4tOC4m+C4meC4teC5ieC4luC4ueC4geC5g+C4iuC5ieC4h+C4suC4meC5hOC4m+C5geC4peC5ieC4pyFcIiwgXCJiYW5rXCIpOyByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlY2VpdmVyU3RyID0gSlNPTi5zdHJpbmdpZnkoc2xpcERhdGEucmVjZWl2ZXIgfHwgc2xpcERhdGEucmF3U2xpcD8ucmVjZWl2ZXIgfHwgc2xpcERhdGEpLnJlcGxhY2UoL1stIF0vZywgJycpO1xuICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNsaXAncyByZWNlaXZlciBtYXRjaGVzIHRoZSBzaG9wJ3MgYmFuayBhY2NvdW50IG9yIG5hbWVcbiAgICAgICAgICAgICAgICAgIC8vIEJhbmsgYWNjb3VudDogMjEzMzgxNDQ2MSAo4LiY4Li14Lij4Liq4Li04LiX4LiY4Li04LmMIOC4quC4uOC4p+C4o+C4o+C4k+C4qOC4o+C4tSlcbiAgICAgICAgICAgICAgICAgIGlmICghcmVjZWl2ZXJTdHIuaW5jbHVkZXMoXCIyMTMzODE0NDYxXCIpICYmICFyZWNlaXZlclN0ci5pbmNsdWRlcyhcIjE0NDYxXCIpICYmICFyZWNlaXZlclN0ci5pbmNsdWRlcyhcIuC4mOC4teC4o+C4quC4tOC4l+C4mOC4tOC5jFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBoYW5kbGVUb3B1cEVycm9yKFwi4Liq4Lil4Li04Lib4LiZ4Li14LmJ4LmE4Lih4LmI4LmE4LiU4LmJ4LmC4Lit4LiZ4LmA4LiH4Li04LiZ4LmA4LiC4LmJ4Liy4Lia4Lix4LiN4LiK4Li14LiC4Lit4LiH4Lij4LmJ4Liy4LiZICjguJjguLXguKPguKrguLTguJfguJjguLTguYwg4Liq4Li44Lin4Lij4Lij4LiT4Lio4Lij4Li1KSDguITguKPguLHguJpcIiwgXCJiYW5rXCIpOyByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIGxldCBhbW91bnQgPSBwYXJzZUZsb2F0KHNsaXBEYXRhLmFtb3VudD8uYW1vdW50IHx8IHNsaXBEYXRhLmFtb3VudCB8fCBkYXRhLmFtb3VudCkgfHwgMDtcblxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgVGh1bmRlciBTb2x1dGlvbiBzcGVjaWZpYyByZXNwb25zZSBmb3JtYXRcbiAgICAgICAgICAgICAgICAgIGlmIChzbGlwRGF0YS5yYXdTbGlwICYmIHNsaXBEYXRhLnJhd1NsaXAuYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgYW1vdW50ID0gcGFyc2VGbG9hdChzbGlwRGF0YS5yYXdTbGlwLmFtb3VudC5hbW91bnQgfHwgc2xpcERhdGEucmF3U2xpcC5hbW91bnQpIHx8IGFtb3VudDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgY29uc3QgY29uZmlnRGF0YSA9IGF3YWl0IGdldFN5c3RlbUNvbmZpZygpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFJldiA9IGNvbmZpZ0RhdGEgPyBOdW1iZXIoY29uZmlnRGF0YS5nbG9iYWxfcmV2X2FzdGQgfHwgMCkgOiAwO1xuICAgICAgICAgICAgICAgICAgYXdhaXQgc3VwYWJhc2UuZnJvbShcInN5c3RlbV9jb25maWdcIikudXBkYXRlKHsgZ2xvYmFsX3Jldl9hc3RkOiBjdXJyZW50UmV2ICsgYW1vdW50IH0pLmVxKFwiaWRcIiwgXCJtYWluXCIpO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBjb25zdCBiYWxhbmNlRmllbGQgPSB0b3B1cFRhcmdldDtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJCYWxhbmNlID0gTnVtYmVyKGxpdmVVc2VyW2JhbGFuY2VGaWVsZF0gfHwgMCk7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwicHJvZmlsZXNcIikudXBkYXRlKHsgW2JhbGFuY2VGaWVsZF06IHVzZXJCYWxhbmNlICsgYW1vdW50IH0pLmVxKFwidXNlcm5hbWVcIiwgYWN0aXZlVXNlcm5hbWUpO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwidG9wdXBzXCIpLmluc2VydChbe1xuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogYWN0aXZlVXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdiYW5rX3NsaXAnLFxuICAgICAgICAgICAgICAgICAgICByZWZfaWQ6IHRyYW5zYWN0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBzZXRUb3B1cFN1Y2Nlc3NNZXNzYWdlKGDguYDguJXguLTguKHguYDguIfguLTguJnguKrguLPguYDguKPguYfguIggJHthbW91bnQudG9GaXhlZCgyKX0g4Lia4Liy4LiXYCk7XG4gICAgICAgICAgICAgICAgICBzaG93VG9hc3QoYOC5gOC4leC4tOC4oeC5gOC4h+C4tOC4meC4quC4s+C5gOC4o+C5h+C4iCAke2Ftb3VudC50b0ZpeGVkKDIpfSDguJrguLLguJdgLCBcInN1Y2Nlc3NcIik7IHNlbmREaXNjb3JkVG9wdXBFbWJlZChhY3RpdmVVc2VybmFtZSwgYW1vdW50LCB0b3B1cE1vZGFsU3RlcCwgdXNlckJhbGFuY2UgKyBhbW91bnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwic3luYy11cGRhdGVcIikpO1xuICAgICAgICAgICAgICAgICAgZmV0Y2hVc2VyKGFjdGl2ZVVzZXJuYW1lKTtcbiAgICAgICAgICAgICAgICAgIHNldFRvcHVwQ29kZShcIlwiKTtcbiAgICAgICAgICAgICAgICAgIHNldFNsaXBGaWxlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRvcHVwU3VjY2Vzc01lc3NhZ2UoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHNldFRvcHVwTW9kYWxTdGVwKFwic2VsZWN0XCIpO1xuICAgICAgICAgICAgICAgICAgICBzZXRBcHBTY3JlZW4oXCJTSE9QXCIpO1xuICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgaGFuZGxlVG9wdXBFcnJvcihkYXRhLm1lc3NhZ2UgfHwgZGF0YS5lcnJvcj8ubWVzc2FnZSB8fCBcIuC4guC5ieC4reC4oeC4ueC4peC4quC4peC4tOC4m+C5hOC4oeC5iOC4luC4ueC4geC4leC5ieC4reC4hyDguKvguKPguLfguK3guYDguIrguYfguITguYTguKHguYjguYTguJTguYlcIiwgXCJiYW5rXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGhhbmRsZVRvcHVwRXJyb3IoXCLguIHguLLguKPguYDguIrguLfguYjguK3guKHguJXguYjguK3guKHguLXguJvguLHguI3guKvguLIg4LiB4Lij4Li44LiT4Liy4Lil4Lit4LiH4LmD4Lir4Lih4LmIXCIsIFwiYmFua1wiKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgc2V0SXNQcm9jZXNzaW5nVG9wdXAoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgICBzaG93VG9hc3QoXCLguKPguLDguJrguJrguILguLHguJTguILguYnguK3guIcg4LiB4Lij4Li44LiT4Liy4Lil4Lit4LiH4LmD4Lir4Lih4LmIXCIsIFwiZXJyb3JcIik7XG4gICAgICAgICAgc2V0SXNQcm9jZXNzaW5nVG9wdXAoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcHJvY2Vzc0JhbmtTbGlwKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUF1dGhTdWJtaXQgPSBhc3luYyAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghaXNDYXB0Y2hhVmVyaWZpZWQpIHtcbiAgICAgIHNldEF1dGhFcnJvcihcIuC5gOC4geC4tOC4lOC4guC5ieC4reC4nOC4tOC4lOC4nuC4peC4suC4lCDguIHguKPguLjguJPguLLguKLguLfguJnguKLguLHguJkgVHVybnN0aWxlXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNBdXRoTG9hZGluZykgcmV0dXJuO1xuICAgIHNldElzQXV0aExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0QXV0aEVycm9yKFwiXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChhdXRoTW9kZSA9PT0gXCJmb3Jnb3RcIikge1xuICAgICAgICBpZiAoIWF1dGhFbWFpbC50cmltKCkpIHtcbiAgICAgICAgICBzZXRBdXRoRXJyb3IoXCLguIHguKPguLjguJPguLLguIHguKPguK3guIHguK3guLXguYDguKHguKXguYPguKvguYnguITguKPguJrguJbguYnguKfguJlcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGF1dGhNb2RlID09PSBcImZvcmdvdF92ZXJpZnlfb3RwXCIpIHtcbiAgICAgICAgaWYgKCFhdXRoRW1haWwudHJpbSgpIHx8ICFhdXRoT3RwQ29kZS50cmltKCkgfHwgIWF1dGhQYXNzd29yZC50cmltKCkpIHtcbiAgICAgICAgICBzZXRBdXRoRXJyb3IoXCLguIHguKPguLjguJPguLLguIHguKPguK3guIHguK3guLXguYDguKHguKUg4Lij4Lir4Lix4LiqIE9UUCDguYHguKXguLDguKPguKvguLHguKrguJzguYjguLLguJnguYPguKvguKHguYgg4LmD4Lir4LmJ4LiE4Lij4Lia4LiW4LmJ4Lin4LiZXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFhdXRoVXNlcm5hbWUudHJpbSgpIHx8XG4gICAgICAgICAgIWF1dGhQYXNzd29yZC50cmltKCkgfHxcbiAgICAgICAgICAoYXV0aE1vZGUgPT09IFwicmVnaXN0ZXJcIiAmJlxuICAgICAgICAgICAgKCFhdXRoRW1haWwudHJpbSgpIHx8ICFhdXRoQ29uZmlybVBhc3N3b3JkLnRyaW0oKSkpXG4gICAgICAgICkge1xuICAgICAgICAgIHNldEF1dGhFcnJvcihcbiAgICAgICAgICAgIGF1dGhNb2RlID09PSBcInJlZ2lzdGVyXCJcbiAgICAgICAgICAgICAgPyBcIuC4geC4o+C4uOC4k+C4suC4geC4o+C4reC4geC4guC5ieC4reC4oeC4ueC4peC5g+C4q+C5ieC4hOC4o+C4muC4luC5ieC4p+C4meC4l+C4uOC4geC4iuC5iOC4reC4h1wiXG4gICAgICAgICAgICAgIDogXCLguIHguKPguLjguJPguLLguIHguKPguK3guIHguIrguLfguYjguK3guJzguLnguYnguYPguIrguYnguYHguKXguLDguKPguKvguLHguKrguJzguYjguLLguJnguYPguKvguYnguITguKPguJrguJbguYnguKfguJlcIixcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXV0aE1vZGUgPT09IFwicmVnaXN0ZXJcIiAmJiBhdXRoUGFzc3dvcmQgIT09IGF1dGhDb25maXJtUGFzc3dvcmQpIHtcbiAgICAgICAgICBzZXRBdXRoRXJyb3IoXCLguKPguKvguLHguKrguJzguYjguLLguJnguYHguKXguLDguIHguLLguKPguKLguLfguJnguKLguLHguJnguKPguKvguLHguKrguJzguYjguLLguJnguYTguKHguYjguJXguKPguIfguIHguLHguJlcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhdXRoTW9kZSA9PT0gXCJsb2dpblwiKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSByZW1lbWJlckF1dGggPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJLVVdBU0hJSV9DVVJSRU5UX1VTRVJcIik7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJLVVdBU0hJSV9DVVJSRU5UX1VTRVJcIik7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiS1VXQVNISUlfSVNfQURNSU5cIik7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJLVVdBU0hJSV9JU19BRE1JTlwiKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgYXV0aFVzZXJuYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBcImt1d2FzaGlpX2FkbWluXCIgJiZcbiAgICAgICAgICBhdXRoUGFzc3dvcmQgPT09IFwiWkFaQUNJMDlcIlxuICAgICAgICApIHtcbiAgICAgICAgICBzZXRJc0FkbWluKHRydWUpO1xuICAgICAgICAgIHNldEN1cnJlbnRVc2VyKHsgdXNlcm5hbWU6IFwiS3V3YXNoaWlfYWRtaW5cIiB9KTtcbiAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0oXCJLVVdBU0hJSV9JU19BRE1JTlwiLCBcInRydWVcIik7XG4gICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgXCJLVVdBU0hJSV9DVVJSRU5UX1VTRVJcIixcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHsgdXNlcm5hbWU6IFwiS3V3YXNoaWlfYWRtaW5cIiB9KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIHNldEFwcFNjcmVlbihcIlNIT1BcIik7XG4gICAgICAgICAgc2V0QXV0aFVzZXJuYW1lKFwiXCIpO1xuICAgICAgICAgIHNldEF1dGhFbWFpbChcIlwiKTtcbiAgICAgICAgICBzZXRBdXRoUGFzc3dvcmQoXCJcIik7XG4gICAgICAgICAgc2V0QXV0aENvbmZpcm1QYXNzd29yZChcIlwiKTtcbiAgICAgICAgICBzZXRBdXRoRXJyb3IoXCJcIik7XG4gICAgICAgICAgc2hvd1RvYXN0KFwi4LmA4LiC4LmJ4Liy4Liq4Li54LmI4Lij4Liw4Lia4Lia4Lic4Li54LmJ4LiU4Li54LmB4Lil4LmA4Lij4Li14Lii4Lia4Lij4LmJ4Lit4Lii4LmB4Lil4LmJ4LinIVwiLCBcInN1Y2Nlc3NcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXNlcm5hbWVUcmltbWVkID0gYXV0aFVzZXJuYW1lLnRyaW0oKTtcbiAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCBmZXRjaFVzZXIodXNlcm5hbWVUcmltbWVkKTtcblxuICAgICAgICBpZiAoIXVzZXIgJiYgdXNlcm5hbWVUcmltbWVkLmluY2x1ZGVzKFwiQFwiKSkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgICAgIC5mcm9tKFwicHJvZmlsZXNcIilcbiAgICAgICAgICAgICAgLnNlbGVjdChcIipcIilcbiAgICAgICAgICAgICAgLmVxKFwiZW1haWxcIiwgdXNlcm5hbWVUcmltbWVkKVxuICAgICAgICAgICAgICAubGltaXQoMSlcbiAgICAgICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICAgICAgaWYgKGRhdGEpIHVzZXIgPSBkYXRhO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXNlciAmJiB1c2VyLnBhc3N3b3JkID09PSBhdXRoUGFzc3dvcmQpIHtcbiAgICAgICAgICBzZXRDdXJyZW50VXNlcih7IHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lIH0pO1xuICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAgIFwiS1VXQVNISUlfQ1VSUkVOVF9VU0VSXCIsXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7IHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKFwiS1VXQVNISUlfSVNfQURNSU5cIiwgXCJmYWxzZVwiKTtcblxuICAgICAgICAgIHNldEFwcFNjcmVlbihcIlNIT1BcIik7XG4gICAgICAgICAgc2V0QXV0aFVzZXJuYW1lKFwiXCIpO1xuICAgICAgICAgIHNldEF1dGhFbWFpbChcIlwiKTtcbiAgICAgICAgICBzZXRBdXRoUGFzc3dvcmQoXCJcIik7XG4gICAgICAgICAgc2V0QXV0aENvbmZpcm1QYXNzd29yZChcIlwiKTtcbiAgICAgICAgICBzZXRBdXRoRXJyb3IoXCJcIik7XG4gICAgICAgICAgc2hvd1RvYXN0KFwi4LmA4LiC4LmJ4Liy4Liq4Li54LmI4Lij4Liw4Lia4Lia4Liq4Liz4LmA4Lij4LmH4LiIIVwiLCBcInN1Y2Nlc3NcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0QXV0aEVycm9yKFwi4LiK4Li34LmI4Lit4Lic4Li54LmJ4LmD4LiK4LmJ4Lir4Lij4Li34Lit4Lij4Lir4Lix4Liq4Lic4LmI4Liy4LiZ4LmE4Lih4LmI4LiW4Li54LiB4LiV4LmJ4Lit4LiHIVwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhdXRoTW9kZSA9PT0gXCJmb3Jnb3RcIikge1xuICAgICAgICBpZiAoIWF1dGhFbWFpbC5pbmNsdWRlcyhcIkBcIikpIHtcbiAgICAgICAgICBzZXRBdXRoRXJyb3IoXCLguKPguLnguJvguYHguJrguJrguK3guLXguYDguKHguKXguYTguKHguYjguJbguLnguIHguJXguYnguK3guIdcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwicHJvZmlsZXNcIilcbiAgICAgICAgICAuc2VsZWN0KFwiKlwiKVxuICAgICAgICAgIC5lcShcImVtYWlsXCIsIGF1dGhFbWFpbC50cmltKCkpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIHNldEF1dGhFcnJvcihcIuC5hOC4oeC5iOC4nuC4muC4muC4seC4jeC4iuC4teC4l+C4teC5iOC4nOC4ueC4geC4geC4seC4muC4reC4teC5gOC4oeC4peC4meC4teC5iVwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZW5lcmF0ZSBPVFAgYW5kIGV4cGlyZSAxNSBtaW5zXG4gICAgICAgIGNvbnN0IG90cCA9IE1hdGguZmxvb3IoMTAwMDAwICsgTWF0aC5yYW5kb20oKSAqIDkwMDAwMCkudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgZXhwaXJlID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIDE1ICogNjAgKiAxMDAwKS50b0lTT1N0cmluZygpO1xuICAgICAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwicHJvZmlsZXNcIilcbiAgICAgICAgICAudXBkYXRlKHsgb3RwX2NvZGU6IG90cCwgb3RwX2V4cGlyZXNfYXQ6IGV4cGlyZSB9KVxuICAgICAgICAgIC5lcShcInVzZXJuYW1lXCIsIGRhdGEudXNlcm5hbWUpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi9hcGkvc2VuZC1vdHBcIiwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdG9FbWFpbDogYXV0aEVtYWlsLnRyaW0oKSwgb3RwIH0pLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbnN0IHJlc0RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgaWYgKHJlc0RhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNEYXRhLmVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBzZW5kIE9UUDpcIiwgZXJyKTtcbiAgICAgICAgICBzZXRBdXRoRXJyb3IoXG4gICAgICAgICAgICBlcnIubWVzc2FnZSB8fCBcIuC5gOC4geC4tOC4lOC4guC5ieC4reC4nOC4tOC4lOC4nuC4peC4suC4lOC5g+C4meC4geC4suC4o+C4quC5iOC4h+C4reC4teC5gOC4oeC4pSDguIHguKPguLjguJPguLLguKXguK3guIfguYPguKvguKHguYjguK3guLXguIHguITguKPguLHguYnguIdcIixcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEF1dGhNb2RlKFwiZm9yZ290X3ZlcmlmeV9vdHBcIik7XG4gICAgICAgIHNldEF1dGhFcnJvcihcIlwiKTtcbiAgICAgICAgc2hvd1RvYXN0KFwi4Lij4Lir4Lix4LiqIE9UUCDguJbguLnguIHguKrguYjguIfguYTguJvguKLguLHguIfguK3guLXguYDguKHguKXguILguK3guIfguITguLjguJPguYHguKXguYnguKdcIiwgXCJzdWNjZXNzXCIpO1xuICAgICAgfSBlbHNlIGlmIChhdXRoTW9kZSA9PT0gXCJmb3Jnb3RfdmVyaWZ5X290cFwiKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcInByb2ZpbGVzXCIpXG4gICAgICAgICAgLnNlbGVjdChcIipcIilcbiAgICAgICAgICAuZXEoXCJlbWFpbFwiLCBhdXRoRW1haWwudHJpbSgpKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgc2V0QXV0aEVycm9yKFwi4LmE4Lih4LmI4Lie4Lia4Lia4Lix4LiN4LiK4Li14LiX4Li14LmI4Lic4Li54LiB4LiB4Lix4Lia4Lit4Li14LmA4Lih4Lil4LiZ4Li14LmJXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5vdHBfY29kZSAhPT0gYXV0aE90cENvZGUudHJpbSgpKSB7XG4gICAgICAgICAgc2V0QXV0aEVycm9yKFwi4Lij4Lir4Lix4LiqIE9UUCDguYTguKHguYjguJbguLnguIHguJXguYnguK3guIdcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXcgRGF0ZShkYXRhLm90cF9leHBpcmVzX2F0KSA8IG5ldyBEYXRlKCkpIHtcbiAgICAgICAgICBzZXRBdXRoRXJyb3IoXCLguKPguKvguLHguKogT1RQIOC4q+C4oeC4lOC4reC4suC4ouC4uOC5geC4peC5ieC4p1wiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwicHJvZmlsZXNcIilcbiAgICAgICAgICAudXBkYXRlKHtcbiAgICAgICAgICAgIHBhc3N3b3JkOiBhdXRoUGFzc3dvcmQsXG4gICAgICAgICAgICBvdHBfY29kZTogbnVsbCxcbiAgICAgICAgICAgIG90cF9leHBpcmVzX2F0OiBudWxsLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVxKFwidXNlcm5hbWVcIiwgZGF0YS51c2VybmFtZSk7XG5cbiAgICAgICAgc2V0QXV0aE1vZGUoXCJsb2dpblwiKTtcbiAgICAgICAgc2V0QXV0aFBhc3N3b3JkKFwiXCIpO1xuICAgICAgICBzZXRBdXRoT3RwQ29kZShcIlwiKTtcbiAgICAgICAgc2V0QXV0aEVtYWlsKFwiXCIpO1xuICAgICAgICBzZXRBdXRoRXJyb3IoXCJcIik7XG4gICAgICAgIHNob3dUb2FzdChcIuC4leC4seC5ieC4h+C4o+C4q+C4seC4quC4nOC5iOC4suC4meC5g+C4q+C4oeC5iOC4quC4s+C5gOC4o+C5h+C4iOC5geC4peC5ieC4pyDguIHguKPguLjguJPguLLguYDguILguYnguLLguKrguLnguYjguKPguLDguJrguJpcIiwgXCJzdWNjZXNzXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVnaXN0ZXIgTW9kZVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGxvY2tSZXMgPSBhd2FpdCBmZXRjaChcIi9hcGkvY2hlY2stcmVnaXN0ZXItbG9ja1wiKTtcbiAgICAgICAgICBjb25zdCBsb2NrRGF0YSA9IGF3YWl0IGxvY2tSZXMuanNvbigpO1xuICAgICAgICAgIGlmIChsb2NrRGF0YS5sb2NrZWQpIHtcbiAgICAgICAgICAgIHNldEF1dGhFcnJvcihcbiAgICAgICAgICAgICAgYOC4geC4o+C4uOC4k+C4suC4o+C4rSAke2xvY2tEYXRhLnJlbWFpbmluZ30g4LiZ4Liy4LiX4Li1IOC4geC5iOC4reC4meC4quC4oeC4seC4hOC4o+C4quC4oeC4suC4iuC4tOC4geC5g+C4q+C4oeC5iOC5gOC4nuC4t+C5iOC4reC4m+C5ieC4reC4h+C4geC4seC4meC4quC5geC4m+C4oSAo4Lil4LmH4Lit4LiEIElQKWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJMb2NrIGNoZWNrIGVycm9yXCIsIGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFhdXRoRW1haWwuaW5jbHVkZXMoXCJAXCIpKSB7XG4gICAgICAgICAgc2V0QXV0aEVycm9yKFwi4Lij4Li54Lib4LmB4Lia4Lia4Lit4Li14LmA4Lih4Lil4LmE4Lih4LmI4LiW4Li54LiB4LiV4LmJ4Lit4LiHXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhcmdldFVzZXJuYW1lID0gYXV0aFVzZXJuYW1lLnRyaW0oKTtcblxuICAgICAgICBpZiAodGFyZ2V0VXNlcm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJrdXdhc2hpaV9hZG1pblwiKSB7XG4gICAgICAgICAgc2V0QXV0aEVycm9yKFwi4LmE4Lih4LmI4Liq4Liy4Lih4Liy4Lij4LiW4LmD4LiK4LmJ4LiK4Li34LmI4Lit4Lic4Li54LmJ4LiU4Li54LmB4Lil4LiZ4Li14LmJ4LmE4LiU4LmJXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgZmV0Y2hVc2VyKHRhcmdldFVzZXJuYW1lKTtcblxuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICBzZXRBdXRoRXJyb3IoXCLguIrguLfguYjguK3guJzguLnguYnguYPguIrguYnguIfguLLguJnguJnguLXguYnguKHguLXguK3guKLguLnguYjguYPguJnguKPguLDguJrguJrguYHguKXguYnguKchXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgeyBkYXRhOiBleGlzdGluZ0VtYWlsIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgICAgLmZyb20oXCJwcm9maWxlc1wiKVxuICAgICAgICAgICAgLnNlbGVjdChcInVzZXJuYW1lXCIpXG4gICAgICAgICAgICAuZXEoXCJlbWFpbFwiLCBhdXRoRW1haWwudHJpbSgpKVxuICAgICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgICAuc2luZ2xlKCk7XG4gICAgICAgICAgaWYgKGV4aXN0aW5nRW1haWwpIHtcbiAgICAgICAgICAgIHNldEF1dGhFcnJvcihcIuC4reC4teC5gOC4oeC4peC4meC4teC5ieC4luC4ueC4geC5g+C4iuC5ieC4h+C4suC4meC5geC4peC5ieC4pyDguIHguKPguLjguJPguLLguYPguIrguYnguK3guLXguYDguKHguKXguK3guLfguYjguJkhXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIFRhYmxlIG1pZ2h0IG5vdCBoYXZlIGVtYWlsIGNvbHVtbiB5ZXQgb3Igb3RoZXIgZXJyb3IsIGlnbm9yZSBhbmQgbGV0IGluc2VydCBmYWlsIGlmIGl0J3MgdW5pcXVlXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5zZXJ0UmVzID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcInByb2ZpbGVzXCIpLmluc2VydChbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHRhcmdldFVzZXJuYW1lLFxuICAgICAgICAgICAgZW1haWw6IGF1dGhFbWFpbC50cmltKCksXG4gICAgICAgICAgICBwYXNzd29yZDogYXV0aFBhc3N3b3JkLFxuICAgICAgICAgICAgYmFsYW5jZTogMCxcbiAgICAgICAgICB9LFxuICAgICAgICBdKTtcblxuICAgICAgICBpZiAoaW5zZXJ0UmVzLmVycm9yICYmIGluc2VydFJlcy5lcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiZW1haWxcIikpIHtcbiAgICAgICAgICAvLyBGYWxsYmFjayBmb3Igb2xkZXIgc2NoZW1hIHdpdGhvdXQgZW1haWwgY29sdW1uXG4gICAgICAgICAgaW5zZXJ0UmVzID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcInByb2ZpbGVzXCIpLmluc2VydChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHVzZXJuYW1lOiB0YXJnZXRVc2VybmFtZSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6IGF1dGhQYXNzd29yZCxcbiAgICAgICAgICAgICAgYmFsYW5jZTogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5zZXJ0UmVzLmVycm9yKSB7XG4gICAgICAgICAgc2V0QXV0aEVycm9yKFwi4LmA4LiB4Li04LiU4LiC4LmJ4Lit4Lic4Li04LiU4Lie4Lil4Liy4LiU4LmD4LiZ4LiB4Liy4Lij4Liq4Lih4Lix4LiE4Lij4Liq4Lih4Liy4LiK4Li04LiBIOC5guC4m+C4o+C4lOC4peC4reC4h+C4reC4teC4geC4hOC4o+C4seC5ieC4h1wiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdG9yYWdlID0gcmVtZW1iZXJBdXRoID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiS1VXQVNISUlfQ1VSUkVOVF9VU0VSXCIpO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwiS1VXQVNISUlfQ1VSUkVOVF9VU0VSXCIpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIktVV0FTSElJX0lTX0FETUlOXCIpO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwiS1VXQVNISUlfSVNfQURNSU5cIik7XG5cbiAgICAgICAgc2V0Q3VycmVudFVzZXIoeyB1c2VybmFtZTogYXV0aFVzZXJuYW1lLnRyaW0oKSB9KTtcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgIFwiS1VXQVNISUlfQ1VSUkVOVF9VU0VSXCIsXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoeyB1c2VybmFtZTogYXV0aFVzZXJuYW1lLnRyaW0oKSB9KSxcbiAgICAgICAgKTtcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKFwiS1VXQVNISUlfSVNfQURNSU5cIiwgXCJmYWxzZVwiKTtcblxuICAgICAgICBzZXRBcHBTY3JlZW4oXCJTSE9QXCIpO1xuICAgICAgICBzZXRBdXRoVXNlcm5hbWUoXCJcIik7XG4gICAgICAgIHNldEF1dGhFbWFpbChcIlwiKTtcbiAgICAgICAgc2V0QXV0aFBhc3N3b3JkKFwiXCIpO1xuICAgICAgICBzZXRBdXRoQ29uZmlybVBhc3N3b3JkKFwiXCIpO1xuICAgICAgICBzZXRBdXRoRXJyb3IoXCJcIik7XG5cbiAgICAgICAgYWRkTGl2ZUFjdGl2aXR5KHtcbiAgICAgICAgICB0eXBlOiBcInNpZ251cFwiLFxuICAgICAgICAgIHVzZXJuYW1lOiBhdXRoVXNlcm5hbWUudHJpbSgpLFxuICAgICAgICAgIGdhbWU6IGFwcFNjcmVlbixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBmZXRjaChcIi9hcGkvc2V0LXJlZ2lzdGVyLWxvY2tcIiwgeyBtZXRob2Q6IFwiUE9TVFwiIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICBzaG93VG9hc3QoXCLguKrguKHguLHguITguKPguKrguKHguLLguIrguLTguIHguYHguKXguLDguYDguILguYnguLLguKrguLnguYjguKPguLDguJrguJrguKrguLPguYDguKPguYfguIghXCIsIFwic3VjY2Vzc1wiKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHNldEF1dGhFcnJvcihcIuC5gOC4geC4tOC4lOC4guC5ieC4reC4nOC4tOC4lOC4nuC4peC4suC4lOC5g+C4meC4geC4suC4o+C5gOC4iuC4t+C5iOC4reC4oeC4leC5iOC4rVwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNBdXRoTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUxvZ291dCA9ICgpID0+IHtcbiAgICBzZXRJc0FkbWluKGZhbHNlKTtcbiAgICBzZXRDdXJyZW50VXNlcihudWxsKTtcbiAgICBzZXRDdXJyZW50VXNlckRhdGEobnVsbCk7XG4gICAgc2V0SXNDYXB0Y2hhVmVyaWZpZWQoZmFsc2UpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiS1VXQVNISUlfSVNfQURNSU5cIik7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJLVVdBU0hJSV9DVVJSRU5UX1VTRVJcIik7XG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcIktVV0FTSElJX0lTX0FETUlOXCIpO1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJLVVdBU0hJSV9DVVJSRU5UX1VTRVJcIik7XG4gICAgc2V0QXBwU2NyZWVuKFwiU0hPUFwiKTtcbiAgICBzaG93VG9hc3QoXCLguK3guK3guIHguIjguLLguIHguKPguLDguJrguJrguYHguKXguYnguKdcIiwgXCJpbmZvXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNoYW5nZVBhc3N3b3JkID0gYXN5bmMgKG5ld1Bhc3M6IHN0cmluZykgPT4ge1xuICAgIGlmICghY3VycmVudFVzZXIpIHJldHVybjtcbiAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJwcm9maWxlc1wiKVxuICAgICAgLnVwZGF0ZSh7IHBhc3N3b3JkOiBuZXdQYXNzIH0pXG4gICAgICAuZXEoXCJ1c2VybmFtZVwiLCBjdXJyZW50VXNlci51c2VybmFtZSk7XG4gICAgaWYgKCFlcnJvcikge1xuICAgICAgc2hvd1RvYXN0KFwi4LmA4Lib4Lil4Li14LmI4Lii4LiZ4Lij4Lir4Lix4Liq4Lic4LmI4Liy4LiZ4Liq4Liz4LmA4Lij4LmH4LiIXCIsIFwic3VjY2Vzc1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd1RvYXN0KFwi4LmA4LiB4Li04LiU4LiC4LmJ4Lit4Lic4Li04LiU4Lie4Lil4Liy4LiU4LmA4Lib4Lil4Li14LmI4Lii4LiZ4Lij4Lir4Lix4Liq4Lic4LmI4Liy4LiZ4LmE4Lih4LmI4LmE4LiU4LmJXCIsIFwiZXJyb3JcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNoYW5nZVVzZXJuYW1lID0gYXN5bmMgKG5ld1VzZXJuYW1lOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIWN1cnJlbnRVc2VyKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgdHJpbW1lZE5ldyA9IG5ld1VzZXJuYW1lLnRyaW0oKTtcbiAgICBpZiAodHJpbW1lZE5ldy5sZW5ndGggPCAzKSB7XG4gICAgICBzaG93VG9hc3QoXCLguIrguLfguYjguK3guJzguLnguYnguYPguIrguYnguJXguYnguK3guIfguKHguLXguK3guKLguYjguLLguIfguJnguYnguK3guKIgMyDguJXguLHguKfguK3guLHguIHguKnguKNcIiwgXCJlcnJvclwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJwcm9maWxlc1wiKVxuICAgICAgLnNlbGVjdChcInVzZXJuYW1lXCIpXG4gICAgICAuZXEoXCJ1c2VybmFtZVwiLCB0cmltbWVkTmV3KVxuICAgICAgLmxpbWl0KDEpXG4gICAgICAubWF5YmVTaW5nbGUoKTtcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIHNob3dUb2FzdChcIuC4iuC4t+C5iOC4reC4nOC4ueC5ieC5g+C4iuC5ieC4meC4teC5ieC4luC4ueC4geC5g+C4iuC5ieC4h+C4suC4meC5geC4peC5ieC4p1wiLCBcImVycm9yXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF0YTogcHJvZmlsZSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwicHJvZmlsZXNcIilcbiAgICAgIC5zZWxlY3QoXCJ1c2VybmFtZV9sYXN0X2NoYW5nZWRcIilcbiAgICAgIC5lcShcInVzZXJuYW1lXCIsIGN1cnJlbnRVc2VyLnVzZXJuYW1lKVxuICAgICAgLnNpbmdsZSgpO1xuICAgIGlmIChwcm9maWxlICYmIHByb2ZpbGUudXNlcm5hbWVfbGFzdF9jaGFuZ2VkKSB7XG4gICAgICBjb25zdCBsYXN0Q2hhbmdlZCA9IG5ldyBEYXRlKHByb2ZpbGUudXNlcm5hbWVfbGFzdF9jaGFuZ2VkKTtcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBkaWZmRGF5cyA9XG4gICAgICAgIChub3cuZ2V0VGltZSgpIC0gbGFzdENoYW5nZWQuZ2V0VGltZSgpKSAvICgxMDAwICogMzYwMCAqIDI0KTtcbiAgICAgIGlmIChkaWZmRGF5cyA8IDcpIHtcbiAgICAgICAgc2hvd1RvYXN0KFxuICAgICAgICAgIGDguYDguJvguKXguLXguYjguKLguJnguIrguLfguYjguK3guYTguJTguYnguK3guLXguIHguITguKPguLHguYnguIfguYPguJnguK3guLXguIEgJHtNYXRoLmNlaWwoNyAtIGRpZmZEYXlzKX0g4Lin4Lix4LiZYCxcbiAgICAgICAgICBcImVycm9yXCIsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBvbGRVc2VybmFtZSA9IGN1cnJlbnRVc2VyLnVzZXJuYW1lO1xuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInByb2ZpbGVzXCIpXG4gICAgICAudXBkYXRlKHtcbiAgICAgICAgdXNlcm5hbWU6IHRyaW1tZWROZXcsXG4gICAgICAgIHVzZXJuYW1lX2xhc3RfY2hhbmdlZDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfSlcbiAgICAgIC5lcShcInVzZXJuYW1lXCIsIG9sZFVzZXJuYW1lKTtcblxuICAgIGlmIChlcnJvcikge1xuICAgICAgc2hvd1RvYXN0KFwi4LmA4LiB4Li04LiU4LiC4LmJ4Lit4Lic4Li04LiU4Lie4Lil4Liy4LiU4LmD4LiZ4LiB4Liy4Lij4LmA4Lib4Lil4Li14LmI4Lii4LiZ4LiK4Li34LmI4LitXCIsIFwiZXJyb3JcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJwdXJjaGFzZXNcIilcbiAgICAgICAgLnVwZGF0ZSh7IHVzZXJuYW1lOiB0cmltbWVkTmV3IH0pXG4gICAgICAgIC5lcShcInVzZXJuYW1lXCIsIG9sZFVzZXJuYW1lKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwidG9wdXBzXCIpXG4gICAgICAgIC51cGRhdGUoeyB1c2VybmFtZTogdHJpbW1lZE5ldyB9KVxuICAgICAgICAuZXEoXCJ1c2VybmFtZVwiLCBvbGRVc2VybmFtZSksXG4gICAgICBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcImFjdGl2aXRpZXNcIilcbiAgICAgICAgLnVwZGF0ZSh7IHVzZXJuYW1lOiB0cmltbWVkTmV3IH0pXG4gICAgICAgIC5lcShcInVzZXJuYW1lXCIsIG9sZFVzZXJuYW1lKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwiY2xhaW1lZF9qYWNrcG90c1wiKVxuICAgICAgICAudXBkYXRlKHsgdXNlcm5hbWU6IHRyaW1tZWROZXcgfSlcbiAgICAgICAgLmVxKFwidXNlcm5hbWVcIiwgb2xkVXNlcm5hbWUpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdXBkYXRlZFVzZXIgPSB7IC4uLmN1cnJlbnRVc2VyLCB1c2VybmFtZTogdHJpbW1lZE5ldyB9O1xuICAgIHNldEN1cnJlbnRVc2VyKHVwZGF0ZWRVc2VyKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIktVV0FTSElJX0NVUlJFTlRfVVNFUlwiLCBKU09OLnN0cmluZ2lmeSh1cGRhdGVkVXNlcikpO1xuICAgIHNob3dUb2FzdChcIuC5gOC4m+C4peC4teC5iOC4ouC4meC4iuC4t+C5iOC4reC4nOC4ueC5ieC5g+C4iuC5ieC4quC4s+C5gOC4o+C5h+C4iFwiLCBcInN1Y2Nlc3NcIik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlRW1haWwgPSBhc3luYyAobmV3RW1haWw6IHN0cmluZykgPT4ge1xuICAgIGlmICghY3VycmVudFVzZXIpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCB0cmltbWVkRW1haWwgPSBuZXdFbWFpbC50cmltKCk7XG4gICAgaWYgKCF0cmltbWVkRW1haWwuaW5jbHVkZXMoXCJAXCIpKSB7XG4gICAgICBzaG93VG9hc3QoXCLguKPguLnguJvguYHguJrguJrguK3guLXguYDguKHguKXguYTguKHguYjguJbguLnguIHguJXguYnguK3guIdcIiwgXCJlcnJvclwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwicHJvZmlsZXNcIilcbiAgICAgIC51cGRhdGUoeyBlbWFpbDogdHJpbW1lZEVtYWlsIH0pXG4gICAgICAuZXEoXCJ1c2VybmFtZVwiLCBjdXJyZW50VXNlci51c2VybmFtZSk7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBzaG93VG9hc3QoXCLguYDguIHguLTguJTguILguYnguK3guJzguLTguJTguJ7guKXguLLguJTguYPguJnguIHguLLguKPguYDguJvguKXguLXguYjguKLguJnguK3guLXguYDguKHguKVcIiwgXCJlcnJvclwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc2hvd1RvYXN0KFwi4LmA4Lib4Lil4Li14LmI4Lii4LiZ4Lit4Li14LmA4Lih4Lil4Liq4Liz4LmA4Lij4LmH4LiIXCIsIFwic3VjY2Vzc1wiKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEZWxldGVBY2NvdW50ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghY3VycmVudFVzZXIpIHJldHVybjtcbiAgICBjb25zdCB1c2VybmFtZSA9IGN1cnJlbnRVc2VyLnVzZXJuYW1lO1xuXG4gICAgYXdhaXQgc3VwYWJhc2UuZnJvbShcInByb2ZpbGVzXCIpLmRlbGV0ZSgpLmVxKFwidXNlcm5hbWVcIiwgdXNlcm5hbWUpO1xuICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJ0b3B1cHNcIikuZGVsZXRlKCkuZXEoXCJ1c2VybmFtZVwiLCB1c2VybmFtZSk7XG4gICAgYXdhaXQgc3VwYWJhc2UuZnJvbShcInB1cmNoYXNlc1wiKS5kZWxldGUoKS5lcShcInVzZXJuYW1lXCIsIHVzZXJuYW1lKTtcblxuICAgIGhhbmRsZUxvZ291dCgpO1xuICAgIHNob3dUb2FzdChcIuC4peC4muC4muC4seC4jeC4iuC4teC5geC4peC4sOC4guC5ieC4reC4oeC4ueC4peC4l+C4seC5ieC4h+C4q+C4oeC4lOC5gOC4o+C4teC4ouC4muC4o+C5ieC4reC4ouC5geC4peC5ieC4p1wiLCBcImluZm9cIik7XG4gIH07XG5cbiAgLy8gLS0tIEFkZC9FZGl0L0RlbGV0ZSBjb250cm9sbGVycyAtLS1cbiAgY29uc3QgaGFuZGxlU2F2ZUl0ZW0gPSBhc3luYyAoXG4gICAgaXRlbURhdGE6IE9taXQ8U3RvY2tJdGVtLCBcInVwZGF0ZWRBdFwiPixcbiAgICBub3RpZnlEaXNjb3JkPzogYm9vbGVhbixcbiAgICB3ZWJob29rVXJsPzogc3RyaW5nLFxuICApID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAvLyBGZXRjaCBsYXRlc3QgdG8gcHJldmVudCByYWNlIGNvbmRpdGlvblxuICAgIGxldCBjdXJyZW50SXRlbXMgPSAoYXdhaXQgZmV0Y2hJdGVtcygpKSB8fCBpdGVtcztcblxuICAgIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBjdXJyZW50SXRlbXMuZmluZEluZGV4KChpdCkgPT4gaXQuaWQgPT09IGl0ZW1EYXRhLmlkKTtcblxuICAgIGxldCBmaW5hbEl0ZW06IFN0b2NrSXRlbTtcbiAgICBsZXQgYWRkZWRRdHkgPSAwO1xuXG4gICAgaWYgKGV4aXN0aW5nSW5kZXggPj0gMCkge1xuICAgICAgY29uc3Qgb2xkSXRlbSA9IGN1cnJlbnRJdGVtc1tleGlzdGluZ0luZGV4XTtcbiAgICAgIGNvbnN0IG5ld1EgPSBOdW1iZXIoaXRlbURhdGEucXVhbnRpdHkpIHx8IDA7XG4gICAgICBjb25zdCBvbGRRID0gTnVtYmVyKG9sZEl0ZW0ucXVhbnRpdHkpIHx8IDA7XG4gICAgICBhZGRlZFF0eSA9IG5ld1EgLSBvbGRRO1xuICAgICAgZmluYWxJdGVtID0ge1xuICAgICAgICAuLi5vbGRJdGVtLFxuICAgICAgICAuLi5pdGVtRGF0YSxcbiAgICAgICAgcXVhbnRpdHk6IG5ld1EsXG4gICAgICAgIHVwZGF0ZWRBdDogdGltZXN0YW1wLFxuICAgICAgfSBhcyBTdG9ja0l0ZW07XG4gICAgICBzaG93VG9hc3QoYOC4muC4seC4meC4l+C4tuC4geC5hOC4reC5gOC4l+C4oSAke2l0ZW1EYXRhLm5hbWV9IOC4quC4s+C5gOC4o+C5h+C4iCFgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3USA9IE51bWJlcihpdGVtRGF0YS5xdWFudGl0eSkgfHwgMDtcbiAgICAgIGFkZGVkUXR5ID0gbmV3UTtcbiAgICAgIGZpbmFsSXRlbSA9IHtcbiAgICAgICAgLi4uaXRlbURhdGEsXG4gICAgICAgIHF1YW50aXR5OiBuZXdRLFxuICAgICAgICB1cGRhdGVkQXQ6IHRpbWVzdGFtcCxcbiAgICAgIH0gYXMgU3RvY2tJdGVtO1xuICAgICAgc2hvd1RvYXN0KGDguYDguJ7guLTguYjguKHguYTguK3guYDguJfguKEgJHtpdGVtRGF0YS5uYW1lfSDguKXguIfguKPguLDguJrguJrguYDguKPguLXguKLguJrguKPguYnguK3guKJgKTtcbiAgICB9XG5cbiAgICBpZiAobm90aWZ5RGlzY29yZCAmJiB3ZWJob29rVXJsICYmIGFkZGVkUXR5ID4gMCkge1xuICAgICAgc2VuZERpc2NvcmRTdG9ja1VwZGF0ZUVtYmVkKFxuICAgICAgICB3ZWJob29rVXJsLFxuICAgICAgICBpdGVtRGF0YS5uYW1lLFxuICAgICAgICBhZGRlZFF0eSxcbiAgICAgICAgZmluYWxJdGVtLnF1YW50aXR5LFxuICAgICAgICBpdGVtRGF0YS5pbWFnZVVybCxcbiAgICAgICAgaXRlbURhdGEuZ2FtZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHN0YXRlIHRvIHJlbmRlciBpbnN0YW50bHlcbiAgICBjb25zdCB1cGRhdGVkTGlzdCA9XG4gICAgICBleGlzdGluZ0luZGV4ID49IDBcbiAgICAgICAgPyBjdXJyZW50SXRlbXMubWFwKChpdCkgPT4gKGl0LmlkID09PSBpdGVtRGF0YS5pZCA/IGZpbmFsSXRlbSA6IGl0KSlcbiAgICAgICAgOiBbZmluYWxJdGVtLCAuLi5jdXJyZW50SXRlbXNdO1xuXG4gICAgc2V0SXRlbXModXBkYXRlZExpc3QpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVwZGF0ZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogZmluYWxJdGVtLmlkLFxuICAgICAgICAgIG5hbWU6IGZpbmFsSXRlbS5uYW1lLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBmaW5hbEl0ZW0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgcHJpY2U6IGZpbmFsSXRlbS5wcmljZSxcbiAgICAgICAgICBxdWFudGl0eTogZmluYWxJdGVtLnF1YW50aXR5LFxuICAgICAgICAgIGltYWdlOiBmaW5hbEl0ZW0uaW1hZ2VVcmxzXG4gICAgICAgICAgICA/IEpTT04uc3RyaW5naWZ5KGZpbmFsSXRlbS5pbWFnZVVybHMpXG4gICAgICAgICAgICA6IGZpbmFsSXRlbS5pbWFnZVVybCxcbiAgICAgICAgICBnYW1lOiBmaW5hbEl0ZW0uZ2FtZSxcbiAgICAgICAgICBjYXRlZ29yeTogZmluYWxJdGVtLmNhdGVnb3J5LFxuICAgICAgICAgIHJhcml0eTogZmluYWxJdGVtLnNhbGVGb3JtYXQsXG4gICAgICAgICAgcG9wdWxhcjogZmluYWxJdGVtLmlzUG9wdWxhcixcbiAgICAgICAgICBnYWNoYV9wb29sOiB7XG4gICAgICAgICAgICBwb29sOiBmaW5hbEl0ZW0uZ2FjaGFQb29sIHx8IG51bGwsXG4gICAgICAgICAgICBzYWxlRm9ybWF0OiBmaW5hbEl0ZW0uc2FsZUZvcm1hdCxcbiAgICAgICAgICAgIGluaXRpYWxRdWFudGl0eTogZmluYWxJdGVtLmluaXRpYWxRdWFudGl0eSxcbiAgICAgICAgICAgIHBpZWNlc1BlclVuaXQ6IGZpbmFsSXRlbS5waWVjZXNQZXJVbml0LFxuICAgICAgICAgICAgYWNjb3VudENyZWRlbnRpYWxzOiBmaW5hbEl0ZW0uYWNjb3VudENyZWRlbnRpYWxzIHx8IG51bGwsXG4gICAgICAgICAgICBmaWxlTGluazogZmluYWxJdGVtLmZpbGVMaW5rIHx8IG51bGwsXG4gICAgICAgICAgICBmaWxlUGFzc3dvcmQ6IGZpbmFsSXRlbS5maWxlUGFzc3dvcmQgfHwgbnVsbCxcbiAgICAgICAgICAgIGlzUGlubmVkOiBmaW5hbEl0ZW0uaXNQaW5uZWQgfHwgZmFsc2UsXG4gICAgICAgICAgICBvcmlnaW5hbFByaWNlOiBmaW5hbEl0ZW0ub3JpZ2luYWxQcmljZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNyZWF0ZWRfYXQ6IGZpbmFsSXRlbS51cGRhdGVkQXQgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJpdGVtc1wiKS51cHNlcnQodXBkYXRlcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNhdmluZyBpdGVtXCIsIGUpO1xuICAgIH1cblxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInN5bmMtdXBkYXRlXCIpKTtcbiAgICBzZXRFZGl0aW5nSXRlbShudWxsKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEZWxldGVJdGVtID0gYXN5bmMgKGlkOiBzdHJpbmcpID0+IHtcbiAgICAvLyBGZXRjaCBsYXRlc3QgdG8gcHJldmVudCByYWNlIGNvbmRpdGlvblxuICAgIGxldCBjdXJyZW50SXRlbXMgPSAoYXdhaXQgZmV0Y2hJdGVtcygpKSB8fCBpdGVtcztcblxuICAgIGNvbnN0IGl0ZW1Ub0RlbGV0ZSA9IGN1cnJlbnRJdGVtcy5maW5kKChpdCkgPT4gaXQuaWQgPT09IGlkKTtcbiAgICBpZiAoIWl0ZW1Ub0RlbGV0ZSkgcmV0dXJuO1xuXG4gICAgaWYgKFxuICAgICAgY29uZmlybShcbiAgICAgICAgYOC4hOC4uOC4k+C4oeC4seC5iOC4meC5g+C4iOC4q+C4o+C4t+C4reC5hOC4oeC5iOC4l+C4teC5iOC4iOC4sOC4peC4miBcIiR7aXRlbVRvRGVsZXRlLm5hbWV9XCIg4Lit4Lit4LiB4LiI4Liy4LiB4LiE4Lil4Lix4LiH4Liq4LiV4LmK4Lit4LiB4Liq4Li04LiZ4LiE4LmJ4LiyP2AsXG4gICAgICApXG4gICAgKSB7XG4gICAgICBjb25zdCByZW1haW5pbmdJdGVtcyA9IGN1cnJlbnRJdGVtcy5maWx0ZXIoKGl0KSA9PiBpdC5pZCAhPT0gaWQpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwiaXRlbXNcIikuZGVsZXRlKCkuZXEoXCJpZFwiLCBpZCk7XG4gICAgICAgIHNldEl0ZW1zKHJlbWFpbmluZ0l0ZW1zKTtcbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwic3luYy11cGRhdGVcIikpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgaXRlbTpcIiwgZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENsZWFudXAgQ2xhaW1lZCBKYWNrcG90c1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc3RvcmVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJLVVdBU0hJSV9DTEFJTUVEX0pBQ0tQT1RTXCIpO1xuICAgICAgICBpZiAoc3RvcmVkKSB7XG4gICAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShzdG9yZWQpO1xuICAgICAgICAgIGNvbnN0IGZpbHRlcmVkID0gcGFyc2VkLmZpbHRlcigoYzogYW55KSA9PiBjLml0ZW1JZCAhPT0gaWQpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgXCJLVVdBU0hJSV9DTEFJTUVEX0pBQ0tQT1RTXCIsXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShmaWx0ZXJlZCksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgc2hvd1RvYXN0KFwi4Lil4Lia4Liq4Li04LiZ4LiE4LmJ4Liy4Lit4Lit4LiB4LiI4Liy4LiB4Lij4Liw4Lia4Lia4LmB4Lil4Liw4LiQ4Liy4LiZ4LiC4LmJ4Lit4Lih4Li54Lil4LmA4Lij4Li14Lii4Lia4Lij4LmJ4Lit4LiiXCIsIFwiaW5mb1wiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQnV5SXRlbSA9IGFzeW5jIChpdGVtOiBTdG9ja0l0ZW0sIHB1cmNoYXNlUXR5OiBudW1iZXIgPSAxKSA9PiB7XG4gICAgaWYgKGlzUHJvY2Vzc2luZ1B1cmNoYXNlIHx8IGlzUHJvY2Vzc2luZ1B1cmNoYXNlUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgIGlmICghY3VycmVudFVzZXIpIHtcbiAgICAgIHNob3dUb2FzdChcIuC4geC4o+C4uOC4k+C4suC5gOC4guC5ieC4suC4quC4ueC5iOC4o+C4sOC4muC4muC4geC5iOC4reC4meC4l+C4s+C4geC4suC4o+C4quC4seC5iOC4h+C4i+C4t+C5ieC4rSFcIiwgXCJlcnJvclwiKTtcbiAgICAgIHNldEFwcFNjcmVlbihcIkxPR0lOXCIpO1xuICAgICAgc2V0QXV0aE1vZGUoXCJsb2dpblwiKTtcbiAgICAgIHNldElucXVpcmluZ0l0ZW0obnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc0FkbWluKSB7XG4gICAgICBzaG93VG9hc3QoXCLguJzguLnguYnguJTguLnguYHguKXguKPguLDguJrguJrguYTguKHguYjguKrguLLguKHguLLguKPguJbguKrguLHguYjguIfguIvguLfguYnguK3guKrguLTguJnguITguYnguLLguJXguLHguKfguYDguK3guIfguYTguJTguYlcIiwgXCJpbmZvXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlzUHJvY2Vzc2luZ1B1cmNoYXNlUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIHNldElzUHJvY2Vzc2luZ1B1cmNoYXNlKHRydWUpO1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGZldGNoVXNlcihjdXJyZW50VXNlci51c2VybmFtZSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHNob3dUb2FzdChcbiAgICAgICAgXCLguYTguKHguYjguJ7guJrguJrguLHguI3guIrguLXguKrguYjguKfguJnguJXguLHguKfguYPguJnguJDguLLguJnguILguYnguK3guKHguLnguKUgVjIgKOC5guC4m+C4o+C4lOC4reC4reC4geC4iOC4suC4geC4o+C4sOC4muC4muC5geC4peC4sOC5gOC4guC5ieC4suC5g+C4q+C4oeC5iClcIixcbiAgICAgICAgXCJlcnJvclwiLFxuICAgICAgKTtcbiAgICAgIHNldElzUHJvY2Vzc2luZ1B1cmNoYXNlKGZhbHNlKTtcbiAgICAgIGlzUHJvY2Vzc2luZ1B1cmNoYXNlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocHVyY2hhc2VRdHkgPiBpdGVtLnF1YW50aXR5KSB7XG4gICAgICBzaG93VG9hc3QoXCLguILguK3guK3guKDguLHguKIg4Liq4Li04LiZ4LiE4LmJ4Liy4LmD4LiZ4Liq4LiV4LmK4Lit4LiB4Lih4Li14LmE4Lih4LmI4LmA4Lie4Li14Lii4LiH4Lie4LitXCIsIFwiZXJyb3JcIik7XG4gICAgICBzZXRJc1Byb2Nlc3NpbmdQdXJjaGFzZShmYWxzZSk7XG4gICAgICBpc1Byb2Nlc3NpbmdQdXJjaGFzZVJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdG90YWxQcmljZSA9IGl0ZW0ucHJpY2UgKiBwdXJjaGFzZVF0eTtcbiAgICBjb25zdCBiYWxhbmNlRmllbGQgPSB0b3B1cFRhcmdldDtcbiAgICBjb25zdCB1c2VyQmFsYW5jZSA9IE51bWJlcih1c2VyW2JhbGFuY2VGaWVsZF0gfHwgMCk7XG4gICAgaWYgKHVzZXJCYWxhbmNlIDwgdG90YWxQcmljZSkge1xuICAgICAgc2hvd1RvYXN0KFxuICAgICAgICBg4Lii4Lit4LiU4LmA4LiE4Lij4LiU4Li04LiV4LmD4LiZ4Lij4Liw4Lia4Lia4LmE4Lih4LmI4LmA4Lie4Li14Lii4LiH4Lie4LitISAo4LiC4Liy4LiU4Lit4Li14LiBICR7dG90YWxQcmljZSAtIHVzZXJCYWxhbmNlfSDguL8pYCxcbiAgICAgICAgXCJlcnJvclwiLFxuICAgICAgKTtcbiAgICAgIHNldElzUHJvY2Vzc2luZ1B1cmNoYXNlKGZhbHNlKTtcbiAgICAgIGlzUHJvY2Vzc2luZ1B1cmNoYXNlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gUmUtZmV0Y2ggdXNlcnMgdG8gcHJldmVudCByYWNlIGNvbmRpdGlvbnMgZHVyaW5nIHRoZSBkZWxheVxuICAgICAgY29uc3QgbGl2ZVVzZXIgPSBhd2FpdCBmZXRjaFVzZXIoY3VycmVudFVzZXIudXNlcm5hbWUpO1xuXG4gICAgICBjb25zdCBsaXZlVXNlckJhbGFuY2UgPSBOdW1iZXIobGl2ZVVzZXJbYmFsYW5jZUZpZWxkXSB8fCAwKTtcbiAgICAgIGlmICghbGl2ZVVzZXIgfHwgbGl2ZVVzZXJCYWxhbmNlIDwgdG90YWxQcmljZSkge1xuICAgICAgICBzaG93VG9hc3QoXCLguKLguK3guJTguYDguIfguLTguJnguYTguKHguYjguYDguJ7guLXguKLguIfguJ7guK0g4Lir4Lij4Li34Lit4LiC4LmJ4Lit4Lih4Li54Lil4LmE4Lih4LmI4LiW4Li54LiB4LiV4LmJ4Lit4LiHXCIsIFwiZXJyb3JcIik7XG4gICAgICAgIHNldElzUHJvY2Vzc2luZ1B1cmNoYXNlKGZhbHNlKTtcbiAgICAgICAgaXNQcm9jZXNzaW5nUHVyY2hhc2VSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFJlYWQgTElWRSBpdGVtcyB0byBlbnN1cmUgc3RvY2sgaXMgc3RpbGwgZW5vdWdoIGFuZCBhY2N1cmF0ZWx5IGV2YWx1YXRlIGdhY2hhIGRyb3BzXG4gICAgICBjb25zdCB7IGRhdGE6IGRiSXRlbSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJpdGVtc1wiKVxuICAgICAgICAuc2VsZWN0KFwicXVhbnRpdHlcIilcbiAgICAgICAgLmVxKFwiaWRcIiwgaXRlbS5pZClcbiAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgbGV0IGxpdmVJdGVtUXR5ID0gaXRlbS5xdWFudGl0eTtcbiAgICAgIGlmIChkYkl0ZW0pIHtcbiAgICAgICAgbGl2ZUl0ZW1RdHkgPSBkYkl0ZW0ucXVhbnRpdHk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwdXJjaGFzZVF0eSA+IGxpdmVJdGVtUXR5KSB7XG4gICAgICAgIHNob3dUb2FzdChcbiAgICAgICAgICBcIuC4guC4reC4reC4oOC4seC4oiDguKrguLTguJnguITguYnguLLguYPguJnguKrguJXguYrguK3guIHguJbguLnguIHguIvguLfguYnguK3guYTguJvguKvguKHguJTguKvguKPguLfguK3guKHguLXguYTguKHguYjguYDguJ7guLXguKLguIfguJ7guK3guYHguKXguYnguKdcIixcbiAgICAgICAgICBcImVycm9yXCIsXG4gICAgICAgICk7XG4gICAgICAgIHNldElzUHJvY2Vzc2luZ1B1cmNoYXNlKGZhbHNlKTtcbiAgICAgICAgaXNQcm9jZXNzaW5nUHVyY2hhc2VSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIExvYWQgY2xhaW1lZCBqYWNrcG90cyB0byBwcmV2ZW50IGR1cGxpY2F0ZSBnaXZpbmcgb2YgdGhlIGV4YWN0IHNhbWUgc3RvY2sgdHJpZ2dlclxuICAgICAgbGV0IGNsYWltZWRKYWNrcG90czogYW55W10gPSBbXTtcbiAgICAgIGxldCB1c2luZ0RiQ2xhaW1zID0gZmFsc2U7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGRiQ2xhaW1zLCBlcnJvcjogY2xhaW1zRXJyIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwiY2xhaW1lZF9qYWNrcG90c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgICAgICAgLmVxKFwiaXRlbV9pZFwiLCBpdGVtLmlkKTtcbiAgICAgICAgaWYgKCFjbGFpbXNFcnIgJiYgZGJDbGFpbXMpIHtcbiAgICAgICAgICBjbGFpbWVkSmFja3BvdHMgPSBkYkNsYWltcy5tYXAoKGM6IGFueSkgPT4gKHtcbiAgICAgICAgICAgIGl0ZW1JZDogYy5pdGVtX2lkLFxuICAgICAgICAgICAgc3RvY2tUcmlnZ2VyOiBjLnN0b2NrX3RyaWdnZXIsXG4gICAgICAgICAgfSkpO1xuICAgICAgICAgIHVzaW5nRGJDbGFpbXMgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhbGxiYWNrIHRvIGxvY2FsXCIpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgc3RvcmVkQ2xhaW1zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXG4gICAgICAgICAgICBcIktVV0FTSElJX0NMQUlNRURfSkFDS1BPVFNcIixcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChzdG9yZWRDbGFpbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2Uoc3RvcmVkQ2xhaW1zKTtcbiAgICAgICAgICAgIGNvbnN0IHRocmVlRGF5c0FnbyA9IERhdGUubm93KCkgLSAzICogMjQgKiA2MCAqIDYwICogMTAwMDtcbiAgICAgICAgICAgIGNsYWltZWRKYWNrcG90cyA9IHBhcnNlZC5maWx0ZXIoXG4gICAgICAgICAgICAgIChjOiBhbnkpID0+IG5ldyBEYXRlKGMudGltZXN0YW1wKS5nZXRUaW1lKCkgPiB0aHJlZURheXNBZ28sXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH1cblxuICAgICAgLy8gUGVyZm9ybSBHYWNoYSBSb2xsIGJhc2VkIG9uIENVUlJFTlQgTElWRSBzdG9ja1xuICAgICAgbGV0IGRyb3BzOiB7IG5hbWU6IHN0cmluZzsgY29sb3I/OiBzdHJpbmc7IGlzU2FsdD86IGJvb2xlYW4gfVtdID0gW107XG4gICAgICBpZiAoaXRlbS5nYWNoYVBvb2wgJiYgaXRlbS5nYWNoYVBvb2wubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHB1cmNoYXNlUXR5OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50T3BlblN0b2NrID0gbGl2ZUl0ZW1RdHkgLSBpO1xuXG4gICAgICAgICAgbGV0IGRyb3BwZWQgPSBudWxsO1xuXG4gICAgICAgICAgY29uc3QgZ3VhcmFudGVlZFJld2FyZCA9IGl0ZW0uZ2FjaGFQb29sLmZpbmQoXG4gICAgICAgICAgICAocikgPT5cbiAgICAgICAgICAgICAgKHIuZ3VhcmFudGVlZEF0U3RvY2sgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIHIuZ3VhcmFudGVlZEF0U3RvY2sgPT09IGN1cnJlbnRPcGVuU3RvY2spIHx8XG4gICAgICAgICAgICAgIChyLmd1YXJhbnRlZWRBdFN0b2NrcyAmJlxuICAgICAgICAgICAgICAgIHIuZ3VhcmFudGVlZEF0U3RvY2tzLmluY2x1ZGVzKGN1cnJlbnRPcGVuU3RvY2spKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGd1YXJhbnRlZWRSZXdhcmQpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIEFOWU9ORSBhbHJlYWR5IGNsYWltZWQgdGhpcyBzcGVjaWZpYyBzdG9jayB0cmlnZ2VyIGZvciB0aGlzIGl0ZW1cbiAgICAgICAgICAgIGNvbnN0IGlzQ2xhaW1lZCA9IGNsYWltZWRKYWNrcG90cy5zb21lKFxuICAgICAgICAgICAgICAoYykgPT5cbiAgICAgICAgICAgICAgICBjLml0ZW1JZCA9PT0gaXRlbS5pZCAmJiBjLnN0b2NrVHJpZ2dlciA9PT0gY3VycmVudE9wZW5TdG9jayxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoIWlzQ2xhaW1lZCkge1xuICAgICAgICAgICAgICBkcm9wcGVkID0gZ3VhcmFudGVlZFJld2FyZDtcbiAgICAgICAgICAgICAgaWYgKHVzaW5nRGJDbGFpbXMpIHtcbiAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGF0b21pYyBpbnNlcnQgRklSU1RcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVycm9yOiBjbGFpbUVyciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAgICAgICAgIC5mcm9tKFwiY2xhaW1lZF9qYWNrcG90c1wiKVxuICAgICAgICAgICAgICAgICAgLmluc2VydChbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtX2lkOiBpdGVtLmlkLFxuICAgICAgICAgICAgICAgICAgICAgIHN0b2NrX3RyaWdnZXI6IGN1cnJlbnRPcGVuU3RvY2ssXG4gICAgICAgICAgICAgICAgICAgICAgcmV3YXJkX25hbWU6IGRyb3BwZWQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogY3VycmVudFVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIGNsYWltRXJyICYmXG4gICAgICAgICAgICAgICAgICAoY2xhaW1FcnIuY29kZSA9PT0gXCIyMzUwNVwiIHx8XG4gICAgICAgICAgICAgICAgICAgIChjbGFpbUVyci5tZXNzYWdlICYmIGNsYWltRXJyLm1lc3NhZ2UuaW5jbHVkZXMoXCJVTklRVUVcIikpKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgLy8gVU5JUVVFIGNvbnN0cmFpbnQgdmlvbGF0aW9uXG4gICAgICAgICAgICAgICAgICAvLyBTb21lb25lIGVsc2UgYmVhdCB1cyB0byB0aGlzIGphY2twb3QhXG4gICAgICAgICAgICAgICAgICBkcm9wcGVkID0gbnVsbDsgLy8gVHVybiB0byBzYWx0XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NsYWltID0ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtSWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZE5hbWU6IGRyb3BwZWQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgc3RvY2tUcmlnZ2VyOiBjdXJyZW50T3BlblN0b2NrLFxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogY3VycmVudFVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGNsYWltZWRKYWNrcG90cy5wdXNoKG5ld0NsYWltKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q2xhaW0gPSB7XG4gICAgICAgICAgICAgICAgICBpdGVtSWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICAgICAgICByZXdhcmROYW1lOiBkcm9wcGVkLm5hbWUsXG4gICAgICAgICAgICAgICAgICBzdG9ja1RyaWdnZXI6IGN1cnJlbnRPcGVuU3RvY2ssXG4gICAgICAgICAgICAgICAgICB1c2VybmFtZTogY3VycmVudFVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNsYWltZWRKYWNrcG90cy5wdXNoKG5ld0NsYWltKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChkcm9wcGVkKSB7XG4gICAgICAgICAgICBkcm9wcy5wdXNoKHsgbmFtZTogZHJvcHBlZC5uYW1lLCBjb2xvcjogZHJvcHBlZC5jb2xvciB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHJvcHMucHVzaCh7IG5hbWU6IFwi4LmA4LiB4Lil4Li34LitXCIsIGNvbG9yOiBcIiM2YjcyODBcIiwgaXNTYWx0OiB0cnVlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXVzaW5nRGJDbGFpbXMpIHtcbiAgICAgICAgLy8gVXBkYXRlIENsYWltZWQgSmFja3BvdHMgTG9jYWwgQ2FjaGVcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgXCJLVVdBU0hJSV9DTEFJTUVEX0pBQ0tQT1RTXCIsXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoY2xhaW1lZEphY2twb3RzKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJvY2VzcyBQdXJjaGFzZVxuICAgICAgY29uc3QgbmV3QmFsYW5jZSA9IGxpdmVVc2VyQmFsYW5jZSAtIHRvdGFsUHJpY2U7XG4gICAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInByb2ZpbGVzXCIpXG4gICAgICAgIC51cGRhdGUoeyBbYmFsYW5jZUZpZWxkXTogbmV3QmFsYW5jZSB9KVxuICAgICAgICAuZXEoXCJ1c2VybmFtZVwiLCBjdXJyZW50VXNlci51c2VybmFtZSk7XG5cbiAgICAgIGxldCBleHRyYWN0Q3JlZHM6IHN0cmluZ1tdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgbGV0IG5leHRBY2NDcmVkcyA9IGl0ZW0uYWNjb3VudENyZWRlbnRpYWxzO1xuXG4gICAgICBpZiAoaXRlbS5zYWxlRm9ybWF0ID09PSBcIuC5hOC4n+C4peC5jOC4leC4seC4p+C4o+C4seC4mVwiKSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYOC4peC4tOC5ieC4h+C4hOC5jOC4lOC4suC4p+C4meC5jOC5guC4q+C4peC4lDogJHtpdGVtLmZpbGVMaW5rIHx8IFwiLVwifSB8IOC4o+C4q+C4seC4quC4nOC5iOC4suC4meC5gOC4guC5ieC4suC4luC4tuC4h+C4peC4tOC5ieC4h+C4hOC5jDogJHtpdGVtLmZpbGVQYXNzd29yZCB8fCBcIi1cIn1gO1xuICAgICAgICBleHRyYWN0Q3JlZHMgPSBBcnJheShwdXJjaGFzZVF0eSkuZmlsbChwcm9kdWN0SW5mbyk7XG4gICAgICAgIGhhbmRsZVF1aWNrUXVhbnRpdHlDaGFuZ2UoaXRlbS5pZCwgLXB1cmNoYXNlUXR5LCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGl0ZW0uYWNjb3VudENyZWRlbnRpYWxzICYmXG4gICAgICAgIGl0ZW0uYWNjb3VudENyZWRlbnRpYWxzLmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICBleHRyYWN0Q3JlZHMgPSBpdGVtLmFjY291bnRDcmVkZW50aWFscy5zbGljZSgwLCBwdXJjaGFzZVF0eSk7XG4gICAgICAgIG5leHRBY2NDcmVkcyA9IGl0ZW0uYWNjb3VudENyZWRlbnRpYWxzLnNsaWNlKHB1cmNoYXNlUXR5KTtcbiAgICAgICAgYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcIml0ZW1zXCIpXG4gICAgICAgICAgLnVwZGF0ZSh7XG4gICAgICAgICAgICBxdWFudGl0eTogbGl2ZUl0ZW1RdHkgLSBwdXJjaGFzZVF0eSxcbiAgICAgICAgICAgIGdhY2hhX3Bvb2w6IHtcbiAgICAgICAgICAgICAgcG9vbDogaXRlbS5nYWNoYVBvb2wgfHwgbnVsbCxcbiAgICAgICAgICAgICAgc2FsZUZvcm1hdDogaXRlbS5zYWxlRm9ybWF0IHx8IFwi4LiC4Liy4Lii4Lij4Lir4Lix4LiqXCIsXG4gICAgICAgICAgICAgIGluaXRpYWxRdWFudGl0eTogaXRlbS5pbml0aWFsUXVhbnRpdHksXG4gICAgICAgICAgICAgIHBpZWNlc1BlclVuaXQ6IGl0ZW0ucGllY2VzUGVyVW5pdCxcbiAgICAgICAgICAgICAgYWNjb3VudENyZWRlbnRpYWxzOiBuZXh0QWNjQ3JlZHMsXG4gICAgICAgICAgICAgIGZpbGVMaW5rOiBpdGVtLmZpbGVMaW5rIHx8IG51bGwsXG4gICAgICAgICAgICAgIGZpbGVQYXNzd29yZDogaXRlbS5maWxlUGFzc3dvcmQgfHwgbnVsbCxcbiAgICAgICAgICAgICAgaXNQaW5uZWQ6IGl0ZW0uaXNQaW5uZWQgfHwgZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVxKFwiaWRcIiwgaXRlbS5pZCk7XG5cbiAgICAgICAgLy8gQWxzbyB1cGRhdGUgbG9jYWwgaW1tZWRpYXRlbHlcbiAgICAgICAgc2V0SXRlbXMoKHByZXYpID0+XG4gICAgICAgICAgcHJldi5tYXAoKGl0KSA9PlxuICAgICAgICAgICAgaXQuaWQgPT09IGl0ZW0uaWRcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAuLi5pdCxcbiAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiBsaXZlSXRlbVF0eSAtIHB1cmNoYXNlUXR5LFxuICAgICAgICAgICAgICAgICAgYWNjb3VudENyZWRlbnRpYWxzOiBuZXh0QWNjQ3JlZHMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IGl0LFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYW5kbGVRdWlja1F1YW50aXR5Q2hhbmdlKGl0ZW0uaWQsIC1wdXJjaGFzZVF0eSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZXJyb3I6IHB1cmNoYXNlRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJwdXJjaGFzZXNcIikuaW5zZXJ0KFtcbiAgICAgICAge1xuICAgICAgICAgIHVzZXJuYW1lOiBjdXJyZW50VXNlci51c2VybmFtZSxcbiAgICAgICAgICBpdGVtX2lkOiBpdGVtLmlkLFxuICAgICAgICAgIGl0ZW1fbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICAgIHByaWNlOiB0b3RhbFByaWNlLFxuICAgICAgICAgIHF1YW50aXR5OiBwdXJjaGFzZVF0eSxcbiAgICAgICAgICBnYWNoYV9kcm9wczogZHJvcHMubGVuZ3RoID4gMCA/IGRyb3BzIDogbnVsbCxcbiAgICAgICAgICBjcmVkZW50aWFsX2RhdGE6IGV4dHJhY3RDcmVkcyA/IGV4dHJhY3RDcmVkcy5qb2luKFwiXFxuXCIpIDogbnVsbCxcbiAgICAgICAgICBnYW1lOiBpdGVtLmdhbWUgfHwgYXBwU2NyZWVuLFxuICAgICAgICB9LFxuICAgICAgXSk7XG4gICAgICBpZiAocHVyY2hhc2VFcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW5zZXJ0aW5nIHB1cmNoYXNlOlwiLCBwdXJjaGFzZUVycm9yKTtcblxuICAgICAgICAvLyBSZXRyeSB3aXRoIGJhc2ljIHNjaGVtYSBpZiB0aGUgbmV3IGNvbHVtbnMgZG9uJ3QgZXhpc3RcbiAgICAgICAgY29uc3QgeyBlcnJvcjogZmFsbGJhY2tFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcInB1cmNoYXNlc1wiKVxuICAgICAgICAgIC5pbnNlcnQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB1c2VybmFtZTogY3VycmVudFVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgIGl0ZW1faWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICAgIGl0ZW1fbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICAgICAgICBwcmljZTogdG90YWxQcmljZSxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IHB1cmNoYXNlUXR5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgaWYgKGZhbGxiYWNrRXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFsbGJhY2sgcHVyY2hhc2UgaW5zZXJ0IGFsc28gZmFpbGVkOlwiLCBmYWxsYmFja0Vycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25maWdEYXRhID0gYXdhaXQgZ2V0U3lzdGVtQ29uZmlnKCk7XG4gICAgICBjb25zdCBjdXJyZW50QWxsVGltZSA9IGNvbmZpZ0RhdGEgPyBOdW1iZXIoY29uZmlnRGF0YS5hbGxfdGltZV9zYWxlc19jb3VudCB8fCAwKSA6IDA7XG4gICAgICBjb25zdCB1cGRhdGVQYXlsb2FkOiBhbnkgPSB7XG4gICAgICAgIGFsbF90aW1lX3NhbGVzX2NvdW50OiBjdXJyZW50QWxsVGltZSArIHB1cmNoYXNlUXR5XG4gICAgICB9O1xuXG4gICAgICBpZiAoaXRlbS5nYW1lID09PSBcIkFTVERcIikge1xuICAgICAgICBjb25zdCBjdXJyZW50U2FsZXMgPSBjb25maWdEYXRhID8gTnVtYmVyKGNvbmZpZ0RhdGEuZ2xvYmFsX3NhbGVzX2FzdGQgfHwgMCkgOiAwO1xuICAgICAgICB1cGRhdGVQYXlsb2FkLmdsb2JhbF9zYWxlc19hc3RkID0gY3VycmVudFNhbGVzICsgcHVyY2hhc2VRdHk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uZ2FtZSA9PT0gXCJST1ZcIikge1xuICAgICAgICBjb25zdCBjdXJyZW50U2FsZXMgPSBjb25maWdEYXRhID8gTnVtYmVyKGNvbmZpZ0RhdGEuZ2xvYmFsX3NhbGVzX3JvdiB8fCAwKSA6IDA7XG4gICAgICAgIHVwZGF0ZVBheWxvYWQuZ2xvYmFsX3NhbGVzX3JvdiA9IGN1cnJlbnRTYWxlcyArIHB1cmNoYXNlUXR5O1xuICAgICAgfSBlbHNlIGlmIChpdGVtLmdhbWUgPT09IFwiQU9UUlwiKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTYWxlcyA9IGNvbmZpZ0RhdGEgPyBOdW1iZXIoY29uZmlnRGF0YS5nbG9iYWxfc2FsZXNfYW90ciB8fCAwKSA6IDA7XG4gICAgICAgIHVwZGF0ZVBheWxvYWQuZ2xvYmFsX3NhbGVzX2FvdHIgPSBjdXJyZW50U2FsZXMgKyBwdXJjaGFzZVF0eTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJzeXN0ZW1fY29uZmlnXCIpXG4gICAgICAgIC51cGRhdGUodXBkYXRlUGF5bG9hZClcbiAgICAgICAgLmVxKFwiaWRcIiwgXCJtYWluXCIpXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS53YXJuKFwiRmFpbGVkIHRvIHVwZGF0ZSBnbG9iYWwgc2FsZXNcIiwgZXJyKSk7XG5cbiAgICAgIC8vIFJlZHVjZSBTdG9jayBuYXRpdmVseSBoYW5kbGVkIGVhcmxpZXIgZm9yIGNyZWRzIG9yIHZpYSBmYWxsYmFja1xuXG4gICAgICBjb25zdCBoYXNHdWFyYW50ZWVkID0gZHJvcHMuc29tZSgoZCkgPT4gIWQuaXNTYWx0KTtcbiAgICAgIGlmICghKGlzQWRtaW4gJiYgaGFzR3VhcmFudGVlZCkpIHtcbiAgICAgICAgYWRkTGl2ZUFjdGl2aXR5KHtcbiAgICAgICAgICB0eXBlOiBcInB1cmNoYXNlXCIsXG4gICAgICAgICAgdXNlcm5hbWU6IGN1cnJlbnRVc2VyLnVzZXJuYW1lLFxuICAgICAgICAgIGl0ZW1OYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgICAgcXVhbnRpdHk6IHB1cmNoYXNlUXR5LFxuICAgICAgICAgIHByaWNlOiB0b3RhbFByaWNlLFxuICAgICAgICAgIHJlbWFpbmluZ1N0b2NrOiBsaXZlSXRlbVF0eSAtIHB1cmNoYXNlUXR5LFxuICAgICAgICAgIGdhbWU6IGl0ZW0uZ2FtZSB8fCBcIkFTVERcIixcbiAgICAgICAgICBnYWNoYURyb3BzOiBkcm9wcy5sZW5ndGggPiAwID8gZHJvcHMgOiB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB3ZWJob29rRHJvcHMgPVxuICAgICAgICBkcm9wcy5sZW5ndGggPiAwXG4gICAgICAgICAgPyBkcm9wc1xuICAgICAgICAgIDogW3sgbmFtZTogYCR7aXRlbS5uYW1lfSB4JHtwdXJjaGFzZVF0eX1gLCBpc1NhbHQ6IGZhbHNlIH1dO1xuICAgICAgc2VuZERpc2NvcmRQdXJjaGFzZUVtYmVkKFxuICAgICAgICBjdXJyZW50VXNlci51c2VybmFtZSxcbiAgICAgICAgaXRlbS5uYW1lLFxuICAgICAgICBwdXJjaGFzZVF0eSxcbiAgICAgICAgbGl2ZUl0ZW1RdHkgLSBwdXJjaGFzZVF0eSxcbiAgICAgICAgd2ViaG9va0Ryb3BzLFxuICAgICAgICBhcHBTY3JlZW4sXG4gICAgICApO1xuXG4gICAgICBzZXRJbnF1aXJpbmdJdGVtKG51bGwpO1xuICAgICAgc2V0SXNQcm9jZXNzaW5nUHVyY2hhc2UoZmFsc2UpO1xuICAgICAgaXNQcm9jZXNzaW5nUHVyY2hhc2VSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwic3luYy11cGRhdGVcIikpO1xuXG4gICAgICBpZiAoaXRlbS5nYWNoYVBvb2wgJiYgaXRlbS5nYWNoYVBvb2wubGVuZ3RoID4gMCAmJiBkcm9wcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIERpcmVjdCBwdXJjaGFzZSwgZ28gc3RyYWlnaHQgdG8gaGlzdG9yeSB0byB2aWV3IGNyZWRlbnRpYWwvcHJvZHVjdFxuICAgICAgICBzZXRTaG93SGlzdG9yeU1vZGFsKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRGlyZWN0IHB1cmNoYXNlLCBnbyBzdHJhaWdodCB0byBoaXN0b3J5IHRvIHZpZXcgY3JlZGVudGlhbC9wcm9kdWN0XG4gICAgICAgIHNldFNob3dIaXN0b3J5TW9kYWwodHJ1ZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICBzZXRJc1Byb2Nlc3NpbmdQdXJjaGFzZShmYWxzZSk7XG4gICAgICBpc1Byb2Nlc3NpbmdQdXJjaGFzZVJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICBzaG93VG9hc3QoXCLguYDguIHguLTguJTguILguYnguK3guJzguLTguJTguJ7guKXguLLguJTguYPguJnguIHguLLguKPguIvguLfguYnguK3guKrguLTguJnguITguYnguLJcIiwgXCJlcnJvclwiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUXVpY2tRdWFudGl0eUNoYW5nZSA9IGFzeW5jIChcbiAgICBpZDogc3RyaW5nLFxuICAgIGRlbHRhOiBudW1iZXIsXG4gICAgc2lsZW50OiBib29sZWFuID0gZmFsc2UsXG4gICkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YTogZGJJdGVtIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJpdGVtc1wiKVxuICAgICAgLnNlbGVjdChcInF1YW50aXR5XCIpXG4gICAgICAuZXEoXCJpZFwiLCBpZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoIWRiSXRlbSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV4dFF0eSA9IE1hdGgubWF4KDAsIGRiSXRlbS5xdWFudGl0eSArIGRlbHRhKTtcbiAgICBjb25zdCBub3dJc28gPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJpdGVtc1wiKVxuICAgICAgLnVwZGF0ZSh7IHF1YW50aXR5OiBuZXh0UXR5LCBjcmVhdGVkX2F0OiBub3dJc28gfSlcbiAgICAgIC5lcShcImlkXCIsIGlkKTtcbiAgICBpZiAoIWVycm9yKSB7XG4gICAgICBzZXRJdGVtcyhcbiAgICAgICAgaXRlbXMubWFwKChpdCkgPT5cbiAgICAgICAgICBpdC5pZCA9PT0gaWQgPyB7IC4uLml0LCBxdWFudGl0eTogbmV4dFF0eSwgdXBkYXRlZEF0OiBub3dJc28gfSA6IGl0LFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInN5bmMtdXBkYXRlXCIpKTtcblxuICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgc2hvd1RvYXN0KFwi4Lit4Lix4Lib4LmA4LiU4LiV4LiI4Liz4LiZ4Lin4LiZ4Liq4LiV4LmH4Lit4LiB4LmA4Lij4Li14Lii4Lia4Lij4LmJ4Lit4LiiIVwiLCBcInN1Y2Nlc3NcIik7XG4gICAgICAgIGlmIChuZXh0UXR5IDw9IDUgJiYgbmV4dFF0eSA8IGRiSXRlbS5xdWFudGl0eSkge1xuICAgICAgICAgIHBsYXlDaGltZShcIndhcm5pbmdcIik7XG4gICAgICAgIH0gZWxzZSBpZiAobmV4dFF0eSA+IGRiSXRlbS5xdWFudGl0eSkge1xuICAgICAgICAgIHBsYXlDaGltZShcInN1Y2Nlc3NcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGxheUNoaW1lKFwiaW5mb1wiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzaG93VG9hc3QoXCLguYDguIHguLTguJTguILguYnguK3guJzguLTguJTguJ7guKXguLLguJTguYPguJnguIHguLLguKPguK3guLHguJvguYDguJTguJXguIjguLPguJnguKfguJnguKrguJXguYfguK3guIFcIiwgXCJlcnJvclwiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlUGluID0gYXN5bmMgKGlkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBpdGVtcy5maW5kKChpdCkgPT4gaXQuaWQgPT09IGlkKTtcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuXG4gICAgY29uc3QgdXBkYXRlZDogU3RvY2tJdGVtID0ge1xuICAgICAgLi4udGFyZ2V0LFxuICAgICAgaXNQaW5uZWQ6ICF0YXJnZXQuaXNQaW5uZWQsXG4gICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICB9O1xuXG4gICAgY29uc3QgbmV3SXRlbXMgPSBpdGVtcy5tYXAoKGl0KSA9PiAoaXQuaWQgPT09IGlkID8gdXBkYXRlZCA6IGl0KSk7XG4gICAgc2V0SXRlbXMobmV3SXRlbXMpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVwZGF0ZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogdXBkYXRlZC5pZCxcbiAgICAgICAgICBuYW1lOiB1cGRhdGVkLm5hbWUsXG4gICAgICAgICAgZGVzY3JpcHRpb246IHVwZGF0ZWQuZGVzY3JpcHRpb24sXG4gICAgICAgICAgcHJpY2U6IHVwZGF0ZWQucHJpY2UsXG4gICAgICAgICAgcXVhbnRpdHk6IHVwZGF0ZWQucXVhbnRpdHksXG4gICAgICAgICAgaW1hZ2U6IHVwZGF0ZWQuaW1hZ2VVcmxzXG4gICAgICAgICAgICA/IEpTT04uc3RyaW5naWZ5KHVwZGF0ZWQuaW1hZ2VVcmxzKVxuICAgICAgICAgICAgOiB1cGRhdGVkLmltYWdlVXJsLFxuICAgICAgICAgIGdhbWU6IHVwZGF0ZWQuZ2FtZSxcbiAgICAgICAgICBjYXRlZ29yeTogdXBkYXRlZC5jYXRlZ29yeSxcbiAgICAgICAgICByYXJpdHk6IHVwZGF0ZWQuc2FsZUZvcm1hdCxcbiAgICAgICAgICBwb3B1bGFyOiB1cGRhdGVkLmlzUG9wdWxhcixcbiAgICAgICAgICBnYWNoYV9wb29sOiB7XG4gICAgICAgICAgICBwb29sOiB1cGRhdGVkLmdhY2hhUG9vbCB8fCBudWxsLFxuICAgICAgICAgICAgc2FsZUZvcm1hdDogdXBkYXRlZC5zYWxlRm9ybWF0LFxuICAgICAgICAgICAgaW5pdGlhbFF1YW50aXR5OiB1cGRhdGVkLmluaXRpYWxRdWFudGl0eSxcbiAgICAgICAgICAgIHBpZWNlc1BlclVuaXQ6IHVwZGF0ZWQucGllY2VzUGVyVW5pdCxcbiAgICAgICAgICAgIGFjY291bnRDcmVkZW50aWFsczogdXBkYXRlZC5hY2NvdW50Q3JlZGVudGlhbHMgfHwgbnVsbCxcbiAgICAgICAgICAgIGZpbGVMaW5rOiB1cGRhdGVkLmZpbGVMaW5rIHx8IG51bGwsXG4gICAgICAgICAgICBmaWxlUGFzc3dvcmQ6IHVwZGF0ZWQuZmlsZVBhc3N3b3JkIHx8IG51bGwsXG4gICAgICAgICAgICBpc1Bpbm5lZDogdXBkYXRlZC5pc1Bpbm5lZCB8fCBmYWxzZSxcbiAgICAgICAgICAgIG9yaWdpbmFsUHJpY2U6IHVwZGF0ZWQub3JpZ2luYWxQcmljZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNyZWF0ZWRfYXQ6IHVwZGF0ZWQudXBkYXRlZEF0IHx8IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwiaXRlbXNcIikudXBzZXJ0KHVwZGF0ZXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwaW5uaW5nIGl0ZW1cIiwgZSk7XG4gICAgfVxuXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwic3luYy11cGRhdGVcIikpO1xuXG4gICAgaWYgKHVwZGF0ZWQuaXNQaW5uZWQpIHtcbiAgICAgIHNob3dUb2FzdChg4Lib4Lix4LiB4Lir4Lih4Li44LiU4LmE4Lit4LmA4LiX4LihICR7dXBkYXRlZC5uYW1lfSDguYHguKXguYnguKchYCwgXCJzdWNjZXNzXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaG93VG9hc3QoYOC4ouC4geC5gOC4peC4tOC4geC4geC4suC4o+C4m+C4seC4geC4q+C4oeC4uOC4lOC5hOC4reC5gOC4l+C4oSAke3VwZGF0ZWQubmFtZX0g4LmB4Lil4LmJ4LinYCwgXCJpbmZvXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZXNldFByZXNldHMgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKFxuICAgICAgY29uZmlybShcbiAgICAgICAgYOC4hOC4uOC4k+C4leC5ieC4reC4h+C4geC4suC4o+C4o+C4teC5gOC4i+C5h+C4leC4quC4tOC4meC4hOC5ieC4suC5g+C4meC4quC4leC5iuC4reC4geC4geC4peC4seC4muC5hOC4m+C5gOC4m+C5h+C4meC4hOC5iOC4suC5gOC4o+C4tOC5iOC4oeC4leC5ieC4meC4iOC4suC4geC5gOC4geC4oSAke2FwcFNjcmVlbn0g4Lir4Lij4Li34Lit4LmE4Lih4LmIPyAo4LiC4LmJ4Lit4Lih4Li54Lil4LiX4Li14LmI4LmB4LiB4LmJ4LmE4LiC4LiI4Liw4Lir4Liy4Lii4LmE4LibKWAsXG4gICAgICApXG4gICAgKSB7XG4gICAgICBzYXZlSXRlbXNUb1N0b3JhZ2UoREVGQVVMVF9QUkVTRVRTKTtcbiAgICAgIHNob3dUb2FzdChcIuC4hOC4t+C4meC4hOC5iOC4suC4quC4leC5iuC4reC4hOC5gOC4o+C4tOC5iOC4oeC4leC5ieC4meC5g+C4meC4o+C4sOC4muC4muC5gOC4o+C4teC4ouC4muC4o+C5ieC4reC4oiFcIiwgXCJpbmZvXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbGVhclN0b2NrVG9aZXJvID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIGNvbmZpcm0oXG4gICAgICAgIFwi4pqg77iPIOC4hOC4uOC4k+C5geC4meC5iOC5g+C4iOC4q+C4o+C4t+C4reC5hOC4oeC5iOC4l+C4teC5iOC4iOC4sOC4o+C4teC5gOC4i+C5h+C4leC4l+C4uOC4geC5hOC4reC5gOC4l+C4oeC5g+C4meC4hOC4peC4seC4h+C4quC4tOC4meC4hOC5ieC4suC4m+C4seC4iOC4iOC4uOC4muC4seC4meC5g+C4q+C5ieC5gOC4q+C4peC4t+C4reC4iOC4s+C4meC4p+C4meC4quC4leC5iuC4reC4geC5gOC4m+C5h+C4mSAwIOC4iuC4tOC5ieC4mT8gKOC4guC5ieC4reC4oeC4ueC4peC4o+C4suC4hOC4suC5geC4peC4sOC5hOC4reC5gOC4l+C4oeC4iOC4sOC4reC4ouC4ueC5iOC4hOC4o+C4miDguYHguJXguYjguKrguJXguYrguK3guIHguIjguLDguIHguKXguLLguKLguYDguJvguYfguJkgMCDguJfguLHguYnguIfguKvguKHguJQpXCIsXG4gICAgICApXG4gICAgKSB7XG4gICAgICBjb25zdCB1cGRhdGVkTGlzdCA9IGl0ZW1zLm1hcCgoaXQpID0+ICh7XG4gICAgICAgIC4uLml0LFxuICAgICAgICBxdWFudGl0eTogMCxcbiAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICB9KSk7XG4gICAgICBzYXZlSXRlbXNUb1N0b3JhZ2UodXBkYXRlZExpc3QpO1xuICAgICAgc2hvd1RvYXN0KFxuICAgICAgICBcIuC5gOC4i+C5h+C4leC4iOC4s+C4meC4p+C4meC4quC4tOC4meC4hOC5ieC4suC5g+C4meC4quC4leC5iuC4reC4geC4l+C4seC5ieC4h+C4q+C4oeC4lOC5gOC4q+C4peC4t+C4rSAwIOC4iuC4tOC5ieC4mSDguYDguKPguLXguKLguJrguKPguYnguK3guKIhXCIsXG4gICAgICAgIFwic3VjY2Vzc1wiLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlQWxsUHJvZHVjdHMgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKFxuICAgICAgY29uZmlybShcbiAgICAgICAgXCLimqDvuI/imqDvuI/imqDvuI8g4LiE4Li44LiT4LmB4LiZ4LmI4LmD4LiI4Lir4Lij4Li34Lit4LmE4Lih4LmI4LiX4Li14LmI4LiI4Liw4Lil4Lia4Liq4Li04LiZ4LiE4LmJ4Liy4LiX4Lix4LmJ4LiH4Lir4Lih4LiU4Lit4Lit4LiB4LiI4Liy4LiB4Lij4Liw4Lia4Lia4Lij4LmJ4Liy4LiZ4LiE4LmJ4Liy4LmB4Lil4Liw4LiE4Lil4Liy4Lin4LiU4LmM4LmA4LiL4Li04Lij4LmM4Lif4LmA4Lin4Lit4Lij4LmMPyAo4LiC4LmJ4Lit4Lih4Li54Lil4Liq4Li04LiZ4LiE4LmJ4Liy4LiX4Lix4LmJ4LiH4Lir4Lih4LiU4LmB4Lil4Liw4Lij4Li54Lib4Lig4Liy4Lie4LiI4Liw4LiW4Li54LiB4Lil4LmJ4Liy4LiH4Lit4Lit4LiB4LmB4Lil4Liw4LmB4Liq4LiU4LiH4Lic4Lil4LmA4Lib4LmH4LiZ4Lir4LiZ4LmJ4Liy4Lin4LmI4Liy4LiH4LmA4Lib4Lil4LmI4LiyIOC4oeC4teC4quC4tOC4meC4hOC5ieC4siAwIOC4o+C4suC4ouC4geC4suC4oylcIixcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHNhdmVJdGVtc1RvU3RvcmFnZShbXSk7XG4gICAgICBzaG93VG9hc3QoXCLguKXguJrguILguYnguK3guKHguLnguKXguKrguLTguJnguITguYnguLLguJfguLHguYnguIfguKvguKHguJTguYDguKPguLXguKLguJrguKPguYnguK3guKLguYHguKXguYnguKchXCIsIFwiaW5mb1wiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0TGF0ZXN0VXBkYXRlZFJlbGF0aXZlVGltZSA9IChsaXN0OiBTdG9ja0l0ZW1bXSk6IHN0cmluZyA9PiB7XG4gICAgaWYgKCFsaXN0IHx8IGxpc3QubGVuZ3RoID09PSAwKSByZXR1cm4gXCLguYTguKHguYjguKHguLXguJrguLHguJnguJfguLbguIHguILguYnguK3guKHguLnguKVcIjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGltZXN0YW1wcyA9IGxpc3RcbiAgICAgICAgLm1hcCgoaXQpID0+IHBhcnNlVVRDRGF0ZShpdC51cGRhdGVkQXQpLmdldFRpbWUoKSlcbiAgICAgICAgLmZpbHRlcigodCkgPT4gIWlzTmFOKHQpKTtcbiAgICAgIGlmICh0aW1lc3RhbXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFwi4LmE4Lih4LmI4Lih4Li14Lia4Lix4LiZ4LiX4Li24LiB4LiC4LmJ4Lit4Lih4Li54LilXCI7XG4gICAgICBjb25zdCBsYXRlc3RUaW1lID0gTWF0aC5tYXgoLi4udGltZXN0YW1wcyk7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUobGF0ZXN0VGltZSk7XG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgZGlmZk1zID0gbm93LmdldFRpbWUoKSAtIGRhdGUuZ2V0VGltZSgpO1xuICAgICAgY29uc3QgZGlmZlNlYyA9IE1hdGguZmxvb3IoZGlmZk1zIC8gMTAwMCk7XG4gICAgICBjb25zdCBkaWZmTWluID0gTWF0aC5mbG9vcihkaWZmU2VjIC8gNjApO1xuICAgICAgY29uc3QgZGlmZkhyID0gTWF0aC5mbG9vcihkaWZmTWluIC8gNjApO1xuICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmZsb29yKGRpZmZIciAvIDI0KTtcblxuICAgICAgaWYgKGRpZmZTZWMgPCAxNSkgcmV0dXJuIFwi4LmA4Lih4Li34LmI4Lit4Liq4Lix4LiB4LiE4Lij4Li54LmI4LiZ4Li14LmJXCI7XG4gICAgICBpZiAoZGlmZlNlYyA8IDYwKSByZXR1cm4gXCLguYDguKHguLfguYjguK3guYTguKHguYjguIHguLXguYjguKfguLTguJnguLLguJfguLXguIHguYjguK3guJlcIjtcbiAgICAgIGlmIChkaWZmTWluIDwgNjApIHJldHVybiBgJHtkaWZmTWlufSDguJnguLLguJfguLXguJfguLXguYjguYHguKXguYnguKdgO1xuICAgICAgaWYgKGRpZmZIciA8IDI0KSByZXR1cm4gYCR7ZGlmZkhyfSDguIrguLHguYjguKfguYLguKHguIfguJfguLXguYjguYHguKXguYnguKdgO1xuICAgICAgaWYgKGRpZmZEYXlzID09PSAxKSByZXR1cm4gXCLguYDguKHguLfguYjguK3guKfguLLguJnguJnguLXguYlcIjtcbiAgICAgIGlmIChkaWZmRGF5cyA8IDcpIHJldHVybiBgJHtkaWZmRGF5c30g4Lin4Lix4LiZ4LiX4Li14LmI4LmB4Lil4LmJ4LinYDtcblxuICAgICAgcmV0dXJuIGZvcm1hdFRoYWlEYXRlKGRhdGUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBcIuC5hOC4oeC5iOC4o+C4sOC4muC4uOC5gOC4p+C4peC4slwiO1xuICAgIH1cbiAgfTtcblxuICAvLyBJbXBvcnQgLyBFeHBvcnQgZGF0YWJhc2UgZnVuY3Rpb25zXG4gIGNvbnN0IGhhbmRsZUV4cG9ydEpTT04gPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGFTdHIgPVxuICAgICAgICBcImRhdGE6dGV4dC9qc29uO2NoYXJzZXQ9dXRmLTgsXCIgK1xuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoaXRlbXMsIG51bGwsIDIpKTtcbiAgICAgIGNvbnN0IGRvd25sb2FkQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICBkb3dubG9hZEFuY2hvci5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGRhdGFTdHIpO1xuICAgICAgZG93bmxvYWRBbmNob3Iuc2V0QXR0cmlidXRlKFxuICAgICAgICBcImRvd25sb2FkXCIsXG4gICAgICAgIGBhb3RyX3N0b2NrX2V4cG9ydF8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF19Lmpzb25gLFxuICAgICAgKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG93bmxvYWRBbmNob3IpO1xuICAgICAgZG93bmxvYWRBbmNob3IuY2xpY2soKTtcbiAgICAgIGRvd25sb2FkQW5jaG9yLnJlbW92ZSgpO1xuICAgICAgc2hvd1RvYXN0KFwi4Liq4LmI4LiH4Lit4Lit4LiB4LmE4Lif4Lil4LmM4LiC4LmJ4Lit4Lih4Li54Lil4LmA4Lij4Li14Lii4Lia4Lij4LmJ4Lit4Lii4LmB4Lil4LmJ4LinXCIsIFwic3VjY2Vzc1wiKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBzaG93VG9hc3QoXCLguKrguYjguIfguK3guK3guIHguJzguLTguJTguJ7guKXguLLguJRcIiwgXCJlcnJvclwiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlSW1wb3J0SlNPTiA9IChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlcz8uWzBdO1xuICAgIGlmICghZmlsZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkID0gYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpbXBvcnRlZERhdGEgPSBKU09OLnBhcnNlKGV2ZW50LnRhcmdldD8ucmVzdWx0IGFzIHN0cmluZyk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGltcG9ydGVkRGF0YSkpIHtcbiAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gaW1wb3J0ZWREYXRhLmV2ZXJ5KFxuICAgICAgICAgICAgKGl0KSA9PiBpdC5pZCAmJiBpdC5uYW1lICYmIHR5cGVvZiBpdC5wcmljZSA9PT0gXCJudW1iZXJcIixcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICBzYXZlSXRlbXNUb1N0b3JhZ2UoaW1wb3J0ZWREYXRhIGFzIFN0b2NrSXRlbVtdKTtcbiAgICAgICAgICAgIHNob3dUb2FzdChcIuC4meC4s+C5gOC4guC5ieC4suC4hOC4peC4seC4h+C4quC4leC5iuC4reC4geC4quC4s+C5gOC4o+C5h+C4iOC5geC4peC4sOC4reC4seC4m+C5gOC4lOC4leC4o+C4sOC4muC4muC5geC4peC5ieC4pyFcIiwgXCJzdWNjZXNzXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoXCLguJ/guK3guKPguYzguYHguKHguJXguILguYnguK3guKHguLnguKXguYPguJnguYTguJ/guKXguYwgSlNPTiDguYTguKHguYjguJbguLnguIHguJXguYnguK3guIdcIiwgXCJlcnJvclwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBzaG93VG9hc3QoXCLguK3guYjguLLguJnguYTguJ/guKXguYwgSlNPTiDguKXguYnguKHguYDguKvguKXguKdcIiwgXCJlcnJvclwiKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuICB9O1xuXG4gIC8vIC0tLSBGaWx0ZXJpbmcgJiBTb3J0aW5nIENvbXB1dGUgLS0tXG4gIGNvbnN0IGZpbHRlcmVkSXRlbXMgPSBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICBjb25zdCBzZWFyY2hTdHIgPSAoc2VhcmNoIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgIGNvbnN0IG1hdGNoZXNTZWFyY2ggPVxuICAgICAgIXNlYXJjaFN0ciB8fFxuICAgICAgKGl0ZW0ubmFtZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFN0cikgfHxcbiAgICAgIChpdGVtLmNhdGVnb3J5IHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoU3RyKSB8fFxuICAgICAgKGl0ZW0uZGVzY3JpcHRpb24gfHwgXCJcIikudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hTdHIpO1xuXG4gICAgY29uc3QgbWF0Y2hlc0NhdGVnb3J5ID1cbiAgICAgIHNlbGVjdGVkQ2F0ZWdvcnkgPT09IFwiYWxsXCIgfHwgaXRlbS5jYXRlZ29yeSA9PT0gc2VsZWN0ZWRDYXRlZ29yeTtcbiAgICBjb25zdCBtYXRjaGVzU2FsZUZvcm1hdCA9XG4gICAgICBzZWxlY3RlZFNhbGVGb3JtYXQgPT09IFwiYWxsXCIgfHwgaXRlbS5zYWxlRm9ybWF0ID09PSBzZWxlY3RlZFNhbGVGb3JtYXQ7XG5cbiAgICBsZXQgbWF0Y2hlc1N0YXR1cyA9IHRydWU7XG4gICAgaWYgKHNlbGVjdGVkU3RhdHVzID09PSBcImluLXN0b2NrXCIpIHtcbiAgICAgIG1hdGNoZXNTdGF0dXMgPSBpdGVtLnF1YW50aXR5ID4gNTtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGVkU3RhdHVzID09PSBcImxvdy1zdG9ja1wiKSB7XG4gICAgICBtYXRjaGVzU3RhdHVzID0gaXRlbS5xdWFudGl0eSA+IDAgJiYgaXRlbS5xdWFudGl0eSA8PSA1O1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRTdGF0dXMgPT09IFwib3V0LW9mLXN0b2NrXCIpIHtcbiAgICAgIG1hdGNoZXNTdGF0dXMgPSBpdGVtLnF1YW50aXR5ID09PSAwO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoZXNQb3B1bGFyID0gIXNob3dQb3B1bGFyT25seSB8fCAhIWl0ZW0uaXNQb3B1bGFyO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIG1hdGNoZXNTZWFyY2ggJiZcbiAgICAgIG1hdGNoZXNDYXRlZ29yeSAmJlxuICAgICAgbWF0Y2hlc1NhbGVGb3JtYXQgJiZcbiAgICAgIG1hdGNoZXNTdGF0dXMgJiZcbiAgICAgIG1hdGNoZXNQb3B1bGFyXG4gICAgKTtcbiAgfSk7XG5cbiAgLy8gT3ZlcmxvYWQgbGF0ZXN0IHN0b2NrIGZyb20gTGl2ZUFjdGl2aXRpZXMgKFBsYW4gMikgdG8gcHJldmVudCBvdXQtb2Ytc3luYyBVSVxuICBjb25zdCBnZXRQYXRjaGVkU3RvY2tJdGVtcyA9ICgpID0+IHtcbiAgICBjb25zdCBsaXZlQWN0aXZpdGllc1N0ciA9XG4gICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIktVV0FTSElJX0xJVkVfQUNUSVZJVFlcIikgfHwgXCJbXVwiO1xuICAgIGNvbnN0IGxhdGVzdFN0b2NrTWFwOiBSZWNvcmQ8c3RyaW5nLCB7IHF0eTogbnVtYmVyOyB0czogbnVtYmVyIH0+ID0ge307XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGxpdmVBY3Rpdml0aWVzID0gSlNPTi5wYXJzZShsaXZlQWN0aXZpdGllc1N0cik7XG4gICAgICBsaXZlQWN0aXZpdGllcy5mb3JFYWNoKChhOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGEudHlwZSA9PT0gXCJwdXJjaGFzZVwiICYmXG4gICAgICAgICAgYS5pdGVtTmFtZSAmJlxuICAgICAgICAgIGEucmVtYWluaW5nU3RvY2sgIT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBhVGltZSA9IG5ldyBEYXRlKGEudGltZXN0YW1wKS5nZXRUaW1lKCk7XG4gICAgICAgICAgLy8gS2VlcCB0aGUgYWJzb2x1dGVseSBtb3N0IHJlY2VudCBwdXJjaGFzZSBhY3Rpdml0eSBmb3IgdGhpcyBpdGVtXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgbGF0ZXN0U3RvY2tNYXBbYS5pdGVtTmFtZV0gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgYVRpbWUgPiBsYXRlc3RTdG9ja01hcFthLml0ZW1OYW1lXS50c1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgbGF0ZXN0U3RvY2tNYXBbYS5pdGVtTmFtZV0gPSB7IHF0eTogYS5yZW1haW5pbmdTdG9jaywgdHM6IGFUaW1lIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgcmV0dXJuIGZpbHRlcmVkSXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBwYXRjaCA9IGxhdGVzdFN0b2NrTWFwW2l0ZW0ubmFtZV07XG4gICAgICBpZiAocGF0Y2gpIHtcbiAgICAgICAgY29uc3QgaXRlbVVwZGF0ZVRzID0gaXRlbS51cGRhdGVkQXRcbiAgICAgICAgICA/IG5ldyBEYXRlKGl0ZW0udXBkYXRlZEF0KS5nZXRUaW1lKClcbiAgICAgICAgICA6IDA7XG4gICAgICAgIC8vIElmIHRoZSBwdXJjaGFzZSBoYXBwZW5lZCBBRlRFUiB0aGUgbGFzdCB0aW1lIHRoZSBhZG1pbiBlZGl0ZWQgdGhlIGl0ZW0sIHVzZSB0aGUgcGF0Y2hlZCBzdG9ja1xuICAgICAgICBpZiAocGF0Y2gudHMgPiBpdGVtVXBkYXRlVHMgJiYgcGF0Y2gucXR5IDwgaXRlbS5xdWFudGl0eSkge1xuICAgICAgICAgIHJldHVybiB7IC4uLml0ZW0sIHF1YW50aXR5OiBwYXRjaC5xdHkgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcGF0Y2hlZEl0ZW1zID0gZ2V0UGF0Y2hlZFN0b2NrSXRlbXMoKTtcblxuICBjb25zdCBzb3J0ZWRJdGVtcyA9IFsuLi5wYXRjaGVkSXRlbXNdLnNvcnQoKGEsIGIpID0+IHtcbiAgICAvLyAxLiBTdG9jayBTdGF0dXMgUHJpb3JpdGl6YXRpb246IEluLXN0b2NrIGl0ZW1zIChxdWFudGl0eSA+IDApIGdvIHVwLCBPdXQtb2Ytc3RvY2sgaXRlbXMgKHF1YW50aXR5ID09PSAwKSBnbyBkb3duXG4gICAgY29uc3QgYUhhc1N0b2NrID0gYS5xdWFudGl0eSA+IDAgPyAxIDogMDtcbiAgICBjb25zdCBiSGFzU3RvY2sgPSBiLnF1YW50aXR5ID4gMCA/IDEgOiAwO1xuICAgIGlmIChhSGFzU3RvY2sgIT09IGJIYXNTdG9jaykge1xuICAgICAgcmV0dXJuIGJIYXNTdG9jayAtIGFIYXNTdG9jazsgLy8gMSBjb21lcyBiZWZvcmUgMCAoaW4tc3RvY2sgZmlyc3QpXG4gICAgfVxuXG4gICAgLy8gMi4gUGluIFN0YXR1czogUGlubmVkIGl0ZW1zIChpc1Bpbm5lZCA9PT0gdHJ1ZSkgZ28gdXAsIFVucGlubmVkIGl0ZW1zIGdvIGRvd25cbiAgICBjb25zdCBhUGlubmVkID0gYS5pc1Bpbm5lZCA/IDEgOiAwO1xuICAgIGNvbnN0IGJQaW5uZWQgPSBiLmlzUGlubmVkID8gMSA6IDA7XG4gICAgaWYgKGFQaW5uZWQgIT09IGJQaW5uZWQpIHtcbiAgICAgIHJldHVybiBiUGlubmVkIC0gYVBpbm5lZDsgLy8gMSBjb21lcyBiZWZvcmUgMCAocGlubmVkIGZpcnN0KVxuICAgIH1cblxuICAgIC8vIDIuNSBDYXRlZ29yeSBHcm91cGluZzogV2hlbiB2aWV3aW5nICdBbGwnIGNhdGVnb3JpZXMsIGdyb3VwIGl0ZW1zIG9mIHRoZSBzYW1lIGNhdGVnb3J5IHRvZ2V0aGVyXG4gICAgaWYgKHNlbGVjdGVkQ2F0ZWdvcnkgPT09IFwiYWxsXCIpIHtcbiAgICAgIGNvbnN0IGNhdGVnb3J5T3JkZXIgPSB0cnVlXG4gICAgICAgID8gW1xuICAgICAgICAgICAgXCJHcm93IEEgR2FyZGVuIDJcIixcbiAgICAgICAgICAgIFwiQUxMIFNUQVJcIixcbiAgICAgICAgICAgIFwiQ29taW5nIFNvb25cIixcbiAgICAgICAgICAgIFwiT3RoZXIgc2VydmljZXNcIixcbiAgICAgICAgICAgIFwiVklQIENvZGVzXCIsXG4gICAgICAgICAgXVxuICAgICAgICA6IGZhbHNlXG4gICAgICAgICAgPyBbXCLguKPguKvguLHguKogUk9WXCJdXG4gICAgICAgICAgOiBbXG4gICAgICAgICAgICAgIFwiU2VydW1cIixcbiAgICAgICAgICAgICAgXCJCbG9vZGxpbmVcIixcbiAgICAgICAgICAgICAgXCJTa2luXCIsXG4gICAgICAgICAgICAgIFwiQXJ0aWZhY3RcIixcbiAgICAgICAgICAgICAgXCJTY3JvbGwvS2V5XCIsXG4gICAgICAgICAgICAgIFwiUGVya1wiLFxuICAgICAgICAgICAgICBcIk90aGVyXCIsXG4gICAgICAgICAgICBdO1xuICAgICAgY29uc3QgaW5kZXhBID0gY2F0ZWdvcnlPcmRlci5pbmRleE9mKGEuY2F0ZWdvcnkpO1xuICAgICAgY29uc3QgaW5kZXhCID0gY2F0ZWdvcnlPcmRlci5pbmRleE9mKGIuY2F0ZWdvcnkpO1xuICAgICAgaWYgKGluZGV4QSAhPT0gLTEgJiYgaW5kZXhCICE9PSAtMSAmJiBpbmRleEEgIT09IGluZGV4Qikge1xuICAgICAgICByZXR1cm4gaW5kZXhBIC0gaW5kZXhCOyAvLyBLZWVwcyBjYXRlZ29yeSBvcmRlciB1bmlmaWVkXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMy4gVXNlciBzdWItc29ydCBjcml0ZXJpYVxuICAgIHN3aXRjaCAoc29ydEJ5KSB7XG4gICAgICBjYXNlIFwibmFtZS1hc2NcIjpcbiAgICAgICAgcmV0dXJuIGEubmFtZS5sb2NhbGVDb21wYXJlKGIubmFtZSk7XG4gICAgICBjYXNlIFwibmFtZS1kZXNjXCI6XG4gICAgICAgIHJldHVybiBiLm5hbWUubG9jYWxlQ29tcGFyZShhLm5hbWUpO1xuICAgICAgY2FzZSBcInByaWNlLWFzY1wiOlxuICAgICAgICByZXR1cm4gYS5wcmljZSAtIGIucHJpY2U7XG4gICAgICBjYXNlIFwicHJpY2UtZGVzY1wiOlxuICAgICAgICByZXR1cm4gYi5wcmljZSAtIGEucHJpY2U7XG4gICAgICBjYXNlIFwic3RvY2stZGVzY1wiOlxuICAgICAgICByZXR1cm4gYi5xdWFudGl0eSAtIGEucXVhbnRpdHk7XG4gICAgICBjYXNlIFwic3RvY2stYXNjXCI6XG4gICAgICAgIHJldHVybiBhLnF1YW50aXR5IC0gYi5xdWFudGl0eTtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgdGltZUIgPSBiLnVwZGF0ZWRBdCA/IG5ldyBEYXRlKGIudXBkYXRlZEF0KS5nZXRUaW1lKCkgOiAwO1xuICAgICAgICBjb25zdCB0aW1lQSA9IGEudXBkYXRlZEF0ID8gbmV3IERhdGUoYS51cGRhdGVkQXQpLmdldFRpbWUoKSA6IDA7XG4gICAgICAgIGNvbnN0IGZhbGxiYWNrQiA9IGlzTmFOKHRpbWVCKSA/IDAgOiB0aW1lQjtcbiAgICAgICAgY29uc3QgZmFsbGJhY2tBID0gaXNOYU4odGltZUEpID8gMCA6IHRpbWVBO1xuICAgICAgICByZXR1cm4gZmFsbGJhY2tCIC0gZmFsbGJhY2tBO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcmVuZGVyTW9kYWxzID0gKCkgPT4gKFxuICAgIDw+XG4gICAgICB7LyogUHJvY2Vzc2luZyBQdXJjaGFzZSAvIFRvcHVwIE92ZXJsYXkgKi99XG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICB7KGlzUHJvY2Vzc2luZ1B1cmNoYXNlIHx8IGlzUHJvY2Vzc2luZ1RvcHVwKSAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotWzIwMF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX1cbiAgICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctemluYy05MDAgXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjksIHk6IDEwIH19XG4gICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgc2NhbGU6IDEsIHk6IDAgfX1cbiAgICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMC45LCB5OiAxMCB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBiZy1bIzA1MDUwNV0vOTUgYmFja2Ryb3AtYmx1ci14bCBwLTggcm91bmRlZC1bMnJlbV0gYm9yZGVyIGJvcmRlci13aGl0ZS81IHNoYWRvdy1bMF8wXzUwcHhfLTEycHhfcmdiYSgwLDAsMCwwLjgpXSBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBvdmVyZmxvdy1oaWRkZW4gbWluLXctWzMyMHB4XVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHsvKiBEZWNvcmF0aXZlIEJhY2tncm91bmQgR3JhZGllbnRzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgdy0zMiBoLTMyIGJnLWVtZXJhbGQtNTAwLzEwIGJsdXItWzUwcHhdIHBvaW50ZXItZXZlbnRzLW5vbmUgcm91bmRlZC1mdWxsXCIgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMCBsZWZ0LTAgdy0zMiBoLTMyIGJnLVsjMGVhNWU5XS8xMCBibHVyLVs1MHB4XSBwb2ludGVyLWV2ZW50cy1ub25lIHJvdW5kZWQtZnVsbFwiIC8+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtYi02IHctMjAgaC0yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYm9yZGVyLTQgYm9yZGVyLWVtZXJhbGQtNTAwLzIwIHJvdW5kZWQtZnVsbFwiIC8+XG4gICAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYm9yZGVyLTQgYm9yZGVyLWVtZXJhbGQtNDAwIGJvcmRlci10LXRyYW5zcGFyZW50IHJvdW5kZWQtZnVsbFwiXG4gICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHJvdGF0ZTogMzYwIH19XG4gICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxLjIsXG4gICAgICAgICAgICAgICAgICAgIHJlcGVhdDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IFwibGluZWFyXCIsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMC8xMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctWzBfMF8xNXB4X3JnYmEoMTYsMTg1LDEyOSwwLjMpXVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSBiZy1lbWVyYWxkLTQwMCByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgbWItMiBmb250LWRpc3BsYXlcIj5cbiAgICAgICAgICAgICAgICDguKPguLDguJrguJrguIHguLPguKXguLHguIfguJfguLPguKPguLLguKLguIHguLLguKMuLi5cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC16aW5jLTUwMCBmb250LW1vbm8gdHJhY2tpbmctWzAuMmVtXSBmb250LW1lZGl1bSB1cHBlcmNhc2UgbXQtMVwiPlxuICAgICAgICAgICAgICAgIFBsZWFzZSB3YWl0IOKAoiBEbyBub3QgY2xvc2VcbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG5cbiAgICAgIHsvKiBHYWNoYSBSZXN1bHQgTW9kYWwgKi99XG4gICAgICA8R2FjaGFSZXN1bHRNb2RhbFxuICAgICAgICBpc09wZW49eyEhZ2FjaGFSZXN1bHR9XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICBzZXRHYWNoYVJlc3VsdChudWxsKTtcbiAgICAgICAgICBzZXRTaG93SGlzdG9yeU1vZGFsKHRydWUpO1xuICAgICAgICB9fVxuICAgICAgICByZXN1bHQ9e2dhY2hhUmVzdWx0fVxuICAgICAgLz5cblxuICAgICAgey8qIEFkbWluIG1vZGFsIGZvciBBZGRpbmcvRWRpdGluZyBzdG9jayBpdGVtcyAqL31cbiAgICAgIDxBZG1pbk1vZGFsXG4gICAgICAgIGlzT3Blbj17aXNGb3JtT3Blbn1cbiAgICAgICAgZ2xvYmFsU3RhdHM9e2dsb2JhbFN0YXRzfVxuICAgICAgICBvbkNsb3NlPXsoKSA9PiB7XG4gICAgICAgICAgc2V0SXNGb3JtT3BlbihmYWxzZSk7XG4gICAgICAgICAgc2V0RWRpdGluZ0l0ZW0obnVsbCk7XG4gICAgICAgIH19XG4gICAgICAgIG9uU2F2ZT17aGFuZGxlU2F2ZUl0ZW19XG4gICAgICAgIGVkaXRpbmdJdGVtPXtlZGl0aW5nSXRlbX1cbiAgICAgICAgY3VycmVudEdhbWU9e2FwcFNjcmVlbiBhcyBhbnl9XG4gICAgICAvPlxuXG4gICAgICA8U3RvY2tNYW5hZ2VyTW9kYWxcbiAgICAgICAgaXNPcGVuPXtpc1N0b2NrTWFuYWdlck9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzU3RvY2tNYW5hZ2VyT3BlbihmYWxzZSl9XG4gICAgICAgIGl0ZW1zPXtpdGVtcy5maWx0ZXIoKGl0KSA9PiBpdC5nYW1lID09PSBhcHBTY3JlZW4pfVxuICAgICAgICBvbkVkaXQ9eyhpdGVtKSA9PiB7XG4gICAgICAgICAgc2V0RWRpdGluZ0l0ZW0oaXRlbSk7XG4gICAgICAgICAgc2V0SXNGb3JtT3Blbih0cnVlKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25EZWxldGU9e2hhbmRsZURlbGV0ZUl0ZW19XG4gICAgICAgIG9uQWRkTmV3PXsoKSA9PiB7XG4gICAgICAgICAgc2V0RWRpdGluZ0l0ZW0obnVsbCk7XG4gICAgICAgICAgc2V0SXNGb3JtT3Blbih0cnVlKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIDxDdXN0b21lckRhdGFiYXNlTW9kYWxcbiAgICAgICAgaXNPcGVuPXtpc0N1c3RvbWVyRGJPcGVufVxuICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRJc0N1c3RvbWVyRGJPcGVuKGZhbHNlKX1cbiAgICAgICAgYXBwU2NyZWVuPXthcHBTY3JlZW59XG4gICAgICAgIG9uVmlld1VzZXJIaXN0b3J5PXsodXNlcm5hbWUpID0+IHtcbiAgICAgICAgICBzZXRWaWV3aW5nVXNlckhpc3RvcnkodXNlcm5hbWUpO1xuICAgICAgICB9fVxuICAgICAgLz5cblxuICAgICAgPENvdXBvbk1hbmFnZXJNb2RhbFxuICAgICAgICBpc09wZW49e2lzQ291cG9uTWFuYWdlck9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzQ291cG9uTWFuYWdlck9wZW4oZmFsc2UpfVxuICAgICAgLz5cblxuICAgICAgPEFubm91bmNlbWVudE1hbmFnZXJNb2RhbFxuICAgICAgICBpc09wZW49e2lzQW5ub3VuY2VtZW50TWFuYWdlck9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzQW5ub3VuY2VtZW50TWFuYWdlck9wZW4oZmFsc2UpfVxuICAgICAgLz5cblxuICAgICAgPEltYWdlU2V0dGluZ3NNb2RhbFxuICAgICAgICBpc09wZW49e2lzSW1hZ2VTZXR0aW5nc09wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzSW1hZ2VTZXR0aW5nc09wZW4oZmFsc2UpfVxuICAgICAgLz5cblxuICAgICAgeyhjdXJyZW50VXNlciB8fCB2aWV3aW5nVXNlckhpc3RvcnkpICYmIChcbiAgICAgICAgPEhpc3RvcnlNb2RhbFxuICAgICAgICAgIGlzT3Blbj17c2hvd0hpc3RvcnlNb2RhbCB8fCAhIXZpZXdpbmdVc2VySGlzdG9yeX1cbiAgICAgICAgICBpbml0aWFsVGFiPXtoaXN0b3J5VGFifVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgIHNldFNob3dIaXN0b3J5TW9kYWwoZmFsc2UpO1xuICAgICAgICAgICAgc2V0Vmlld2luZ1VzZXJIaXN0b3J5KG51bGwpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdXNlcm5hbWU9e3ZpZXdpbmdVc2VySGlzdG9yeSB8fCBjdXJyZW50VXNlcj8udXNlcm5hbWUgfHwgXCJcIn1cbiAgICAgICAgICBpdGVtcz17aXRlbXN9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICA8VG9wdXBUb3NNb2RhbFxuICAgICAgICBpc09wZW49e3Nob3dUb3B1cFRvc31cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2hvd1RvcHVwVG9zKGZhbHNlKX1cbiAgICAgIC8+XG5cbiAgICAgIHtzaG93VXBkYXRlT3ZlcmxheSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LVs5OTk5OV0gYmctemluYy05NTAvOTAgYmFja2Ryb3AtYmx1ci1tZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzMwIHAtOCByb3VuZGVkLTJ4bCBtYXgtdy1zbSB3LWZ1bGwgdGV4dC1jZW50ZXIgc2hhZG93LTJ4bFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgYmctYW1iZXItNTAwLzIwIHRleHQtYW1iZXItNDAwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBteC1hdXRvIG1iLTRcIj5cbiAgICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9XCJ3LTggaC04IGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTJcIj7guKHguLXguK3guLHguJ7guYDguJTguJfguYDguKfguK3guKPguYzguIrguLHguYjguJnguYPguKvguKHguYg8L2gyPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXppbmMtNDAwIG1iLTZcIj7guIHguKPguLjguJPguLLguKPguLXguYDguJ/guKPguIrguYDguKfguYfguJrguYTguIvguJXguYzguYDguJ7guLfguYjguK3guYPguKvguYnguKPguLDguJrguJrguK3guLHguJ7guYDguJTguJfguYDguJvguYfguJnguYDguKfguK3guKPguYzguIrguLHguYjguJnguKXguYjguLLguKrguLjguJTguIHguYjguK3guJnguYDguILguYnguLLguYPguIrguYnguIfguLLguJk8L3A+XG4gICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1hbWJlci01MDAgaG92ZXI6YmctYW1iZXItNDAwIHRleHQtYmxhY2sgZm9udC1ib2xkIHB5LTMgcm91bmRlZC14bCB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBnYXAtMlwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IOC4reC4seC4nuC5gOC4lOC4l+C4o+C4sOC4muC4miAvIOC4o+C4teC5gOC4n+C4o+C4ilxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgPFBheW1lbnRTZXR0aW5nc01vZGFsXG4gICAgICAgIGlzT3Blbj17aXNQYXltZW50Q29uZmlnT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNQYXltZW50Q29uZmlnT3BlbihmYWxzZSl9XG4gICAgICAgIGdsb2JhbFN0YXRzPXtnbG9iYWxTdGF0c31cbiAgICAgICAgc2V0R2xvYmFsU3RhdHM9e3NldEdsb2JhbFN0YXRzfVxuICAgICAgLz5cbiAgICAgIDxBcGlTdGF0dXNNb2RhbFxuICAgICAgICBpc09wZW49e2lzQXBpU3RhdHVzT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNBcGlTdGF0dXNPcGVuKGZhbHNlKX1cbiAgICAgIC8+XG5cbiAgICAgIDxDYXRlZ29yeU1hbmFnZXJNb2RhbFxuICAgICAgICBpc09wZW49e2lzQ2F0ZWdvcnlNYW5hZ2VyT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNDYXRlZ29yeU1hbmFnZXJPcGVuKGZhbHNlKX1cbiAgICAgICAgZ2xvYmFsU3RhdHM9e2dsb2JhbFN0YXRzfVxuICAgICAgICBzZXRHbG9iYWxTdGF0cz17c2V0R2xvYmFsU3RhdHN9XG4gICAgICAvPlxuICAgIDwvPlxuICApO1xuXG4gIC8vIENhbGN1bGF0ZSBoaWdoLWxldmVsIHN0YXRzIGJhc2VkIG9uIGN1cnJlbnQgZ2FtZSBjb250ZXh0XG4gIGNvbnN0IGN1cnJlbnRDb250ZXh0SXRlbXMgPSBpdGVtcy5maWx0ZXIoKGl0KSA9PiBpdC5nYW1lID09PSBhcHBTY3JlZW4pO1xuXG4gIGNvbnN0IHRvdGFsU3RvY2tJdGVtcyA9IGN1cnJlbnRDb250ZXh0SXRlbXMubGVuZ3RoO1xuICBjb25zdCBpblN0b2NrQ291bnQgPSBjdXJyZW50Q29udGV4dEl0ZW1zLmZpbHRlcihcbiAgICAoaXQpID0+IGl0LnF1YW50aXR5ID4gMCxcbiAgKS5sZW5ndGg7XG4gIGNvbnN0IHRvdGFsU3RvY2tVbml0cyA9IGN1cnJlbnRDb250ZXh0SXRlbXMucmVkdWNlKFxuICAgIChhY2MsIGN1cnIpID0+IGFjYyArIGN1cnIucXVhbnRpdHksXG4gICAgMCxcbiAgKTtcbiAgY29uc3QgdG90YWxTdG9ja1ZhbHVlID0gY3VycmVudENvbnRleHRJdGVtcy5yZWR1Y2UoXG4gICAgKGFjYywgY3VycikgPT4gYWNjICsgY3Vyci5wcmljZSAqIGN1cnIucXVhbnRpdHksXG4gICAgMCxcbiAgKTtcblxuICBjb25zdCByZW5kZXJBcHBTY3JlZW4gPSAoKSA9PiB7XG4gICAgaWYgKFxuICAgICAgaXNNYWludGVuYW5jZU1vZGUgJiZcbiAgICAgICFpc0FkbWluICYmXG4gICAgICBhcHBTY3JlZW4gIT09IFwiTE9BRElOR1wiICYmXG4gICAgICBhcHBTY3JlZW4gIT09IFwiVFJBTlNJVElPTlwiICYmXG4gICAgICBhcHBTY3JlZW4gIT09IFwiTE9HSU5cIiAmJlxuICAgICAgYXBwU2NyZWVuICE9PSBcIlJFR0lTVEVSXCJcbiAgICApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAga2V5PVwibWFpbnRlbmFuY2VcIlxuICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSB9fVxuICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuMyB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei1bOTk5OTldIGJnLXppbmMtOTAwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNiB0ZXh0LWNlbnRlciBzZWxlY3Qtbm9uZSB0ZXh0LXppbmMtMTAwIGZvbnQtZGlzcGxheSB0cmFja2luZy10aWdodFwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LW1kIHctZnVsbCBiZy16aW5jLTkwMCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci16aW5jLTgwMCBwLTggcm91bmRlZC0zeGwgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvMzAgc2hhZG93LTJ4bCAgcmVsYXRpdmVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0yMCBoLTIwIG14LWF1dG8gYmctYW1iZXItNTAwLzIwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi02IGFuaW1hdGUtcHVsc2VcIj5cbiAgICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAgaC0xMCB0ZXh0LWFtYmVyLTUwMFwiXG4gICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezJ9XG4gICAgICAgICAgICAgICAgICBkPVwiTTEyIDl2Mm0wIDRoLjAxbS02LjkzOCA0aDEzLjg1NmMxLjU0IDAgMi41MDItMS42NjcgMS43MzItM0wxMy43MzIgNGMtLjc3LTEuMzMzLTIuNjk0LTEuMzMzLTMuNDY0IDBMMy4zNCAxNmMtLjc3IDEuMzMzLjE5MiAzIDEuNzMyIDN6XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtZGlzcGxheSBmb250LW1lZGl1bSB0cmFja2luZy10aWdodGVyIGdsb3dpbmctdGV4dCBtYi0zXCI+XG4gICAgICAgICAgICAgIOC4o+C4sOC4muC4muC4reC4ouC4ueC5iOC4o+C4sOC4q+C4p+C5iOC4suC4h+C4geC4suC4o+C4m+C4o+C4seC4muC4m+C4o+C4uOC4hyDwn5ug77iPXG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC16aW5jLTUwMCB0ZXh0LXNtIGxlYWRpbmctcmVsYXhlZCBtYi02XCI+XG4gICAgICAgICAgICAgIOC4guC4k+C4sOC4meC4teC5ieC5gOC4p+C5h+C4muC5hOC4i+C4leC5jOC4geC4s+C4peC4seC4h+C4reC4ouC4ueC5iOC5g+C4meC4iuC5iOC4p+C4h+C4m+C4o+C4seC4muC4m+C4o+C4uOC4h+C4o+C4sOC4muC4muC4iuC4seC5iOC4p+C4hOC4o+C4suC4p1xuICAgICAgICAgICAgICDguIHguKPguLjguJPguLLguK3guJTguJfguJnguKPguK3guYHguKXguLDguKPguLDguJrguJrguIjguLDguYDguJvguLTguJTguYPguKvguYnguYPguIrguYnguIfguLLguJnguK3guLXguIHguITguKPguLHguYnguIfguYLguJTguKLguK3guLHguJXguYLguJnguKHguLHguJXguLTguYDguKHguLfguYjguK3guYDguKrguKPguYfguIjguKrguLTguYnguJkhXG4gICAgICAgICAgICAgIOC4guC4reC4reC4oOC4seC4ouC5g+C4meC4hOC4p+C4suC4oeC5hOC4oeC5iOC4quC4sOC4lOC4p+C4geC4hOC4o+C4seC4mlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0QXV0aE1vZGUoXCJsb2dpblwiKTtcbiAgICAgICAgICAgICAgICBzZXRBcHBTY3JlZW4oXCJMT0dJTlwiKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtNCBweC00IHB5LTIgdGV4dC14cyBmb250LWJvbGQgYmctemluYy04MDAgdGV4dC16aW5jLTQwMCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItemluYy03MDAgaG92ZXI6dGV4dC13aGl0ZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIOC4quC4s+C4q+C4o+C4seC4muC5geC4reC4lOC4oeC4tOC4mVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgc3BhY2UteC0yIHBiLTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTIgaC0yIGJnLWFtYmVyLTUwMCByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1ib3VuY2VcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMiBoLTIgYmctYW1iZXItNTAwIHJvdW5kZWQtZnVsbCBhbmltYXRlLWJvdW5jZVwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgYW5pbWF0aW9uRGVsYXk6IFwiMC4yc1wiIH19XG4gICAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMiBoLTIgYmctYW1iZXItNTAwIHJvdW5kZWQtZnVsbCBhbmltYXRlLWJvdW5jZVwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgYW5pbWF0aW9uRGVsYXk6IFwiMC40c1wiIH19XG4gICAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPG1vdGlvbi5idXR0b25cbiAgICAgICAgICAgICAgd2hpbGVUYXA9e3sgc2NhbGU6IDAuOTUgfX1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldEFwcFNjcmVlbihcIkxPR0lOXCIpO1xuICAgICAgICAgICAgICAgIHNldEF1dGhNb2RlKFwibG9naW5cIik7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTYgdGV4dC1bMTJweF0gZm9udC1ib2xkIHRleHQtemluYy02MDAgaG92ZXI6dGV4dC16aW5jLTMwMCB0cmFuc2l0aW9uLWNvbG9ycyBiZy16aW5jLTgwMC81MCBob3ZlcjpiZy16aW5jLTgwMCBweC00IHB5LTIgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXppbmMtNzAwLzUwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMTRcIlxuICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTRcIlxuICAgICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIyXCJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjE4XCIgaGVpZ2h0PVwiMTFcIiB4PVwiM1wiIHk9XCIxMVwiIHJ4PVwiMlwiIHJ5PVwiMlwiIC8+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTcgMTFWN2E1IDUgMCAwIDEgMTAgMHY0XCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICDguYDguILguYnguLLguKrguLnguYjguKPguLDguJrguJrguJzguLnguYnguJTguLnguYHguKXguKPguLDguJrguJpcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9tb3Rpb24uYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtyZW5kZXJNb2RhbHMoKX1cbiAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoW1wiU0hPUFwiLCBcIlRPUFVQXCIsIFwiR0FNRVRPUFVQXCIsIFwiTE9HSU5cIiwgXCJQUk9GSUxFXCJdLmluY2x1ZGVzKGFwcFNjcmVlbikpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAga2V5PXthcHBTY3JlZW59XG4gICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxIH19XG4gICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC4xNSwgZWFzZTogXCJlYXNlT3V0XCIgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJtaW4taC1bMTAwdmhdIG1pbi1oLVsxMDBkdmhdIGZsZXggZmxleC1jb2wgYmctdHJhbnNwYXJlbnQgdGV4dC16aW5jLTIwMCBmb250LWRpc3BsYXkgdHJhY2tpbmctdGlnaHQgc2VsZWN0aW9uOmJnLWluZGlnby01MDAgc2VsZWN0aW9uOnRleHQtemluYy0xMDAgcmVsYXRpdmUgdy1mdWxsXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxTaG9wSGVhZGVyXG4gICAgICAgICAgICBnbG9iYWxTdGF0cz17Z2xvYmFsU3RhdHN9XG4gICAgICAgICAgICB0b2dnbGVTaWRlYmFyPXsoKSA9PiBzZXRJc0FzdGRNZW51T3Blbih0cnVlKX1cbiAgICAgICAgICAgIG9uU2VhcmNoVG9nZ2xlPXsoKSA9PiBzZXRJc1NlYXJjaE9wZW4odHJ1ZSl9XG4gICAgICAgICAgICBjdXJyZW50VXNlcj17Y3VycmVudFVzZXJEYXRhIHx8IGN1cnJlbnRVc2VyfVxuICAgICAgICAgICAgb25Mb2dpbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldEFwcFNjcmVlbihcIkxPR0lOXCIpO1xuICAgICAgICAgICAgICBzZXRBdXRoTW9kZShcImxvZ2luXCIpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uTG9nb3V0PXtoYW5kbGVMb2dvdXR9XG4gICAgICAgICAgICBzZXRBcHBTY3JlZW49e3NldEFwcFNjcmVlbn1cbiAgICAgICAgICAgIGN1cnJlbnRTY3JlZW49e2FwcFNjcmVlbn1cbiAgICAgICAgICAgIG9uTG9nb0NsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldElzTG9hZGluZ1N0b2NrKHRydWUpO1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgICAgICAgICB9LCA4MDApO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHthcHBTY3JlZW4gPT09IFwiU0hPUFwiICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxBbm5vdW5jZW1lbnRQb3B1cFxuICAgICAgICAgICAgICAgIGFwcFNjcmVlbj17YXBwU2NyZWVufVxuICAgICAgICAgICAgICAgIGlzTG9hZGluZ0RhdGE9e2lzTG9hZGluZ1N0b2NrfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBEeW5hbWljIEZsb2F0aW5nIFRvYXN0IE5vdGlmaWNhdGlvbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIHRvcC0yIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgei1bOTk5OV0gZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgcG9pbnRlci1ldmVudHMtbm9uZSB3LWZ1bGwgbWF4LXctWzM0MHB4XSBweC00XCI+XG4gICAgICAgICAgICA8QW5pbWF0ZVByZXNlbmNlIG1vZGU9XCJwb3BMYXlvdXRcIj5cbiAgICAgICAgICAgICAge3RvYXN0cy5tYXAoKHRvYXN0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFN0YWNrIGVmZmVjdCBjYWxjdWxhdGlvbnNcbiAgICAgICAgICAgICAgICAvLyBJbmRleCAwIGlzIHRoZSBuZXdlc3QgKHRvcCkuIEluZGV4IDEgaXMgYmVoaW5kIGl0LCBldGMuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSAxIC0gaW5kZXggKiAwLjA1O1xuICAgICAgICAgICAgICAgIGNvbnN0IHlPZmZzZXQgPSBpbmRleCAqIDg7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3BhY2l0eSA9IDEgLSBpbmRleCAqIDAuMjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICAgICAga2V5PXt0b2FzdC5pZH1cbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogLTUwLCBzY2FsZTogMC45LCBmaWx0ZXI6IFwiYmx1cig4cHgpXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiBvcGFjaXR5LCB5OiB5T2Zmc2V0LCBzY2FsZTogc2NhbGUsIGZpbHRlcjogXCJibHVyKDBweClcIiB9fVxuICAgICAgICAgICAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjksIGZpbHRlcjogXCJibHVyKDhweClcIiwgdHJhbnNpdGlvbjogeyBkdXJhdGlvbjogMC4yLCBlYXNlOiBcImVhc2VPdXRcIiB9IH19XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgdHlwZTogXCJzcHJpbmdcIiwgc3RpZmZuZXNzOiA0MDAsIGRhbXBpbmc6IDMwLCBtYXNzOiAwLjggfX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgekluZGV4OiAxMDAgLSBpbmRleCB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtMCB3LWZ1bGwgYmctWyMxYzFjMWVdLzkwIGJhY2tkcm9wLWJsdXIteGwgcHgtMyBweS0zIHJvdW5kZWQtWzIwcHhdIHNoYWRvdy1bMF84cHhfMzJweF9yZ2JhKDAsMCwwLDAuNCldIGJvcmRlciBib3JkZXItd2hpdGUvMTAgZmxleCBpdGVtcy1zdGFydCBnYXAtMyBwb2ludGVyLWV2ZW50cy1hdXRvYH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlbiBiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2dsb2JhbFN0YXRzPy5hbm5vdW5jZW1lbnRfc2V0dGluZ3M/LnNob3BMb2dvVXJsID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17Z2xvYmFsU3RhdHMuYW5ub3VuY2VtZW50X3NldHRpbmdzLnNob3BMb2dvVXJsfSBhbHQ9XCJMb2dvXCIgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBvYmplY3QtY292ZXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWluZGlnby01MDAvMjAgdGV4dC1pbmRpZ28tNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtbGdcIj5LPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtYm90dG9tLTAuNSAtcmlnaHQtMC41IHAtWzJweF0gYmctWyMxYzFjMWVdIHJvdW5kZWQtZnVsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RvYXN0LnR5cGUgPT09IFwic3VjY2Vzc1wiID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMy41IGgtMy41IGJnLWVtZXJhbGQtNTAwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZSBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSB0ZXh0LXdoaXRlXCIgc3Ryb2tlV2lkdGg9ezN9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IHRvYXN0LnR5cGUgPT09IFwiZXJyb3JcIiA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSBiZy1yZWQtNTAwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBbGVydFRyaWFuZ2xlIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHRleHQtd2hpdGVcIiBzdHJva2VXaWR0aD17M30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMy41IGgtMy41IGJnLWJsdWUtNTAwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbmZvIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHRleHQtd2hpdGVcIiBzdHJva2VXaWR0aD17M30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTAgcHQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtWzEzcHhdIHRleHQtemluYy0xMDAgdHJ1bmNhdGUgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2xvYmFsU3RhdHM/LmFubm91bmNlbWVudF9zZXR0aW5ncz8uc2hvcE5hbWUgfHwgJ0t1d2FzaGlpJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy01MDAgZm9udC1tZWRpdW1cIj7guJXguK3guJnguJnguLXguYk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTNweF0gdGV4dC16aW5jLTMwMCBsZWFkaW5nLXNudWcgbGluZS1jbGFtcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9hc3QudGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogSGVybyBIZWFkZXIgU2VjdGlvbiAqL31cbiAgICAgICAgICB7IWlucXVpcmluZ0l0ZW0gJiZcbiAgICAgICAgICAgIGFwcFNjcmVlbiAhPT0gXCJUT1BVUFwiICYmXG4gICAgICAgICAgICBhcHBTY3JlZW4gIT09IFwiR0FNRVRPUFVQXCIgJiZcbiAgICAgICAgICAgIGFwcFNjcmVlbiAhPT0gXCJMT0dJTlwiICYmXG4gICAgICAgICAgICBhcHBTY3JlZW4gIT09IFwiUFJPRklMRVwiICYmXG4gICAgICAgICAgICBzZWxlY3RlZENhdGVnb3J5ID09PSBcImFsbFwiICYmXG4gICAgICAgICAgICAhc2VhcmNoICYmIDxTaG9wQmFubmVyIGdsb2JhbFN0YXRzPXtnbG9iYWxTdGF0c30gaXRlbXM9e2l0ZW1zfSAvPn1cblxuICAgICAgICAgIHsvKiBNYWluIENvbnRhaW5lciAqL31cbiAgICAgICAgICA8bWFpbiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCBweS04IHJlbGF0aXZlIHotMTAgZmxleC1ncm93IHctZnVsbFwiPlxuICAgICAgICAgICAgey8qIGQxQXV0aEVycm9yIGJsb2NrIHJlbW92ZWQgYXMgcmVxdWVzdGVkICovfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7aW5xdWlyaW5nSXRlbSA/IChcbiAgICAgICAgICAgICAgaW5xdWlyaW5nSXRlbS5nYWNoYVBvb2wgJiYgaW5xdWlyaW5nSXRlbS5nYWNoYVBvb2wubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICA8UmFuZG9tQm94TW9kYWxcbiAgICAgICAgICAgICAgICAgIGtleT1cInJhbmRvbS1ib3gtbW9kYWxcIlxuICAgICAgICAgICAgICAgICAgaXRlbT17aW5xdWlyaW5nSXRlbX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElucXVpcmluZ0l0ZW0obnVsbCl9XG4gICAgICAgICAgICAgICAgICBvbkJ1eT17aGFuZGxlQnV5SXRlbX1cbiAgICAgICAgICAgICAgICAgIGlzUHJvY2Vzc2luZz17aXNQcm9jZXNzaW5nUHVyY2hhc2V9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8SW5xdWlyeU1vZGFsXG4gICAgICAgICAgICAgICAgICBrZXk9XCJpbnF1aXJ5LW1vZGFsXCJcbiAgICAgICAgICAgICAgICAgIGl0ZW09e2lucXVpcmluZ0l0ZW19XG4gICAgICAgICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRJbnF1aXJpbmdJdGVtKG51bGwpfVxuICAgICAgICAgICAgICAgICAgb25CdXk9e2hhbmRsZUJ1eUl0ZW19XG4gICAgICAgICAgICAgICAgICBpc1Byb2Nlc3Npbmc9e2lzUHJvY2Vzc2luZ1B1cmNoYXNlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkgOiBhcHBTY3JlZW4gPT09IFwiTE9HSU5cIiA/IChcbiAgICAgICAgICAgICAgPEF1dGhQYWdlXG4gICAgICAgICAgICAgICAgYXV0aE1vZGU9e2F1dGhNb2RlfVxuICAgICAgICAgICAgICAgIHNldEF1dGhNb2RlPXtzZXRBdXRoTW9kZX1cbiAgICAgICAgICAgICAgICBhdXRoVXNlcm5hbWU9e2F1dGhVc2VybmFtZX1cbiAgICAgICAgICAgICAgICBzZXRBdXRoVXNlcm5hbWU9e3NldEF1dGhVc2VybmFtZX1cbiAgICAgICAgICAgICAgICBhdXRoRW1haWw9e2F1dGhFbWFpbH1cbiAgICAgICAgICAgICAgICBzZXRBdXRoRW1haWw9e3NldEF1dGhFbWFpbH1cbiAgICAgICAgICAgICAgICBhdXRoUGFzc3dvcmQ9e2F1dGhQYXNzd29yZH1cbiAgICAgICAgICAgICAgICBzZXRBdXRoUGFzc3dvcmQ9e3NldEF1dGhQYXNzd29yZH1cbiAgICAgICAgICAgICAgICBhdXRoQ29uZmlybVBhc3N3b3JkPXthdXRoQ29uZmlybVBhc3N3b3JkfVxuICAgICAgICAgICAgICAgIHNldEF1dGhDb25maXJtUGFzc3dvcmQ9e3NldEF1dGhDb25maXJtUGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgc2hvd0F1dGhQYXNzd29yZD17c2hvd0F1dGhQYXNzd29yZH1cbiAgICAgICAgICAgICAgICBzZXRTaG93QXV0aFBhc3N3b3JkPXtzZXRTaG93QXV0aFBhc3N3b3JkfVxuICAgICAgICAgICAgICAgIHNob3dBdXRoQ29uZmlybVBhc3N3b3JkPXtzaG93QXV0aENvbmZpcm1QYXNzd29yZH1cbiAgICAgICAgICAgICAgICBzZXRTaG93QXV0aENvbmZpcm1QYXNzd29yZD17c2V0U2hvd0F1dGhDb25maXJtUGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgYXV0aE90cENvZGU9e2F1dGhPdHBDb2RlfVxuICAgICAgICAgICAgICAgIHNldEF1dGhPdHBDb2RlPXtzZXRBdXRoT3RwQ29kZX1cbiAgICAgICAgICAgICAgICByZW1lbWJlckF1dGg9e3JlbWVtYmVyQXV0aH1cbiAgICAgICAgICAgICAgICBzZXRSZW1lbWJlckF1dGg9e3NldFJlbWVtYmVyQXV0aH1cbiAgICAgICAgICAgICAgICBhdXRoRXJyb3I9e2F1dGhFcnJvcn1cbiAgICAgICAgICAgICAgICBzZXRBdXRoRXJyb3I9e3NldEF1dGhFcnJvcn1cbiAgICAgICAgICAgICAgICBoYW5kbGVBdXRoU3VibWl0PXtoYW5kbGVBdXRoU3VibWl0fVxuICAgICAgICAgICAgICAgIGlzUHJvY2Vzc2luZz17aXNBdXRoTG9hZGluZ31cbiAgICAgICAgICAgICAgICBpc0NhcHRjaGFWZXJpZmllZD17aXNDYXB0Y2hhVmVyaWZpZWR9XG4gICAgICAgICAgICAgICAgc2V0SXNDYXB0Y2hhVmVyaWZpZWQ9e3NldElzQ2FwdGNoYVZlcmlmaWVkfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IGFwcFNjcmVlbiA9PT0gXCJHQU1FVE9QVVBcIiA/IChcbiAgICAgICAgICAgICAgPEdhbWVUb3B1cFBhZ2VcbiAgICAgICAgICAgICAgICBvbkJhY2s9eygpID0+IHNldEFwcFNjcmVlbihcIlNIT1BcIil9XG4gICAgICAgICAgICAgICAgY3VycmVudFVzZXI9e2N1cnJlbnRVc2VyRGF0YSB8fCBjdXJyZW50VXNlcn1cbiAgICAgICAgICAgICAgICBzaG93VG9hc3Q9e3Nob3dUb2FzdH1cbiAgICAgICAgICAgICAgICBmZXRjaFVzZXI9e2ZldGNoVXNlcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBhcHBTY3JlZW4gPT09IFwiUFJPRklMRVwiID8gKFxuICAgICAgICAgICAgICA8VXNlclByb2ZpbGVEYXNoYm9hcmRcbiAgICAgICAgICAgICAgICBjdXJyZW50VXNlcj17Y3VycmVudFVzZXJEYXRhIHx8IGN1cnJlbnRVc2VyfVxuICAgICAgICAgICAgICAgIHNldEFwcFNjcmVlbj17c2V0QXBwU2NyZWVufVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlUGFzc3dvcmQ9e2hhbmRsZUNoYW5nZVBhc3N3b3JkfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlVXNlcm5hbWU9e2hhbmRsZUNoYW5nZVVzZXJuYW1lfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlRW1haWw9e2hhbmRsZUNoYW5nZUVtYWlsfVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtpdGVtc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBhcHBTY3JlZW4gPT09IFwiVE9QVVBcIiA/IChcbiAgICAgICAgICAgICAgPFRvcHVwUGFnZVxuICAgICAgICAgICAgICAgIHRvcHVwVGFyZ2V0PXt0b3B1cFRhcmdldH1cbiAgICAgICAgICAgICAgICBzZXRUb3B1cFRhcmdldD17c2V0VG9wdXBUYXJnZXR9XG4gICAgICAgICAgICAgICAgdG9zQWNjZXB0ZWQ9e3Rvc0FjY2VwdGVkfVxuICAgICAgICAgICAgICAgIHNldFRvc0FjY2VwdGVkPXtzZXRUb3NBY2NlcHRlZH1cbiAgICAgICAgICAgICAgICB0b3B1cE1vZGFsU3RlcD17dG9wdXBNb2RhbFN0ZXB9XG4gICAgICAgICAgICAgICAgc2V0VG9wdXBNb2RhbFN0ZXA9eyhzdGVwKSA9PiB7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHNldFRvcHVwU3VjY2Vzc01lc3NhZ2UoXCJcIik7XG4gICAgICAgICAgICAgICAgICBzZXRUb3B1cE1vZGFsU3RlcChzdGVwKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGFuZ3Bhb0NvZGU9e3RvcHVwQ29kZX1cbiAgICAgICAgICAgICAgICBzZXRBbmdwYW9Db2RlPXtzZXRUb3B1cENvZGV9XG4gICAgICAgICAgICAgICAgc2xpcEZpbGU9e3NsaXBGaWxlfVxuICAgICAgICAgICAgICAgIHNldFNsaXBGaWxlPXtzZXRTbGlwRmlsZX1cbiAgICAgICAgICAgICAgICBzZXRTaG93VG9wdXBUb3M9e3NldFNob3dUb3B1cFRvc31cbiAgICAgICAgICAgICAgICBpc1Byb2Nlc3NpbmdUb3B1cD17aXNQcm9jZXNzaW5nVG9wdXB9XG4gICAgICAgICAgICAgICAgaGFuZGxlVG9wdXA9e2hhbmRsZVRvcHVwU3VibWl0fVxuICAgICAgICAgICAgICAgIHNldEFwcFNjcmVlbj17c2V0QXBwU2NyZWVufVxuICAgICAgICAgICAgICAgIGdsb2JhbFN0YXRzPXtnbG9iYWxTdGF0c31cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgey8qIENhdGVnb3J5IENhcmRzIFNlY3Rpb24gKi99XG4gICAgICAgICAgICAgICAge3NlbGVjdGVkQ2F0ZWdvcnkgPT09IFwiYWxsXCIgJiYgIXNlYXJjaCA/IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgbWItNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtemluYy0xMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgd2hpdGVzcGFjZS1ub3dyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmctemluYy04MDAvODAgcC0xLjUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXppbmMtNzAwLzUwXCI+4q2QPC9zcGFuPiDguYDguKHguJnguLnguJfguLHguYjguKfguYTguJtcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtcHggYmctZ3JhZGllbnQtdG8tciBmcm9tLXppbmMtNzAwLzgwIHRvLXRyYW5zcGFyZW50IGZsZXgtMVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBtZDpncmlkLWNvbHMtNCBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyFjdXJyZW50VXNlciAmJiBnbG9iYWxTdGF0cz8uYW5ub3VuY2VtZW50X3NldHRpbmdzPy5sb2dpbkJhbm5lclVybCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZUhvdmVyPXt7IHNjYWxlOiAxLjAyIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGVUYXA9e3sgc2NhbGU6IDAuOTggfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBcHBTY3JlZW4oXCJMT0dJTlwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdXJzb3ItcG9pbnRlciByb3VuZGVkLTJ4bCBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci1ibHVlLTUwMC8zMCBzaGFkb3ctWzBfMF8xNXB4X3JnYmEoNTksMTMwLDI0NiwwLjE1KV0gZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17Z2xvYmFsU3RhdHMuYW5ub3VuY2VtZW50X3NldHRpbmdzLmxvZ2luQmFubmVyVXJsfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIkxvZ2luXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlciBvcGFjaXR5LTkwIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eSBhc3BlY3QtWzIvMV1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHtnbG9iYWxTdGF0cz8uYW5ub3VuY2VtZW50X3NldHRpbmdzPy5wcm9kdWN0c0Jhbm5lclVybCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGRlbGF5OiAwLjEgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZUhvdmVyPXt7IHNjYWxlOiAxLjAyIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGVUYXA9e3sgc2NhbGU6IDAuOTggfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZENhdGVnb3J5KFwiYWxsXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImN1cnNvci1wb2ludGVyIHJvdW5kZWQtMnhsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvMzAgc2hhZG93LVswXzBfMTVweF9yZ2JhKDE2OCw4NSwyNDcsMC4xNSldIGdyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2dsb2JhbFN0YXRzLmFubm91bmNlbWVudF9zZXR0aW5ncy5wcm9kdWN0c0Jhbm5lclVybH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJBbGwgUHJvZHVjdHNcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIG9wYWNpdHktOTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgdHJhbnNpdGlvbi1vcGFjaXR5IGFzcGVjdC1bMi8xXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAge2dsb2JhbFN0YXRzPy5hbm5vdW5jZW1lbnRfc2V0dGluZ3M/LnRvcHVwQmFubmVyVXJsICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAxMCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZGVsYXk6IDAuMiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlSG92ZXI9e3sgc2NhbGU6IDEuMDIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45OCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFwcFNjcmVlbihcIlRPUFVQXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImN1cnNvci1wb2ludGVyIHJvdW5kZWQtMnhsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzMwIHNoYWRvdy1bMF8wXzE1cHhfcmdiYSgxNiwxODUsMTI5LDAuMTUpXSBncm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtnbG9iYWxTdGF0cy5hbm5vdW5jZW1lbnRfc2V0dGluZ3MudG9wdXBCYW5uZXJVcmx9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiVG9wdXBcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIG9wYWNpdHktOTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgdHJhbnNpdGlvbi1vcGFjaXR5IGFzcGVjdC1bMi8xXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAge2dsb2JhbFN0YXRzPy5hbm5vdW5jZW1lbnRfc2V0dGluZ3M/LmNvbnRhY3RCYW5uZXJVcmwgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDEwIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkZWxheTogMC4zIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGVIb3Zlcj17eyBzY2FsZTogMS4wMiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlVGFwPXt7IHNjYWxlOiAwLjk4IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4oXCJodHRwczovL2Rpc2NvcmQuZ2cvQVFLdEpwdnl2YVwiLCBcIl9ibGFua1wiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdXJzb3ItcG9pbnRlciByb3VuZGVkLTJ4bCBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci1yb3NlLTUwMC8zMCBzaGFkb3ctWzBfMF8xNXB4X3JnYmEoMjQ0LDYzLDk0LDAuMTUpXSBncm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtnbG9iYWxTdGF0cy5hbm5vdW5jZW1lbnRfc2V0dGluZ3MuY29udGFjdEJhbm5lclVybH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJDb250YWN0IEFkbWluXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlciBvcGFjaXR5LTkwIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eSBhc3BlY3QtWzIvMV1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00IG1iLTQgbXQtOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtemluYy0xMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgd2hpdGVzcGFjZS1ub3dyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmctemluYy04MDAvODAgcC0xLjUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXppbmMtNzAwLzUwXCI+8J+Orjwvc3Bhbj4g4LmA4Lih4LiZ4Li54LmA4LiV4Li04Lih4LmA4LiB4LihXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLXB4IGJnLWdyYWRpZW50LXRvLXIgZnJvbS16aW5jLTcwMC84MCB0by10cmFuc3BhcmVudCBmbGV4LTFcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgbWQ6Z3JpZC1jb2xzLTQgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2IFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDEwIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGRlbGF5OiAwLjQgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGVIb3Zlcj17eyBzY2FsZTogMS4wMiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45OCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXBwU2NyZWVuKFwiR0FNRVRPUFVQXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdXJzb3ItcG9pbnRlciByb3VuZGVkLTJ4bCBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMCBzaGFkb3ctWzBfMF8xNXB4X3JnYmEoNiwxODIsMjEyLDAuMTUpXSBncm91cCBiZy1ncmFkaWVudC10by1iciBmcm9tLWN5YW4tNjAwIHRvLWJsdWUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGFzcGVjdC1bMi8xXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgdGV4dC13aGl0ZSBwLTQgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8R2FtZXBhZDIgY2xhc3NOYW1lPVwidy04IGgtOCBzbTp3LTEwIHNtOmgtMTAgb3BhY2l0eS05MCBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNtIHNtOnRleHQtYmFzZVwiPuC4muC4o+C4tOC4geC4suC4o+C4o+C4seC4muC5gOC4leC4tOC4oeC5gOC4geC4oTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8UmVjZW50UHVyY2hhc2VzIGFwcFNjcmVlbj17YXBwU2NyZWVufSBpdGVtcz17aXRlbXN9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxDYXRlZ29yeUxpc3RcbiAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENhdGVnb3J5PXtzZWxlY3RlZENhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2F0ZWdvcnk9e3NldFNlbGVjdGVkQ2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsU3RhdHM9e2dsb2JhbFN0YXRzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICFzZWFyY2ggJiYgKFxuICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogLTIwIH19XG4gICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC4zIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gbWItNiB3LWZ1bGwgZmxleCBmbGV4LWNvbCBnYXAtMiBtdC0yXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyBmb250LWJvbGQgdGV4dC16aW5jLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkQ2F0ZWdvcnkoXCJhbGxcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtWyMwZWE1ZTldIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyIHRleHQtWyMwZWE1ZTldXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAg4Lij4Liy4Lii4LiB4Liy4Lij4Lir4Lih4Lin4LiU4Lir4Lih4Li54LmIXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy02MDBcIj4mZ3Q7PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeDogLTEwIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeDogMCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGRlbGF5OiAwLjEgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC13aGl0ZSB1cHBlcmNhc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLnNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRDYXRlZ29yeShcImFsbFwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItemluYy04MDAgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXppbmMtODAwIGhvdmVyOmJvcmRlci16aW5jLTcwMCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciBmbGV4LXNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIuC4ouC5ieC4reC4meC4geC4peC4seC4mlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkxlZnQgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmgyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgc2NhbGU6IDEgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxheTogMC4xNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3ByaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlmZm5lc3M6IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtMnhsIG1kOnRleHQtM3hsIGZvbnQtYmxhY2sgdGV4dC1bIzBlYTVlOV0gdHJhY2tpbmctdGlnaHQgdXBwZXJjYXNlIGxlYWRpbmctdGlnaHQgZm9udC1kaXNwbGF5IGxpbmUtY2xhbXAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tb3Rpb24uaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDAuOCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHNjYWxlOiAxIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxheTogMC4yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3ByaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpZmZuZXNzOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIGJnLVsjMDAyZjVkXSBib3JkZXIgYm9yZGVyLVsjMGVhNWU5XS8zMCByb3VuZGVkLWZ1bGwgcHgtMi41IHB5LTEgc2hhZG93LW1kIHNoYWRvdy1bIzBlYTVlOV0vMTAgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RhciBjbGFzc05hbWU9XCJ3LTMgaC0zIGZpbGwtWyMwZWE1ZTldIHRleHQtWyMwZWE1ZTldXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bIzBlYTVlOV0gdGV4dC1bMTBweF0gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg4LmB4LiZ4Liw4LiZ4LizXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB0LTEgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtWyMwZWE1ZTldXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIOC4quC4tOC4meC4hOC5ieC4suC5g+C4meC4q+C4oeC4p+C4lOC4q+C4oeC4ueC5iOC4meC4teC5iVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC16aW5jLTMwMCBmb250LWJvbGQgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICDguJfguLHguYnguIfguKvguKHguJR7XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaSkgPT4gKGkuY2F0ZWdvcnkgfHwgXCJcIikgPT09IHNlbGVjdGVkQ2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfXtcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAg4Liq4Li04LiZ4LiE4LmJ4LiyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogQWRtaW4gVG9vbHMgQVNURCAqL31cbiAgICAgICAgICAgICAgICB7aXNBZG1pbiAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJiZy16aW5jLTkwMCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci16aW5jLTgwMCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMjAgcC01IHJvdW5kZWQtMnhsIG1iLTggcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIHctMzIgaC0zMiBiZy1pbmRpZ28tNTAwLzUgYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZSAtei0xMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IG1kOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC0yeGwgYmctaW5kaWdvLTUwMC8xMCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMzAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1pbmRpZ28tNDAwIGZsZXgtc2hyaW5rLTAgYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTbGlkZXJzSG9yaXpvbnRhbCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtemluYy0xMDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICDguYHguJzguIfguIjguLHguJTguIHguLLguKPguKrguJXguYrguK3guIFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC16aW5jLTUwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOC4iOC4seC4lOC4geC4suC4o+C5gOC4nuC4tOC5iOC4oSDguKvguKPguLfguK3guYHguIHguYnguYTguILguJDguLLguJnguILguYnguK3guKHguLnguKXguITguKXguLHguIfguKrguLTguJnguITguYnguLLguYTguJTguYnguYHguJrguJpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWwtdGltZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGVUYXA9e3sgc2NhbGU6IDAuOTUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0N1c3RvbWVyRGJPcGVuKHRydWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB5LTIgcHgtNCByb3VuZGVkLTJ4bCBiZy1wdXJwbGUtNTAwLzIwIHRleHQtcHVycGxlLTQwMCBob3Zlcjp0ZXh0LXppbmMtMTAwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS01MDAvMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFVzZXJzIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiDguKPguLDguJrguJrguJDguLLguJnguKXguLnguIHguITguYnguLIgKEN1c3RvbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgREIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZU1haW50ZW5hbmNlTW9kZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0yIHB4LTQgcm91bmRlZC0yeGwgdGV4dC14cyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgY3Vyc29yLXBvaW50ZXIgc2hhZG93LWxnICR7aXNNYWludGVuYW5jZU1vZGUgPyBcImJnLWFtYmVyLTUwMC8yMCB0ZXh0LWFtYmVyLTQwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMCBob3ZlcjpiZy1hbWJlci01MDAvMzBcIiA6IFwiYmctcmVkLTUwMC8yMCB0ZXh0LXJlZC00MDAgYm9yZGVyIGJvcmRlci1yZWQtNTAwLzMwIGhvdmVyOmJnLXJlZC01MDAvMzBcIn1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFsZXJ0VHJpYW5nbGUgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+e1wiIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc01haW50ZW5hbmNlTW9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIuC5gOC4m+C4tOC4lOC5gOC4p+C5h+C4mlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwi4Lib4Li04LiU4LmA4Lin4LmH4Lia4LiL4LmI4Lit4Lih4Lib4Lij4Li44LiHXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQ291cG9uTWFuYWdlck9wZW4odHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHktMiBweC00IHJvdW5kZWQtMnhsIGJnLWVtZXJhbGQtNTAwLzIwIHRleHQtZW1lcmFsZC00MDAgaG92ZXI6dGV4dC16aW5jLTEwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzMwIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGN1cnNvci1wb2ludGVyIHNoYWRvdy1sZyBzaGFkb3ctZW1lcmFsZC01MDAvMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdpZnQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IOC4iOC4seC4lOC4geC4suC4o+C5guC4hOC5ieC4lOC4hOC4ueC4m+C4reC4h1xuICAgICAgICAgICAgICAgICAgICAgICAgICA8L21vdGlvbi5idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGVUYXA9e3sgc2NhbGU6IDAuOTUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0Fubm91bmNlbWVudE1hbmFnZXJPcGVuKHRydWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB5LTIgcHgtNCByb3VuZGVkLTJ4bCBiZy1hbWJlci01MDAvMjAgdGV4dC1hbWJlci00MDAgaG92ZXI6dGV4dC16aW5jLTEwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGcgc2hhZG93LWFtYmVyLTUwMC8xMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QmVsbCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4g4LiI4Lix4LiU4LiB4Liy4Lij4LmB4LiI4LmJ4LiH4LmA4LiV4Li34Lit4LiZ4LiV4LmI4Liy4LiH4LmGXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzSW1hZ2VTZXR0aW5nc09wZW4odHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHktMiBweC00IHJvdW5kZWQtMnhsIGJnLWZ1Y2hzaWEtNTAwLzIwIHRleHQtZnVjaHNpYS00MDAgaG92ZXI6dGV4dC16aW5jLTEwMCBib3JkZXIgYm9yZGVyLWZ1Y2hzaWEtNTAwLzMwIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGN1cnNvci1wb2ludGVyIHNoYWRvdy1sZyBzaGFkb3ctZnVjaHNpYS01MDAvMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlSWNvbiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4g4LiI4Lix4LiU4LiB4Liy4Lij4Lij4Li54Lib4Lig4Liy4Lie4Lij4LmJ4Liy4LiZ4LiE4LmJ4LiyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzUGF5bWVudENvbmZpZ09wZW4odHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHktMiBweC00IHJvdW5kZWQtMnhsIGJnLWJsdWUtNTAwLzIwIHRleHQtYmx1ZS00MDAgaG92ZXI6dGV4dC16aW5jLTEwMCBib3JkZXIgYm9yZGVyLWJsdWUtNTAwLzMwIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGN1cnNvci1wb2ludGVyIHNoYWRvdy1sZyBzaGFkb3ctYmx1ZS01MDAvMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFdhbGxldCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4g4LiI4Lix4LiU4LiB4Liy4Lij4LiK4LmI4Lit4LiH4LiX4Liy4LiH4LiK4Liz4Lij4Liw4LmA4LiH4Li04LiZXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQXBpU3RhdHVzT3Blbih0cnVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweS0yIHB4LTQgcm91bmRlZC0yeGwgYmctaW5kaWdvLTUwMC8yMCB0ZXh0LWluZGlnby00MDAgaG92ZXI6dGV4dC16aW5jLTEwMCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMzAgdGV4dC14cyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgY3Vyc29yLXBvaW50ZXIgc2hhZG93LWxnIHNoYWRvdy1pbmRpZ28tNTAwLzEwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IOC5gOC4iuC5h+C4hOC4quC4luC4suC4meC4sCBBUElcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tb3Rpb24uYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlVGFwPXt7IHNjYWxlOiAwLjk1IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNDYXRlZ29yeU1hbmFnZXJPcGVuKHRydWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB5LTIgcHgtNCByb3VuZGVkLTJ4bCBiZy1yb3NlLTUwMC8yMCB0ZXh0LXJvc2UtNDAwIGhvdmVyOnRleHQtemluYy0xMDAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC8zMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGcgc2hhZG93LXJvc2UtNTAwLzEwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb2xkZXJQbHVzIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiDguIjguLHguJTguIHguLLguKPguKvguKHguKfguJTguKvguKHguLnguYhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tb3Rpb24uYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlVGFwPXt7IHNjYWxlOiAwLjk1IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNTdG9ja01hbmFnZXJPcGVuKHRydWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB5LTIgcHgtNCByb3VuZGVkLTJ4bCBiZy1pbmRpZ28tNTAwLzIwIHRleHQtaW5kaWdvLTQwMCBob3Zlcjp0ZXh0LXppbmMtMTAwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8zMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGFja2FnZSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4g4Lij4Liw4Lia4Lia4Lic4Li54LmJ4LiU4Li54LmB4Lil4Liq4LiV4LmK4Lit4LiBXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzRm9ybU9wZW4odHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHktMiBweC00IHJvdW5kZWQtMnhsIGJnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCB0ZXh0LXppbmMtMTAwIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1sZyBzaGFkb3ctaW5kaWdvLTUwMC8yMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4g4LmA4Lie4Li04LmI4Lih4Liq4Li04LiZ4LiE4LmJ4LiyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItOFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxBcGlTdGF0dXNXaWRnZXQgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgey8qIFJlY29tbWVuZGVkIFByb2R1Y3RzIEhlYWRlciAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi00IG10LThcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtemluYy0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7c2VhcmNoID8gYOC4nOC4peC4geC4suC4o+C4hOC5ieC4meC4q+C4sjogXCIke3NlYXJjaH1cImAgOiBcIuC4quC4tOC4meC4hOC5ieC4suC5geC4meC4sOC4meC4s1wifVxuICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgICAgICB7c2VhcmNoICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWFyY2goXCJcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXhzIHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgYmctcmVkLTUwMC8yMCB0ZXh0LXJlZC00MDAgaG92ZXI6YmctcmVkLTUwMC8zMCBib3JkZXIgYm9yZGVyLXJlZC01MDAvMzAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIOC4ouC4geC5gOC4peC4tOC4geC4geC4suC4o+C4hOC5ieC4meC4q+C4slxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8bW90aW9uLmJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0zIHB5LTEgdGV4dC1zbSBmb250LW1lZGl1bSBib3JkZXIgYm9yZGVyLXppbmMtODAwIHJvdW5kZWQtZnVsbCB0ZXh0LXppbmMtMzAwIGhvdmVyOmJnLXppbmMtODAwXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg4LiU4Li54LmA4Lie4Li04LmI4Lih4LmA4LiV4Li04Lihe1wiIFwifVxuICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC16aW5jLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8L21vdGlvbi5idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogSXRlbSBHcmlkICovfVxuICAgICAgICAgICAgICAgIHtpc0xvYWRpbmdTdG9jayA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtMyBtZDpncmlkLWNvbHMtNCBsZzpncmlkLWNvbHMtNSB4bDpncmlkLWNvbHMtNiBnYXAtMiBzbTpnYXAtNFwiPlxuICAgICAgICAgICAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogOCB9KS5tYXAoKF8sIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxJdGVtQ2FyZFNrZWxldG9uIGtleT17YGFzdGQtc2tlbC0ke2lkeH1gfSAvPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiBzb3J0ZWRJdGVtcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTI0IGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItemluYy04MDAgcm91bmRlZC0yeGxcIj5cbiAgICAgICAgICAgICAgICAgICAgPEluYm94IGNsYXNzTmFtZT1cInctMTYgaC0xNiB0ZXh0LWluZGlnby01MDAvNTAgbXgtYXV0byBtYi02XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ibGFjayB0ZXh0LXppbmMtMTAwIG1iLTIgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7c2VhcmNoID8gYOC5hOC4oeC5iOC4nuC4muC4quC4tOC4meC4hOC5ieC4suC4quC4s+C4q+C4o+C4seC4miBcIiR7c2VhcmNofVwiYCA6IFwi4LmE4Lih4LmI4Lie4Lia4Liq4Li04LiZ4LiE4LmJ4Liy4LmD4LiZ4Liq4LiV4LmK4Lit4LiBXCJ9XG4gICAgICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy01MDAgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtzZWFyY2ggPyBcIuC4peC4reC4h+C4hOC5ieC4meC4q+C4suC4lOC5ieC4p+C4ouC4hOC4s+C4reC4t+C5iOC4mSDguKvguKPguLfguK3guIHguKXguLHguJrguYTguJvguJTguLnguKrguLTguJnguITguYnguLLguJfguLHguYnguIfguKvguKHguJRcIiA6IFwi4LiC4LiT4Liw4LiZ4Li14LmJ4Lii4Lix4LiH4LmE4Lih4LmI4Lih4Li14Liq4Li04LiZ4LiE4LmJ4Liy4Lin4Liy4LiH4LiI4Liz4Lir4LiZ4LmI4Liy4Lii4LmD4LiZ4Lir4Lih4Lin4LiU4Lir4Lih4Li54LmI4LiZ4Li14LmJXCJ9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgICBsYXlvdXRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtMyBtZDpncmlkLWNvbHMtNCBsZzpncmlkLWNvbHMtNSB4bDpncmlkLWNvbHMtNiBnYXAtMiBzbTpnYXAtNFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgICAgICAgICAgICAgICAge3NvcnRlZEl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEl0ZW1DYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFwcFNjcmVlbj17YXBwU2NyZWVufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRtaW49e2lzQWRtaW59XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRWRpdD17KGl0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RWRpdGluZ0l0ZW0oaXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldElzRm9ybU9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXtoYW5kbGVEZWxldGVJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblF1aWNrUXVhbnRpdHlDaGFuZ2U9e2hhbmRsZVF1aWNrUXVhbnRpdHlDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uSW5xdWlyZT17KCkgPT4gc2V0SW5xdWlyaW5nSXRlbShpdGVtKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25CdXk9e2hhbmRsZUJ1eUl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uVG9nZ2xlUGluPXtoYW5kbGVUb2dnbGVQaW59XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2F0ZWdvcnlDbGljaz17KGNhdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2F0ZWdvcnkoY2F0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG4gICAgICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIDxEaXNjb3JkQmFubmVyIC8+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L21haW4+XG5cbiAgICAgICAgICB7LyogQ3VzdG9tIEZvb3RlciAqL31cbiAgICAgICAgICA8Zm9vdGVyIGNsYXNzTmFtZT1cIm10LWF1dG8gcHQtNCBwYi0yIHNtOnB0LTYgc206cGItNCByZWxhdGl2ZSB6LTEwIGJvcmRlci10IGJvcmRlci16aW5jLTgwMC82MCBiZy10cmFuc3BhcmVudCB3LWZ1bGxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgdHJhY2tpbmctd2lkZSB0ZXh0LWNlbnRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQteHMgc206dGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgICAgUG93ZXJlZCBieSA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtemluYy0yMDBcIj5WZXJjZWw8L3NwYW4+ICZtaWRkb3Q7IENvZGUgYnkgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXppbmMtMjAwXCI+ZGlzLmNvcmQwMTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb290ZXI+XG5cbiAgICAgICAgICA8TW9iaWxlRHJhd2VyXG4gICAgICAgICAgICBpc09wZW49e2lzQXN0ZE1lbnVPcGVufVxuICAgICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNBc3RkTWVudU9wZW4oZmFsc2UpfVxuICAgICAgICAgICAgY3VycmVudFVzZXI9e2N1cnJlbnRVc2VyRGF0YSB8fCBjdXJyZW50VXNlcn1cbiAgICAgICAgICAgIG9uTG9naW5DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBzZXRBcHBTY3JlZW4oXCJMT0dJTlwiKTtcbiAgICAgICAgICAgICAgc2V0QXV0aE1vZGUoXCJsb2dpblwiKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkxvZ291dENsaWNrPXtoYW5kbGVMb2dvdXR9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRBcHBTY3JlZW59XG4gICAgICAgICAgICBzZXRTaG93VG9wdXBNb2RhbD17c2V0U2hvd1RvcHVwTW9kYWx9XG4gICAgICAgICAgICBvcGVuSGlzdG9yeU1vZGFsPXtvcGVuSGlzdG9yeU1vZGFsfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFNlYXJjaE92ZXJsYXlcbiAgICAgICAgICAgIGlzT3Blbj17aXNTZWFyY2hPcGVufVxuICAgICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNTZWFyY2hPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgIGluaXRpYWxTZWFyY2g9e3NlYXJjaH1cbiAgICAgICAgICAgIG9uU2VhcmNoU3VibWl0PXtzZXRTZWFyY2h9XG4gICAgICAgICAgICBpdGVtcz17aXRlbXN9XG4gICAgICAgICAgICBvbkl0ZW1DbGljaz17KGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgc2V0SXNTZWFyY2hPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgc2V0SW5xdWlyaW5nSXRlbShpdGVtKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIHtyZW5kZXJNb2RhbHMoKX1cbiAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTsgLy8gZW5kIHJlbmRlckFwcFNjcmVlblxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxTaG9vdGluZ1N0YXJzIC8+XG4gICAgICA8R2xvYmFsTG9hZGluZ1NjcmVlbiBpc0xvYWRpbmc9e2lzTG9hZGluZ1N0b2NrfSAvPlxuICAgICAgPEFuaW1hdGVQcmVzZW5jZSBtb2RlPVwid2FpdFwiPntyZW5kZXJBcHBTY3JlZW4oKX08L0FuaW1hdGVQcmVzZW5jZT5cbiAgICAgIHshaXNMb2FkaW5nU3RvY2sgJiYgPEFJQ2hhdFdpZGdldCBpdGVtcz17aXRlbXN9IHNob3BMb2dvVXJsPXtnbG9iYWxTdGF0cz8uYW5ub3VuY2VtZW50X3NldHRpbmdzPy5zaG9wTG9nb1VybH0gY3VycmVudFVzZXI9e2N1cnJlbnRVc2VyfSBvbkxvZ2luQ2xpY2s9eygpID0+IHNldEFwcFNjcmVlbihcIkxPR0lOXCIpfSBhaVN0YXR1cz17Z2xvYmFsU3RhdHM/LmFpX3N0YXR1c30gLz59XG4gICAgPC8+XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiJBQTRLSSxTQW1rRUEsVUFua0VBO0FBNUtKLFNBQWdCLFVBQVUsV0FBVyxjQUFjO0FBQ25ELFNBQVMsYUFBYSxtQkFBbUI7QUFFekMsU0FBUyxRQUFRLHVCQUF1QjtBQUN4QyxTQUFTLGNBQWMsc0JBQXNDO0FBQzdEO0FBQUEsRUFJRTtBQUFBLEVBRUE7QUFBQSxFQUVBO0FBQUEsRUFLQTtBQUFBLEVBUUE7QUFBQSxFQUNBO0FBQUEsRUFNQTtBQUFBLEVBT0E7QUFBQSxFQUlBO0FBQUEsRUFJQTtBQUFBLEVBRUE7QUFBQSxFQUdBO0FBQUEsRUFDQTtBQUFBLEVBS0E7QUFBQSxFQUVBO0FBQUEsRUFDQSxTQUFTO0FBQUEsRUFDVDtBQUFBLEVBQ0E7QUFBQSxPQUNLO0FBUVAsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxzQkFBc0I7QUFDL0IsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyx5QkFBeUI7QUFDbEMsU0FBUyw2QkFBNkI7QUFDdEMsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyxnQ0FBZ0M7QUFDekMsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyx5QkFBeUI7QUFFbEMsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxpQkFBaUI7QUFDMUIsU0FBUyxxQkFBcUI7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