import { HoldingSnapshot, Persisted } from "../domain/types";

// Devuelve el precio guardado del ticker o undefined
export function getPrice(state: Persisted, ticker: string): HoldingSnapshot | undefined {
  return state.prices.find(p => p.ticker === ticker);
}

// Upsert de precio manual (lo usaremos hasta integrar APIs)
export function upsertPrice(state: Persisted, snap: HoldingSnapshot): Persisted {
  const i = state.prices.findIndex(p => p.ticker === snap.ticker);
  const prices = [...state.prices];
  if (i === -1) prices.push(snap); else prices[i] = snap;
  return { ...state, prices };
}
