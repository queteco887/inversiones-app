import { PositionRow } from "../domain/types";

function n2(n: number) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);
}

export default function PositionsTable({ rows, base }: { rows: PositionRow[]; base: string }) {
  return (
    <div className="overflow-auto border border-white/10 rounded-2xl">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-white/60">
            <th className="px-3 py-2">Ticker</th>
            <th className="px-3 py-2">Clase</th>
            <th className="px-3 py-2">Cantidad</th>
            <th className="px-3 py-2">Precio</th>
            <th className="px-3 py-2">Valor ({base})</th>
            <th className="px-3 py-2">Costo ({base})</th>
            <th className="px-3 py-2">P/L ({base})</th>
            <th className="px-3 py-2">%</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => {
            const accent = r.pnlBase >= 0 ? "text-emerald-400" : "text-rose-400";
            return (
              <tr key={r.ticker} className="border-t border-white/10">
                <td className="px-3 py-2 font-medium">{r.ticker}</td>
                <td className="px-3 py-2">{r.assetClass}</td>
                <td className="px-3 py-2">{n2(r.qty)}</td>
                <td className="px-3 py-2">{n2(r.priceNative)}</td>
                <td className="px-3 py-2">{n2(r.mvBase)}</td>
                <td className="px-3 py-2">{n2(r.costBase)}</td>
                <td className={`px-3 py-2 ${accent}`}>{n2(r.pnlBase)}</td>
                <td className={`px-3 py-2 ${accent}`}>{n2(r.pnlPct)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
