export default function Kpi({ label, value, accent }: { label: string; value: string; accent?: "pos"|"neg" }) {
  const color = accent === "pos" ? "text-emerald-500" : accent === "neg" ? "text-rose-500" : "text-white";
  return (
    <div className="rounded-2xl border border-white/10 p-4">
      <div className="text-xs text-white/60">{label}</div>
      <div className={`text-xl font-semibold ${color}`}>{value}</div>
    </div>
  );
}
