'use client';
import { useEffect, useState } from 'react';
export type P = { done: Record<string, 1>; xp: number; streak: number; last: string };
const K = 'hac-next-1', E: P = { done: {}, xp: 0, streak: 0, last: '' };
const read = (): P => { try { return { ...E, ...JSON.parse(localStorage.getItem(K) || '{}') }; } catch { return E; } };
export function useProgress() {
  const [p, setP] = useState<P>(E);
  useEffect(() => { const f = () => setP(read()); f(); addEventListener('hac', f); return () => removeEventListener('hac', f); }, []);
  return p;
}
export function complete(key: string, firstTry: boolean) {
  const p = read(); if (p.done[key]) return;
  p.done[key] = 1; p.xp += firstTry ? 30 : 15;
  const t = new Date().toDateString(), y = new Date(Date.now() - 864e5).toDateString();
  p.streak = p.last === t ? p.streak : p.last === y ? p.streak + 1 : 1; p.last = t;
  try { localStorage.setItem(K, JSON.stringify(p)); } catch {}
  dispatchEvent(new Event('hac'));
}
