// src/domain/types.ts

// --- Currency como type ---
export type Currency = "ARS" | "USD" | "USDC" | "BTC";
export type AssetClass = "CEDEAR" | "ACCION_AR" | "BONO_AR" | "ON" | "CRIPTO";

// 👇 Valor exportado (enum-like) para usar en runtime: AssetClass.CEDEAR, etc.
export const AssetClass = {
  CEDEAR: "CEDEAR",
  ACCION_AR: "ACCION_AR",
  BONO_AR: "BONO_AR",
  ON: "ON",
  CRIPTO: "CRIPTO",
} as const;

export const Currency = {
  ARS: "ARS",
  USD: "USD",
  USDC: "USDC",
  BTC: "BTC",
} as const;

export type Trade = {
  id: string;
  date: string;          // YYYY-MM-DD
  ticker: string;        // ej: AAPL, GGAL, AL30, BTCUSDT
  assetClass: AssetClass;
  type: "BUY" | "SELL";
  quantity: number;
  price: number;         // precio por unidad en la moneda de la operación
  fees: number;          // comisiones totales en la misma moneda
  currency: Currency;    // moneda de la operación (ARS, USD, USDC, etc.)
};

export type HoldingSnapshot = {
  ticker: string;
  name?: string;
  assetClass: AssetClass;
  price: number;         // último precio conocido
  currency: Currency;    // moneda del precio
  updatedAt: string;     // ISO
};

export type Fx = {
  base: Exclude<Currency, "BTC">; // "ARS" | "USD" | "USDC"
  USD_ARS: number;                // factor para convertir
};

export type Persisted = {
  fx: Fx;
  trades: Trade[];
  prices: HoldingSnapshot[];      // “último precio” por ticker
};

export type PositionRow = {
  ticker: string;
  name?: string;
  assetClass: AssetClass;
  qty: number;
  avgCostNative: number;          // promedio en moneda de la operación
  costBase: number;               // costo convertido a base
  priceNative: number;            // último precio nativo
  mvBase: number;                 // market value convertido a base
  pnlBase: number;
  pnlPct: number;
};

