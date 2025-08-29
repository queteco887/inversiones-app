import { useEffect, useMemo, useState } from "react";
import { Persisted, PositionRow, Trade } from "../domain/types";
import { load, save } from "../services/storage";
import { getPrice } from "../services/prices";
import { toBase } from "../services/fx";

const uid = () => Math.random().toString(36).slice(2, 10);

export function usePortfolio() {
  const [state, setState] = useState<Persisted>(load());

  useEffect(() => save(state), [state]);

  function addTrade(t: Omit<Trade, "id">) {
    setState(s => ({ ...s, trades: [...s.trades, { ...t, id: uid() }] }));
  }

  function setFx(base: Persisted["fx"]["base"], USD_ARS: number) {
    setState(s => ({ ...s, fx: { base, USD_ARS } }));
  }

  const positions: PositionRow[] = useMemo(() => {
    // Agregamos por ticker
    const map = new Map<string, { qty: number; costNative: number; fees: number; currency: string; assetClass: string }>();
    for (const t of state.trades) {
      const cur = map.get(t.ticker) ?? { qty: 0, costNative: 0, fees: 0, currency: t.currency, assetClass: t.assetClass };
      if (t.type === "BUY") {
        cur.qty += t.quantity;
        cur.costNative += t.quantity * t.price;
        cur.fees += t.fees;
      } else {
        cur.qty -= t.quantity;
        cur.costNative -= t.quantity * t.price; // aproximación simple
        cur.fees += t.fees;
      }
      cur.currency = t.currency;
      cur.assetClass = t.assetClass;
      map.set(t.ticker, cur);
    }

    const rows: PositionRow[] = [];
    for (const [ticker, info] of map.entries()) {
      const price = getPrice(state, ticker);
      const qty = info.qty;
      const avg = qty > 0 ? (info.costNative + info.fees) / qty : 0;

      // costo convertido a base
      const costBase = toBase(avg * qty, info.currency as any, state.fx);

      // valor de mercado: si tenemos snapshot y moneda del snapshot
      let mvBase = 0;
      if (price) {
        mvBase = toBase(price.price * qty, price.currency, state.fx);
      }

      const pnlBase = mvBase - costBase;
      const pnlPct = costBase !== 0 ? (pnlBase / costBase) * 100 : 0;

      rows.push({
        ticker,
        assetClass: info.assetClass as any,
        qty,
        avgCostNative: avg,
        costBase,
        priceNative: price?.price ?? 0,
        mvBase,
        pnlBase,
        pnlPct,
      });
    }
    return rows.sort((a,b) => a.ticker.localeCompare(b.ticker));
  }, [state]);

  const totals = useMemo(() => {
    const mv = positions.reduce((a, r) => a + r.mvBase, 0);
    const cost = positions.reduce((a, r) => a + r.costBase, 0);
    const pnl = mv - cost;
    const pct = cost ? (pnl / cost) * 100 : 0;
    return { mv, cost, pnl, pct };
  }, [positions]);

  return {
    state, setState,
    addTrade,
    setFx,
    positions,
    totals,
  };
}
