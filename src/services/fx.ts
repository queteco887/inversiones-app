// src/services/fx.ts
import type { Currency, Fx } from "../domain/types";

/**
 * factor para convertir DESDE la moneda indicada HACIA la moneda base del portfolio
 * Ej: base=ARS y currency=USD  => factor = USD_ARS
 *     base=USD y currency=ARS  => factor = 1 / USD_ARS
 * USDC se considera 1:1 con USD.
 * BTC: por ahora sin cotización -> factor = 1 (no convierte). Ajustar cuando agregues BTC_USD.
 */
export function rateToBase(currency: Currency, fx: Fx): number {
  const usdArs = fx.USD_ARS;

  if (currency === fx.base) return 1;

  switch (fx.base) {
    case "ARS": {
      if (currency === "USD" || currency === "USDC") return usdArs; // USD->ARS
      if (currency === "BTC") return 1; // TODO: agregar BTC_ARS o BTC_USD y encadenar
      if (currency === "ARS") return 1;
      break;
    }
    case "USD": {
      if (currency === "ARS") return 1 / usdArs; // ARS->USD
      if (currency === "USDC") return 1;         // USDC->USD
      if (currency === "BTC") return 1;          // TODO
      if (currency === "USD") return 1;
      break;
    }
    case "USDC": {
      if (currency === "ARS") return 1 / usdArs; // ARS->USDC
      if (currency === "USD") return 1;          // USD->USDC
      if (currency === "BTC") return 1;          // TODO
      if (currency === "USDC") return 1;
      break;
    }
  }
  return 1;
}

/** Convierte un monto a la moneda base del portfolio. */
export function toBase(value: number, currency: Currency, fx: Fx): number {
  return value * rateToBase(currency, fx);
}

/** Convierte un monto DESDE la base HACIA la moneda indicada. */
export function fromBase(value: number, currency: Currency, fx: Fx): number {
  const f = rateToBase(currency, fx);
  return f === 0 ? value : value / f;
}
