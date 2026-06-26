export interface StockItem {
  id: string;
  game?: string;
  name: string;
  category: string;
  saleFormat?: 'ขายรหัส' | 'กล่องสุ่ม' | 'ไฟล์ตัวรัน';
  quantity: number;
  initialQuantity?: number;
  piecesPerUnit?: number;
  price: number; // in Thai Baht
  originalPrice?: number; // pre-discount price
  description: string;
  imageUrl?: string;
  imageUrls?: string[];
  isPinned?: boolean;
  isPopular?: boolean;
  gachaPool?: { id: string; name: string; color?: string; guaranteedAtStock?: number; guaranteedAtStocks?: number[]; }[];
  accountCredentials?: string[]; 
  fileLink?: string;
  filePassword?: string;
  updatedAt: string;
}

export interface PurchaseRecord {
  id: string;
  itemId: string;
  itemName: string;
  price: number;
  quantity?: number;
  date: string;
  gachaDrops?: { name: string; color?: string; }[];
  credentialData?: string; 
  game?: string;
}

export interface TopupRecord {
  id: string;
  amount: number;
  date: string;
  method?: string;
  refCode?: string;
  game?: string;
}

export interface UserData {
  username: string;
  email?: string;
  password?: string;
  avatar?: string;
  balance: number;
  joinDate: string;
  purchases: PurchaseRecord[];
  topups?: TopupRecord[];
  purchaseCount?: number;
  topupCount?: number;
}

export type CategoryFilter = string;
export type SaleFormatFilter = 'all' | 'ขายรหัส' | 'กล่องสุ่ม';
export type StockStatusFilter = 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';
