export interface SupplierProduct {
  id: string;
  name: string;
  price: number;
  img?: string;
  category?: string;
  description?: string;
}

export interface SupplierHistoryItem {
  id: string;
  name: string;
  price: number;
  reward?: string;
  date: string;
}

export interface SupplierConfig {
  apiKey: string;
  supplierUrl: string;
}

export const DEFAULT_SUPPLIER_URL = 'https://fetchings.shop';

export function getStoredSupplierConfig(): SupplierConfig {
  try {
    const stored = localStorage.getItem('KUWASHII_SUPPLIER_CONFIG');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        apiKey: parsed.apiKey || '',
        supplierUrl: parsed.supplierUrl || DEFAULT_SUPPLIER_URL
      };
    }
  } catch (e) {}
  return { apiKey: '', supplierUrl: DEFAULT_SUPPLIER_URL };
}

export function setStoredSupplierConfig(config: SupplierConfig) {
  try {
    localStorage.setItem('KUWASHII_SUPPLIER_CONFIG', JSON.stringify(config));
  } catch (e) {}
}

export async function fetchSupplierBalance(config?: SupplierConfig): Promise<{ status: number; balance?: number; error?: string }> {
  const cfg = config || getStoredSupplierConfig();
  try {
    const res = await fetch('/api/supplier/balance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: cfg.apiKey,
        supplierUrl: cfg.supplierUrl || DEFAULT_SUPPLIER_URL
      })
    });
    return await res.json();
  } catch (err: any) {
    return { status: 500, error: err.message || 'Failed to connect to supplier server' };
  }
}

export async function fetchSupplierProducts(config?: SupplierConfig, productId?: string): Promise<{ status: number; products?: SupplierProduct[]; error?: string }> {
  const cfg = config || getStoredSupplierConfig();
  try {
    const res = await fetch('/api/supplier/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: cfg.apiKey,
        supplierUrl: cfg.supplierUrl || DEFAULT_SUPPLIER_URL,
        id: productId
      })
    });
    return await res.json();
  } catch (err: any) {
    return { status: 500, error: err.message || 'Failed to connect to supplier server' };
  }
}

export async function buySupplierProduct(
  productId: string,
  customerName?: string,
  code?: string,
  config?: SupplierConfig
): Promise<{ status: number; message?: string; reward?: string; error?: string }> {
  const cfg = config || getStoredSupplierConfig();
  try {
    const res = await fetch('/api/supplier/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: cfg.apiKey,
        supplierUrl: cfg.supplierUrl || DEFAULT_SUPPLIER_URL,
        id: productId,
        customer: customerName,
        code
      })
    });
    return await res.json();
  } catch (err: any) {
    return { status: 500, error: err.message || 'Failed to process supplier purchase' };
  }
}

export async function fetchSupplierHistory(
  customerName?: string,
  config?: SupplierConfig
): Promise<{ status: number; history?: SupplierHistoryItem[]; error?: string }> {
  const cfg = config || getStoredSupplierConfig();
  try {
    const res = await fetch('/api/supplier/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: cfg.apiKey,
        supplierUrl: cfg.supplierUrl || DEFAULT_SUPPLIER_URL,
        customer: customerName
      })
    });
    return await res.json();
  } catch (err: any) {
    return { status: 500, error: err.message || 'Failed to fetch supplier history' };
  }
}
