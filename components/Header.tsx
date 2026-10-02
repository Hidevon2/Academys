'use client';
import Link from 'next/link';
import { useProgress } from '@/lib/progress';
export default function Header() {
  const p = useProgress();
  const toggle = () => { const r = document.documentElement; const dark = r.dataset.theme === 'dark' || (!r.dataset.theme && matchMedia('(prefers-color-scheme:dark)').matches); r.dataset.theme = dark ? 'light' : 'dark'; };
  return (<header><Link href="/" className="logo">🌿 Herbal-Ai <span>Code Academy</span></Link>
    <span className="pill">🔥 {p.streak} ⭐ {p.xp} XP · Lv {Math.floor(p.xp / 100) + 1}</span>
    <button className="ghost" onClick={toggle} aria-label="Toggle theme">◐</button></header>);
}
