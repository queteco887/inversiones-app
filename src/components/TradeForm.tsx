import { useState } from "react";
import type { AssetClass, Currency, Trade } from "../domain/types";

const assetClasses: AssetClass[] = ["CEDEAR","ACCION_AR","BONO_AR","ON","CRIPTO"];
const currencies: Currency[] = ["ARS","USD","USDC","BTC"];

export default function TradeForm({ onSubmit }: { onSubmit: (t: Omit<Trade,"id">) => void }) {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [ticker, setTicker] = useState<string>("");

  const [assetClass, setAssetClass] = useState<AssetClass>("CEDEAR");
  const [type, setType] = useState<"BUY"|"SELL">("BUY");

  // 👇 claves para que se vean los placeholders
  const [quantity, setQuantity] = useState<string>("");  // antes: number 0
  const [price, setPrice]       = useState<string>("");  // antes: number 0
  const [fees, setFees]         = useState<string>("");  // antes: number 0
  const [currency, setCurrency] = useState<Currency>("ARS");

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-3 gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          date,
          ticker: ticker.toUpperCase(),
          assetClass,
          type,
          quantity: Number(quantity || 0),
          price: Number(price || 0),
          fees: Number(fees || 0),
          currency,
        });
      }}
    >
      <input
        className="rounded-xl bg-white/5 border border-white/10 px-3 py-2"
        type="date"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
      />

      <input
        className="rounded-xl bg-white/5 border border-white/10 px-3 py-2"
        placeholder="Ticker (AAPL, GGAL, AL30, BTC...)"
        value={ticker}
        onChange={(e)=>setTicker(e.target.value)}
      />

      <select
        className="rounded-xl bg-white/5 border border-white/10 px-3 py-2"
        value={assetClass}
        onChange={(e)=>setAssetClass(e.target.value as AssetClass)}
      >
        {assetClasses.map(a => <option key={a} value={a}>{a}</option>)}
      </select>

      <select
        className="rounded-xl bg-white/5 border border-white/10 px-3 py-2"
        value={type}
        onChange={(e)=>setType(e.target.value as "BUY"|"SELL")}
      >
        <option value="BUY">BUY</option>
        <option value="SELL">SELL</option>
      </select>

      <input
        className="rounded-xl bg-white/5 border border-white/10 px-3 py-2"
        type="number"
        step="0.0001"
        placeholder="Cantidad"
        value={quantity}
        onChange={(e)=>setQuantity(e.target.value)}
      />

      <input
        className="rounded-xl bg-white/5 border border-white/10 px-3 py-2"
        type="number"
        step="0.0001"
        placeholder="Precio por unidad"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />

      <input
        className="rounded-xl bg-white/5 border border-white/10 px-3 py-2"
        type="number"
        step="0.0001"
        placeholder="Comisiones (fees)"
        value={fees}
        onChange={(e)=>setFees(e.target.value)}
      />

      <select
        className="rounded-xl bg-white/5 border border-white/10 px-3 py-2"
        value={currency}
        onChange={(e)=>setCurrency(e.target.value as Currency)}
      >
        {currencies.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <div className="md:col-span-3 flex justify-end gap-2">
        <button
          type="reset"
          className="rounded-xl border border-white/10 px-3 py-2 bg-white/0"
          onClick={()=>{
            setDate(new Date().toISOString().slice(0,10));
            setTicker(""); setAssetClass("CEDEAR"); setType("BUY");
            setQuantity(""); setPrice(""); setFees("");
            setCurrency("ARS");
          }}
        >
          Limpiar
        </button>
        <button type="submit" className="rounded-xl border border-white/10 px-3 py-2 bg-white/10">
          Guardar
        </button>
      </div>
    </form>
  );
}
