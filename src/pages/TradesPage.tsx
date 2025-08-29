import { usePortfolio } from "../hooks/usePortfolio";

export default function TradesPage() {
  const { state } = usePortfolio();
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Operaciones</h1>
      <div className="overflow-auto border border-white/10 rounded-2xl">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-white/60">
              <th className="px-3 py-2">Fecha</th>
              <th className="px-3 py-2">Ticker</th>
              <th className="px-3 py-2">Tipo</th>
              <th className="px-3 py-2">Cant.</th>
              <th className="px-3 py-2">Precio</th>
              <th className="px-3 py-2">Fees</th>
              <th className="px-3 py-2">Moneda</th>
            </tr>
          </thead>
          <tbody>
            {state.trades.map(t => (
              <tr key={t.id} className="border-t border-white/10">
                <td className="px-3 py-2">{t.date}</td>
                <td className="px-3 py-2">{t.ticker}</td>
                <td className="px-3 py-2">{t.type}</td>
                <td className="px-3 py-2">{t.quantity}</td>
                <td className="px-3 py-2">{t.price}</td>
                <td className="px-3 py-2">{t.fees}</td>
                <td className="px-3 py-2">{t.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
