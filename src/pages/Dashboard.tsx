import Kpi from "../components/Kpi";
import TradeForm from "../components/TradeForm";
import PositionsTable from "../components/PositionsTable";
import { usePortfolio } from "../hooks/usePortfolio";
import { upsertPrice } from "../services/prices";
import React from "react";

export default function Dashboard() {
  const { state, setState, addTrade, positions, totals, setFx } = usePortfolio();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Seguimiento de Inversiones</h1>
        <p className="text-sm text-white/60">MVP — datos locales, ARS/USD, CEDEAR/AR/BONO/ON/CRIPTO</p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label={`Valor (${state.fx.base})`} value={fmt(totals.mv)} />
        <Kpi label="Costo" value={fmt(totals.cost)} />
        <Kpi label="P/L" value={`${fmt(totals.pnl)} (${totals.pct.toFixed(2)}%)`} accent={totals.pnl>=0?"pos":"neg"} />
        <div className="rounded-2xl border border-white/10 p-4 space-y-2">
          <div className="text-xs text-white/60">Moneda base</div>
          <select className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 w-full"
                  value={state.fx.base}
                  onChange={e => setFx(e.target.value as any, state.fx.USD_ARS)}>
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>
          <div className="text-xs text-white/60">USD/ARS</div>
          <input className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 w-full"
                 type="number" step="0.01"
                 value={state.fx.USD_ARS}
                 onChange={e => setFx(state.fx.base, Number(e.target.value||0))}/>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Operación nueva</h2>
        <TradeForm onSubmit={addTrade}/>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Precios (manual por ahora)</h2>
        <PriceEditor stateJson={state} onChange={(s)=>setState(s)} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Posiciones</h2>
        <PositionsTable rows={positions} base={state.fx.base}/>
      </section>
    </div>
  );
}

function fmt(n: number) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);
}

function PriceEditor({ stateJson, onChange }: { stateJson: any; onChange: (s:any)=>void }) {
  const [ticker, setTicker] = React.useState("");
  const [price, setPrice]   = React.useState(0);
  const [currency, setCur]  = React.useState<"ARS"|"USD"|"USDC"|"BTC">("ARS");

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
      <input className="rounded-xl bg-white/5 border border-white/10 px-3 py-2" placeholder="Ticker" value={ticker} onChange={e=>setTicker(e.target.value)} />
      <input className="rounded-xl bg-white/5 border border-white/10 px-3 py-2" type="number" step="0.0001" placeholder="Precio" value={price} onChange={e=>setPrice(Number(e.target.value))} />
      <select className="rounded-xl bg-white/5 border border-white/10 px-3 py-2" value={currency} onChange={e=>setCur(e.target.value as any)}>
        <option>ARS</option><option>USD</option><option>USDC</option><option>BTC</option>
      </select>
      <button className="rounded-xl border border-white/10 px-3 py-2 bg-white/10 md:col-span-2"
              onClick={()=> onChange(upsertPrice(stateJson, {
                  ticker: ticker.toUpperCase(), price, currency, updatedAt: new Date().toISOString(),
                  assetClass: "CEDEAR"
              }))}>
        Guardar precio
      </button>
      <div className="text-sm text-white/60 md:col-span-6">
        Tip: para CEDEAR podés cargar precio en <b>ARS</b>. Para cripto, podés usar <b>USDC</b> y luego veremos conversión a base.
      </div>
    </div>
  );
}
