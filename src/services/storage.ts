import { Persisted } from "../domain/types";

const KEY = "inv-app-v1";

const defaultData: Persisted = {
  fx: { base: "USD", USD_ARS: 1000 },
  trades: [],
  prices: [],
};

export function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultData;
    return JSON.parse(raw) as Persisted;
  } catch {
    return defaultData;
  }
}

export function save(state: Persisted) {
  localStorage.setItem(KEY, JSON.stringify(state));
}