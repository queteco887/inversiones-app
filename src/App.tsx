import Dashboard from "./pages/Dashboard";
import TradesPage from "./pages/TradesPage";
import { useState } from "react";

export default function App() {
  const [view, setView] = useState<"dashboard"|"trades">("dashboard");
  return (
    <div>
      <nav className="sticky top-0 bg-black/50 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto p-3 flex gap-3">
          <button className={`px-3 py-2 rounded-xl ${view==="dashboard"?"bg-white/10":""}`} onClick={()=>setView("dashboard")}>Dashboard</button>
          <button className={`px-3 py-2 rounded-xl ${view==="trades"?"bg-white/10":""}`} onClick={()=>setView("trades")}>Operaciones</button>
        </div>
      </nav>
      {view === "dashboard" ? <Dashboard/> : <TradesPage/>}
    </div>
  );
}