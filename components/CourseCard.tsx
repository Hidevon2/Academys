'use client';
import Link from 'next/link';
import { useProgress } from '@/lib/progress';
export default function CourseCard({ id, e, t, d, total }: { id: string; e: string; t: string; d: string; total: number }) {
  const p = useProgress(); const n = Object.keys(p.done).filter(k => k.startsWith(id + '-')).length;
  return (<Link href={`/course/${id}`} className="card course"><div className="ico">{e}</div>
    <div style={{ flex: 1 }}><b>{t}</b><span className="sub" style={{ margin: 0, fontSize: 14 }}>{d}</span>
    <div className="bar"><i style={{ width: `${(n / total) * 100}%` }} /></div></div></Link>);
}
