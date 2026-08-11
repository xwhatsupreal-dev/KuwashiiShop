import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  RefreshCw,
  Wallet,
  Download,
  Key,
  Globe,
  ShoppingBag,
  History,
  CheckCircle2,
  AlertCircle,
  Package,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';
import { useScrollLock } from '../useScrollLock';
import {
  SupplierProduct,
  SupplierHistoryItem,
  getStoredSupplierConfig,
  setStoredSupplierConfig,
  fetchSupplierBalance,
  fetchSupplierProducts,
  buySupplierProduct,
  fetchSupplierHistory,
  DEFAULT_SUPPLIER_URL
} from '../services/supplierApi';
import { supabase } from '../supabase';

interface SupplierManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGame: string;
  onItemImported?: () => void;
}

export const SupplierManagerModal: React.FC<SupplierManagerModalProps> = ({
  isOpen,
  onClose,
  currentGame,
  onItemImported
}) => {
  useScrollLock(isOpen);

  const [activeTab, setActiveTab] = useState<'products' | 'history' | 'settings'>('products');
  const [apiKey, setApiKey] = useState('');
  const [supplierUrl, setSupplierUrl] = useState(DEFAULT_SUPPLIER_URL);
  
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);

  // Products
  const [products, setProducts] = useState<SupplierProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [productError, setProductError] = useState<string | null>(null);

  // History
  const [history, setHistory] = useState<SupplierHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  const [historyError, setHistoryError] = useState<string | null>(null);

  // Import Dialog
  const [importingProduct, setImportingProduct] = useState<SupplierProduct | null>(null);
  const [sellingPrice, setSellingPrice] = useState<number | string>('');
  const [importGame, setImportGame] = useState<string>('ROV');
  const [importCategory, setImportCategory] = useState<string>('Grow A Garden 2');
  const [importStockQty, setImportStockQty] = useState<number>(99);
  const [isSubmittingImport, setIsSubmittingImport] = useState(false);

  // Test Buy State
  const [purchasingProdId, setPurchasingProdId] = useState<string | null>(null);
  const [buyResult, setBuyResult] = useState<{ message?: string; reward?: string } | null>(null);
  const [buyError, setBuyError] = useState<string | null>(null);
  const [copiedReward, setCopiedReward] = useState(false);

  // Load config on mount
  useEffect(() => {
    if (isOpen) {
      const cfg = getStoredSupplierConfig();
      setApiKey(cfg.apiKey || '');
      setSupplierUrl(cfg.supplierUrl || DEFAULT_SUPPLIER_URL);
      setImportGame(currentGame === 'SHOP' ? 'ROV' : currentGame);

      if (cfg.apiKey) {
        handleCheckBalance(cfg);
        handleFetchProducts(cfg);
      }
    }
  }, [isOpen, currentGame]);

  const handleSaveConfig = () => {
    const config = { apiKey: apiKey.trim(), supplierUrl: supplierUrl.trim() || DEFAULT_SUPPLIER_URL };
    setStoredSupplierConfig(config);
    handleCheckBalance(config);
    handleFetchProducts(config);
  };

  const handleCheckBalance = async (cfgOverride?: any) => {
    setIsLoadingBalance(true);
    setBalanceError(null);
    const res = await fetchSupplierBalance(cfgOverride);
    setIsLoadingBalance(false);
    if (res.status === 200 && res.balance !== undefined) {
      setBalance(res.balance);
    } else {
      setBalance(null);
      setBalanceError(res.error || 'ไม่สามารถดึงยอดเงินได้ กรุณาตรวจสอบ API Key');
    }
  };

  const handleFetchProducts = async (cfgOverride?: any) => {
    setIsLoadingProducts(true);
    setProductError(null);
    const res = await fetchSupplierProducts(cfgOverride);
    setIsLoadingProducts(false);
    if (res.status === 200 && res.products) {
      setProducts(res.products);
    } else {
      setProducts([]);
      setProductError(res.error || 'ไม่สามารถดึงรายการสินค้าได้');
    }
  };

  const handleFetchHistory = async () => {
    setIsLoadingHistory(true);
    setHistoryError(null);
    const res = await fetchSupplierHistory();
    setIsLoadingHistory(false);
    if (res.status === 200 && res.history) {
      setHistory(res.history);
    } else {
      setHistory([]);
      setHistoryError(res.error || 'ไม่สามารถดึงประวัติการสั่งซื้อได้');
    }
  };

  const openImportModal = (product: SupplierProduct) => {
    setImportingProduct(product);
    setSellingPrice(product.price);
    setImportGame(currentGame === 'SHOP' ? 'ROV' : currentGame);
    setImportCategory('Grow A Garden 2');
    setImportStockQty(99);
  };

  const handleConfirmImport = async () => {
    if (!importingProduct) return;
    setIsSubmittingImport(true);

    try {
      const priceNum = parseFloat(String(sellingPrice)) || importingProduct.price;
      const descWithSupplierMeta = `${importingProduct.description || 'สินค้าจากระบบ API ร้านอื่น'}\n<!--supplierProductId:${importingProduct.id}-->\n<!--supplierUrl:${supplierUrl}-->`;

      const newItemPayload = {
        name: importingProduct.name,
        category: importCategory,
        rarity: 'ขายรหัส',
        quantity: importStockQty,
        initial_quantity: importStockQty,
        price: priceNum,
        description: descWithSupplierMeta,
        image: importingProduct.img || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80',
        game: importGame,
        is_pinned: false,
        popular: true
      };

      const { error } = await supabase.from('items').insert([newItemPayload]);

      if (error) {
        throw error;
      }

      setImportingProduct(null);
      if (onItemImported) onItemImported();
      alert('นำเข้าสินค้าเข้าสู่คลังสำเร็จเรียบร้อย!');
    } catch (err: any) {
      alert('เกิดข้อผิดพลาดในการนำเข้าสินค้า: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSubmittingImport(false);
    }
  };

  const handleTestBuy = async (product: SupplierProduct) => {
    if (!window.confirm(`ยืนยันการทดสอบสั่งซื้อ "${product.name}" ในราคา ฿${product.price} จากร้านค้าปลายทาง?`)) {
      return;
    }

    setPurchasingProdId(product.id);
    setBuyResult(null);
    setBuyError(null);

    const res = await buySupplierProduct(product.id, 'ADMIN_TEST_BUY');
    setPurchasingProdId(null);

    if (res.status === 200) {
      setBuyResult({
        message: res.message || 'สั่งซื้อสินค้าสำเร็จ!',
        reward: res.reward
      });
      handleCheckBalance();
    } else {
      setBuyError(res.error || res.message || 'เกิดข้อผิดพลาดในการสั่งซื้อ');
    }
  };

  if (!isOpen) return null;

  const filteredProducts = products.filter(p =>
    (p.name || '').toLowerCase().includes(productSearch.toLowerCase()) ||
    (p.id || '').toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredHistory = history.filter(h =>
    (h.name || '').toLowerCase().includes(historySearch.toLowerCase()) ||
    (h.id || '').toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop Cover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-5xl h-[90dvh] rounded-2xl border border-white/10 bg-zinc-950 flex flex-col overflow-hidden shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-5 border-b border-zinc-900 bg-zinc-950">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-white">ระบบดึงสินค้าจากร้านอื่น</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    API Integration
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  เชื่อมต่อ API ดึงรายการสินค้า ตรวจสอบยอดเงินคงเหลือ และจัดส่งอัตโนมัติ
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Balance & Key Topbar */}
          <div className="flex-shrink-0 p-4 bg-zinc-900/80 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950 border border-white/5">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-zinc-400 font-medium">ยอดเงินบัญชีร้านค้า:</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {isLoadingBalance ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin inline ml-1 text-zinc-500" />
                  ) : balance !== null ? (
                    `฿${balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}`
                  ) : (
                    <span className="text-zinc-500 text-xs">ยังไม่ได้เชื่อมต่อ</span>
                  )}
                </span>
              </div>

              <button
                onClick={() => handleCheckBalance()}
                disabled={isLoadingBalance}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingBalance ? 'animate-spin' : ''}`} />
                เช็คยอดเงิน
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                รายการสินค้า ({products.length})
              </button>

              <button
                onClick={() => {
                  setActiveTab('history');
                  if (history.length === 0) handleFetchHistory();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                ประวัติสั่งซื้อ API
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                ตั้งค่า API
              </button>
            </div>
          </div>

          {/* Test Buy Result Banner */}
          {(buyResult || buyError) && (
            <div className={`p-4 border-b flex items-start justify-between gap-3 ${
              buyResult ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' : 'bg-red-950/40 border-red-500/30 text-red-200'
            }`}>
              <div className="flex items-start gap-3">
                {buyResult ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-sm">
                    {buyResult ? buyResult.message : 'สั่งซื้อไม่สำเร็จ'}
                  </h4>
                  {buyResult?.reward && (
                    <div className="mt-2 p-2.5 rounded-lg bg-zinc-950 border border-emerald-500/30 flex items-center justify-between gap-3">
                      <code className="text-xs font-mono text-emerald-400 select-all">
                        {buyResult.reward}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(buyResult.reward || '');
                          setCopiedReward(true);
                          setTimeout(() => setCopiedReward(false), 2000);
                        }}
                        className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedReward ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  )}
                  {buyError && <p className="text-xs text-red-300 mt-1">{buyError}</p>}
                </div>
              </div>

              <button
                onClick={() => { setBuyResult(null); setBuyError(null); }}
                className="p-1 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 bg-zinc-950">
            {/* TAB 1: PRODUCTS LIST */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="ค้นหาชื่อสินค้า หรือ ID สินค้า..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 text-white pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <button
                    onClick={() => handleFetchProducts()}
                    disabled={isLoadingProducts}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-amber-500/10"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingProducts ? 'animate-spin' : ''}`} />
                    ดึงข้อมูลสินค้าสดใหม่
                  </button>
                </div>

                {productError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{productError}</span>
                  </div>
                )}

                {isLoadingProducts ? (
                  <div className="py-20 text-center text-zinc-500">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-amber-500" />
                    <p className="text-sm font-medium">กำลังโหลดข้อมูลสินค้าจาก API ร้านค้า...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="py-20 text-center text-zinc-500 bg-zinc-900/50 rounded-2xl border border-white/5">
                    <Package className="w-12 h-12 mx-auto mb-3 text-zinc-600" />
                    <p className="text-base font-bold text-zinc-400">ไม่พบสินค้าจากร้านค้าปลายทาง</p>
                    <p className="text-xs text-zinc-600 mt-1">
                      {apiKey ? 'กดปุ่ม "ดึงข้อมูลสินค้าสดใหม่" หรือตรวจสอบการตั้งค่า API Key' : 'กรุณาตั้งค่า API Key ในเมนู "ตั้งค่า API"'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        className="bg-zinc-900/80 border border-white/5 hover:border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between gap-4 transition-all hover:shadow-xl group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            {p.img ? (
                              <img
                                src={p.img}
                                alt={p.name}
                                className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0 bg-zinc-950"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center flex-shrink-0 text-amber-500">
                                <Package className="w-6 h-6" />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-white text-sm line-clamp-2 group-hover:text-amber-400 transition-colors">
                                {p.name}
                              </h4>
                              <span className="inline-block mt-1 text-[11px] font-mono text-zinc-500 truncate max-w-full">
                                ID: {p.id}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-white/5">
                            <span className="text-xs text-zinc-400">ราคาต้นทาง:</span>
                            <span className="text-sm font-mono font-bold text-emerald-400">
                              ฿{p.price.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80">
                          <button
                            onClick={() => openImportModal(p)}
                            className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            นำเข้าคลัง
                          </button>

                          <button
                            onClick={() => handleTestBuy(p)}
                            disabled={purchasingProdId === p.id}
                            className="w-full py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/5"
                          >
                            {purchasingProdId === p.id ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                            )}
                            ทดสอบซื้อ
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ORDER HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="ค้นหาชื่อสินค้า หรือ ID รายการ..."
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 text-white pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <button
                    onClick={handleFetchHistory}
                    disabled={isLoadingHistory}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingHistory ? 'animate-spin' : ''}`} />
                    โหลดประวัติ
                  </button>
                </div>

                {historyError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{historyError}</span>
                  </div>
                )}

                {isLoadingHistory ? (
                  <div className="py-20 text-center text-zinc-500">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-amber-500" />
                    <p className="text-sm font-medium">กำลังโหลดประวัติการสั่งซื้อ...</p>
                  </div>
                ) : filteredHistory.length === 0 ? (
                  <div className="py-20 text-center text-zinc-500 bg-zinc-900/50 rounded-2xl border border-white/5">
                    <History className="w-12 h-12 mx-auto mb-3 text-zinc-600" />
                    <p className="text-base font-bold text-zinc-400">ยังไม่มีประวัติสั่งซื้อจาก API</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-white/5 bg-zinc-900/50">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-zinc-950 text-zinc-400 text-xs font-bold uppercase border-b border-white/5">
                        <tr>
                          <th className="p-4">เวลาทำรายการ</th>
                          <th className="p-4">สินค้า</th>
                          <th className="p-4">ราคา</th>
                          <th className="p-4">ของรางวัล / รหัสที่ได้รับ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredHistory.map((item) => (
                          <tr key={item.id} className="hover:bg-zinc-900/80 transition-colors">
                            <td className="p-4 text-xs font-mono text-zinc-400">{item.date || '-'}</td>
                            <td className="p-4 font-bold text-white">{item.name}</td>
                            <td className="p-4 font-mono font-bold text-amber-400">฿{item.price}</td>
                            <td className="p-4">
                              {item.reward ? (
                                <code className="px-2 py-1 bg-zinc-950 rounded border border-white/10 text-xs font-mono text-emerald-400 select-all">
                                  {item.reward}
                                </code>
                              ) : (
                                <span className="text-xs text-zinc-500">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="max-w-xl mx-auto space-y-6 py-4">
                <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
                    <Key className="w-6 h-6 text-amber-400" />
                    <div>
                      <h4 className="font-bold text-white text-base">ตั้งค่าการเชื่อมต่อ API ร้านค้าภายนอก</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        กรอกข้อมูล API Key ที่ได้รับจากระบบร้านค้าเพื่อเริ่มดึงสินค้า
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                        URL ของ API ร้านค้าปลายทาง
                      </label>
                      <input
                        type="text"
                        value={supplierUrl}
                        onChange={(e) => setSupplierUrl(e.target.value)}
                        placeholder="https://fetchings.shop"
                        className="w-full bg-zinc-950 border border-white/10 text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                        Apikey (YOUR_API_KEY)
                      </label>
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="วาง Apikey ของคุณที่นี่..."
                        className="w-full bg-zinc-950 border border-white/10 text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <button
                      onClick={handleSaveConfig}
                      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-amber-500/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      บันทึกการตั้งค่า และ ทดสอบการเชื่อมต่อ
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* IMPORT PRODUCT SUB-MODAL */}
      {importingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setImportingProduct(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl p-6 shadow-2xl z-10 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">นำเข้าสินค้าเข้าสู่คลัง</h3>
              </div>
              <button
                onClick={() => setImportingProduct(null)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 flex items-center gap-3">
                {importingProduct.img && (
                  <img src={importingProduct.img} alt="" className="w-10 h-10 rounded-lg object-cover" />
                )}
                <div>
                  <p className="font-bold text-white line-clamp-1">{importingProduct.name}</p>
                  <p className="text-xs text-emerald-400 font-mono">ราคาต้นทาง: ฿{importingProduct.price}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">ราคาขายหน้าร้าน (บาท)</label>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 text-amber-400 font-bold px-3 py-2 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">หมวดหมู่เกมในร้าน</label>
                <select
                  value={importGame}
                  onChange={(e) => setImportGame(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 rounded-xl"
                >
                  <option value="ROV">ROV</option>
                  <option value="ASTD">All Star Tower Defense</option>
                  <option value="AOTR">AOT Revolution</option>
                  <option value="SHOP">ร้านค้าทั่วไป</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">ชื่อหมวดหมู่ย่อย</label>
                <input
                  type="text"
                  value={importCategory}
                  onChange={(e) => setImportCategory(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">จำนวนสต๊อกในระบบ</label>
                <input
                  type="number"
                  value={importStockQty}
                  onChange={(e) => setImportStockQty(parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 rounded-xl"
                />
              </div>

              <button
                onClick={handleConfirmImport}
                disabled={isSubmittingImport}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {isSubmittingImport ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                ยืนยันการนำเข้าสินค้า
              </button>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
